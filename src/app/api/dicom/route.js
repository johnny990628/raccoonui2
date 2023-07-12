import { NextResponse } from 'next/server'

const dicomTag = {
    patient: [
        {
            tag: '00100010',
            keyword: 'PatientName',
        },
        {
            tag: '00100020',
            keyword: 'PatientID',
        },
        {
            tag: '00100030',
            keyword: 'PatientBirthDate',
        },
        {
            tag: '00100040',
            keyword: 'PatientSex',
        },
    ],
    study: [
        {
            tag: '00080020',
            keyword: 'StudyDate',
        },
        {
            tag: '00080030',
            keyword: 'StudyTime',
        },
        {
            tag: '00080050',
            keyword: 'AccessionNumber',
        },
        {
            tag: '0020000D',
            keyword: 'StudyInstanceUID',
        },
    ],
    series: [
        {
            tag: '00200011',
            keyword: 'Number',
        },
        {
            tag: '0008103E',
            keyword: 'SeriesDescription',
        },
        {
            tag: '00080060',
            keyword: 'Modality',
        },
        {
            tag: '0020000E',
            keyword: 'SeriesInstanceUID',
        },
    ],
    instances: [
        {
            tag: '00200013',
            keyword: 'InstanceNumber',
        },
    ],
}

const reduceData = ({ header, item }) => {
    const afterFormSeries = dicomTag[header].reduce((accumulator, currentValue) => {
        const value = item[currentValue.tag]?.Value?.[0] // 添加属性存在性的检查
        return {
            ...accumulator,
            [currentValue.keyword]: value || null,
        }
    }, {})

    return afterFormSeries
}

const getArrayWithPagination = (originalArray, limit, offset) => {
    const startIndex = offset * limit
    const endIndex = offset + limit
    const newArray = originalArray.slice(startIndex, endIndex)
    return newArray
}

const asyncGetSeries = async studyUID => {
    const fetchURL = `${process.env.PACS_URL}/${studyUID}/series`
    const res = await fetch(fetchURL)
    const response = await res.json()
    return response
}

const asyncGetInstances = async (studyUID, seriesUID) => {
    const fetchURL = `${process.env.PACS_URL}/${studyUID}/series/${seriesUID}/instances`
    const res = await fetch(fetchURL)
    const response = await res.json()
    return response
}

const getPacsesStudies = async queryParams => {
    const fetchURL = `${process.env.PACS_URL}`

    const res = await fetch(fetchURL, {
        params: queryParams,
    })
    const response = await res.json()

    const results = response.map(item => {
        const patient = reduceData({ header: 'patient', item })
        const study = reduceData({ header: 'study', item })
        return { ...patient, ...study, dicomTag: item }
    })
    return results
}

const getWolePacsStudies = async arrayWithPaginationData => {
    const results = await Promise.all(
        arrayWithPaginationData.map(async study => {
            try {
                const originalSeries = await asyncGetSeries(study.StudyInstanceUID)

                const series = originalSeries.map(item => {
                    const reducedSeries = reduceData({ header: 'series', item })
                    return { dicomTag: item, ...reducedSeries }
                })

                return { ...study, series }
            } catch (error) {
                // 处理错误，例如打印错误消息或抛出自定义错误
                console.error('Error occurred:', error)
                // 抛出自定义错误
                throw new Error('Failed to retrieve series data.')
            }
        })
    )
    return results
}

const getWolePacsStudiesInstances = async wholePacsStudies => {
    const results = await Promise.all(
        wholePacsStudies.map(async study => {
            var SeriesInstanceUID = null
            var SOPInstanceUID = null
            const result = await Promise.all(
                study.series.map(async series => {
                    const originalInstances = await asyncGetInstances(study.StudyInstanceUID, series.SeriesInstanceUID)
                    SeriesInstanceUID = originalInstances[0]['0020000E']['Value'][0]
                    SOPInstanceUID = originalInstances[0]['00080018']['Value'][0]

                    const instances = originalInstances.map(item => {
                        const reducedInstances = reduceData({ header: 'instances', item })
                        return { dicomTag: item, ...reducedInstances }
                    })
                    return { ...series, instances }
                })
            )
            return { ...study, series: result, SeriesInstanceUID, SOPInstanceUID }
        })
    )
    return results
}

export async function GET(request) {
    try {
        const response = await getPacsesStudies()

        //分頁
        const arrayWithPaginationData = getArrayWithPagination(response, 10, 0)

        //獲取所有pacs的study的series
        const wholePacsStudies = await getWolePacsStudies(arrayWithPaginationData)

        //獲取所有pacs的study的series的instances
        const wholePacsStudiesInstances = await getWolePacsStudiesInstances(wholePacsStudies)

        const data = wholePacsStudiesInstances.map(item => {
            return {
                ...item,
                imageURL: `${process.env.IMAGE_URL}?requestType=WADO&studyUID=${item.StudyInstanceUID}&seriesUID=${item.SeriesInstanceUID}&objectUID=${item.SOPInstanceUID}&contentType=image/jpeg`,
            }
        })

        return NextResponse.json(data)
    } catch (err) {
        console.log(err)
    }
}

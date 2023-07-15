export const dicomTag = {
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

export const reduceData = ({ header, item }) => {
    const afterFormSeries = dicomTag[header].reduce((accumulator, currentValue) => {
        const value = item[currentValue.tag]?.Value?.[0] // 添加属性存在性的检查
        return {
            ...accumulator,
            [currentValue.keyword]: value || null,
        }
    }, {})

    return afterFormSeries
}

export const getArrayWithPagination = (originalArray, limit, offset) => {
    const startIndex = offset * limit
    const endIndex = offset + limit
    const newArray = originalArray.slice(startIndex, endIndex)
    return newArray
}

export const apiGetSeries = async studyUID => {
    const fetchURL = `${process.env.PACS_URL}/${studyUID}/series`
    const res = await fetch(fetchURL)
    const response = await res.json()
    return response
}

export const apiGetInstances = async (studyUID, seriesUID) => {
    const fetchURL = `${process.env.PACS_URL}/${studyUID}/series/${seriesUID}/instances`
    const res = await fetch(fetchURL)
    const response = await res.json()
    return response
}

export const getStudies = async queryParams => {
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

export const combineDataWithSeries = async data => {
    const results = await Promise.all(
        data.map(async study => {
            try {
                const originalSeries = await apiGetSeries(study.StudyInstanceUID)

                const series = originalSeries.map(item => {
                    const reducedSeries = reduceData({ header: 'series', item })
                    return { dicomTag: item, ...reducedSeries }
                })

                return { ...study, series }
            } catch (error) {
                console.error('Error occurred:', error)
                throw new Error('Failed to retrieve series data.')
            }
        })
    )
    return results
}

export const combineDataWithInstance = async data => {
    const results = await Promise.all(
        data.map(async study => {
            var SeriesInstanceUID = null
            var SOPInstanceUID = null
            const result = await Promise.all(
                study.series.map(async series => {
                    const originalInstances = await apiGetInstances(study.StudyInstanceUID, series.SeriesInstanceUID)
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

export const combineDataWithImage = async data => {
    const result = data.map(item => {
        return {
            ...item,
            imageURL: `${process.env.IMAGE_URL}?requestType=WADO&studyUID=${item.StudyInstanceUID}&seriesUID=${item.SeriesInstanceUID}&objectUID=${item.SOPInstanceUID}&contentType=image/jpeg`,
        }
    })
    return result
}

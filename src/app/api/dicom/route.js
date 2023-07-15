import { combineDataWithImage, combineDataWithInstance, combineDataWithSeries, getStudies } from '@/functions/dicom/dicom'
import { NextResponse } from 'next/server'

export async function GET(request) {
    try {
        const studyData = await getStudies()
        //分頁
        // const arrayWithPaginationData = getArrayWithPagination(response, 10, 0)

        const seriesData = await combineDataWithSeries(studyData)

        const instanceData = await combineDataWithInstance(seriesData)

        const result = await combineDataWithImage(instanceData)

        return NextResponse.json(result)
    } catch (err) {
        console.log(err)
    }
}

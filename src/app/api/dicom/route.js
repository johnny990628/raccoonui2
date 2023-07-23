import { combineDataWithImage, combineDataWithInstance, combineDataWithSeries, filterStudies, getStudies } from '@/functions/dicom/dicom'
import { NextResponse } from 'next/server'

export async function GET(req, res) {
    try {
        const limit = req.nextUrl.searchParams.get('limit')
        const page = req.nextUrl.searchParams.get('page')

        const studyData = await getStudies()
        //分頁
        const filteredData = filterStudies({ studies: studyData, limit, page })

        const seriesData = await combineDataWithSeries(filteredData)

        const instanceData = await combineDataWithInstance(seriesData)

        const result = await combineDataWithImage(instanceData)

        return NextResponse.json(result)
    } catch (err) {
        console.log(err)
    }
}

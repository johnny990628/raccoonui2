import { combineDataWithImage, combineDataWithInstance, combineDataWithSeries, getStudies } from '@/functions/dicom/dicom'
import { NextResponse } from 'next/server'

export async function GET(req, { params }) {
    try {
        const { studyID } = params

        const studyData = await getStudies({ StudyInstanceUID: studyID })

        const seriesData = await combineDataWithSeries(studyData)

        const instanceData = await combineDataWithInstance(seriesData)

        const result = await combineDataWithImage(instanceData)

        return NextResponse.json(result[0])
    } catch (err) {
        console.log(err)
    }
}

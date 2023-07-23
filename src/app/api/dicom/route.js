import { combineDataWithImage, combineDataWithInstance, combineDataWithSeries, filterStudies, getStudies } from '@/functions/dicom/dicom'
import { NextResponse } from 'next/server'

export async function GET(req, res) {
    try {
        const limit = req.nextUrl.searchParams.get('limit')
        const page = req.nextUrl.searchParams.get('page')
        const PatientID = req.nextUrl.searchParams.get('PatientID') || ''
        const PatientName = req.nextUrl.searchParams.get('PatientName') || ''
        const Modality = req.nextUrl.searchParams.get('Modality') || ''
        const Identifier = req.nextUrl.searchParams.get('Identifier') || ''

        const searchQuery = { PatientID, PatientName, Modality, Identifier }

        const studyData = await getStudies(searchQuery)

        const filteredData = filterStudies({ studies: studyData, limit, page, searchQuery })

        const seriesData = await combineDataWithSeries(filteredData)

        const instanceData = await combineDataWithInstance(seriesData)

        const result = await combineDataWithImage(instanceData)

        return NextResponse.json(result)
    } catch (err) {
        console.log(err)
    }
}

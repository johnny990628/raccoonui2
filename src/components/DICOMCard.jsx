import Image from 'next/image'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'

export default async function DICOMCard({ dicom }) {
    return (
        <Card className="hover:bg-zinc-900 cursor-pointer">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <p className="text-md">{dicom.PatientName?.Alphabetic || 'No Name'}</p>
                    <p className="text-sm text-zinc-500">{new Date(dicom.StudyDate).toLocaleDateString()}</p>
                </CardTitle>
                <CardDescription className="flex flex-col">
                    <p>ID : {dicom.PatientID}</p>
                    <p>AN : {dicom.AccessionNumber || null}</p>
                </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
                <Image src={dicom.imageURL} alt="dicom" width={100} height={100} className="object-cover h-60 w-60" />
            </CardContent>
            <CardFooter className="mt-4 flex items-center gap-2">
                <Button className="w-full bg-slate-900 text-slate-50 hover:bg-slate-800">Viewer</Button>
                <Button className="w-full">Detail</Button>
            </CardFooter>
        </Card>
    )
}
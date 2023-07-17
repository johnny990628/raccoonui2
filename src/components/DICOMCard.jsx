import Image from 'next/image'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button, buttonVariants } from './ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export default async function DICOMCard({ dicom }) {
    return (
        <Card className="hover:bg-accent">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <div className="text-md">{dicom.PatientName?.Alphabetic || 'No Name'}</div>
                    <div className="text-sm text-muted-foreground">{new Date(dicom.StudyDate).toLocaleDateString()}</div>
                </CardTitle>
                <CardDescription className="flex flex-col">
                    <div>ID : {dicom.PatientID}</div>
                    <div>AN : {dicom.AccessionNumber || null}</div>
                    <div> {`Series : ${dicom.series.length}`}</div>
                </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
                <Image src={dicom.imageURL} alt="dicom" width={100} height={100} className="object-cover h-60 w-60" />
            </CardContent>
            <CardFooter className="mt-4 flex items-center gap-2">
                <Link
                    href={`${process.env.BLUELIGHT_URL}?StudyInstanceUID=${dicom.StudyInstanceUID}`}
                    target="_blank"
                    className={cn(buttonVariants(), 'w-full bg-slate-900 text-slate-50 hover:bg-slate-800')}
                >
                    Viewer
                </Link>
                <Link href={`/dicom/${dicom.StudyInstanceUID}`} className={cn(buttonVariants(), 'w-full')}>
                    Detail
                </Link>
            </CardFooter>
        </Card>
    )
}

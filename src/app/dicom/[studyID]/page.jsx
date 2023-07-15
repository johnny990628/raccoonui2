import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

const getData = async studyID => {
    const res = await fetch(process.env.SERVER_URL + `/api/dicom/${studyID}`)

    if (!res.ok) throw new Error('Failed to fetch data')

    return res.json()
}

const Row = ({ title, content }) => {
    return (
        <div>
            <p className="text-lg font-medium">{title}</p>
            <p className="text-sm text-muted-foreground">{content || '...'}</p>
        </div>
    )
}

const page = async ({ params }) => {
    const { studyID } = params
    const dicom = await getData(studyID)

    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="h-full">
                <Image src={dicom.imageURL} alt="dicom" width={600} height={600} />
            </div>
            <div>
                <Card className="p-4">
                    <CardContent className="grid gap-4">
                        <Row title="PatientName" content={dicom.PatientName?.Alphabetic} />
                        <Row title="PatientID" content={dicom.PatientID} />
                        <Row title="PatientBirthDate" content={dicom.PatientBirthDate} />
                        <Row title="PatientSex" content={dicom.PatientSex} />
                        <Row title="StudyDate" content={new Date(dicom.StudyDate).toLocaleDateString()} />
                    </CardContent>
                    <CardFooter>
                        <Link href="/" className={cn(buttonVariants(), 'w-full')}>
                            Open the viewer
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default page

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
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
        <div>
            <div className="w-full mb-4">
                <Link href="/image-management" className={buttonVariants({ variant: 'ghost' })}>
                    {'< Back'}
                </Link>
            </div>
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
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger className="text-lg font-medium">Series</AccordionTrigger>
                                    <AccordionContent>
                                        {dicom.series.map(series => {
                                            return (
                                                <div key={series.SeriesInstanceUID} className="mb-4 pb-4 border-b-2">
                                                    <div>SeriesInstanceUID : {series.SeriesInstanceUID}</div>
                                                    <div>Number : {series.Number}</div>
                                                    <div>SeriesDescription : {series.SeriesDescription}</div>
                                                    <div>Modality : {series.Modality}</div>
                                                    <div>Instances : {series.instances.length}</div>
                                                    <Link
                                                        href={`${process.env.BLUELIGHT_URL}?StudyInstanceUID=${dicom.StudyInstanceUID}&SeriesInstanceUID=${series.SeriesInstanceUID}`}
                                                        target="_blank"
                                                        className={cn(
                                                            buttonVariants(),
                                                            'w-full mt-2  bg-slate-900 text-slate-50 hover:bg-slate-800'
                                                        )}
                                                    >
                                                        Open series in viewer
                                                    </Link>
                                                </div>
                                            )
                                        })}
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardContent>
                        <CardFooter>
                            <Link
                                href={`${process.env.BLUELIGHT_URL}?StudyInstanceUID=${dicom.StudyInstanceUID}`}
                                target="_blank"
                                className={cn(buttonVariants(), 'w-full')}
                            >
                                Open the viewer
                            </Link>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default page

import DICOMCard from '@/components/DICOMCard'

const getData = async () => {
    const res = await fetch(process.env.SERVER_URL + '/api/dicom')

    if (!res.ok) throw new Error('Failed to fetch data')

    return res.json()
}
export default async function ImageManagement() {
    const dicoms = await getData()
    return (
        <div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {dicoms.map(dicom => (
                    <DICOMCard key={dicom.StudyInstanceUID} dicom={dicom} />
                ))}
            </div>
        </div>
    )
}

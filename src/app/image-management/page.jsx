import DICOMSearch from '@/components/DICOMSearch'
import DICOMList from '@/components/DICOMList'

const getData = async ({ page = 1, searchQuery }) => {
    'use server'
    const res = await fetch(
        process.env.SERVER_URL +
            '/api/dicom' +
            '?' +
            new URLSearchParams({
                limit: 4,
                page,
                ...searchQuery,
            })
    )

    if (!res.ok) throw new Error('Failed to fetch data')

    return res.json()
}

export default async function ImageManagement() {
    const dicoms = await getData({})
    return (
        <div>
            <DICOMSearch />
            <DICOMList initialDicoms={dicoms} getData={getData} />
        </div>
    )
}

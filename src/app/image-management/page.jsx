import DICOMSearch from '@/components/DICOMSearch'
import DICOMList from '@/components/DICOMList'

const getData = async ({ limit = 4, page = 1, searchQuery }) => {
    'use server'
    const res = await fetch(
        process.env.SERVER_URL +
            '/api/dicom' +
            '?' +
            new URLSearchParams({
                limit,
                page,
                ...searchQuery,
            })
    )

    if (!res.ok) return []

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

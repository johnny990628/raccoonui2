import ImageList from '@/components/ImageList'

const getData = async (page = 1) => {
    'use server'
    const res = await fetch(
        process.env.SERVER_URL +
            '/api/dicom' +
            '?' +
            new URLSearchParams({
                limit: 4,
                page,
            }).toString()
    )

    if (!res.ok) throw new Error('Failed to fetch data')

    return res.json()
}
export default async function ImageManagement() {
    const dicoms = await getData()
    return (
        <div>
            <ImageList initialDicoms={dicoms} getData={getData} />
        </div>
    )
}

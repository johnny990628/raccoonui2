import DICOMCard from '@/components/DICOMCard'
import Image from 'next/image'

export default function ImageManagement() {
    return (
        <div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                <DICOMCard />
                <DICOMCard />
                <DICOMCard />
                <DICOMCard />
                <DICOMCard />
                <DICOMCard />
                <DICOMCard />
            </div>
        </div>
    )
}

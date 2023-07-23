'use client'
import DICOMCard from '@/components/DICOMCard'
import { useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'

export default function ImageList({ initialDicoms, getData }) {
    const fetching = useRef(false)
    const [pages, setPages] = useState([initialDicoms])
    const [hasMore, setHasMore] = useState(true)
    const dicoms = pages.flatMap(page => page)

    const loadMore = async page => {
        if (!fetching.current) {
            try {
                fetching.current = true
                const data = await getData(page)
                if (data.length === 0) setHasMore(false)
                setPages(prev => [...prev, data])
            } finally {
                fetching.current = false
            }
        }
    }

    return (
        <InfiniteScroll
            hasMore={hasMore}
            pageStart={1}
            loadMore={loadMore}
            loader={<span key={0}>Loading ...</span>}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
            {dicoms.map(dicom => (
                <DICOMCard key={dicom.StudyInstanceUID} dicom={dicom} />
            ))}
        </InfiniteScroll>
    )
}

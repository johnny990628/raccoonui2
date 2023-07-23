'use client'
import DICOMCard from '@/components/DICOMCard'
import { useEffect, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { useSelector } from 'react-redux'

export default function ImageList({ initialDicoms, getData }) {
    const fetching = useRef(false)
    const [pages, setPages] = useState([initialDicoms])
    const [hasMore, setHasMore] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)

    const { searchQuery } = useSelector(state => state.dicomSearch)
    const dicoms = pages.flatMap(page => page)

    useEffect(() => {
        fetchData({ page: 1, searchQuery })
    }, [searchQuery])

    const fetchData = async ({ page, searchQuery }) => {
        if (!fetching.current) {
            try {
                fetching.current = true
                const data = await getData({ page, searchQuery })

                if (searchQuery) {
                    setPages(data)
                    setCurrentPage(1)
                } else {
                    setPages(prev => [...prev, data])
                    setCurrentPage(page + 1)
                }
                setHasMore(data.length > 0)
            } finally {
                fetching.current = false
            }
        }
    }

    return (
        <InfiniteScroll
            hasMore={hasMore}
            pageStart={1}
            loadMore={() => fetchData({ page: currentPage + 1 })}
            loader={<span key={0}>Loading ...</span>}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
            {dicoms.map(dicom => (
                <DICOMCard key={dicom.StudyInstanceUID} dicom={dicom} />
            ))}
        </InfiniteScroll>
    )
}

'use client'
import DICOMCard from '@/components/DICOMCard'
import { useEffect, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { useSelector } from 'react-redux'
import { Skeleton } from './ui/skeleton'

export default function ImageList({ initialDicoms, getData }) {
    const [pages, setPages] = useState([initialDicoms])
    const [hasMore, setHasMore] = useState(true)
    const [filteredStudies, setFilteredStudies] = useState([])
    const [error, setError] = useState('')

    const { searchQuery } = useSelector(state => state.dicomSearch)
    const studies = pages.flatMap(page => page)

    useEffect(() => {
        const fetchQueryData = async ({ searchQuery }) => {
            const data = await getData({ limit: 999, searchQuery })
            if (data.length > 0) {
                setError('')
                setFilteredStudies(data)
            } else {
                setError('No results found')
            }
        }
        const isSearchQuery = Object.values(searchQuery).some(v => !!v)

        if (isSearchQuery) {
            fetchQueryData({ searchQuery })
        } else {
            setError('')
            setFilteredStudies([])
        }
    }, [searchQuery])

    const fetchData = async page => {
        const data = await getData({ page })
        setPages(prev => [...prev, data])
        setHasMore(data.length > 0)
    }

    return error ? (
        <div>{error}</div>
    ) : filteredStudies.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredStudies.map(study => (
                <DICOMCard key={study.StudyInstanceUID} dicom={study} />
            ))}
        </div>
    ) : (
        <InfiniteScroll
            hasMore={hasMore}
            pageStart={1}
            loadMore={fetchData}
            loader={<Skeleton className="w-full h-full" />}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
            {studies.map(study => (
                <DICOMCard key={study.StudyInstanceUID} dicom={study} />
            ))}
        </InfiniteScroll>
    )
}

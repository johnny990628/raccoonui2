'use client'
import DICOMCard from '@/components/DICOMCard'
import { useEffect, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { useSelector } from 'react-redux'

export default function ImageList({ initialDicoms, getData }) {
    const fetching = useRef(false)
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
            setFilteredStudies([])
            setError('')
        }
    }, [searchQuery])

    const fetchData = async page => {
        if (!fetching.current) {
            try {
                fetching.current = true
                const data = await getData({ page })
                setPages(prev => [...prev, data])
                setHasMore(data.length > 0)
            } finally {
                fetching.current = false
            }
        }
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
            loader={<span key={0}>Loading ...</span>}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
            {studies.map(study => (
                <DICOMCard key={study.StudyInstanceUID} dicom={study} />
            ))}
        </InfiniteScroll>
    )
}

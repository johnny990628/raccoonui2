import { configureStore } from '@reduxjs/toolkit'
import dicomSearch from './slices/DicomSearch'

export default configureStore({
    reducer: {
        dicomSearch,
    },
    devTools: process.env.NODE_ENV !== 'production',
})

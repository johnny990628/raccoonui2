import { createSlice } from '@reduxjs/toolkit'

const dicomSearchSlice = createSlice({
    name: 'dicomSearch',
    initialState: { searchQuery: {} },
    reducers: {
        updateSearchQuery: (state, action) => {
            state['searchQuery'] = action.payload
        },
    },
})

export const { updateSearchQuery } = dicomSearchSlice.actions

export default dicomSearchSlice.reducer

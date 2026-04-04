import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../services/api'

export const fetchPhotos = createAsyncThunk('photos/fetchPhotos', async () => {
  const response = await api.get('/photos')
  return response.data
})

const photosSlice = createSlice({
  name: 'photos',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotos.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchPhotos.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default photosSlice.reducer

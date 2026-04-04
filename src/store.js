import { configureStore } from '@reduxjs/toolkit'
import postsReducer from './features/posts/postsSlice'
import photosReducer from './features/photos/photosSlice'
import authReducer from './features/authSlice'
import contactReducer from './features/contact/contactSlice'

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    photos: photosReducer,
    auth: authReducer,
    contact: contactReducer,
  },
})

export default store

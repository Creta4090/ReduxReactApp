import { configureStore } from '@reduxjs/toolkit'
import postsReducer from './features/posts/postsSlice'
import photosReducer from './features/photos/photosSlice'
import authReducer from './features/authSlice'
import { graphqlApi } from './features/graphqlApi'

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    photos: photosReducer,
    auth: authReducer,
    [graphqlApi.reducerPath]: graphqlApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(graphqlApi.middleware),
})

export default store

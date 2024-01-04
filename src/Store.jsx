import { configureStore } from '@reduxjs/toolkit'
import BlogSlice from './Blog/BlogSlice'

export default configureStore({
  reducer: { Blog: BlogSlice }
})
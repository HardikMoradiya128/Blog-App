import { createSlice } from '@reduxjs/toolkit'

export const BlogSlice = createSlice({
  name: 'Blog',
  initialState: {
    data: [],
    category: [],
    blogValues: {
      title: '',
      description: '',
      category: '',
      image: null,
    },
    editId: -1
  },
  reducers: {
    setBlog: (state, action) => {
      state.data = action.payload
    },
    setCategory: (state, action) => {
      state.category = action.payload
    },
    editData: (state, action) => {
      console.log(action);
      state.blogValues = action.payload.item
      state.editId = action.payload.id
    },
    seteditId: (state, action) => {
      state.editId = -1
      state.blogValues = {
        title: '',
        description: '',
        category: '',
        image: null,
      }
    },
  }
})


export const { setBlog, setCategory, editData, seteditId } = BlogSlice.actions

export default BlogSlice.reducer
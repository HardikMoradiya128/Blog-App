import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setBlog, seteditId } from './BlogSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const validFileExtensions = { image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'] };

function isValidFileType(fileName, fileType) {
    return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
}

const validationBlog = yup.object({
    title: yup.string()
        .min(2, 'Too Short!')
        .max(70, 'Too Long!')
        .required('UserName is Required'),
    description: yup
        .string('Enter your description')
        .required('Description is required'),
    category: yup.string()
        .required('Category is Required'),
    image: yup
        .mixed()
        .required("Image is Required")
        .test("is-valid-type", "Not a valid image type",
            value => isValidFileType(value && value.name, "image"))
});

function CreateBlog() {
    const navigate = useNavigate()
    const blogValues = useSelector((state) => state.Blog.blogValues)
    const category = useSelector((state) => state.Blog.category)
    const editId = useSelector((state) => state.Blog.editId)
    const dispatch = useDispatch()

    let token = localStorage.getItem('token')
    let author = localStorage.getItem('author')

    const allBlog = async () => {
        try {
            const res = await axios.get("http://localhost:3001/blogall")
            // console.log(res.data.data);
            dispatch(setBlog(res.data.data))
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        allBlog()
    }, [])

    const createPost = async (values) => {
        try {
            let blogForm = new FormData();
            blogForm.append("title", values.title);
            blogForm.append("description", values.description);
            blogForm.append("category", values.category);
            blogForm.append("image", values.image);
            blogForm.append("author", author);

            const res = await axios.post("http://localhost:3001/blogadd", blogForm, {
                headers: { "Content-Type": "multipart/form-data", token: token }
            })
            console.log(res);
            toast.success(res.data.message, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setTimeout(() => {
                navigate('/')
            }, 2000)
            allBlog()
        } catch (error) {
            console.log(error);
            toast.error(error.message, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const updateBlog = async (values) => {
        try {
            let blogForm = new FormData();
            blogForm.append("id", values._id);
            blogForm.append("title", values.title);
            blogForm.append("description", values.description);
            blogForm.append("category", values.category);
            blogForm.append("image", values.image);
            blogForm.append("author", author);

            const res = await axios.put("http://localhost:3001/blogupdate", blogForm, {
                headers: { "Content-Type": "multipart/form-data", token: token }
            })
            console.log(res);
            setTimeout(() => {
                navigate('/myblog')
            }, 2000)
            allBlog()
            toast.success(res.data.message, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } catch (error) {
            console.log(error);
            toast.error(error.message, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const formik = useFormik({
        initialValues: blogValues,
        validationSchema: validationBlog,
        onSubmit: async (values, action) => {
            console.log(values);
            if (editId == -1) {
                await createPost(values)
            } else {
                await updateBlog(values)
            }
            dispatch(seteditId())
            // console.log(seteditId());
            action.resetForm()
        },
    });


    return (
        <div>{
            token ?
                <>
                    <div className='Create flex justify-center'>
                        <div className='flex justify-center items-center flex-col text-center bg-slate-200 rounded-xl shadow-lg shadow-slate-950 p-7 max-w-sm'>
                            {
                                editId == -1 ? <h4 className='text-sky-950 text-2xl font-bold underline'>Create Blog</h4>
                                    : <h4 className='text-sky-950 text-2xl font-bold underline'>Update Blog</h4>
                            }
                            <div className='Create_Blog'>
                                <form onSubmit={formik.handleSubmit}>
                                    <TextField
                                        id="title"
                                        name="title"
                                        label="Blog Title"
                                        type="title"
                                        variant="filled"
                                        value={formik.values.title}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.title && Boolean(formik.errors.title)}
                                        helperText={formik.touched.title && formik.errors.title}
                                        className='mt-5 w-80'
                                    />
                                    <TextField
                                        id="description"
                                        name="description"
                                        type="description"
                                        variant="filled"
                                        label="Description"
                                        multiline
                                        rows={4}
                                        defaultValue="Default Value"
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.description && Boolean(formik.errors.description)}
                                        helperText={formik.touched.description && formik.errors.description}
                                        className='mt-5 w-80'
                                    />
                                    <TextField
                                        id="filled-select-category"
                                        select
                                        name="category"
                                        label="Select Category"
                                        value={formik.values.category}
                                        onChange={(event) => formik.setFieldValue("category", event.target.value)}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.category && Boolean(formik.errors.category)}
                                        helperText={formik.touched.category && formik.errors.category}
                                        variant="filled"
                                        className='mt-5 w-80 text-left'
                                    >
                                        {
                                            category.map((option) => (
                                                <MenuItem key={option._id} value={option._id}>
                                                    {option.name}
                                                </MenuItem>
                                            ))
                                        }
                                    </TextField>
                                    <TextField
                                        id="image"
                                        name="image"
                                        type="file"
                                        // value={formik.values.image}
                                        onChange={(event) => formik.setFieldValue("image", event.target.files[0])}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.image && Boolean(formik.errors.image)}
                                        helperText={formik.touched.image && formik.errors.image}
                                        className='mt-5 w-80'
                                    />
                                    <br />
                                    {
                                        editId == -1 ? <Button className='bg-sky-950 hover:bg-sky-900 m-6 py-2.5 px-10' variant="contained" type="submit">Submit</Button>
                                            : <Button className='bg-sky-950 hover:bg-sky-900 m-6 py-2.5 px-10' variant="contained" type="submit">Update</Button>
                                    }
                                </form>
                            </div>
                        </div>
                    </div>
                </>
                :
                <>
                    <div className='flex justify-center items-center pt-48'>
                        <div className='bg-gray-300 h-40 w-96 rounded-xl flex justify-center items-center flex-col'>
                            <p className='text-xl font-semibold my-5'>Please Login To Continue</p>
                            <Button className='bg-sky-900 hover:bg-sky-800 text-white px-4 py-2' onClick={() => navigate('/login')}>Login Here</Button>
                        </div>
                    </div>
                </>
        }
            <ToastContainer />
        </div >
    )
}

export default CreateBlog


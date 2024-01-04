import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setBlog } from './BlogSlice';
import Blog from './Blog';


function BlogCard() {
    const data = useSelector((state) => state.Blog.data)
    const dispatch = useDispatch()

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
    

    return (
        <div>
            <div className="container mx-auto">
            <h2 className='text-3xl font-medium my-4'>Blogs</h2>
                <div className="grid grid-cols-3 gap-8">
                    {
                        data.slice(0).reverse().map((list) => {
                            return <Blog list={list} />
                        })
                    }
                </div>
            </div>
        </div >
    )
}

export default BlogCard

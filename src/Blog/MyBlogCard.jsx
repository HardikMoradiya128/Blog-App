import React from 'react'
import { useSelector } from 'react-redux'

import MyBlog from './MyBlog'

const MyBlogCard = () => {
    let author = localStorage.getItem('author')
    const data = useSelector((state) => state.Blog.data)

    const filterMyBlog = data.filter((el) => {
        return author === el.author._id
    })

    return (
        <div>
            <div className="container mx-auto">
                <h2 className='text-3xl font-medium my-4'>MyBlogs</h2>
                <div className="grid grid-cols-3 gap-8">
                    {
                        filterMyBlog.slice(0).reverse().map((item) => {
                            return <MyBlog item={item} />
                        })
                    }
                </div>
            </div>
        </div >
    )
}

export default MyBlogCard

import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import DetailCard from './DetailCard'

const BlogDetail = () => {
    const params = useParams()
    const blogDetail = useSelector((state) => state.Blog.data)

    // console.log(blogDetail);

    const filterBlog = blogDetail.filter((el) => {
        return el._id === params.id
    })

    return (
        <div>
            <div className='container mx-auto'>
                <div className='BlogDetails'>
                    {
                        filterBlog.map((item, index) => {
                            return <DetailCard item={item} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default BlogDetail

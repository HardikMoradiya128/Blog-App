import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import CategoryCard from './CategoryCard'
import Blog from './Blog'

const BlogCategory = () => {
    const params = useParams()
    const catedata = useSelector((state) => state.Blog.data)

    const filterCategory = catedata.filter((el) => {
        return el.category.name === params.name
    })
    // console.log(filterCategory);
    return (
        <div>
            <div className='container mx-auto'>
                <CategoryCard />
                <h2 className='text-2xl font-medium underline my-8'>{params.name} Blog</h2>
                <div className='blogCategory'>
                    <div className="grid grid-cols-3 gap-8">
                        {
                            filterCategory.length > 0 ?
                                filterCategory.reverse().map((list, index) => {
                                    return <Blog list={list} />
                                }) :
                                <>
                                    <div>
                                        <div className='text-xl font-semibold'>
                                            <h2>No blogs available in this category.</h2>
                                        </div>
                                    </div>
                                </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogCategory

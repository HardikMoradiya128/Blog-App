import React from 'react'

const DetailCard = ({ item }) => {

    return (
        <div>
            <div className='container'>
                <div className='max-w-4xl mx-auto w-full'>
                    <div className="Blog_Detail">
                        <div className='Detail_title text-3xl font-semibold pt-4'>
                            {item.title}
                        </div>
                        <div className='Detail_img'>
                            <img src={`http://localhost:3001/images/${item.image}`} alt="" className='h-96 w-full mt-5' />
                        </div>
                        <div className='flex justify-between mt-6'>
                            <div className='Detail_category text-base font-semibold font-serif bg-slate-300 inline-block rounded-full py-1 px-3'>
                                {item.category.name}
                            </div>
                            <div className='text-base font-semibold font-serif bg-slate-300 inline-block rounded-full py-1 px-3'>
                                {item.author.username}
                            </div>
                        </div>
                        <div className='Detail_desc text-lg text-gray-700 font-normal break-all mt-5 '>
                            {item.description}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailCard

import React from 'react'
import { useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setCategory } from './BlogSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';


const CategoryCard = () => {
  const category = useSelector((state) => state.Blog.category)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const allData = async () => {
    const res = await axios.get("http://localhost:3001/alldata")
    // console.log(res.data.data[3].name)
    dispatch(setCategory(res.data.data))
    // console.log(item);
  }

  useEffect(() => {
    allData()
  }, [])

  const gotoCategory = (category) => {
    navigate('/category/' + category.name)
  }

  return (
    <div>
      <div className='container mx-auto'>
        <div className='text-3xl font-medium py-6'>Categories</div>
        <Swiper
          spaceBetween={40}
          slidesPerView={4}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {
            category.map((cate) => {
              return (
                <div>
                  <SwiperSlide>
                    <div className='category reletive h-fit group' onClick={() => gotoCategory(cate)}>
                      <img src={`http://localhost:3001/images/${cate.image}`} alt="" className='h-56 w-72 rounded-xl' />
                      <div className='absolute h-56 w-72 bg-black/20 flex items-center justify-center -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-400 rounded-xl'>
                        <h3 className='bg-white/80 text-black text-2xl font-semibold rounded-xl py-2 px-4 cursor-pointer'>{cate.name}</h3>
                      </div>
                    </div>
                  </SwiperSlide>
                </div>
              )
            })
          }
        </Swiper>
      </div>
    </div>
  )
}

export default CategoryCard

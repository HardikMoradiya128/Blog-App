import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { blueGrey } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { editData } from './BlogSlice';
import { useDispatch } from 'react-redux';
import { setBlog } from './BlogSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyBlog = ({ item }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const gotoBlog = () => {
        navigate('/blog/' + item._id)
    }

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

    const deleteBlog = async (item) => {
        try {
            let token = localStorage.getItem('token')
            const res = await axios.delete(`http://localhost:3001/blogdelete/?id=${item._id}`, {
                headers: { token: token }
            })
            console.log(res.data);
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

    const editBlog = () => {
        navigate('/createblog')
        dispatch(editData({ item: item, id: item._id }))
    }

    return (
        <div>
            <div className="container pt-4 pb-10">
                <div className="MyBlog_Card">
                    <Card className='bg-gray-100 rounded-xl p-2 h-[35rem] hover:-translate-y-3 transition duration-300 ease-in-out'>
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            className='h-64 object-cover rounded-xl'
                            image={`http://localhost:3001/images/${item.image}`}
                        />
                        <CardContent>
                            <Typography variant="body2" className='text-base font-semibold font-serif bg-slate-300 inline-block py-1 px-3 rounded-full'>
                                {item.category.name}
                            </Typography>
                            <Typography gutterBottom variant="h6" component="div" className='font-bold font-sans my-1 cursor-pointer hover:text-sky-900' onClick={gotoBlog}>
                                {item.title}
                            </Typography>
                            <Typography variant="body2" component="div" className='text-lg font-sans break-all line-clamp-3'>
                                {item.description}
                            </Typography>
                            <Typography>
                                <Button size="small" className='bg-sky-900 hover:bg-sky-800 text-white py-2 px-4 mt-4' onClick={gotoBlog}>Read More</Button>
                            </Typography>
                        </CardContent>
                        <CardContent className='flex justify-between p-0' >
                            <CardActions>
                                <Avatar sx={{ bgcolor: blueGrey[800] }}>{item.author.username.substring(0, 1)}</Avatar>
                                <Typography variant="body2" className='text-base font-semibold font-serif bg-slate-300 inline-block py-1 px-3 ms-3 rounded-full'>
                                    {item.author.username}
                                </Typography>
                            </CardActions>
                            <CardActions>
                                <ModeEditIcon onClick={() => editBlog()} className='text-sky-800 me-4' />
                                <DeleteIcon onClick={() => deleteBlog(item)} className='text-red-800' />
                            </CardActions>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default MyBlog

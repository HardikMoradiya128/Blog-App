import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { blueGrey } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

const Blog = ({ list }) => {
    const navigate = useNavigate()

    const gotoBlog = () => {
        navigate('/blog/' + list._id)
    }

    return (
        <div>
            <div className="container pb-10">
                <div className="Blog_Card">
                    <Card className='bg-gray-100 rounded-xl p-2 h-[35rem] hover:-translate-y-3 transition duration-300 ease-in-out'>
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            className='h-64 object-cover rounded-xl'
                            image={`http://localhost:3001/images/${list.image}`}
                        />
                        <CardContent>
                            <Typography variant="body2" className='text-base font-semibold font-serif bg-slate-300 inline-block py-1 px-3 rounded-full'>
                                {list.category.name}
                            </Typography>
                            <Typography gutterBottom variant="h6" component="div" className='font-bold font-sans my-1 cursor-pointer hover:text-sky-900' onClick={gotoBlog}>
                                {list.title}
                            </Typography>
                            <Typography variant="body2" component="div" className='text-lg font-sans break-all line-clamp-3'>
                                {list.description}
                            </Typography>
                            <Typography>
                                <Button size="small" className='bg-sky-900 hover:bg-sky-800 text-white py-2 px-4 mt-3' onClick={gotoBlog}>Read More</Button>
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Avatar sx={{ bgcolor: blueGrey[800] }}>{list.author.username.substring(0, 1)}</Avatar>
                            <Typography variant="body2" className='text-base font-semibold font-serif bg-slate-300 inline-block py-1 px-3 ms-3 rounded-full'>
                                {list.author.username}
                            </Typography>
                        </CardActions>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Blog

import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import GoogleIcon from '@mui/icons-material/Google';

const Footer = () => {
    return (
        <div className='conatiner'>
            <div className='bg-black p-7'>
                <div className='text-white flex justify-between'>
                    <p>Copyright 2023 | All Right Resereved.</p>
                    <div className='Icon'>
                        <FacebookIcon className='bg-gray-600 rounded me-4 text-3xl p-1 hover:bg-gray-800 transition duration-600' />
                        <InstagramIcon className='bg-gray-500 rounded me-4 text-3xl p-1 hover:bg-gray-800 transition duration-600' />
                        <YouTubeIcon className='bg-gray-500 rounded me-4 text-3xl p-1 hover:bg-gray-800 transition duration-600' />
                        <GoogleIcon className='bg-gray-500 rounded me-4 text-3xl p-1 hover:bg-gray-800 transition duration-600' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer

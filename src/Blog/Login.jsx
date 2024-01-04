import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import IconButton from '@mui/material/IconButton';
import { Link, useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';


const validationSchema = yup.object({
    username: yup.string()
        .min(2, 'Too Short!')
        .max(70, 'Too Long!')
        .required('UserName is Required'),
    password: yup
        .string('Enter your password')
        .min(6, 'Password should be of minimum 6 characters length')
        .required('Password is required'),
});

function Login() {
    const navigate = useNavigate()

    const [login, setLogin] = useState({
        username: '',
        password: ''
    })

    const LoginUser = async (values) => {
        try {
            const res = await axios.post('http://localhost:3001/login', values)
            // console.log(res.data.token);
            navigate('/')
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('author', res.data.data._id)
        } catch (error) {
            console.log(error);
        }
    }

    const formik = useFormik({
        initialValues: login,
        validationSchema: validationSchema,
        onSubmit: async (values, action) => {
            console.log(values);
            await LoginUser(values)
            action.resetForm()
            setLogin({
                username: '',
                password: ''
            })
        },
    });

    const [showPassword, setShowPassword] = useState(false)
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div>
            <div className='Login flex justify-center'>
                <div className='LR_Card flex justify-center items-center flex-col text-center bg-slate-200 rounded-xl shadow-lg shadow-slate-950 p-20 max-w-sm'>
                    <h4 className='text-sky-950 text-2xl font-bold underline'>Login</h4>
                    <div className='L_Input'>
                        <form onSubmit={formik.handleSubmit}>
                            <TextField
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle />
                                        </InputAdornment>
                                    ),
                                }}
                                InputLabelProps={{
                                    style: { color: '#000' },
                                }}
                                id="username"
                                name="username"
                                label="UserName"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.username && Boolean(formik.errors.username)}
                                helperText={formik.touched.username && formik.errors.username}
                                className='mt-5 w-80'
                            />
                            <TextField
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon />
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                                className='absolute right-4'
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                InputLabelProps={{
                                    style: { color: '#000' },
                                }}
                                id="password"
                                name="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                                className='mt-5 w-80'
                            />
                            <div className='mt-6 text-black'>
                                <Link>Forget Password ?</Link>
                            </div>
                            <Button className='bg-sky-950 hover:bg-sky-900 m-6 py-2.5 px-10' variant="contained" type="submit">
                                Login
                            </Button>
                            <p className='font-medium'>Don't have an account ? <span className='cursor-pointer text-sky-950 font-bold' onClick={() => navigate('/signUp')}>SignUp</span></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login

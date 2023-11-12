import React, { useState, useEffect } from 'react';
import '../../../reusable.css'
import './Login.css'
import logo from '../../../img/logo.png'
import loginValidation from '../../../services/loginValidation';
import { jwtDecode } from "jwt-decode";
import { useNavigate, Link } from 'react-router-dom';
import auth from '../../../api/auth.api';

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({})
    const [serverError, setServerError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const isAuth = localStorage.getItem('oAuthEcommerceLogin')
        if (isAuth !== null) {
            const decoded = jwtDecode(isAuth)
            if(decoded.id)
            navigate("/")
        }
    }, [navigate]);

    const handleInput = (e) => {
        const newObj = { ...values, [e.target.name]: e.target.value }
        setValues(newObj)
    }

    const handleValidation = (e) => {
        e.preventDefault()
        setErrors(loginValidation(values))
        if (JSON.stringify(loginValidation(values)) === '{}') {
            auth('signIn', values, navigate, setServerError, setLoading)
        }
    }

    return (
        <section className='d-flex justify-content-center flex-direction-column align-items-center h-100vh'>
            <img src={logo} className='login-logo' alt="logo" />
            <div className="login-option d-flex">
                <Link to={'/register'}><p>تسجيل</p></Link>
                <p>تسجيل الدخول</p>
            </div>
            {(serverError === '') ? '' : <p className='server-error'>{serverError}</p>}
            <form className='d-flex flex-direction-column' onSubmit={handleValidation}>
            <input type="email" className='input-form' placeholder='البريد الالكتروني' name='email' onChange={handleInput} />
            {errors.email && <p className='error'>{errors.email}</p>}
            <input type="password" className='input-form' placeholder='كلمة السر' name='password' onChange={handleInput} />
            {errors.password && <p className='error'>{errors.password}</p>}
            <Link to={'/senderResetPassword'}><p className='forget-password'>نسيت كلمه السر ؟</p></Link> 
            <button className={`login-button main-font ${(loading) ? 'loader-button' : ''}`}>{(loading) ? <span className="loader"></span> : 'تسجيل الدخول'}</button>
            </form>
        </section>
    );
}

export default Login;

import React, { useState, useEffect } from 'react';
import '../../../reusable.css'
import './Register.css'
import logo from '../../../img/logo.png'
import registerValidation from '../../../services/registerValidation';
import { jwtDecode } from "jwt-decode";
import { useNavigate, Link } from 'react-router-dom';
import auth from '../../../api/auth.api';

const Register = () => {
    const [values, setValues] = useState({
        userName: '',
        email: '',
        password: '',
        cPassword: ''
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
        setErrors(registerValidation(values))
        if (JSON.stringify(registerValidation(values)) === '{}') {
            auth('signUp', values, navigate, setServerError, setLoading)
        }
    }

    return (
        <section className='d-flex justify-content-center flex-direction-column align-items-center h-100vh'>
            <img src={logo} className='register-logo' alt="logo" />
            <div className="register-option d-flex">
                <p className='first-option'>تسجيل</p>
                <Link to={'/login'}><p className='second-option'>تسجيل الدخول</p></Link>
            </div>
            {(serverError === '') ? '' : <p className='server-error'>{serverError}</p>}
            <form className='d-flex flex-direction-column' onSubmit={handleValidation}>
                <input type="text" className='input-form' placeholder='اسم المستخدم' name='userName' onChange={handleInput} />
                {errors.userName && <p className='error'>{errors.userName}</p>}
                <input type="email" className='input-form' placeholder='البريد الالكتروني' name='email' onChange={handleInput} />
                {errors.email && <p className='error'>{errors.email}</p>}
                <input type="password" className='input-form' placeholder='كلمة السر' name='password' onChange={handleInput} />
                {errors.password && <p className='error'>{errors.password}</p>}
                <input type="password" className='input-form' placeholder='اعاده كلمه السر' name='cPassword' onChange={handleInput} />
                {errors.cPassword && <p className='error'>{errors.cPassword}</p>}
                <button className={`register-button main-font ${(loading) ? 'loader-button' : ''}`}>{(loading) ? <span className="loader"></span> : 'انشاء حساب'}</button>
            </form>
        </section>
    );
}

export default Register;
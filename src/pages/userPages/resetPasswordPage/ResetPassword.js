import React, { useState, useEffect } from 'react';
import '../../../reusable.css'
import './ResetPassword.css'
import logo from '../../../img/logo.png'
import resetPasswordValidation from '../../../services/resetPasswordValidation';
import { jwtDecode } from "jwt-decode";
import { useNavigate, useParams } from 'react-router-dom';
import resetPassword from '../../../api/resetPassword.api';

const ResetPassword = () => {
    const [values, setValues] = useState({
        password: '',
        cPassword: ''
    })
    const [errors, setErrors] = useState({})
    const [serverError, setServerError] = useState('')
    const [loading, setLoading] = useState(false)
    const { userToken } = useParams()
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

    const updatePassword = (e) => {
        e.preventDefault()
        setErrors(resetPasswordValidation(values))
        if (JSON.stringify(resetPasswordValidation(values)) === '{}') {
            resetPassword(userToken, values, navigate, setServerError, setLoading)
        }
    }

    return (
        <section className='d-flex justify-content-center flex-direction-column align-items-center h-100vh'>
            <img src={logo} className='register-logo' alt="logo" />
            {(serverError === '') ? '' : <p className='server-error'>{serverError}</p>}
            <form className='d-flex flex-direction-column' onSubmit={updatePassword}>
                <input type="password" className='input-form' placeholder='كلمة السر' name='password' onChange={handleInput} />
                {errors.password && <p className='error'>{errors.password}</p>}
                <input type="password" className='input-form' placeholder='اعاده كلمه السر' name='cPassword' onChange={handleInput} />
                {errors.cPassword && <p className='error'>{errors.cPassword}</p>}
                <button className={`register-button main-font ${(loading) ? 'loader-button' : ''}`}>{(loading) ? <span className="loader"></span> : 'انشاء حساب'}</button>
            </form>
        </section>
    );
}

export default ResetPassword;

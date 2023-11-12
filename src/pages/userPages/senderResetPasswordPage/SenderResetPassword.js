import React, { useState, useEffect } from 'react';
import '../../../reusable.css'
import './SenderResetPassword.css'
import logo from '../../../img/logo.png'
import senderValidation from '../../../services/senderResetValidation';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import senderReset from '../../../api/senderReset.api';

const SenderResetPassword = () => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState(null)
    const [resetDone, setResetDone] = useState(null)
    const [serverError, setServerError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const isAuth = localStorage.getItem('oAuthEcommerceLogin')
        if (isAuth !== null) {
            const decoded = jwtDecode(isAuth)
            if (decoded.id)
                navigate("/")
        }
    }, [navigate]);

    const sendResetPassword = (e) => {
        e.preventDefault()
        setError(senderValidation(email))
        if (senderValidation(email) === '') {
            senderReset(email, setResetDone, setServerError, setLoading)
        }
    }

    return (
        <section className='d-flex justify-content-center flex-direction-column align-items-center h-100vh'>
            <img src={logo} className='resrt-password-logo' alt="logo" />
            <p className='reset-password-title'>أعادة ضبط كلمة السر الخاصة بك</p>
            {(serverError === '') ? '' : <p className='server-error'>{serverError}</p>}
            {resetDone && <div className="reset-done d-flex align-items-center">
                <i class="fa fa-check" aria-hidden="true"></i>
                <p>{resetDone}</p>
            </div>}
            <form className='d-flex flex-direction-column' onSubmit={sendResetPassword}>
                <input type="email" className='input-form' placeholder='البريد الالكتروني' name='email' onChange={(e) => setEmail(e.target.value)} />
                {error && <p className='error'>{error}</p>}
                <button className={`resrt-password-button main-font ${(loading) ? 'loader-button' : ''}`}>{(loading) ? <span className="loader"></span> : 'استمرار'}</button>
            </form>
        </section>
    );
}

export default SenderResetPassword;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import verify from '../../../api/confirmed.api';
import '../../../reusable.css'
import './Confirmed.css'

const Confirmed = () => {
    const [loading, setLoading] = useState(true)
    const [serverError, setServerError] = useState(null)
    const { userToken } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        verifyAccount()
    });

    const verifyAccount = async () => {
        await verify(userToken, setServerError, setLoading, navigate)
    }

    if (loading) return (<div className='confirmed-login d-flex justify-content-center flex-direction-column align-items-center'><p>جاري توثيق الحساب الخاص بك</p><span className="confirmed-loader"></span></div>)

    return (
        <div className='confirmed-error d-flex justify-content-center flex-direction-column align-items-center'>
            <p>x</p>
            <p>{serverError}</p>
        </div>
    )


}

export default Confirmed;

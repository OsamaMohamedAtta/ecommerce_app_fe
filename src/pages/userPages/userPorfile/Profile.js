import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/navbar/Navbar';
import { jwtDecode } from "jwt-decode";
import { useNavigate, Link } from 'react-router-dom';
import getUserData from '../../../api/getUserData.api';
import updatePicUser from '../../../api/updatePicUser.api';
import '../../../reusable.css'
import './Profile.css'

const Profile = () => {
    const [userData, setUserData] = useState({})
    const [serverError, setServerError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [uploadPicLoading, setUploadPicLoading] = useState(false)
    const [uploadPicError, setUploadPicError] = useState(null)
    const [file, setFile] = useState()
    const [preview, setPreview] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        const isAuth = localStorage.getItem('oAuthEcommerceLogin')
        if (isAuth !== null) {
            const decoded = jwtDecode(isAuth)
            if (decoded.id === undefined) {
                navigate("/")
            } else {
                getAllUserData(decoded.id)
            }
        } else {
            navigate("/")
        }
    }, [navigate]);

    useEffect(() => {
        if (!file) {
            setPreview(undefined)
            return
        }

        const picUrl = URL.createObjectURL(file)
        setPreview(picUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(picUrl)
    }, [file])

    const getAllUserData = (userID) => {
        getUserData(userID, setUserData, setServerError, setLoading)
    }

    const showProfilePopup = () => {
        document.querySelector('.profile-popup').classList.add('d-flex')
    }

    const closeProfilePopup = () => {
        document.querySelector('.profile-popup').classList.remove('d-flex')
    }

    const logOut = () => {
        localStorage.removeItem('oAuthEcommerceLogin')
    }

    const uploadPic = () => {
        const formData = new FormData()
        formData.append('image', file)
        const userToken = localStorage.getItem('oAuthEcommerceLogin')
        if (userToken !== null)
            updatePicUser(userToken, formData, setUploadPicError, setUploadPicLoading)
    }

    if (loading) return (<div className='h-100vh bg-color'><Navbar /> <div className='d-flex justify-content-center'><span className="profile-loader"></span></div></div>)
    if (serverError) return (<div className='h-100vh bg-color'><Navbar /> <div className='d-flex justify-content-center'><span className="profile-error">{serverError}</span></div></div>)

    return (
        <>
            <Navbar />
            <section className='profile-section d-flex justify-content-center flex-direction-column align-items-center h-100vh bg-color'>
                <div className='profile-img'>
                    <img src={userData.picURL} alt="user-img" />
                    <i className="fa fa-camera" aria-hidden="true" onClick={showProfilePopup}></i>
                </div>
                <p>{userData.userName}</p>
                <p>{userData.email}</p>
                <span></span>
                <div className='user-setting d-flex align-items-center justify-content-space-between'>
                    <div className='d-flex align-items-center'>
                        <i className="fa fa-list-alt" aria-hidden="true"></i>
                        <p>طلباتي</p>
                    </div>
                    <i className="fa fa-angle-left" aria-hidden="true"></i>
                </div>
                <div className='user-setting d-flex align-items-center justify-content-space-between'>
                    <div className='d-flex align-items-center'>
                        <i className="fa fa-heart-o" aria-hidden="true"></i>
                        <Link to={'/favorite'}><p>المنتجات المفضلة</p></Link>
                    </div>
                    <i className="fa fa-angle-left" aria-hidden="true"></i>
                </div>
                <div className='user-setting d-flex align-items-center justify-content-space-between'>
                    <div className='d-flex align-items-center'>
                        <i className="fa fa-shopping-basket" aria-hidden="true"></i>
                        <Link to={'/cart'}><p>المنتجات في السلة</p></Link>
                    </div>
                    <i className="fa fa-angle-left" aria-hidden="true"></i>
                </div>
                <div className='user-setting d-flex align-items-center justify-content-space-between'>
                    <div className='d-flex align-items-center'>
                        <i className="fa fa-sign-out" aria-hidden="true"></i>
                        <Link to={'/'}><p onClick={logOut}>تسجيل الخروج</p></Link>
                    </div>
                    <i className="fa fa-angle-left" aria-hidden="true"></i>
                </div>
            </section>
            <div className="profile-popup d-none align-items-center justify-content-center">
                <div className="inside-popup d-flex align-items-center flex-direction-column">
                    <p className='close-popup' onClick={closeProfilePopup}>x</p>
                    <p>تعديل صورة الملف الشخصي</p>
                    {(uploadPicError) ? <p>{uploadPicError}</p> : null}
                    {(file) ? <img src={preview} alt="preview-img" /> : <i className="fa fa-camera" aria-hidden="true"></i>}
                    <label htmlFor="inputField">اختيار الصورة</label>
                    <input type="file" id="inputField" accept='.png, .jpg, .jpeg' onChange={(e) => setFile(e.target.files[0])} />
                    <button type='button' onClick={uploadPic}>تعديل الصورة</button>
                    {(uploadPicLoading) ? <div className="loading-upload-pic d-flex align-items-center justify-content-center"><span className="profile-loader"></span></div> : null}
                </div>
            </div>
        </>
    );
}

export default Profile;

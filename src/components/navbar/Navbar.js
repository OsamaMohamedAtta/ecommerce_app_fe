import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import getUserInfo from '../../api/getUserInfo.api';
import logo from '../../img/logo.png'
import defaultUserImg from '../../img/default-user-img.png'
import '../../reusable.css'
import './Navbar.css'

const Navbar = () => {

    let [slide, setSlide] = useState(0)
    let [lastScrollY, setLastScrollY] = useState(0)
    const [loading, setLoading] = useState(false)
    const [userFound, setUserFound] = useState(false)
    const [userPic, setUserPic] = useState(null)

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
    });

    useEffect(() => {
        const isAuth = localStorage.getItem('oAuthEcommerceLogin')
        if (isAuth !== null) {
            const decoded = jwtDecode(isAuth)
            if (decoded.id) {
                userFounded()
                userInfo(decoded.id)
            }
        }
    },[]);

    const userInfo = (userID) => {
        getUserInfo(userID, setUserPic, setLoading)
    }

    const userFounded = () => {
        setUserFound(true)
    }

    const handleScroll = () => {
        const currentScrollY = window.scrollY
        if (currentScrollY > lastScrollY) {
            setSlide('-125px')
        } else {
            setSlide('0px')
        }
        setLastScrollY(currentScrollY)
    }

    return (
        <>
            <nav style={{
                transform: `translate(0, ${slide})`,
                transition: 'transform 0.2s linear'
            }}>
                <div className="nav-container d-flex justify-content-space-between align-items-center">
                    <img src={logo} className='nav-logo' alt="ecommerce-logo" />
                    <div className="search d-flex align-items-center">
                        <input type="text" placeholder='ابحث في العديد من المنتجات' />
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </div>
                    <div className="nav-icon d-flex justify-content-space-between align-items-center">
                        <Link to={'/cart'}><i className="fa fa-shopping-basket" aria-hidden="true"></i></Link>
                        <Link to={'/favorite'}><i className="fa fa-heart-o" aria-hidden="true"></i></Link>
                        {(userFound) ? null : <Link to={'/login'}><i className="fa fa-user-o" aria-hidden="true"></i></Link>}
                        {(loading) ? <img src={defaultUserImg} alt="default-user-img" /> : (userFound) ? <Link to={'/profile'}><img src={userPic} alt="user-img" /></Link> : null }
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;

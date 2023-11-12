import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/navbar/Navbar';
import homeBanner from '../../../img/online-shopping-banner.jpg'
import slideBanner from '../../../img/slide-banner.jpg'
import firstMobileBanner from '../../../img/first-mobile-banner.jpg'
import secondMobileBanner from '../../../img/second-mobile-banner.jpg'
import getAllProduct from '../../../api/getAllProduct.api';
import '../../../reusable.css'
import './Home.css'

const Home = () => {
    const [productData, setProductData] = useState([])
    const [serverError, setServerError] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getProduct()
    }, []);

    const getProduct = async () => {
        await getAllProduct(1, setProductData, setServerError, setLoading)
    }

    
    return (
        <>
            <Navbar />
            <header className='bg-color'>
                <div className='home-container d-flex justify-content-space-between align-items-center'>
                    <div className="home-banner">
                        <div className="banner-header d-flex justify-content-space-between align-items-center">
                            <div className='d-flex align-items-center'>
                                <p>خدمة عملاء 24/7</p>
                                <i className="fa fa-headphones" aria-hidden="true"></i>
                            </div>
                            <div className='d-flex align-items-center'>
                                <p>ضمان استرداد المبلغ</p>
                                <i className="fa fa-usd" aria-hidden="true"></i>
                            </div>
                            <div className='d-flex align-items-center'>
                                <p>طرق دفع امنة وموثوقة</p>
                                <i className="fa fa-check" aria-hidden="true"></i>
                            </div>
                        </div>
                        <div className="banner-mobile-header">
                            <span>خدمة عملاء 24/7 <i className="fa fa-headphones" aria-hidden="true"></i> &nbsp;&nbsp;ضمان استرداد المبلغ <i className="fa fa-usd" aria-hidden="true"></i> &nbsp;&nbsp;طرق دفع امنة وموثوقة <i className="fa fa-check" aria-hidden="true"></i></span>
                        </div>
                        <div className="mobile-banner-img d-flex justify-content-space-between align-items-center">
                            <img src={firstMobileBanner} alt="first-mobile-banner" />
                            <img src={secondMobileBanner} alt="second-mobile-banner" />
                        </div>
                        <img src={homeBanner} className='img-banner' alt="home-banner" />
                    </div>
                    <img src={slideBanner} className='img-slide-banner' alt="slide-banner" />
                </div>
                <pre>{productData[0]?.desc}</pre>
            </header>
        </>
    );
}

export default Home;

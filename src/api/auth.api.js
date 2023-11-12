const URL = 'http://localhost:8888/auth/'

const auth = (endPoint, userData, navigate, setServerError, setLoading) => {
    setLoading(true)
    fetch(`${URL}${endPoint}`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    })
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.message === 'success') {
                if (endPoint === 'signUp') {
                    navigate('/login')
                } else {
                    localStorage.setItem('oAuthEcommerceLogin', responseJson.userToken)
                    navigate('/')
                }
            } else {
                setServerError(responseJson.message)
                setLoading(false)
            }
        })
        .catch((error) => {
            setServerError(error.message)
            setLoading(false)
        });
}

export default auth;

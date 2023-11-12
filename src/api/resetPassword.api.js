const URL = 'http://localhost:8888/user/resetPassword/'

const resetPassword = (userToken, userData, navigate, setServerError, setLoading) => {
    setLoading(true)
    fetch(`${URL}${userToken}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    })
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.message === 'success') {
                navigate('/login')
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

export default resetPassword;

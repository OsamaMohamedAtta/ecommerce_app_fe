const URL = 'http://localhost:8888/user/confirmed/'

const verify = (userToken, setServerError, setLoading, navigate) => {
    fetch(`${URL}${userToken}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
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

export default verify;

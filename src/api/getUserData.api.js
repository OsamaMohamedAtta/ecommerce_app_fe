const URL = 'http://localhost:8888/user/getUserInfo/'

const getUserData = (userID, setUserData, setServerError, setLoading) => {
    fetch(`${URL}${userID}`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
    })
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.message === 'success') {
                setUserData(responseJson.userData)
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

export default getUserData;

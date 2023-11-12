const URL = 'http://localhost:8888/user/getUserInfo/'

const getUserInfo = (userID, setUserPic, setLoading) => {
    setLoading(true)
    fetch(`${URL}${userID}`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
    })
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.message === 'success') {
                setUserPic(responseJson.userData.picURL)
                setLoading(false)
            }
        })
}

export default getUserInfo;

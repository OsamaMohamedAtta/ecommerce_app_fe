const URL = 'http://localhost:8888/user/updateProfilePic'

const updatePicUser = (userToken, formData, setUploadPicError, setUploadPicLoading) => {
    setUploadPicLoading(true)
    fetch(`${URL}`, {
        method: 'put',
        headers: {
            'authrization': `abo-os${userToken}`,
        },
        body: formData
    })
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.message === 'success') {
                window.location.reload();
            } else {
                setUploadPicError(responseJson.message)
                setUploadPicLoading(false)
            }
        })
        .catch((error) => {
            setUploadPicError(error.message)
            setUploadPicLoading(false)
        });
}

export default updatePicUser;
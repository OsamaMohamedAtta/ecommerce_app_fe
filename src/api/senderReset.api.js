const URL = 'http://localhost:8888/user/senderResetPassword/'

const senderReset = (email, setResetDone, setServerError, setLoading) => {
    setLoading(true)
    fetch(`${URL}${email}`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
    })
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.message === 'success') {
                setResetDone('تفحص البريد الالكتروني الخاص بك قمنا بارسال رسالة اعادة ضبط كلمة السر الخاصة بك')
                setLoading(false)
                setServerError('')
            } else {
                setServerError(responseJson.message)
                setLoading(false)
                setResetDone(null)
            }
        })
        .catch((error) => {
            setServerError(error.message)
            setLoading(false)
            setResetDone(null)
        });
}

export default senderReset;

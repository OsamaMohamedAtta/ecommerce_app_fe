const senderValidation = (email) => {
    let error = ''
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/

    if(email === ''){
        error = "البريد الالكتروني مطلوب"
    }else if(!email_pattern.test(email)){
        error = "هذا البريد الالكتروني خاطئ برجاء كتابه البريد الالكتروني بشكل صحيح"
    }

    return error;
}

export default senderValidation
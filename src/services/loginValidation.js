const loginValidation = (values) => {
    const errors = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/
    const password_pattern = /^[a-zA-Z0-9]{4,15}$/

    if(values.email === ''){
        errors.email = "البريد الالكتروني مطلوب"
    }else if(!email_pattern.test(values.email)){
        errors.email = "هذا البريد الالكتروني خاطئ برجاء كتابه البريد الالكتروني بشكل صحيح"
    }

    if(values.password === ''){
        errors.password = "كلمه المرور مطلوبه"
    }else if(!password_pattern.test(values.password)){
        errors.password = "يجب ان لا تقل كلمه المرور عن 4 احرف وان لا تزيد عن 15 حرف"
    }

    return errors;
}

export default loginValidation
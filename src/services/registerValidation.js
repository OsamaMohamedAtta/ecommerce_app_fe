const registerValidation = (values) => {
    const errors = {}
    const userName_pattern = /^[a-zA-Z0-9_ ]{6,25}$/
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/
    const password_pattern = /^[a-zA-Z0-9]{4,15}$/

    if(values.userName === ''){
        errors.userName = "اسم المستخدم  مطلوب"
    }else if(!userName_pattern.test(values.userName)){
        errors.userName = "يجب ان لا يقل اسم المستخدم عن 6 حروف وان لا يزيد عن 25 حرف"
    }

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

    if(values.cPassword === ''){
        errors.cPassword = "اعاده كلمه المرور مطلوبه"
    }else if(values.cPassword !== values.password){
        errors.cPassword = "كلمه المرور غير متشابهه معا اعاده كلمه المرور"
    }

    return errors;
}

export default registerValidation;

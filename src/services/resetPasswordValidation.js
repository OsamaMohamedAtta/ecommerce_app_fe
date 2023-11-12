const resetPasswordValidation = (values) => {
    const errors = {}
    const password_pattern = /^[a-zA-Z0-9]{4,15}$/

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

export default resetPasswordValidation;

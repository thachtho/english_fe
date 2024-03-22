const notRequired = () => {
    return `không được để trống!.`
}

const notTooShort = () => {
    return `quá ngắn!.`
}

const notTooLong = () => {
    return `quá dài!.`
}

export const messageErrorValidate = {
    nickname: {
        required: `NickName ${notRequired()}`,
        maxLength: `NickName ${notTooLong()}`,
        minLength: `NickName ${notTooShort()}`
    },
    password: {
        required: `Password ${notRequired()}`,
        maxLength: `Password ${notTooLong()}`,
        minLength: `Password ${notTooShort()}`
    },
}


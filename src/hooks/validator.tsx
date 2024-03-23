import { FieldErrors } from "react-hook-form"
import { messageErrorValidate } from "../shared/enums/auth.validator"
type Filed = "nickname";

const useValidator = () => {
    const validator = (filed: FieldErrors<ILogin>) => {
        const keyName = Object.keys(filed)[0] as Filed
        const dataMessage = messageErrorValidate[keyName]
        const type = filed[keyName]?.type as 'maxLength' | 'required'
        const message = dataMessage[type]

        return <span className="text-meta-1"><i>{message}</i></span>
    }    

    return {
        validator
    }
}

export default useValidator



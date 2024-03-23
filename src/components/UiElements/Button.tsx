import { ReactNode } from "react";

interface IButton {
    text?: string,
    className?: string,
    handleClick?: () => void,
    children?: ReactNode;
}

function Button({ 
    text,
    className = '',
    handleClick,
    children
}: IButton) {
  return (
    <button className={className} onClick={handleClick}>
        {text ?? children}
    </button> 
  )
}

export default Button

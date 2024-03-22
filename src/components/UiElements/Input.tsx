
interface IInput {
    type?: string,
    placeholder?: string,
    className?: string,
    value?: string
}

function Input({ type = '', className = '', placeholder = '', value = '' }: IInput) {
  return (
    <input
        type={type}
        placeholder={placeholder}
        className={className}
        value={value}
        onChange={() => {}}
    />
  )
}

export default Input

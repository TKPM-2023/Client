import { InputHTMLAttributes } from 'react'
import { FieldPath, FieldValues, UseFormRegister } from 'react-hook-form'

interface Props<TFieldValues extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  inputClassName?: string
  errorClassName?: string
  errorMessage?: string
  name?: FieldPath<TFieldValues>
  register?: UseFormRegister<TFieldValues>
}

function Input<TFieldValues extends FieldValues>({
  name,
  errorMessage,
  className,
  inputClassName = 'w-full border border-gray-300 p-2 text-sm outline-none focus:border-gray-400',
  errorClassName = 'min-h-[1rem] text-xs text-red-500',
  disabled,
  register,
  ...rest
}: Props<TFieldValues>) {
  const registerResult = register && name ? register(name) : null

  if (disabled) {
    Object.keys(rest).forEach((key) => {
      if (key.startsWith('on') && typeof rest[key as keyof typeof rest] === 'function') {
        delete rest[key as keyof typeof rest]
      }
    })

    inputClassName += ' cursor-not-allowed'
  }

  return (
    <div className={className}>
      <input className={inputClassName} {...rest} {...registerResult} disabled={disabled} />
      <div className={errorClassName}>{errorMessage}</div>
    </div>
  )
}

export default Input

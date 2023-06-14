import { InputHTMLAttributes, useState } from 'react'
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
  type = 'text',
  name,
  errorMessage,
  className,
  inputClassName = 'w-full border border-gray-300 p-2 text-sm outline-none focus:border-gray-400',
  errorClassName = 'min-h-[1rem] text-xs text-red-500',
  disabled,
  register,
  ...rest
}: Props<TFieldValues>) {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false)
  const registerResult = register && name ? register(name) : null

  if (disabled) {
    Object.keys(rest).forEach((key) => {
      if (key.startsWith('on') && typeof rest[key as keyof typeof rest] === 'function') {
        delete rest[key as keyof typeof rest]
      }
    })

    inputClassName += ' cursor-not-allowed'
  }

  const toggleShowPassword = () => setIsShowPassword((prev) => !prev)

  return (
    <div className={className}>
      <div className='relative'>
        <input
          type={isShowPassword ? 'text' : type}
          className={inputClassName}
          {...rest}
          {...registerResult}
          disabled={disabled}
        />
        {type === 'password' && isShowPassword && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer transition-colors hover:opacity-60'
            onClick={toggleShowPassword}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
            />
            <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
          </svg>
        )}

        {type === 'password' && !isShowPassword && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer transition-colors hover:opacity-60'
            onClick={toggleShowPassword}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
            />
          </svg>
        )}
      </div>
      <div className={errorClassName}>{errorMessage}</div>
    </div>
  )
}

export default Input

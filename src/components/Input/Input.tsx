import { InputHTMLAttributes } from 'react'
import { FieldPath, FieldValues, UseFormRegister } from 'react-hook-form'

interface Props<TFieldValues extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  errorMessage?: string
  name: FieldPath<TFieldValues>
  register: UseFormRegister<TFieldValues>
}

function Input<TFieldValues extends FieldValues>({
  name,
  placeholder,
  type,
  errorMessage,
  className,
  register
}: Props<TFieldValues>) {
  return (
    <div className={className}>
      <input
        type={type}
        className='w-full border border-gray-300 p-2 text-sm outline-none focus:border-gray-400'
        placeholder={placeholder}
        {...register(name)}
      />
      <div className='min-h-[1rem] text-xs text-red-500'>{errorMessage}</div>
    </div>
  )
}

export default Input

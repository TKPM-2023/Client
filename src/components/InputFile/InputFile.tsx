import { Fragment, InputHTMLAttributes, useRef } from 'react'
import { toast } from 'react-toastify'
import config from 'src/constants/config'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  title?: string
  onFilesChange?: (files: FileList) => void
  onFileChange?: (file: File) => void
}

function InputFile({ title, multiple, onFileChange, onFilesChange, ...rest }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUpload = () => {
    fileInputRef.current?.click()
  }

  const onMultipleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      let isValidFiles = true
      Array.from(files).forEach((file) => {
        if (!file.type.includes('image/') || file.size > config.maxSizeUploadAvatar) {
          isValidFiles = false
        }
      })

      if (!isValidFiles) {
        toast.error('Dung lượng file tối đa 1 MB. Định dạng:.JPEG, .PNG')
        return
      }

      onFilesChange && onFilesChange(files)
    }
  }

  const onSingleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (!file.type.includes('image/') || file.size > config.maxSizeUploadAvatar) {
        toast.error('Dung lượng file tối đa 1 MB. Định dạng:.JPEG, .PNG')
        return
      }

      onFileChange && onFileChange(file)
    }
  }

  const onInputClick = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(event.target as any).value = ''
  }

  return (
    <Fragment>
      <button
        type='button'
        className='mt-3 inline-flex cursor-pointer select-none items-center justify-center gap-1 rounded bg-cyan-400 px-3 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-cyan-500 active:bg-cyan-600'
        onClick={handleUpload}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='relative top-[1px] h-4 w-4'
        >
          <path
            fillRule='evenodd'
            d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z'
            clipRule='evenodd'
          />
        </svg>
        <span>{title}</span>
      </button>

      <input
        {...rest}
        ref={fileInputRef}
        type='file'
        multiple={multiple}
        accept='.jpg,.jpeg,.png'
        hidden
        onChange={multiple ? onMultipleChange : onSingleChange}
        onClick={onInputClick}
      />
    </Fragment>
  )
}

export default InputFile

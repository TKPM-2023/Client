import { useQuery } from '@tanstack/react-query'
import { useState, useEffect, ChangeEvent } from 'react'
import { Spinner } from '@material-tailwind/react'
import config from 'src/constants/config'
import EditInfor from './components/EditInfor'
import authApi from 'src/apis/auth.api'
import SomethingWrong from 'src/components/SomethingWrong'
import { toast } from 'react-toastify'

function formatDate(dateString: string | undefined) {
  if (dateString) {
    const date = new Date(dateString)

    const day = String(date.getDate()).padStart(2, '0')

    const month = String(date.getMonth() + 1).padStart(2, '0')

    const year = String(date.getFullYear())

    return `${day}/${month}/${year}`
  }
}

const defaultAvatar =
  'https://secure.gravatar.com/avatar/16e53ab164d51b98d92eef41468cf71b/?s=48&d=https://images.binaryfortress.com/General/UnknownUser1024.png'

function GeneralInfor() {
  const abortController = new AbortController()
  const signal = abortController.signal
  const [isErrorLoading, setIsErrorLoading] = useState<boolean>(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const {
    data: UserData,
    isLoading,
    isSuccess,
    refetch
  } = useQuery({
    queryKey: ['userProfile'],
    queryFn: () => authApi.getProfile({ signal }),
    keepPreviousData: true
  })

  const userProfileData = UserData?.data.data
  const userAvatar: string = userProfileData?.avatar ? userProfileData.avatar.url : defaultAvatar

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file && file.size <= config.maxSizeUploadAvatar) {
      setSelectedImage(file)
      const imageUrl = URL.createObjectURL(file)
      setPreviewImage(imageUrl)
    } else {
      toast.error('Dung lượng tải lên tối đa 1MB')
    }
  }

  useEffect(() => {
    if (!isSuccess) {
      setTimeout(() => {
        setIsErrorLoading(true)
      }, 5000)
    }
  }, [isErrorLoading, isSuccess])

  const handleRefetchData = () => {
    refetch()
    setIsErrorLoading(false)
  }

  if (isLoading || !isSuccess) {
    if (!isErrorLoading)
      return (
        <div className='flex h-full items-center justify-center bg-gray-300 p-16 pt-6'>
          <Spinner className='h-12 w-12' />
        </div>
      )
    else {
      return <SomethingWrong handleRefetchData={handleRefetchData} />
    }
  }

  return (
    <>
      <div className='bg-gray-300 p-16 pt-6'>
        <div className='mt-24 rounded bg-white p-8 shadow'>
          {' '}
          <div className='grid grid-cols-1 md:grid-cols-3'>
            {' '}
            <div className='order-last mt-20 grid grid-cols-3 text-center md:order-first md:mt-0'>
              {' '}
              <div>
                {' '}
                <p className='text-xl font-bold text-gray-700'>22</p> <p className='text-gray-400'>Đơn mua</p>{' '}
              </div>{' '}
              <div>
                {' '}
                <p className='text-xl font-bold text-gray-700'>10</p> <p className='text-gray-400'>Đánh giá</p>{' '}
              </div>{' '}
              <div>
                {' '}
                <p className='text-xl font-bold text-gray-700'>8</p> <p className='text-gray-400'>Bình luận</p>{' '}
              </div>{' '}
            </div>{' '}
            <div className='relative '>
              {' '}
              <label
                className='group absolute inset-x-0 top-0 mx-auto -mt-24 flex h-48 w-48 cursor-pointer items-center justify-center rounded-full bg-indigo-100 text-indigo-500 shadow-2xl hover:bg-gray-200'
                htmlFor='file-upload'
              >
                <img
                  src={previewImage ? previewImage : userAvatar}
                  alt='Preview'
                  className='block h-full w-full transform rounded-full object-cover opacity-100 transition duration-500 ease-in-out group-hover:opacity-50 '
                />

                <div className='absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-center transition duration-500 ease-in-out group-hover:block'>
                  <div className='text text-xl font-semibold text-gray-900'>
                    Thay ảnh{' '}
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='1.5'
                      stroke='currentColor'
                      className='inline h-6 w-6'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125'
                      />
                    </svg>
                  </div>{' '}
                </div>
                <input
                  className='hidden h-1 w-1'
                  id='file-upload'
                  type='file'
                  accept='image/*'
                  onChange={handleImageChange}
                />
              </label>{' '}
            </div>{' '}
            <div className='mt-32 flex justify-between space-x-8 md:mt-0 md:justify-center'>
              <button className='transform rounded bg-blue-400 px-4 py-2 font-medium uppercase text-white shadow transition hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-lg'>
                {' '}
                Kết nối
              </button>{' '}
              <button
                onClick={handleRefetchData}
                className='transform rounded bg-red-700 px-4 py-2 font-medium uppercase text-white shadow transition hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-lg'
              >
                {' '}
                Hủy thay đổi
              </button>{' '}
            </div>{' '}
          </div>{' '}
          <div className='mt-20 text-center'>
            {' '}
            <h1 className='text-4xl font-medium text-gray-700'>
              {userProfileData?.first_name} {userProfileData?.last_name}
            </h1>{' '}
            <p className='mt-3 font-light text-gray-600'>Tham gia vào {formatDate(userProfileData?.created_at)}</p>{' '}
            <EditInfor
              userProfileData={userProfileData}
              handleRefetchData={handleRefetchData}
              selectedImage={selectedImage}
            />
          </div>{' '}
        </div>
      </div>
    </>
  )
}

export default GeneralInfor

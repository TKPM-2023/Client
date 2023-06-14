import { useFormik } from 'formik'
import { Spinner } from '@material-tailwind/react'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'
import userApi from 'src/apis/user.api'
import uploadApi from 'src/apis/upload.api'
import { Profile } from 'src/types/user.type'
import { useEffect, useMemo } from 'react'
import { userSchema, UserSchema } from 'src/utils/rules'
interface EditInforProps {
  userProfileData: Profile | undefined
  selectedImage: File | null
  handleRefetchData: () => void
}

function isNoChangeInfor(oldInfor: UserSchema, newInfor: UserSchema) {
  return (
    oldInfor.first_name === newInfor.first_name &&
    oldInfor.email === newInfor.email &&
    oldInfor.phone === newInfor.phone &&
    oldInfor.last_name === newInfor.last_name
  )
}

function EditInfor({ userProfileData, selectedImage, handleRefetchData }: EditInforProps) {
  const uploadImageMutation = useMutation({
    mutationFn: uploadApi.upload
  })
  const updateUserProfileMutation = useMutation({
    mutationFn: (body: UserSchema) => userApi.updateUser(userProfileData?.id, body),
    onMutate(variables) {
      variables.email = variables.email === userProfileData?.email ? '' : variables.email
    },
    onSuccess: () => {
      toast.success('Cập nhật thông tin thành công')
    }
  })

  const formik = useFormik({
    initialValues: {
      first_name: userProfileData?.first_name,
      last_name: userProfileData?.last_name,
      email: userProfileData?.email,
      phone: userProfileData?.phone
    },

    validationSchema: userSchema,

    onSubmit: async (newInfor) => {
      if (selectedImage) {
        const formData = new FormData()
        formData.append('file', selectedImage as File)
        formData.append('folder', 'avatar')
        const imageData = await uploadImageMutation.mutateAsync(formData)
        const { cloud_name, ...rest } = imageData.data.data
        await updateUserProfileMutation.mutateAsync({ ...newInfor, avatar: { ...rest } })
      } else await updateUserProfileMutation.mutateAsync(newInfor)
      handleRefetchData()
    }
  })
  const isSimilarInfor = useMemo(() => {
    if (isNoChangeInfor(formik.values, { ...userProfileData }) && !selectedImage) {
      return true
    } else return false
  }, [formik.values, selectedImage])

  useEffect(() => {
    if (userProfileData) {
      formik.setValues({
        first_name: userProfileData.first_name || '',
        last_name: userProfileData.last_name || '',
        email: userProfileData.email || '',
        phone: userProfileData.phone || ''
      })
    }
  }, [userProfileData, updateUserProfileMutation.isSuccess])

  return (
    <>
      <div className='mt-8 flex justify-center border-b text-start text-gray-500'>
        <form onSubmit={formik.handleSubmit} className='w-4/5' id='edit-user-form'>
          <div className='mb-0 grid gap-6 md:grid-cols-2'>
            <div>
              <label htmlFor='first_name' className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
                Họ và tên lót
              </label>
              <input
                type='text'
                name='first_name'
                id='first_name'
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                value={formik.values.first_name}
                onChange={formik.handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor='last_name' className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
                Tên
              </label>
              <input
                type='text'
                id='last_name'
                name='last_name'
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                value={formik.values.last_name}
                onChange={formik.handleChange}
                required
              />
            </div>
            <div className='mb-6'>
              <label htmlFor='email' className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
                Email
              </label>
              <input
                type='email'
                name='email'
                id='email'
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                value={formik.values.email}
                onChange={formik.handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor='phone' className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
                Số điện thoại
              </label>
              <input
                type='tel'
                id='phone'
                name='phone'
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                value={formik.values.phone}
                onChange={formik.handleChange}
                required
              />
            </div>
          </div>
        </form>
      </div>{' '}
      <div className='mt-6 flex justify-center'>
        {' '}
        <button
          type='submit'
          form='edit-user-form'
          disabled={isSimilarInfor}
          className={`w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto ${
            isSimilarInfor ? 'pointer-events-none bg-gray-500' : ''
          }`}
        >
          {updateUserProfileMutation.isLoading ? <Spinner /> : 'Lưu thay đổi'}
        </button>
      </div>
    </>
  )
}

export default EditInfor

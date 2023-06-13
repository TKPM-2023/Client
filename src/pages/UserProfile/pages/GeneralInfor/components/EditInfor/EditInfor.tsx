import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Profile } from 'src/types/user.type'

interface EditInforProps {
  userProfileData: Profile | undefined
  handleRefetchData: () => void
}

function EditInfor({ userProfileData, handleRefetchData }: EditInforProps) {
  const formik = useFormik({
    initialValues: {
      ...userProfileData
    },

    validationSchema: Yup.object({
      firt_name: Yup.string().min(3, 'Name with at least 3 character'),
      email: Yup.string().required('Please fill in the email address field'),
      phone: Yup.string().required('Please fill in the phone field')
    }),

    onSubmit: (newInfor) => {
      console.log(newInfor)
      handleRefetchData()
    }
  })

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
                //pattern='[0-9]{3}-[0-9]{2}-[0-9]{3}'
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
          className='w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto'
        >
          Lưu thay đổi
        </button>
      </div>
    </>
  )
}

export default EditInfor

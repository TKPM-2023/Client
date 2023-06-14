import { Input, Typography, Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react'
import { InformationCircleIcon, BellIcon } from '@heroicons/react/24/solid'
import { useContext, useState } from 'react'
import { AppContext } from 'src/contexts/app.context'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { useMutation } from '@tanstack/react-query'
import userApi from 'src/apis/user.api'

function ChangePassword() {
  const [open, setOpen] = useState(false)

  const { profile } = useContext(AppContext)

  const updateUserProfileMutation = useMutation({
    mutationFn: (body: { password: string; new_password: string }) =>
      userApi.changePassword(profile?.id as string, body),
    onSuccess: () => {
      toast.success('Đổi mật khẩu thành công')
    }
  })

  const handleOpen = () => setOpen(!open)

  const formik = useFormik({
    initialValues: {
      password: '',
      new_password: '',
      confirmed_password: ''
    },

    validationSchema: yup.object({
      password: yup.string().required('Mật khẩu cũ là bắt buộc'),
      new_password: yup
        .string()
        .required('Mật khẩu mới là bắt buộc')
        .min(8, 'Mật khẩu mới có ít nhất 8 kí tự')
        .max(160, 'ĐMật khẩu mới có tối đa 8 kí tự'),
      confirmed_password: yup
        .string()
        .required('Nhập lại mật khẩu là bắt buộc')
        .oneOf([yup.ref('new_password')], 'Mật khẩu nhập lại không khớp')
    }),

    onSubmit: async (newData) => {
      await updateUserProfileMutation.mutateAsync({ password: newData.password, new_password: newData.new_password })
      console.log(newData)
    }
  })

  return (
    <>
      <div className='bg-gray-300 p-16 pt-6'>
        <div className='mt-12 rounded bg-white p-8 shadow'>
          {' '}
          <div className=' border-b text-start'>
            {' '}
            <h1 className='text-2xl font-bold text-gray-700'>Đổi mật khẩu</h1>{' '}
            <p className='mt-3 font-light text-gray-600'>
              Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
            </p>{' '}
            <div className='mt-8 flex justify-center text-start text-gray-500'></div>{' '}
          </div>{' '}
          <form onSubmit={formik.handleSubmit} id='change'>
            <div className='mt-8'>
              <div className='mt-6 w-[32rem]'>
                <Input
                  id='password'
                  name='password'
                  type='password'
                  label='Nhập mật khẩu cũ'
                  variant='outlined'
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  required
                />
              </div>
              {formik.errors.password && (
                <div className='w-[32rem]'>
                  <Typography variant='small' color='red' className='mt-2 flex items-center gap-1 font-normal'>
                    <InformationCircleIcon className='-mt-px h-4 w-4' />
                    {formik.errors.password}
                  </Typography>
                </div>
              )}
              <div className='mt-6 w-[32rem]'>
                <Input
                  id='new_password'
                  name='new_password'
                  type='password'
                  label='Nhập mật khẩu mới'
                  variant='outlined'
                  value={formik.values.new_password}
                  onChange={formik.handleChange}
                  required
                />
              </div>
              {formik.errors.new_password && (
                <div className='w-[32rem]'>
                  <Typography variant='small' color='red' className='mt-2 flex items-center gap-1 font-normal'>
                    <InformationCircleIcon className='-mt-px h-4 w-4' />
                    {formik.errors.new_password}
                  </Typography>
                </div>
              )}
              <div className='mt-6 w-[32rem]'>
                <Input
                  id='confirmed_password'
                  name='confirmed_password'
                  type='password'
                  label='Nhập lại mật khẩu'
                  variant='outlined'
                  value={formik.values.confirmed_password}
                  onChange={formik.handleChange}
                />
              </div>
              {formik.errors.confirmed_password && (
                <div className='w-[32rem]'>
                  <Typography variant='small' color='red' className='mt-2 flex items-center gap-1 font-normal'>
                    <InformationCircleIcon className='-mt-px h-4 w-4' />
                    {formik.errors.confirmed_password}
                  </Typography>
                </div>
              )}
              <Button
                onClick={handleOpen}
                className='mt-6'
                variant='gradient'
                disabled={formik.values.password === '' || !formik.isValid}
              >
                Đổi mật khẩu
              </Button>
            </div>
            <Dialog open={open} handler={handleOpen}>
              <DialogHeader>
                <Typography variant='h5' color='blue-gray'>
                  Chú ý
                </Typography>
              </DialogHeader>
              <DialogBody divider className='grid place-items-center gap-4'>
                <BellIcon className='h-16 w-16 text-red-500' />
                <Typography color='red' variant='h4'>
                  Mật khẩu của bạn sẽ thay đổi
                </Typography>
                <Typography className='text-center font-normal'>
                  Bạn vẫn chắc chắn muốn thay đổi mật khẩu của mình
                </Typography>
              </DialogBody>
              <DialogFooter className='space-x-2'>
                <Button variant='text' color='red' onClick={handleOpen}>
                  Hủy
                </Button>
                <Button form='change' variant='gradient' type='submit' onClick={handleOpen}>
                  Đổi mật khẩu
                </Button>
              </DialogFooter>
            </Dialog>
          </form>
        </div>
      </div>
    </>
  )
}

export default ChangePassword

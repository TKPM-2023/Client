import { useEffect, useId, useState } from 'react'
import { useForm } from 'react-hook-form'

import userRole from 'src/constants/users'
import { User } from 'src/types/user.type'
import useTitle from 'src/hooks/useTitle'
import Input from 'src/components/Input'
import Modal from 'src/components/Modal'
import Button from 'src/components/Button'
import images from 'src/assets/images'
import Table from './Table'
import classNames from 'classnames'

const users: User[] = [
  {
    id: '1',
    created_at: '25/05/2023',
    email: 'test1@gmail.com',
    first_name: 'Tài',
    last_name: 'Văn 1',
    phone: '0123456789',
    role: 'user',
    status: 1,
    updated_at: '',
    avatar: '',
    password: '123'
  },
  {
    id: '2',
    created_at: '25/05/2023',
    email: 'test2@gmail.com',
    first_name: 'Tài',
    last_name: 'Văn 2',
    phone: '0123456789',
    role: 'admin',
    status: 1,
    updated_at: '',
    avatar: '',
    password: '456'
  },
  {
    id: '3',
    created_at: '25/05/2023',
    email: 'test3@gmail.com',
    first_name: 'Tài',
    last_name: 'Văn 3',
    phone: '0123456789',
    role: 'user',
    status: 1,
    updated_at: '',
    avatar: '',
    password: '789'
  }
]

type FormDataId = {
  [key in keyof User]: string
}

const initialFormData: User = {
  avatar: '',
  email: '',
  first_name: '',
  last_name: '',
  password: '',
  phone: '',
  role: 'user',
  status: 1,
  created_at: '',
  id: '',
  updated_at: ''
}

function UserManagement() {
  useTitle('Trang Quản Trị - Quản Lý Người Dùng')

  // Form id
  const formDataId: FormDataId = {
    id: useId(),
    first_name: useId(),
    last_name: useId(),
    email: useId(),
    password: useId(),
    phone: useId(),
    role: useId(),
    avatar: useId(),
    status: useId(),
    created_at: useId(),
    updated_at: useId()
  }

  const [isOpenModalManage, setIsOpenModalManage] = useState(false)
  const [dataUserView, setDataUserView] = useState<User | null>(null)
  const [dataUserEdit, setDataUserEdit] = useState<User | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<User>({})

  useEffect(() => {
    const dataUser = dataUserEdit || dataUserView
    if (dataUser) {
      setValue('id', dataUser.id)
      setValue('avatar', dataUser.avatar)
      setValue('email', dataUser.email)
      setValue('first_name', dataUser.first_name)
      setValue('last_name', dataUser.last_name)
      setValue('password', dataUser.password)
      setValue('phone', dataUser.phone)
      setValue('role', dataUser.role)
      setValue('status', dataUser.status)
      setValue('created_at', dataUser.created_at)
      setValue('updated_at', dataUser.updated_at)
    }
  }, [dataUserView, dataUserEdit, setValue])

  useEffect(() => {
    if (isOpenModalManage === false) {
      setDataUserView(null)
      setDataUserEdit(null)
    }
  }, [isOpenModalManage])

  const handleClickViewButton = (user: User) => {
    setDataUserView(user)
    setIsOpenModalManage(true)
  }

  const handleClickEditButton = (user: User) => {
    setDataUserEdit(user)
    setIsOpenModalManage(true)
  }

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <div>
      <div className='mb-3 flex h-16 items-center justify-between bg-cyan-600 px-5'>
        <div className='text-xl font-semibold capitalize text-white'>Quản lý người dùng</div>
        <div className='px-4'>
          <button className='flex items-center justify-center gap-1 rounded bg-white px-3 py-2 text-sm font-medium text-black transition-colors duration-200 hover:bg-white/80 active:bg-white/75'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='h-4 w-4'>
              <path
                fillRule='evenodd'
                d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z'
                clipRule='evenodd'
              />
            </svg>

            <span>Thêm người dùng</span>
          </button>
        </div>
      </div>

      <Table
        users={users}
        handleClickViewButton={handleClickViewButton}
        handleClickEditButton={handleClickEditButton}
      />

      {/* View modal */}
      <Modal
        type={dataUserEdit ? 'EDIT' : 'VIEW'}
        headingTitle='Xem người dùng'
        isOpen={isOpenModalManage}
        setIsOpen={setIsOpenModalManage}
        onSubmit={onSubmit}
      >
        <div className='py-4'>
          <div className='grid grid-cols-12 gap-3'>
            <div className='col-span-12 lg:col-span-4'>
              <label htmlFor={formDataId.id} className='text-sm font-medium'>
                ID
              </label>
              <Input id={formDataId.id} className='mt-2' disabled register={register} name='id' />
            </div>

            <div className='col-span-12 lg:col-span-4'>
              <label htmlFor={formDataId.first_name} className='text-sm font-medium'>
                Họ và tên đệm
              </label>
              <Input
                id={formDataId.first_name}
                className='mt-2'
                disabled={Boolean(dataUserView && dataUserEdit === null)}
                register={register}
                name='first_name'
              />
            </div>

            <div className='col-span-12 lg:col-span-4'>
              <label htmlFor={formDataId.last_name} className='text-sm font-medium'>
                Tên
              </label>
              <Input
                id={formDataId.last_name}
                className='mt-2'
                disabled={Boolean(dataUserView && dataUserEdit === null)}
                register={register}
                name='last_name'
              />
            </div>
          </div>

          <div className='grid grid-cols-12 gap-3'>
            <div className='col-span-12 lg:col-span-4'>
              <label htmlFor={formDataId.email} className='text-sm font-medium'>
                Email
              </label>
              <Input
                id={formDataId.email}
                className='mt-2'
                disabled={Boolean(dataUserView && dataUserEdit === null)}
                register={register}
                name='email'
              />
            </div>

            <div className='col-span-12 lg:col-span-4'>
              <label htmlFor={formDataId.password} className='text-sm font-medium'>
                Mật khẩu
              </label>
              <Input
                type='password'
                id={formDataId.password}
                className='mt-2'
                disabled={Boolean(dataUserView && dataUserEdit === null)}
                register={register}
                name='password'
              />
            </div>

            <div className='col-span-12 lg:col-span-4'>
              <label htmlFor={formDataId.phone} className='text-sm font-medium'>
                Số điện thoại
              </label>
              <Input
                id={formDataId.phone}
                className='mt-2'
                disabled={Boolean(dataUserView && dataUserEdit === null)}
                register={register}
                name='phone'
              />
            </div>
          </div>

          <div className='grid grid-cols-12 gap-3'>
            <div className='col-span-12 lg:col-span-4'>
              <label htmlFor={formDataId.role} className='text-sm font-medium'>
                Vai trò
              </label>
              <select
                id={formDataId.role}
                className='mt-2 w-full border border-gray-300 p-2 text-sm outline-none focus:border-gray-400'
                disabled={Boolean(dataUserView && dataUserEdit === null)}
                {...register('role')}
              >
                <option value={userRole.user}>Người dùng</option>
                <option value={userRole.admin}>Quản trị</option>
              </select>
            </div>

            <div className='col-span-12 lg:col-span-4'>
              <label htmlFor={formDataId.status} className='text-sm font-medium'>
                Trạng thái
              </label>
              <Input
                id={formDataId.status}
                className='mt-2'
                disabled={Boolean(dataUserView && dataUserEdit === null)}
                register={register}
                name='status'
              />
            </div>

            <div className='col-span-6 lg:col-span-2'>
              <label htmlFor={formDataId.created_at} className='text-sm font-medium'>
                Ngày tạo
              </label>
              <Input id={formDataId.created_at} className='mt-2' disabled register={register} name='created_at' />
            </div>

            <div className='col-span-6 lg:col-span-2'>
              <label htmlFor={formDataId.updated_at} className='text-sm font-medium'>
                Ngày cập nhật
              </label>
              <Input id={formDataId.updated_at} className='mt-2' disabled register={register} name='updated_at' />
            </div>
          </div>

          <div>
            <label
              htmlFor={formDataId.avatar}
              className={classNames(
                'mt-3 inline-flex select-none items-center justify-center gap-1 rounded bg-cyan-400 px-3 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-cyan-500 active:bg-cyan-600',
                {
                  'cursor-not-allowed': Boolean(dataUserView && dataUserEdit === null),
                  'cursor-pointer': !(dataUserView && dataUserEdit === null)
                }
              )}
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
              <span>Tải lên ảnh mới</span>
            </label>

            <Input
              id={formDataId.avatar}
              type='file'
              accept='image/png, image/jpeg'
              errorClassName='none'
              hidden
              disabled={Boolean(dataUserView && dataUserEdit === null)}
            />

            <div className='mt-3 flex h-40 items-center justify-center rounded border px-4 py-3'>
              <span className='text-sm text-gray-400'>Preview image</span>
              {/* <img src={images.avatar} className='h-full' alt='Preview avatar' /> */}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default UserManagement

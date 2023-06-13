import { useState } from 'react'
import omitBy from 'lodash/omitBy'
import { Helmet } from 'react-helmet-async'
import isUndefined from 'lodash/isUndefined'
import { useQuery } from '@tanstack/react-query'

import userApi from 'src/apis/user.api'
import Table from './components/Table'
import { User, UserListConfig } from 'src/types/user.type'
import useQueryParams from 'src/hooks/useQueryParams'
import ViewModal from './components/ViewModal'
import EditModal from './components/EditModal'
import CreateModal from './components/CreateModal'
import ConfirmDeleteModal from './components/ConfirmDeleteModal'

export type QueryConfig = {
  [key in keyof UserListConfig]: string
}

function UserManagement() {
  const queryParams = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || '5',
      status: queryParams.status || '1'
    },
    isUndefined
  )

  const { data: userData, refetch } = useQuery({
    queryKey: ['users', queryConfig],
    queryFn: () => userApi.getUsers(queryConfig),
    keepPreviousData: true
  })

  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false)
  const [isOpenViewModal, setIsOpenViewModal] = useState<boolean>(false)
  const [viewUserData, setViewUserData] = useState<User | null>(null)
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false)
  const [editUserData, setEditUserData] = useState<User | null>(null)
  const [isOpenConfirmDeleteModal, setIsOpenConfirmDeleteModal] = useState<boolean>(false)
  const [deleteUserData, setDeleteUserData] = useState<User | null>(null)

  const pageSize = userData ? Math.ceil(userData.data.paging.total / userData.data.paging.limit) : 1
  const users = userData?.data.data

  const handleClickViewButton = (user: User) => {
    setIsOpenViewModal(true)
    setViewUserData(user)
  }

  const handleClickEditButton = (user: User) => {
    setIsOpenEditModal(true)
    setEditUserData(user)
  }

  const handleClickDeleteButton = (user: User) => {
    setIsOpenConfirmDeleteModal(true)
    setDeleteUserData(user)
  }

  const openCreateModal = () => {
    setIsOpenCreateModal(true)
  }

  const handleRefetchData = () => {
    refetch()
  }

  if (!users || users.length === 0) return null
  return (
    <div>
      <Helmet>
        <title>Trang Quản Trị | Quản Lí Người Dùng</title>
        <meta name='description' content='Quản lí người dùng dành cho người quản trị' />
      </Helmet>
      <div className='mb-3 flex h-16 items-center justify-between bg-cyan-600 px-5'>
        <h1 className='text-xl font-semibold capitalize text-white'>Quản lý người dùng</h1>
        <div className='px-4'>
          <button
            onClick={openCreateModal}
            className='flex items-center justify-center gap-1 rounded bg-white px-3 py-2 text-sm font-medium text-black transition-colors duration-200 hover:bg-white/80 active:bg-white/75'
          >
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
        pageSize={pageSize}
        queryConfig={queryConfig}
        handleClickViewButton={handleClickViewButton}
        handleClickEditButton={handleClickEditButton}
        handleClickDeleteButton={handleClickDeleteButton}
      />

      <ViewModal isOpen={isOpenViewModal} setIsOpen={setIsOpenViewModal} user={viewUserData as User} />

      <EditModal
        isOpen={isOpenEditModal}
        setIsOpen={setIsOpenEditModal}
        user={editUserData as User}
        handleRefetchData={handleRefetchData}
      />

      <CreateModal isOpen={isOpenCreateModal} setIsOpen={setIsOpenCreateModal} handleRefetchData={handleRefetchData} />

      <ConfirmDeleteModal
        isOpen={isOpenConfirmDeleteModal}
        setIsOpen={setIsOpenConfirmDeleteModal}
        user={deleteUserData}
        handleRefetchData={handleRefetchData}
      />
    </div>
  )
}

export default UserManagement

import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import isUndefined from 'lodash/isUndefined'
import omitBy from 'lodash/omitBy'

import useTitle from 'src/hooks/useTitle'
import categoryApi from 'src/apis/category.api'
import Table from './components/Table'
import { Category, CategoryListConfig } from 'src/types/category.type'
import status from 'src/constants/status'
import useQueryParams from 'src/hooks/useQueryParams'
import ViewModal from './components/ViewModal'
import EditModal from './components/EditModal'
import CreateModal from './components/CreateModal'
import ConfirmDeleteModal from './components/ConfirmDeleteModal'

export type QueryConfig = {
  [key in keyof CategoryListConfig]: string
}

function CategoryManagement() {
  useTitle('Quản Lý Thể Loại')

  const queryParams = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || '5',
      status: queryParams.status || status.inStore
    },
    isUndefined
  )

  const { data: categoryData, refetch } = useQuery({
    queryKey: ['categories', queryConfig],
    queryFn: () => categoryApi.getCategories(queryConfig),
    keepPreviousData: true
  })

  const pageSize = categoryData ? Math.ceil(categoryData.data.paging.total / categoryData.data.paging.limit) : 1
  const categories = categoryData?.data.data

  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false)
  const [isOpenViewModal, setIsOpenViewModal] = useState<boolean>(false)
  const [viewCategoryData, setViewCategoryData] = useState<Category | null>(null)
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false)
  const [editCategoryData, setEditCategoryData] = useState<Category | null>(null)
  const [isOpenConfirmDeleteModal, setIsOpenConfirmDeleteModal] = useState<boolean>(false)
  const [deleteCategoryData, setDeleteCategoryData] = useState<Category | null>(null)

  const handleClickViewButton = (category: Category) => {
    setIsOpenViewModal(true)
    setViewCategoryData(category)
  }

  const handleClickEditButton = (category: Category) => {
    setIsOpenEditModal(true)
    setEditCategoryData(category)
  }

  const handleClickDeleteButton = (category: Category) => {
    setIsOpenConfirmDeleteModal(true)
    setDeleteCategoryData(category)
  }

  const openCreateModal = () => {
    setIsOpenCreateModal(true)
  }

  const handleRefetchData = () => {
    refetch()
  }

  if (!categories || categories.length === 0) return null
  return (
    <div>
      <div className='mb-3 flex h-16 items-center justify-between bg-cyan-600 px-5'>
        <h1 className='text-xl font-semibold capitalize text-white'>Quản lý thể loại</h1>
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

            <span>Thêm thể loại</span>
          </button>
        </div>
      </div>

      <Table
        categories={categories}
        pageSize={pageSize}
        queryConfig={queryConfig}
        handleClickViewButton={handleClickViewButton}
        handleClickEditButton={handleClickEditButton}
        handleClickDeleteButton={handleClickDeleteButton}
      />

      <ViewModal isOpen={isOpenViewModal} setIsOpen={setIsOpenViewModal} category={viewCategoryData as Category} />

      <EditModal
        isOpen={isOpenEditModal}
        setIsOpen={setIsOpenEditModal}
        category={editCategoryData as Category}
        handleRefetchData={handleRefetchData}
      />

      <CreateModal isOpen={isOpenCreateModal} setIsOpen={setIsOpenCreateModal} handleRefetchData={handleRefetchData} />

      <ConfirmDeleteModal
        isOpen={isOpenConfirmDeleteModal}
        setIsOpen={setIsOpenConfirmDeleteModal}
        category={deleteCategoryData}
        handleRefetchData={handleRefetchData}
      />
    </div>
  )
}

export default CategoryManagement

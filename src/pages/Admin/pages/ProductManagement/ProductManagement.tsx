import { useEffect, useMemo, useState } from 'react'
import useTitle from 'src/hooks/useTitle'
import { useQuery } from '@tanstack/react-query'
import { isUndefined, omitBy } from 'lodash'
import { useForm } from 'react-hook-form'

import productApi from 'src/apis/product.api'
import Table from './Table'
import categoryApi from 'src/apis/category.api'
import { Product, ProductListConfig } from 'src/types/product.type'
import status from 'src/constants/status'
import useQueryParams from 'src/hooks/useQueryParams'
import { yupResolver } from '@hookform/resolvers/yup'
import ViewModal from './ViewModal'
import { Category } from 'src/types/category.type'
import EditModal from './EditModal'
import CreateModal from './CreateModal'

export interface ProductType extends Product {
  category_name: string
}

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

function ProductManagement() {
  useTitle('Trang Quản Trị - Quản Lý Sản Phẩm')

  const queryParams = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || '5',
      status: queryParams.status || '1',
      category_id: queryParams.category_id
    },
    isUndefined
  )

  const { data: categoryData } = useQuery({
    queryKey: ['categories', { status: status.inStore }],
    queryFn: () => categoryApi.getCategories({ status: status.inStore })
  })
  const { data: productData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => productApi.getProducts(queryConfig as ProductListConfig),
    keepPreviousData: true
  })

  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false)
  const [isOpenViewModal, setIsOpenViewModal] = useState<boolean>(false)
  const [viewProductData, setViewProductData] = useState<Product | null>(null)
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false)
  const [editProductData, setEditProductData] = useState<Product | null>(null)

  const pageSize = productData ? Math.ceil(productData.data.paging.total / productData.data.paging.limit) : 1
  const categories = categoryData?.data.data
  const products = useMemo(() => {
    const categories = categoryData?.data.data
    const _products = productData?.data.data
    if (categories && _products) {
      return _products.map((product) => {
        const categoryName = categories.find((category) => category.id === product.category_id)?.name as string
        return { ...product, category_name: categoryName }
      })
    }
    return []
  }, [categoryData, productData])

  const handleClickViewButton = (product: Product) => {
    setIsOpenViewModal(true)
    setViewProductData(product)
  }

  const handleClickEditButton = (product: Product) => {
    setIsOpenEditModal(true)
    setEditProductData(product)
  }

  const openCreateModal = () => {
    setIsOpenCreateModal(true)
  }

  if (!products || products.length === 0) return null
  return (
    <div>
      <div className='mb-3 flex h-16 items-center justify-between bg-cyan-600 px-5'>
        <div className='text-xl font-semibold capitalize text-white'>Quản lý sản phẩm</div>
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

            <span>Thêm sản phẩm</span>
          </button>
        </div>
      </div>

      <Table
        products={products}
        pageSize={pageSize}
        queryConfig={queryConfig}
        handleClickViewButton={handleClickViewButton}
        handleClickEditButton={handleClickEditButton}
      />

      <ViewModal
        isOpen={isOpenViewModal}
        setIsOpen={setIsOpenViewModal}
        product={viewProductData}
        categories={categories as Category[]}
      />

      <EditModal
        isOpen={isOpenEditModal}
        setIsOpen={setIsOpenEditModal}
        product={editProductData}
        categories={categories as Category[]}
      />

      <CreateModal isOpen={isOpenCreateModal} setIsOpen={setIsOpenCreateModal} categories={categories as Category[]} />
    </div>
  )
}

export default ProductManagement
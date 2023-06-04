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

  if (!products || products.length === 0) return null
  return (
    <div>
      <div className='mb-3 flex h-16 items-center justify-between bg-cyan-600 px-5'>
        <div className='text-xl font-semibold capitalize text-white'>Quản lý sản phẩm</div>
        <div className='px-4'>
          <button className='flex items-center justify-center gap-1 rounded bg-white px-3 py-2 text-sm font-medium text-black transition-colors duration-200 hover:bg-white/80 active:bg-white/75'>
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

      {/* View modal */}
      {/* <Modal headingTitle='Xem sản phẩm' isOpen={isOpenViewModal} setIsOpen={setIsOpenViewModal}>
        <form onSubmit={onSubmit}>
          <div className='py-4'>
            <div className='grid grid-cols-12 gap-3'>
              <div className='col-span-12'>
                <div className='text-sm font-medium'>ID</div>
                <Input className='mt-2' disabled value={viewProductData?.id} />
              </div>

              <div className='col-span-12'>
                <div className='text-sm font-medium'>Tên</div>
                <Input className='mt-2' name='name' register={register} />
              </div>

              <div className='col-span-12'>
                <div className='text-sm font-medium'>Mô tả</div>
                <textarea
                  className='min-h-[100px] w-full border border-gray-300 p-2 text-sm outline-none focus:border-gray-400'
                  {...register('description')}
                />
              </div>

              <div className='col-span-6'>
                <div className='text-sm font-medium'>Đơn giá</div>
                <Input className='mt-2' name='price' register={register} />
              </div>

              <div className='col-span-6'>
                <div className='text-sm font-medium'>Số lượng</div>
                <Input className='mt-2' name='quantity' register={register} />
              </div>

              <div className='col-span-6'>
                <div className='text-sm font-medium'>Thể loại</div>
                <select
                  className='mt-2 w-full border border-gray-300 p-2 text-sm outline-none focus:border-gray-400'
                  {...register('category_id')}
                >
                  <option value='' disabled>
                    -- Thể loại --
                  </option>
                  {categories?.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className='col-span-3'>
                <div className='text-sm font-medium'>Trạng thái</div>
                <Input className='mt-2' disabled value={viewProductData?.status} />
              </div>

              <div className='col-span-3'>
                <div className='text-sm font-medium'>Tổng đánh giá</div>
                <Input className='mt-2' disabled value={viewProductData?.total_rating} />
              </div>

              <div className='col-span-12'>
                <label
                  htmlFor='abc'
                  className={classNames(
                    'mt-3 inline-flex select-none items-center justify-center gap-1 rounded bg-cyan-400 px-3 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-cyan-500 active:bg-cyan-600'
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
                  type='file'
                  accept='image/png, image/jpeg'
                  errorClassName='none'
                  hidden
                  name='images'
                  register={register}
                />
                <div className='mt-3 flex min-h-[160px] flex-wrap items-center justify-center gap-2 rounded border px-4'>
                  {images && images.length > 0 ? (
                    images.map((image) => (
                      <div key={image.url} className='h-[150px] w-[140px]'>
                        <img
                          className='h-full w-full object-cover'
                          src={image.url}
                          alt={`${image.width}px ${image.height}px`}
                        />
                      </div>
                    ))
                  ) : (
                    <span className='text-sm text-gray-400'>Preview image</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className='h-[1px] bg-gray-200'></div>

          <div className='flex items-center justify-end gap-1 px-4 py-3'>
            <Button
              type='button'
              className='group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-pink-200 group-hover:from-pink-500 group-hover:to-orange-400 dark:text-white dark:focus:ring-pink-800'
              onClick={handleCloseViewModal}
            >
              <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
                Thoát
              </span>
            </Button>

            <Button
              type='submit'
              className='group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800'
            >
              <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
                Đồng ý
              </span>
            </Button>
          </div>
        </form>
      </Modal> */}
    </div>
  )
}

export default ProductManagement

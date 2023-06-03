import { useMemo, useState } from 'react'
import useTitle from 'src/hooks/useTitle'
import { useQuery } from '@tanstack/react-query'
import productApi from 'src/apis/product.api'
import Table from './Table'
import Modal from 'src/components/Modal'
import Input from 'src/components/Input'
import categoryApi from 'src/apis/category.api'
import { Product, ProductListConfig } from 'src/types/product.type'
import { CategoryListConfig } from 'src/types/category.type'

export interface ProductType extends Product {
  category_name: string
}

function ProductManagement() {
  useTitle('Trang Quản Trị - Quản Lý Sản Phẩm')

  const productParams: ProductListConfig = {
    limit: 5,
    status: 1
  }

  const categoryParams: CategoryListConfig = {
    status: 1
  }
  const { data: categoryData } = useQuery({
    queryKey: ['categories', categoryParams],
    queryFn: () => categoryApi.getCategories(categoryParams)
  })
  const { data: productData } = useQuery({
    queryKey: ['products', productParams],
    queryFn: () => productApi.getProducts(productParams)
  })

  const [isShowViewModal, setIsShowViewModal] = useState<boolean>(false)
  const [viewProductData, setViewProductData] = useState<Product | null>(null)

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

  const openViewModal = (product: Product) => {
    setIsShowViewModal(true)
    setViewProductData(product)
  }

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

      <Table products={products} handleClickViewButton={openViewModal} />

      {/* View modal */}
      <Modal type='VIEW' headingTitle='Xem sản phẩm' isOpen={isShowViewModal} setIsOpen={setIsShowViewModal}>
        <div className='py-4'>
          <div className='grid grid-cols-12 gap-3'>
            <div className='col-span-12 lg:col-span-4'>
              <div className='text-sm font-medium'>ID</div>
              <Input className='mt-2' disabled name='id' />
            </div>

            <div className='col-span-12 lg:col-span-4'>
              <div className='text-sm font-medium'>Họ và tên đệm</div>
              <Input className='mt-2' name='first_name' />
            </div>

            <div className='col-span-12 lg:col-span-4'>
              <div className='text-sm font-medium'>Tên</div>
              <Input className='mt-2' name='last_name' />
            </div>
          </div>

          <div className='grid grid-cols-12 gap-3'>
            <div className='col-span-12 lg:col-span-4'>
              <div className='text-sm font-medium'>Email</div>
              <Input className='mt-2' name='email' />
            </div>

            <div className='col-span-12 lg:col-span-4'>
              <div className='text-sm font-medium'>Mật khẩu</div>
              <Input type='password' className='mt-2' name='password' />
            </div>

            <div className='col-span-12 lg:col-span-4'>
              <div className='text-sm font-medium'>Số điện thoại</div>
              <Input className='mt-2' name='phone' />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ProductManagement

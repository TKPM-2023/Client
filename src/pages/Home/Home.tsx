import { Helmet } from 'react-helmet-async'
import { Typography } from '@material-tailwind/react'
import { useQuery } from '@tanstack/react-query'
import useQueryParams from 'src/hooks/useQueryParams'

import HomeCarousel from './components/HomeCarousel'
import HomeCategory from './components/HomeCategory'
import ListProduct from './components/ListProduct'
import status from 'src/constants/status'

import categoryApi from 'src/apis/category.api'
import productApi from 'src/apis/product.api'
import { Category, CategoryListConfig } from 'src/types/category.type'
import { Product, ProductListConfig } from 'src/types/product.type'

function Home() {
  const queryParams = useQueryParams()
  const categoryQueryConfig: CategoryListConfig = {
    limit: '10'
  }
  const productQueryConfig: ProductListConfig = {
    status: String(status.inStore),
    limit: '8',
    page: queryParams.page || '1'
  }

  const { data: categoryData } = useQuery({
    queryKey: ['categories', categoryQueryConfig],
    queryFn: () => categoryApi.getCategoriesFromUser(categoryQueryConfig),
    keepPreviousData: true
  })

  const { data: productData } = useQuery({
    queryKey: ['products', productQueryConfig],
    queryFn: () => productApi.getProductsFromUser(productQueryConfig),
    keepPreviousData: true
  })

  const pageSize = productData ? Math.ceil(productData.data.paging.total / productData.data.paging.limit) : 1
  const categories = categoryData?.data.data
  const products = productData?.data.data

  return (
    <>
      <div className='h-full bg-gray-100 py-10'>
        <Helmet>
          <title>Nón Trùm | Trang chủ</title>
          <meta name='description' content='Trang chủ' />
        </Helmet>
        <div className='container h-full'>
          <div className='h-[480px]'>
            <HomeCarousel />
          </div>
          <div>
            <HomeCategory categories={categories as Category[]} />
          </div>
          <div className='mb-4 text-center'>
            <Typography color='blue-gray' variant='h3' className='font-bold'>
              Tất cả sản phẩm
            </Typography>
          </div>
          <div className='ml-16'>
            <ListProduct products={products as Product[]} productQueryConfig={productQueryConfig} pageSize={pageSize} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home

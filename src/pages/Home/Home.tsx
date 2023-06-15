import { Helmet } from 'react-helmet-async'
import { Typography } from '@material-tailwind/react'
import { useQuery } from '@tanstack/react-query'

import HomeCarousel from './components/HomeCarousel'
import HomeCategory from './components/HomeCategory'
import ListProduct from './components/ListProduct'
import status from 'src/constants/status'

import categoryApi from 'src/apis/category.api'
import productApi from 'src/apis/product.api'
import { Category, CategoryListConfig } from 'src/types/category.type'
import { Product, ProductListConfig } from 'src/types/product.type'

function Home() {
  const categoryQueryConfig: CategoryListConfig = {
    limit: '10'
  }
  const productQueryConfig: ProductListConfig = {
    status: String(status.inStore),
    limit: '12'
  }

  const { data: categoryData, refetch: refetchCategory } = useQuery({
    queryKey: ['categories', categoryQueryConfig],
    queryFn: () => categoryApi.getCategories(categoryQueryConfig),
    keepPreviousData: true
  })

  const { data: productData, refetch: refetchProduct } = useQuery({
    queryKey: ['products', productQueryConfig],
    queryFn: () => productApi.getProducts(productQueryConfig),
    keepPreviousData: true
  })

  const categories = categoryData?.data.data
  const products = productData?.data.data

  const handlefecth = () => {
    refetchCategory()
    refetchProduct()
  }

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
          <div>
            <ListProduct products={products as Product[]} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home

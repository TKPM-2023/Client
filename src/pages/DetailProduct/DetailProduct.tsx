import { Helmet } from 'react-helmet-async'
import productApi from 'src/apis/product.api'
import categoryApi from 'src/apis/category.api'
import { Product, RatingType } from 'src/types/product.type'
import { Category } from 'src/types/category.type'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import ProductBreadcrumbs from './components/ProductBreadcrumbs'
import ProductInfor from './components/ProductInfor'
import SimilarProduct from './components/SimilarProduct'
import ProductReview from './components/ProductReview'

function DetailProduct() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  })
  const { id } = useParams()
  const categoryId = id?.split('-')[0]
  const productId = id?.split('-')[1]

  const { data: productData, refetch } = useQuery({
    queryKey: ['productDetail', id],
    queryFn: () => productApi.getProductDetailFromUser(productId as string),
    keepPreviousData: true
  })

  const productDetail = productData?.data.data

  const { data: categoryData } = useQuery({
    queryKey: ['categoryDetail'],
    queryFn: () => categoryApi.getCategoryDetailFromUser(categoryId as string)
  })

  const categoryDetail = categoryData?.data.data

  const handleRefetchData = () => {
    refetch()
  }

  return (
    <div className='h-full bg-gray-100 py-10'>
      <Helmet>
        <title>Thông tin sản phẩm | Nón Trùm</title>
        <meta name='description' content='Trang chủ' />
      </Helmet>
      <div className='container h-full'>
        <div>
          <ProductBreadcrumbs category={categoryDetail as Category} product={productDetail as Product} />
        </div>
        <div className=''>
          <ProductInfor product={productDetail as Product} />
        </div>
        <div className=''>
          <SimilarProduct category={categoryDetail as Category} handleRefetchData={handleRefetchData} />
        </div>
        <div className=''>
          <ProductReview ratings={productDetail?.ratings as RatingType[]} />
        </div>
      </div>
    </div>
  )
}

export default DetailProduct

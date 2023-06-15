import { Helmet } from 'react-helmet-async'

import ProductBreadcrumbs from './components/ProductBreadcrumbs'
import ProductInfor from './components/ProductInfor'
import SimilarProduct from './components/SimilarProduct'
import ProductReview from './components/ProductReview'

function DetailProduct() {
  return (
    <div className='h-full bg-gray-100 py-10'>
      <Helmet>
        <title>Nón Trùm | Thông tin sản phẩm</title>
        <meta name='description' content='Trang chủ' />
      </Helmet>
      <div className='container h-full'>
        <div>
          <ProductBreadcrumbs />
        </div>
        <div className=''>
          <ProductInfor />
        </div>
        <div className=''>
          <SimilarProduct />
        </div>
        <div className=''>
          <ProductReview />
        </div>
      </div>
    </div>
  )
}

export default DetailProduct

import { Helmet } from 'react-helmet-async'

import ListProductInCart from './components/ListProductInCart'
import SumaryOrder from './components/SumaryOrder'

function Cart() {
  return (
    <>
      <div className='h-full bg-gray-100 py-10'>
        <Helmet>
          <title>Nón Trùm | Giỏ hàng</title>
          <meta name='description' content='Trang chủ' />
        </Helmet>
        <div className='container h-full '>
          <div className='flex w-full gap-4'>
            <ListProductInCart />

            <SumaryOrder />
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart

import { Helmet } from 'react-helmet-async'
import SumaryOrder from './components/SumaryOrder'
import OrderInfor from './components/OrderInfo'

function Order() {
  return (
    <>
      <div className='h-full bg-gray-100 py-10'>
        <Helmet>
          <title>Nón Trùm | Giỏ hàng</title>
          <meta name='description' content='Trang chủ' />
        </Helmet>
        <div className='container h-full '>
          <div className='flex w-full gap-4'>
            <OrderInfor />
            <SumaryOrder />
          </div>
        </div>
      </div>
    </>
  )
}

export default Order

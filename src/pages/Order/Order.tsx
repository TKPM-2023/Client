import { Helmet } from 'react-helmet-async'
import SumaryOrder from './components/SumaryOrder'
import OrderInfor from './components/OrderInfo'
import { AppContext } from 'src/contexts/app.context'
import { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import images from 'src/assets/images'
import { useQuery } from '@tanstack/react-query'
import contactApi from 'src/apis/contact.api'
import { AddressType, ContactListConfig } from 'src/types/contact.type'

function Order() {
  const { listProductIsOrdering, profile } = useContext(AppContext)
  const [totalCost, setTotalCost] = useState<number>(0)
  const [deliveryCost, setDeliveryCost] = useState<number>(50000)

  useEffect(() => {
    const tempTotalCost = listProductIsOrdering.reduce(
      (accumulator, item) => accumulator + item.price * item.quantity,
      0
    )
    setTotalCost(tempTotalCost)
  }, [listProductIsOrdering])

  const contactQueryConfig: ContactListConfig = {
    user_id: `"${profile?.id}"`,
    status: 1
  }
  const { data: contactData } = useQuery({
    queryKey: ['address', contactQueryConfig],
    queryFn: () => contactApi.getListContact(contactQueryConfig),
    keepPreviousData: true
  })

  const contactList = contactData?.data.data
  return (
    <>
      <div className='h-full bg-gray-100 py-10'>
        <Helmet>
          <title>Nón Trùm | Giỏ hàng</title>
          <meta name='description' content='Trang chủ' />
        </Helmet>
        {listProductIsOrdering.length === 0 ? (
          <div className='mb-16 text-center'>
            <img src={images.emptyCart} alt='empty-cart' className='inline-block mix-blend-darken md:w-1/3' />
            <p className='mb-4 text-base font-medium md:mb-3'>Bạn chưa chọn sẩn phẩm nào để mua!</p>
            <button
              type='button'
              className='ant-btn css-1e3x2xa ant-btn-default h-12 w-full rounded-md bg-[#9333EA] text-base font-bold text-white md:w-72'
            >
              <Link to='/my-cart'>Vào giỏ hàng chọn nào :))</Link>
            </button>
          </div>
        ) : (
          <div className='container h-full '>
            <div className='flex w-full gap-4'>
              <OrderInfor listProductIsOrdering={listProductIsOrdering} setDeliveryCost={setDeliveryCost} />
              <SumaryOrder addresses={contactList as AddressType[]} totalCost={totalCost} deliveryCost={deliveryCost} />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Order

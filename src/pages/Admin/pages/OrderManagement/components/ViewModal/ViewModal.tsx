import { useMemo } from 'react'
import Modal from 'src/components/Modal'
import { OrderType } from 'src/types/order.type'
import { formatDate, formatNumber } from 'src/utils/utils'

interface Props {
  order: OrderType
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function ViewModal({ order, isOpen, setIsOpen }: Props) {
  const totalDiscount = useMemo(() => {
    if (!order) return 0
    return order.products.reduce((acc, product) => {
      return acc + product.discount
    }, 0)
  }, [order])

  const shippingFee = useMemo(() => {
    if (!order) return 0
    return order.products.reduce((acc, product) => {
      return acc - product.price
    }, order.total_price)
  }, [order])

  if (!order) return null
  return (
    <Modal headingTitle='Hóa đơn' isOpen={isOpen} setIsOpen={setIsOpen}>
      <div>
        <div className='py-4'>
          <div className='grid grid-cols-12'>
            <div className='col-span-4'>
              <div className=''>
                <span className='text-md font-bold capitalize'>ID:</span>
                <span className='text-sm font-medium'> #{order.id}</span>
              </div>
              <div className='mt-1'>
                <span className='text-md font-bold capitalize'>Ngày đặt:</span>
                <span className='text-sm font-medium'> {formatDate(order.created_at)}</span>
              </div>
            </div>

            <div className='col-span-4'>
              <div className=''>
                <span className='text-md font-bold capitalize'>Người đặt:</span>
                <span className='text-sm italic'> {order.contact.name}</span>
                <p className='text-sm italic'>
                  {order.contact.addr}
                  <br />
                  {order.contact.phone}
                </p>
              </div>
            </div>

            <div className='col-span-4'>
              <div className=''>
                <span className='text-md font-bold capitalize'>Người nhận:</span>
                <span className='text-sm italic'> {order.contact.name}</span>
                <p className='text-sm italic'>
                  {order.contact.addr}
                  <br />
                  {order.contact.phone}
                </p>
              </div>
            </div>
          </div>

          <div className='mt-8'>
            <div className='border-b border-gray-200 shadow'>
              <table className='w-full text-gray-900'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='px-4 py-2 text-xs'>#</th>
                    <th className='px-4 py-2 text-xs'>Mặt hàng</th>
                    <th className='px-4 py-2 text-xs'>Số lượng</th>
                    <th className='px-4 py-2 text-xs'>Đơn giá</th>
                    <th className='px-4 py-2 text-xs'>Giảm giá</th>
                    <th className='px-4 py-2 text-xs'>Tổng tiền</th>
                  </tr>
                </thead>
                <tbody className='bg-white text-center'>
                  {order.products.map((product, index) => (
                    <tr key={product.product_origin.id} className='whitespace-nowrap'>
                      <td className='px-6 py-4 text-sm'>{index + 1}</td>
                      <td className='px-6 py-4'>
                        <div className='text-sm'>{product.product_origin.name}</div>
                      </td>
                      <td className='px-6 py-4'>
                        <div className='text-sm'>{product.quantity}</div>
                      </td>
                      <td className='px-6 py-4 text-sm'>{formatNumber(product.price / product.quantity)}</td>
                      <td className='px-6 py-4 text-sm'>{product.discount}</td>
                      <td className='px-6 py-4 font-semibold'>{formatNumber(product.price)}</td>
                    </tr>
                  ))}

                  <tr className=''>
                    <td colSpan={4}></td>
                    <td className='text-sm font-bold'>Tổng giảm</td>
                    <td className='text-sm font-bold tracking-wider'>
                      <b>{totalDiscount}</b>
                    </td>
                  </tr>
                  <tr className=''>
                    <td colSpan={4}></td>
                    <td className='text-sm font-bold'>Phí ship</td>
                    <td className='text-sm font-bold tracking-wider'>
                      <b>{formatNumber(shippingFee)}</b>
                    </td>
                  </tr>
                  <tr className='bg-gray-800 text-white'>
                    <th colSpan={4}></th>
                    <td className='text-sm font-bold'>
                      <b>Tổng tiền</b>
                    </td>
                    <td className='text-sm font-bold'>
                      <b>{formatNumber(order.total_price)} VNĐ</b>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className='mt-3 h-0.5 w-full bg-indigo-500'></div>

        <div className='p-4'>
          <div className='flex items-end justify-end space-x-3'>
            <button className='bg-blue-100 px-4 py-2 text-sm text-blue-600'>Lưu</button>
            <button onClick={() => setIsOpen(false)} className='bg-red-100 px-4 py-2 text-sm text-red-600'>
              Thoát
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ViewModal

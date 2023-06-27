import classNames from 'classnames'
import { formatDate, formatNumber, renderOrderStatus } from 'src/utils/utils'
import Pagination from 'src/components/Pagination'
import routes from 'src/constants/routes'
import { createSearchParams } from 'react-router-dom'
import { QueryConfig } from '../Dashboard/Dashboard'
import { OrderType } from 'src/types/order.type'
import { orderStatus } from 'src/constants/order'

interface Props {
  orders: OrderType[]
  pageSize: number
  queryConfig: QueryConfig
  handleClickViewButton: (order: OrderType) => void
}

function Table({ orders, pageSize, queryConfig, handleClickViewButton }: Props) {
  return (
    <div className='px-5'>
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-left text-sm text-black dark:text-white'>
          <thead className='bg-gray-50 uppercase text-gray-700 dark:bg-gray-700 dark:text-white'>
            <tr>
              <th scope='col' className='px-4 py-3'>
                ID
              </th>
              <th scope='col' className='px-4 py-3'>
                Số đơn
              </th>
              <th scope='col' className='px-4 py-3'>
                Ngày đặt
              </th>
              <th scope='col' className='px-4 py-3'>
                Tổng tiền
              </th>
              <th scope='col' className='px-4 py-3'>
                Trạng thái
              </th>
              <th scope='col' className='px-4 py-3'>
                Khách
              </th>
              <th scope='col' className='px-4 py-3'>
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>
            {orders?.length === 0 && (
              <tr className='border-b bg-white hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-600'>
                <td colSpan={7} className='px-4 py-2 text-center text-base font-medium text-gray-800'>
                  Không có đơn
                </td>
              </tr>
            )}
            {orders?.length > 0 &&
              orders.map((order, index) => {
                return (
                  <tr
                    key={order.id}
                    className={classNames('border-b hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-600', {
                      'bg-gray-50 dark:bg-gray-800': index % 2 !== 0,
                      'bg-white dark:bg-gray-900': index % 2 === 0
                    })}
                  >
                    <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white'>
                      {order.id}
                    </th>
                    <td className='px-4 py-2'>{order.products.length}</td>
                    <td className='px-4 py-2'>{formatDate(order.created_at)}</td>
                    <td className='px-4 py-2'>{formatNumber(order.total_price)}</td>
                    <td className='px-4 py-2'>
                      <span
                        className={classNames(
                          'relative select-none items-center rounded-full px-2 py-1 font-sans text-xs font-bold uppercase',
                          {
                            'bg-red-500/20 text-red-900': order.order_status === orderStatus.waitForConfirmation,
                            'bg-blue-500/20 text-blue-900': order.order_status === orderStatus.inProgress,
                            'bg-green-100 text-green-800': order.order_status === orderStatus.completed
                          }
                        )}
                      >
                        {renderOrderStatus(order.order_status)}
                      </span>
                    </td>
                    <td className='px-4 py-2'>{order.contact.name}</td>
                    <td className='px-4 py-2'>
                      <div className='flex items-center gap-2'>
                        <button
                          onClick={() => handleClickViewButton(order)}
                          className='text-blue-600 hover:underline dark:text-blue-500'
                        >
                          Xem chi tiết
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>

      <Pagination
        pageSize={pageSize}
        queryConfig={queryConfig}
        to={(page: number) => ({
          pathname: routes.manageOrders,
          search: createSearchParams({ ...queryConfig, page: page.toString() }).toString()
        })}
      />
    </div>
  )
}

export default Table

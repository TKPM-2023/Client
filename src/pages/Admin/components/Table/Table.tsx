import classNames from 'classnames'
import { formatDate, renderOrderStatus, renderRole, renderStatus } from 'src/utils/utils'
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
}

function Table({ orders, pageSize, queryConfig }: Props) {
  const page = Number(queryConfig.page)
  const limit = Number(queryConfig.limit)

  return (
    <div className='px-5'>
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-left text-sm text-black dark:text-white'>
          <thead className='bg-gray-50 uppercase text-gray-700 dark:bg-gray-700 dark:text-white'>
            <tr>
              <th scope='col' className='px-4 py-3'>
                Số đơn
              </th>
              <th scope='col' className='px-4 py-3'>
                Ngày đặt
              </th>
              <th scope='col' className='px-4 py-3'>
                Trạng thái
              </th>
              <th scope='col' className='px-4 py-3'>
                Khách
              </th>
              <th scope='col' className='px-4 py-3'>
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {orders?.length === 0 && (
              <tr className='border-b bg-white hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-600'>
                <td colSpan={5} className='px-4 py-2 text-center text-base font-medium text-gray-800'>
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
                      {order.products.length}
                    </th>
                    <td className='px-4 py-2'>{formatDate(order.created_at)}</td>
                    <td className='px-4 py-2'>
                      <span
                        className={classNames('rounded  px-2.5 py-0.5 text-sm font-medium ', {
                          'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300':
                            order.order_status === orderStatus.waitForConfirmation,
                          'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300':
                            order.order_status === orderStatus.inProgress,
                          'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300':
                            order.order_status === orderStatus.completed
                        })}
                      >
                        {renderOrderStatus(order.order_status)}
                      </span>
                    </td>
                    <td className='px-4 py-2'>{order.contact.name}</td>
                    <td className='px-4 py-2'>
                      <div className='flex items-center gap-2'></div>
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
          pathname: routes.admin,
          search: createSearchParams({ ...queryConfig, page: page.toString() }).toString()
        })}
      />
    </div>
  )
}

export default Table

import classNames from 'classnames'
import { formatDate, formatNumber, renderOrderStatus } from 'src/utils/utils'
import Pagination from 'src/components/Pagination'
import routes from 'src/constants/routes'
import { createSearchParams } from 'react-router-dom'
import { OrderType } from 'src/types/order.type'
import { orderStatus } from 'src/constants/order'
import { QueryConfig } from '../../OrderManagement'
import { OrderStatusParams } from 'src/types/utils.type'

interface Props {
  orders: OrderType[]
  pageSize: number
  queryConfig: QueryConfig
  handleClickViewButton: (order: OrderType) => void
  handleUpdateOrderStatus: (orderId: string, orderStatus: OrderStatusParams) => void
}

function Table({ orders, pageSize, queryConfig, handleClickViewButton, handleUpdateOrderStatus }: Props) {
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
                          'relative inline-flex select-none items-center gap-1 rounded-full px-2 py-1 font-sans text-xs font-bold uppercase',
                          {
                            'bg-red-500/20 text-red-900': order.order_status === orderStatus.waitForConfirmation,
                            'bg-blue-500/20 text-blue-900': order.order_status === orderStatus.inProgress,
                            'bg-green-100 text-green-800': order.order_status === orderStatus.completed,
                            'bg-yellow-500/20 text-yellow-900': order.order_status === orderStatus.canceled
                          }
                        )}
                      >
                        {renderOrderStatus(order.order_status)}
                      </span>
                    </td>
                    <td className='px-4 py-2'>{order.contact.name}</td>
                    <td className='px-4 py-2'>
                      <div className='flex items-center gap-3'>
                        <button
                          onClick={() => handleClickViewButton(order)}
                          className='flex items-center gap-1 text-blue-600 hover:underline dark:text-blue-500'
                        >
                          Xem chi tiết
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                            fill='currentColor'
                            className='h-4 w-4'
                          >
                            <path d='M11.625 16.5a1.875 1.875 0 100-3.75 1.875 1.875 0 000 3.75z' />
                            <path
                              fillRule='evenodd'
                              d='M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zm6 16.5c.66 0 1.277-.19 1.797-.518l1.048 1.048a.75.75 0 001.06-1.06l-1.047-1.048A3.375 3.375 0 1011.625 18z'
                              clipRule='evenodd'
                            />
                            <path d='M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z' />
                          </svg>
                        </button>

                        {order.order_status === orderStatus.waitForConfirmation && (
                          <>
                            <button
                              onClick={() => handleUpdateOrderStatus(order.id, orderStatus.inProgress)}
                              className='flex items-center gap-1 text-teal-600 hover:underline dark:text-teal-500'
                            >
                              <>
                                Xác nhận
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  xmlnsXlink='http://www.w3.org/1999/xlink'
                                  viewBox='0 0 422.518 422.518'
                                  xmlSpace='preserve'
                                  className='h-4 w-4 fill-current'
                                >
                                  <path d='M422.512,215.424c0-0.079-0.004-0.158-0.005-0.237c-0.116-5.295-4.368-9.514-9.727-9.514h-2.554l-39.443-76.258  c-1.664-3.22-4.983-5.225-8.647-5.226l-67.34-0.014l2.569-20.364c0.733-8.138-1.783-15.822-7.086-21.638  c-5.293-5.804-12.683-9.001-20.81-9.001h-209c-5.255,0-9.719,4.066-10.22,9.308l-2.095,16.778h119.078  c7.732,0,13.836,6.268,13.634,14c-0.203,7.732-6.635,14-14.367,14H126.78c0.007,0.02,0.014,0.04,0.021,0.059H10.163  c-5.468,0-10.017,4.432-10.16,9.9c-0.143,5.468,4.173,9.9,9.641,9.9H164.06c7.168,1.104,12.523,7.303,12.326,14.808  c-0.216,8.242-7.039,14.925-15.267,14.994H54.661c-5.523,0-10.117,4.477-10.262,10c-0.145,5.523,4.215,10,9.738,10h105.204  c7.273,1.013,12.735,7.262,12.537,14.84c-0.217,8.284-7.109,15-15.393,15H35.792v0.011H25.651c-5.523,0-10.117,4.477-10.262,10  c-0.145,5.523,4.214,10,9.738,10h8.752l-3.423,35.818c-0.734,8.137,1.782,15.821,7.086,21.637c5.292,5.805,12.683,9.001,20.81,9.001  h7.55C69.5,333.8,87.3,349.345,109.073,349.345c21.773,0,40.387-15.545,45.06-36.118h94.219c7.618,0,14.83-2.913,20.486-7.682  c5.172,4.964,12.028,7.682,19.514,7.682h1.55c3.597,20.573,21.397,36.118,43.171,36.118c21.773,0,40.387-15.545,45.06-36.118h6.219  c16.201,0,30.569-13.171,32.029-29.36l6.094-67.506c0.008-0.091,0.004-0.181,0.01-0.273c0.01-0.139,0.029-0.275,0.033-0.415  C422.52,215.589,422.512,215.508,422.512,215.424z M109.597,329.345c-13.785,0-24.707-11.214-24.346-24.999  c0.361-13.786,11.87-25.001,25.655-25.001c13.785,0,24.706,11.215,24.345,25.001C134.89,318.131,123.382,329.345,109.597,329.345z   M333.597,329.345c-13.785,0-24.706-11.214-24.346-24.999c0.361-13.786,11.87-25.001,25.655-25.001  c13.785,0,24.707,11.215,24.345,25.001C358.89,318.131,347.382,329.345,333.597,329.345z M396.457,282.588  c-0.52,5.767-5.823,10.639-11.58,10.639h-6.727c-4.454-19.453-21.744-33.882-42.721-33.882c-20.977,0-39.022,14.429-44.494,33.882  h-2.059c-2.542,0-4.81-0.953-6.389-2.685c-1.589-1.742-2.337-4.113-2.106-6.676l12.609-139.691l28.959,0.006l-4.59,50.852  c-0.735,8.137,1.78,15.821,7.083,21.637c5.292,5.806,12.685,9.004,20.813,9.004h56.338L396.457,282.588z' />
                                </svg>
                              </>
                            </button>

                            <button
                              onClick={() => handleUpdateOrderStatus(order.id, orderStatus.canceled)}
                              className='flex items-center gap-1 text-red-600 hover:underline dark:text-red-500'
                            >
                              Hủy
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 24 24'
                                fill='currentColor'
                                className='h-4 w-4'
                              >
                                <path
                                  fillRule='evenodd'
                                  d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z'
                                  clipRule='evenodd'
                                />
                              </svg>
                            </button>
                          </>
                        )}

                        {order.order_status === orderStatus.inProgress && (
                          <button
                            onClick={() => handleUpdateOrderStatus(order.id, orderStatus.completed)}
                            className='flex items-center gap-1 text-green-600 hover:underline dark:text-green-500'
                          >
                            Hoàn thành
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              viewBox='0 0 24 24'
                              fill='currentColor'
                              className='h-4 w-4'
                            >
                              <path
                                fillRule='evenodd'
                                d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z'
                                clipRule='evenodd'
                              />
                            </svg>
                          </button>
                        )}
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

import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'
import status from 'src/constants/status'
import useQueryParams from 'src/hooks/useQueryParams'
import { OrderListConfig, OrderType } from 'src/types/order.type'
import { useQuery } from '@tanstack/react-query'
import orderApi from 'src/apis/order.api'
import Table from '../Table'
import ViewModal from '../ViewModal'
import { useState } from 'react'
import { renderOrderStatus, renderStatus } from 'src/utils/utils'
import { orderStatus } from 'src/constants/order'
import { FilterType } from 'src/types/utils.type'
import Filter from '../Filter'

const filters: FilterType[] = [
  {
    param: 'limit',
    options: [
      { value: '2', name: '2' },
      { value: '5', name: '5' },
      { value: '10', name: '10' }
    ]
  },
  // {
  //   param: 'status',
  //   options: [
  //     { value: status.inStore, name: renderStatus(status.inStore) },
  //     { value: status.deleted, name: renderStatus(status.deleted) }
  //   ]
  // },
  {
    param: 'order_status',
    options: [
      { value: '', name: 'Trạng thái đơn hàng', disabled: true },
      { value: orderStatus.all, name: renderOrderStatus(orderStatus.all) },
      { value: orderStatus.waitForConfirmation, name: renderOrderStatus(orderStatus.waitForConfirmation) },
      { value: orderStatus.inProgress, name: renderOrderStatus(orderStatus.inProgress) },
      { value: orderStatus.completed, name: renderOrderStatus(orderStatus.completed) }
    ]
  }
]

export type QueryConfig = {
  [key in keyof OrderListConfig]: string
}

function Dashboard() {
  const queryParams = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || '5',
      order_status: queryParams.order_status || orderStatus.all
      // status: queryParams.status || String(status.inStore)
    },
    isUndefined
  )

  const { data: orderData } = useQuery({
    queryKey: ['orders', queryConfig],
    queryFn: () => orderApi.getListOrder(queryConfig),
    keepPreviousData: true
  })

  const pageSize = orderData ? Math.ceil(orderData.data.paging.total / orderData.data.paging.limit) : 1
  const orders = orderData?.data.data

  const [isOpenViewModal, setIsOpenViewModal] = useState<boolean>(false)
  const [viewOrderData, setViewOrderData] = useState<OrderType | null>(null)

  const handleClickViewButton = (order: OrderType) => {
    setIsOpenViewModal(true)
    setViewOrderData(order)
  }

  return (
    <div>
      <div className='px-5'>
        <h1 className='mb-6 text-3xl font-semibold capitalize text-gray-800'>Bảng điều khiển</h1>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-12 w-full lg:col-span-4'>
            <div className='flex items-center rounded-md bg-white px-5 py-6 shadow-sm'>
              <div className='rounded-full bg-indigo-600 bg-opacity-75 p-3'>
                <svg className='h-8 w-8 text-white' viewBox='0 0 28 30' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M18.2 9.08889C18.2 11.5373 16.3196 13.5222 14 13.5222C11.6804 13.5222 9.79999 11.5373 9.79999 9.08889C9.79999 6.64043 11.6804 4.65556 14 4.65556C16.3196 4.65556 18.2 6.64043 18.2 9.08889Z'
                    fill='currentColor'
                  />
                  <path
                    d='M25.2 12.0444C25.2 13.6768 23.9464 15 22.4 15C20.8536 15 19.6 13.6768 19.6 12.0444C19.6 10.4121 20.8536 9.08889 22.4 9.08889C23.9464 9.08889 25.2 10.4121 25.2 12.0444Z'
                    fill='currentColor'
                  />
                  <path
                    d='M19.6 22.3889C19.6 19.1243 17.0927 16.4778 14 16.4778C10.9072 16.4778 8.39999 19.1243 8.39999 22.3889V26.8222H19.6V22.3889Z'
                    fill='currentColor'
                  />
                  <path
                    d='M8.39999 12.0444C8.39999 13.6768 7.14639 15 5.59999 15C4.05359 15 2.79999 13.6768 2.79999 12.0444C2.79999 10.4121 4.05359 9.08889 5.59999 9.08889C7.14639 9.08889 8.39999 10.4121 8.39999 12.0444Z'
                    fill='currentColor'
                  />
                  <path
                    d='M22.4 26.8222V22.3889C22.4 20.8312 22.0195 19.3671 21.351 18.0949C21.6863 18.0039 22.0378 17.9556 22.4 17.9556C24.7197 17.9556 26.6 19.9404 26.6 22.3889V26.8222H22.4Z'
                    fill='currentColor'
                  />
                  <path
                    d='M6.64896 18.0949C5.98058 19.3671 5.59999 20.8312 5.59999 22.3889V26.8222H1.39999V22.3889C1.39999 19.9404 3.2804 17.9556 5.59999 17.9556C5.96219 17.9556 6.31367 18.0039 6.64896 18.0949Z'
                    fill='currentColor'
                  />
                </svg>
              </div>
              <div className='mx-5'>
                <h4 className='text-2xl font-semibold text-gray-700'> 8,282 </h4>
                <div className='text-gray-500'> Người dùng mới </div>
              </div>
            </div>
          </div>
          <div className='col-span-12 w-full lg:col-span-4'>
            <div className='flex items-center rounded-md bg-white px-5 py-6 shadow-sm'>
              <div className='rounded-full bg-blue-600 bg-opacity-75 p-3'>
                <svg className='h-8 w-8 text-white' viewBox='0 0 28 28' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M4.19999 1.4C3.4268 1.4 2.79999 2.02681 2.79999 2.8C2.79999 3.57319 3.4268 4.2 4.19999 4.2H5.9069L6.33468 5.91114C6.33917 5.93092 6.34409 5.95055 6.34941 5.97001L8.24953 13.5705L6.99992 14.8201C5.23602 16.584 6.48528 19.6 8.97981 19.6H21C21.7731 19.6 22.4 18.9732 22.4 18.2C22.4 17.4268 21.7731 16.8 21 16.8H8.97983L10.3798 15.4H19.6C20.1303 15.4 20.615 15.1004 20.8521 14.6261L25.0521 6.22609C25.2691 5.79212 25.246 5.27673 24.991 4.86398C24.7357 4.45123 24.2852 4.2 23.8 4.2H8.79308L8.35818 2.46044C8.20238 1.83722 7.64241 1.4 6.99999 1.4H4.19999Z'
                    fill='currentColor'
                  />
                  <path
                    d='M22.4 23.1C22.4 24.2598 21.4598 25.2 20.3 25.2C19.1403 25.2 18.2 24.2598 18.2 23.1C18.2 21.9402 19.1403 21 20.3 21C21.4598 21 22.4 21.9402 22.4 23.1Z'
                    fill='currentColor'
                  />
                  <path
                    d='M9.1 25.2C10.2598 25.2 11.2 24.2598 11.2 23.1C11.2 21.9402 10.2598 21 9.1 21C7.9402 21 7 21.9402 7 23.1C7 24.2598 7.9402 25.2 9.1 25.2Z'
                    fill='currentColor'
                  />
                </svg>
              </div>
              <div className='mx-5'>
                <h4 className='text-2xl font-semibold text-gray-700'> 200,521 </h4>
                <div className='text-gray-500'> Tổng đơn hàng </div>
              </div>
            </div>
          </div>
          <div className='col-span-12 w-full lg:col-span-4'>
            <div className='flex items-center rounded-md bg-white px-5 py-6 shadow-sm'>
              <div className='rounded-full bg-pink-600 bg-opacity-75 p-3'>
                <svg className='h-8 w-8 text-white' viewBox='0 0 28 28' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M6.99998 11.2H21L22.4 23.8H5.59998L6.99998 11.2Z'
                    fill='currentColor'
                    stroke='currentColor'
                    strokeWidth={2}
                    strokeLinejoin='round'
                  />
                  <path
                    d='M9.79999 8.4C9.79999 6.08041 11.6804 4.2 14 4.2C16.3196 4.2 18.2 6.08041 18.2 8.4V12.6C18.2 14.9197 16.3196 16.8 14 16.8C11.6804 16.8 9.79999 14.9197 9.79999 12.6V8.4Z'
                    stroke='currentColor'
                    strokeWidth={2}
                  />
                </svg>
              </div>
              <div className='mx-5'>
                <h4 className='text-2xl font-semibold text-gray-700'> 215,542 </h4>
                <div className='text-gray-500'> Sản phẩm hiện có </div>
              </div>
            </div>
          </div>

          <div className='col-span-12 w-full lg:col-span-4'>
            <div className='flex items-center rounded-md bg-white px-5 py-6 shadow-sm'>
              <div className='rounded-full bg-pink-600 bg-opacity-75 p-3'>
                <svg className='h-8 w-8 text-white' viewBox='0 0 28 28' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M6.99998 11.2H21L22.4 23.8H5.59998L6.99998 11.2Z'
                    fill='currentColor'
                    stroke='currentColor'
                    strokeWidth={2}
                    strokeLinejoin='round'
                  />
                  <path
                    d='M9.79999 8.4C9.79999 6.08041 11.6804 4.2 14 4.2C16.3196 4.2 18.2 6.08041 18.2 8.4V12.6C18.2 14.9197 16.3196 16.8 14 16.8C11.6804 16.8 9.79999 14.9197 9.79999 12.6V8.4Z'
                    stroke='currentColor'
                    strokeWidth={2}
                  />
                </svg>
              </div>
              <div className='mx-5'>
                <h4 className='text-2xl font-semibold text-gray-700'> 3,000 </h4>
                <div className='text-gray-500'>Thể loại</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='mb-3 mt-10 flex h-16 items-center justify-between bg-cyan-600 px-5'>
        <h1 className='text-xl font-semibold capitalize text-white'>Quản lý đơn hàng</h1>
      </div>

      <Filter filters={filters} queryConfig={queryConfig} />

      <Table
        pageSize={pageSize}
        orders={orders as OrderType[]}
        queryConfig={queryConfig}
        handleClickViewButton={handleClickViewButton}
      />

      <ViewModal isOpen={isOpenViewModal} setIsOpen={setIsOpenViewModal} order={viewOrderData as OrderType} />
    </div>
  )
}

export default Dashboard

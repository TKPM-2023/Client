import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'
import useQueryParams from 'src/hooks/useQueryParams'
import { OrderListConfig, OrderType } from 'src/types/order.type'
import { useMutation, useQuery } from '@tanstack/react-query'
import orderApi, { UploadOrderBody } from 'src/apis/order.api'
import Table from './components/Table'
import ViewModal from './components/ViewModal'
import { useState } from 'react'
import { renderOrderStatus } from 'src/utils/utils'
import { orderStatus } from 'src/constants/order'
import { FilterType, OrderStatusParams } from 'src/types/utils.type'
import Filter from '../../components/Filter'
import { Helmet } from 'react-helmet-async'
import { toast } from 'react-toastify'

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
      { value: '', name: '--Trạng thái đơn hàng--', disabled: true },
      { value: orderStatus.all, name: renderOrderStatus(orderStatus.all) },
      { value: orderStatus.waitForConfirmation, name: renderOrderStatus(orderStatus.waitForConfirmation) },
      { value: orderStatus.inProgress, name: renderOrderStatus(orderStatus.inProgress) },
      { value: orderStatus.completed, name: renderOrderStatus(orderStatus.completed) },
      { value: orderStatus.canceled, name: renderOrderStatus(orderStatus.canceled) }
    ]
  }
]

export type QueryConfig = {
  [key in keyof OrderListConfig]: string
}

function OrderManagement() {
  const queryParams = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || '5',
      order_status: queryParams.order_status || orderStatus.waitForConfirmation
      // status: queryParams.status || String(status.inStore)
    },
    isUndefined
  )

  const { data: orderData, refetch } = useQuery({
    queryKey: ['orders', queryConfig],
    queryFn: () => orderApi.getListOrder(queryConfig),
    keepPreviousData: true
  })

  const updateOrderMutation = useMutation({
    mutationFn: ({ id, body }: { id: string; body: UploadOrderBody }) => orderApi.updateOrder(id, body)
  })

  const pageSize = orderData ? Math.ceil(orderData.data.paging.total / orderData.data.paging.limit) : 1
  const orders = orderData?.data.data

  const [isOpenViewModal, setIsOpenViewModal] = useState<boolean>(false)
  const [viewOrderData, setViewOrderData] = useState<OrderType | null>(null)

  const handleClickViewButton = (order: OrderType) => {
    setIsOpenViewModal(true)
    setViewOrderData(order)
  }

  const handleUpdateOrderStatus = (orderId: string, orderStatus: OrderStatusParams) => {
    updateOrderMutation.mutate(
      { id: orderId, body: { order_status: orderStatus } },
      {
        onSuccess: () => {
          toast.success('Cập nhật trạng thái đơn hàng thành công!', { autoClose: 1000 })
          refetch()
        },
        onError: (error) => {
          console.log(error)
        }
      }
    )
  }

  return (
    <div>
      <Helmet>
        <title>Quản Lí Đơn Hàng | Trang Quản Trị</title>
        <meta name='description' content='Quản lí người dùng dành cho người quản trị' />
      </Helmet>
      <div className='mb-3 flex h-16 items-center justify-between bg-cyan-600 px-5'>
        <h1 className='text-xl font-semibold capitalize text-white'>Quản lý đơn hàng</h1>
      </div>

      <Filter filters={filters} queryConfig={queryConfig} />

      <Table
        pageSize={pageSize}
        orders={orders as OrderType[]}
        queryConfig={queryConfig}
        handleClickViewButton={handleClickViewButton}
        handleUpdateOrderStatus={handleUpdateOrderStatus}
      />

      <ViewModal isOpen={isOpenViewModal} setIsOpen={setIsOpenViewModal} order={viewOrderData as OrderType} />
    </div>
  )
}

export default OrderManagement

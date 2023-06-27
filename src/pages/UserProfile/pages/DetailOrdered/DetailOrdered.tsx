import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import { Typography, Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react'
import BillOrderDetail from './components/BillOrderDetail'
import StatusOrdered from './components/StatusOrdered'
import ListOrderedProduct from './components/ListOrderedProduct'
import CustomerDetail from './components/CustomerDetail'
import routes from 'src/constants/routes'
import orderApi from 'src/apis/order.api'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { OrderType } from 'src/types/order.type'
import { toast } from 'react-toastify'

function DetailOrdered() {
  const navigate = useNavigate()
  const [status, setStatus] = useState<number>(0)
  const { orderId } = useParams()
  const { data: orderData } = useQuery({
    queryKey: ['detailOrder', orderId],
    queryFn: () => orderApi.getDetailOrder(orderId as string),
    keepPreviousData: true
  })

  const deleteOrderMutation = useMutation({
    mutationFn: () => orderApi.deleteOrder(orderId as string),
    onSuccess: () => {
      toast.success('Hủy đơn hàng thành công')
      navigate('/profile/my-oders')
    }
  })
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(!open)

  const hanldeButtonCancel = () => {
    deleteOrderMutation.mutate()
    setOpen(false)
  }

  const detailOrder = orderData?.data.data

  useEffect(() => {
    let updatedStatus = status

    if (detailOrder?.status !== 0) {
      updatedStatus = detailOrder?.order_status as number
    } else {
      updatedStatus = -1
    }

    setStatus(updatedStatus)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailOrder?.order_status, detailOrder?.status])

  return (
    <>
      <div className='bg-gray-300 px-2 py-6'>
        <div className='rounded bg-white p-8 shadow'>
          {' '}
          <div className='  border-b border-gray-400 text-start'>
            <div className='flex justify-between'>
              <div className=' flex items-center gap-2'>
                <Link to={routes.userOrders}>
                  <ChevronLeftIcon className='h-6 w-6 hover:text-blue-700'></ChevronLeftIcon>
                </Link>
                <h1 className='text-2xl font-bold text-gray-700'>
                  Đơn hàng <span className='text-blue-700'>#{detailOrder?.id.slice(-5).toUpperCase()}</span>
                </h1>{' '}
              </div>
              <Button onClick={handleOpen} disabled={status === 2 || status === 1 ? true : false} color='red'>
                Hủy đơn hàng
              </Button>
            </div>
            <div className='mt-4 flex justify-center text-start text-gray-500'></div>{' '}
          </div>
          {/* Body */}
          <div className='flex h-full gap-12'>
            <div className='flex h-full flex-col'>
              {/* Trạng thái */}
              <StatusOrdered status={status} />
              <div className='mb-3 flex justify-center'>
                <div className=' grid w-[720px] grid-cols-[300px_120px_120px_135px_25px] rounded-md bg-gray-200 p-2.5'>
                  <div color='blue-gray' className='flex items-center font-bold'>
                    <Typography color='blue-gray' className='flex items-center text-[15px] font-bold'>
                      Thông tin sản phẩm
                    </Typography>
                  </div>
                  <Typography variant='small' color='blue-gray' className='flex items-center font-bold'>
                    Đơn giá
                  </Typography>
                  <Typography variant='small' color='blue-gray' className='flex items-center font-bold'>
                    Số lượng
                  </Typography>
                  <Typography variant='small' color='blue-gray' className='flex items-center font-bold'>
                    Thành tiền
                  </Typography>
                  <div></div>
                </div>
              </div>
              {/* Danh sách sản phẩm trong đơn hàng */}
              {detailOrder?.products.map((product) => (
                <ListOrderedProduct key={product.id} status={status} orderedProduct={product} />
              ))}
              {/* Thông tin chi tiết về khách hàng*/}
              <CustomerDetail detailOrder={detailOrder as OrderType} />
            </div>
            <div className=''>
              <BillOrderDetail detailOrder={detailOrder as OrderType} />
            </div>
          </div>
        </div>
      </div>

      {/* dialog xác nhận hủy đơn hàng */}
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Hủy đơn hàng #{detailOrder?.id.slice(-5)}</DialogHeader>
        <DialogBody divider>
          <Typography color='red'>Bạn có chắc chắn muốn hủy đơn hàng này</Typography>
        </DialogBody>
        <DialogFooter>
          <Button variant='text' color='green' onClick={handleOpen} className='mr-1'>
            <span>Không</span>
          </Button>
          <Button variant='gradient' color='red' onClick={hanldeButtonCancel}>
            <span>Hủy đơn hàng</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}

export default DetailOrdered

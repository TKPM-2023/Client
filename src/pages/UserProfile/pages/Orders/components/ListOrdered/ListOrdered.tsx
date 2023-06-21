import { Collapse, Tooltip, Typography, Chip } from '@material-tailwind/react'
import { color } from '@material-tailwind/react/types/components/chip'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { OrderType } from 'src/types/order.type'

interface Props {
  order: OrderType
}

export function formatDate(time: string) {
  const dateTime = new Date(time)

  const year = dateTime.getFullYear()
  const month = dateTime.getMonth() + 1
  const day = dateTime.getDate()

  return `${day}/${month}/${year}`
}

function ListOrdered({ order }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = () => setIsOpen((cur) => !cur)
  const [status, setStatus] = useState<number>(0)
  const [chipProp, setChipProp] = useState<{ color: string; value: string; iconColor: string }>({
    color: 'green',
    value: 'pending',
    iconColor: 'bg-green-900'
  })

  useEffect(() => {
    let updatedStatus = status

    if (order?.status !== 0) {
      updatedStatus = order.order_status
    } else {
      updatedStatus = -1
    }

    setStatus(updatedStatus)

    switch (updatedStatus) {
      case 0:
        setChipProp({ color: 'yellow', value: 'pending', iconColor: 'bg-yellow-900' })
        break
      case 1:
        setChipProp({ color: 'blue', value: 'delivery', iconColor: 'bg-blue-900' })
        break
      case 2:
        setChipProp({ color: 'green', value: 'success', iconColor: 'bg-green-900' })
        break
      default:
        setChipProp({ color: 'red', value: 'cancel', iconColor: 'bg-red-900' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order.order_status, order.status])

  return (
    <div className=''>
      <div
        className={`${
          isOpen ? ' rounded-b-none bg-blue-50 ' : ' mt-3 bg-gray-200'
        } grid w-full grid-cols-[80px_100px_100px_175px_380px_150px_120px_20px] rounded-md px-3 py-6 hover:bg-gray-100`}
      >
        <Tooltip
          content='Xem chi tiết đơn hàng'
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0, y: 25 }
          }}
          placement='bottom'
        >
          <Link to={`/profile/my-oders/${order.id}`}>
            <Typography variant='small' color='blue-gray' className='flex items-center font-medium hover:font-bold'>
              #{order.id.slice(-5)}
            </Typography>
          </Link>
        </Tooltip>

        <Typography variant='small' color='blue-gray' className='flex items-center font-medium'>
          {formatDate(order.created_at)}
        </Typography>
        <Typography variant='small' color='blue-gray' className='flex items-center font-medium'>
          <span className='ml-6'>{order.products.length}</span>
        </Typography>
        <Typography variant='small' color='blue-gray' className='flex items-center font-medium'>
          <span>{order.contact.name}</span>
        </Typography>
        <Typography variant='small' color='blue-gray' className='flex items-center font-medium'>
          {order.contact.addr}
        </Typography>
        <Typography variant='small' color='red' className='flex items-center font-medium'>
          {order.total_price.toLocaleString('vi-VN')} VNĐ
        </Typography>
        {/* trạng thái đơn hàng */}
        <div color='blue-gray' className='flex items-center font-medium'>
          <Chip
            variant='ghost'
            color={chipProp.color as color}
            size='sm'
            value={chipProp.value}
            className='rounded-full'
            icon={<span className={`mx-auto mt-1 block h-2 w-2 rounded-full ${chipProp.iconColor} content-['']`} />}
          />
        </div>

        <Tooltip
          content='Xem thêm'
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0, y: 25 }
          }}
          placement='bottom'
        >
          <button onClick={toggleOpen} className='flex cursor-pointer content-end items-center rounded-full bg-white'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='h-5 w-5'>
              <path
                fillRule='evenodd'
                d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        </Tooltip>
      </div>
      {/* Danh sách sản phẩm  */}
      <Collapse open={isOpen}>
        <div className='mb-3 w-full rounded-md rounded-t-none border-t border-gray-400 bg-gray-200 px-12'>
          <div className='flex h-full w-full justify-center'>
            <table className='h-full w-full min-w-max  text-left'>
              <tbody>
                {order.products.map((product) => (
                  <tr key={product.id} className='even:bg-blue-gray-50/50'>
                    <td className='w-[300px] p-4'>
                      <div className=' flex w-fit items-center'>
                        <img
                          src={product.product_origin.images ? product.product_origin.images[0].url : ''}
                          alt=''
                          width={50}
                        ></img>
                        <Typography variant='small' color='blue-gray' className='ml-3 flex items-center font-bold'>
                          {product.product_origin.name}
                        </Typography>
                      </div>
                    </td>
                    <td className='w-[150px] p-4'>
                      <Typography variant='small' color='red' className='flex items-center '>
                        {(product.price / product.quantiy).toLocaleString('vi-VN')} VNĐ
                      </Typography>
                    </td>
                    <td className='w-[100px] p-4'>
                      <Typography variant='small' color='blue-gray' className='font-normal'>
                        x{product.quantiy}
                      </Typography>
                    </td>
                    <td className='w-[165px] p-4'>
                      <Typography as='a' href='#' variant='small' color='blue' className='font-medium'>
                        <Typography variant='small' color='red' className='flex items-center '>
                          {product.price.toLocaleString('vi-VN')} VNĐ
                        </Typography>
                      </Typography>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Collapse>
    </div>
  )
}

export default ListOrdered

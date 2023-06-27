import {
  Typography,
  Tooltip,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Rating,
  Textarea
} from '@material-tailwind/react'
import { OrderedProductType } from 'src/types/order.type'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { useMutation } from '@tanstack/react-query'
import ratingApi from 'src/apis/rating.api'
import { toast } from 'react-toastify'
import { PostRatingType } from 'src/types/rating.type'

interface Props {
  orderedProduct: OrderedProductType
  status: number
}

function ListOrderedProduct({ orderedProduct, status }: Props) {
  const [open, setOpen] = useState<boolean>(false)
  const [rated, setRated] = useState<number>(0)

  const postRatingMutation = useMutation({
    mutationFn: (body: PostRatingType) => ratingApi.postRating(orderedProduct.product_origin.id, body),
    onSuccess: () => {
      toast.success('Đã đánh giá')
    }
  })

  const handleOpen = () => setOpen(!open)

  const formik = useFormik({
    initialValues: {
      comment: ''
    },

    validationSchema: yup.object({
      comment: yup.string()
    }),

    onSubmit: async (userRating) => {
      await postRatingMutation.mutateAsync({ ...userRating, point: rated, detail_id: orderedProduct.id })
      handleOpen()
    }
  })
  return (
    <div className='mb-1 flex justify-center'>
      <div className='grid w-[720px] grid-cols-[300px_120px_120px_135px_25px] rounded-md bg-gray-200 p-2 hover:bg-gray-100'>
        <div color='blue-gray' className='flex items-center font-bold'>
          <div className=' flex w-fit items-center'>
            <img
              src={orderedProduct.product_origin.images ? orderedProduct.product_origin.images[0].url : ''}
              alt=''
              width={30}
            />

            <Typography variant='small' color='blue-gray' className='ml-3 flex items-center font-medium'>
              {orderedProduct.product_origin.name}
            </Typography>
          </div>
        </div>
        <Typography variant='small' color='red' className='flex items-center font-medium'>
          {(orderedProduct?.price / orderedProduct.quantity).toLocaleString('vi-VN')} VNĐ
        </Typography>
        <Typography variant='small' color='blue-gray' className='ml-6 flex items-center'>
          {orderedProduct?.quantity}
        </Typography>
        <Typography variant='small' color='red' className='flex items-center font-medium'>
          {orderedProduct?.price.toLocaleString('vi-VN')} VNĐ
        </Typography>
        {status === 2 ? (
          <Tooltip
            content='Đánh giá sản phẩm'
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0, y: 25 }
            }}
            placement='bottom'
          >
            <button onClick={handleOpen} className='flex cursor-pointer content-end items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='h-4 w-4'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z'
                />
              </svg>
            </button>
          </Tooltip>
        ) : (
          <div></div>
        )}
      </div>
      <Dialog open={open} handler={handleOpen}>
        <div className='flex items-center justify-between'>
          <DialogHeader>Đánh giá sản phẩm</DialogHeader>
          <XMarkIcon className='mr-3 h-5 w-5' onClick={handleOpen} />
        </div>
        <DialogBody divider>
          <div className='grid gap-6'>
            <div className=' flex w-fit items-center'>
              <img
                src={orderedProduct.product_origin.images ? orderedProduct.product_origin.images[0].url : ''}
                alt=''
                width={80}
              />

              <Typography variant='lead' color='blue-gray' className='ml-3 flex items-center font-bold'>
                {orderedProduct.product_origin.name}
              </Typography>
            </div>
            <div className='flex justify-center'>
              <div className='flex items-center gap-2'>
                <Rating value={rated} onChange={(value) => setRated(value)} />
                <Typography color='blue-gray' className='font-medium'>
                  {rated}.0 Rated
                </Typography>
              </div>
            </div>
            <form onSubmit={formik.handleSubmit} id='rating'>
              <Textarea
                id='comment'
                name='comment'
                value={formik.values.comment}
                onChange={formik.handleChange}
                label='Bình luận'
                required
              />
            </form>
          </div>
        </DialogBody>
        <DialogFooter className='space-x-2'>
          <Button variant='outlined' color='red' onClick={handleOpen}>
            Đóng
          </Button>
          <Button variant='gradient' color='green' form='rating' type='submit'>
            Gửi đánh giá
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  )
}

export default ListOrderedProduct

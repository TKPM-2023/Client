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
import { XMarkIcon, ChatBubbleLeftIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { useState, useContext } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { useMutation, useQuery } from '@tanstack/react-query'
import ratingApi from 'src/apis/rating.api'
import { toast } from 'react-toastify'
import { PostRatingType, RatingsConfig, RatingByUser } from 'src/types/rating.type'
import { AppContext } from 'src/contexts/app.context'

interface Props {
  orderedProduct: OrderedProductType
  status: number
}

const isAlreadyReview = (listRating: RatingByUser[], orderedProduct: OrderedProductType, userId?: string) => {
  let count = 0
  listRating?.forEach((rating) => {
    if (
      rating.detail_id === orderedProduct.id &&
      rating.product_id === orderedProduct.product_origin.id &&
      rating.user_id === userId
    ) {
      count += 1
    }
  })
  if (count > 0) return true
  else return false
}

function ListOrderedProduct({ orderedProduct, status }: Props) {
  const { profile } = useContext(AppContext)
  const [open, setOpen] = useState<boolean>(false)
  const [rated, setRated] = useState<number>(0)

  const ratingQueryConfig: RatingsConfig = {
    status: -1,
    user_id: `"${profile?.id}"`
  }
  const { data: ratingsData, refetch } = useQuery({
    queryKey: ['ratings', ratingQueryConfig],
    queryFn: () => ratingApi.getListRatingByUser(ratingQueryConfig),
    keepPreviousData: true
  })
  const listRating = ratingsData?.data.data

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
      refetch()
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
              className='h-8'
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
        {status === 3 ? (
          <Tooltip
            content={
              isAlreadyReview(listRating as RatingByUser[], orderedProduct, profile?.id)
                ? 'Đã đánh giá'
                : 'Đánh giá sản phẩm'
            }
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0, y: 25 }
            }}
            placement='bottom'
          >
            {isAlreadyReview(listRating as RatingByUser[], orderedProduct, profile?.id) ? (
              <button className='flex content-end items-center'>
                <CheckCircleIcon className='h-5 w-5 text-green-500' />
              </button>
            ) : (
              <button onClick={handleOpen} className='flex content-end items-center'>
                <ChatBubbleLeftIcon className='h-4 w-4' />
              </button>
            )}
          </Tooltip>
        ) : (
          <div></div>
        )}
      </div>
      <Dialog open={open} handler={handleOpen}>
        <div className='flex items-center justify-between'>
          <DialogHeader>Đánh giá sản phẩm</DialogHeader>
          <XMarkIcon className='mr-3 h-5 w-5 cursor-pointer' onClick={handleOpen} />
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

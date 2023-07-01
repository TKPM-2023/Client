import {
  Card,
  CardBody,
  Typography,
  Avatar,
  Rating,
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Textarea
} from '@material-tailwind/react'
import { PencilSquareIcon, XMarkIcon, StarIcon } from '@heroicons/react/24/solid'
import { formatTime } from 'src/pages/DetailProduct/components/ProductReview/ProductReview'
import { useState, useEffect } from 'react'
import { RatingByUser } from 'src/types/rating.type'
import { useMutation } from '@tanstack/react-query'
import ratingApi from 'src/apis/rating.api'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { useFormik } from 'formik'

interface Props {
  rating: RatingByUser
  hanldeRefetch: () => void
}

function UserRating({ rating, hanldeRefetch }: Props) {
  const [open, setOpen] = useState<boolean>(false)
  const [rated, setRated] = useState<number>(rating.point)
  const handleOpen = () => setOpen(!open)

  const updateRatingMutation = useMutation({
    mutationFn: (body: { point: number; comment: string }) => ratingApi.updateRating(rating.id as string, body),
    onSuccess: () => {
      toast.success('Chỉnh sửa thành công', { autoClose: 1000 })
      hanldeRefetch()
    }
  })

  const formik = useFormik({
    initialValues: {
      comment: rating.comment
    },

    validationSchema: yup.object({
      comment: yup.string()
    }),

    onSubmit: async (newRating) => {
      await updateRatingMutation.mutateAsync({ ...newRating, point: rated })
      handleOpen()
    }
  })

  useEffect(() => {
    formik.setValues({
      comment: rating.comment
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rating])

  return (
    <>
      <Card color='white' shadow={false} className='border-b border-gray-300'>
        <CardBody className='flex gap-4'>
          <div className='flex w-[35%] items-center gap-2'>
            <Avatar
              size='xl'
              variant='rounded'
              src={rating.product.images ? rating.product.images[0].url : ''}
              alt='avatar'
              className='object-fill'
            />
            <div className=''>
              <Typography variant='h5' color='black'>
                {rating.product.name}
              </Typography>
              <div className='flex gap-1'>
                <Typography variant='small' color='gray' className='font-normal opacity-70'>
                  Giá:
                </Typography>
                <Typography variant='small' color='red' className='font-normal'>
                  {rating.product.price.toLocaleString('vi-VN')} VNĐ
                </Typography>
              </div>
            </div>
          </div>
          <div className='flex w-[60%] flex-col gap-2'>
            <div className='5 flex items-center gap-2'>
              <div className=''>
                {Array.from({ length: rated }, (_, index) => (
                  <StarIcon key={index} className='inline h-5 w-5 text-yellow-700' />
                ))}
                {Array.from({ length: 5 - rated }, (_, index) => (
                  <svg
                    key={index}
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='inline h-5 w-5 text-blue-gray-500'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z'
                    />
                  </svg>
                ))}
              </div>
              <Typography color='blue-gray'>{formatTime(rating.created_at)}</Typography>
            </div>
            <Typography>{rating.comment}</Typography>
            <div className='flex justify-end gap-4'>
              <IconButton onClick={handleOpen} variant='outlined' color='green' className='h-8 w-8'>
                <PencilSquareIcon className='h-4 w-4' />
              </IconButton>
            </div>
          </div>
        </CardBody>
      </Card>
      {/* cửa sổ xác nhận xóa */}
      <Dialog open={open} handler={handleOpen}>
        <div className='flex items-center justify-between'>
          <DialogHeader>Chỉnh sửa đánh giá</DialogHeader>
          <XMarkIcon className='mr-3 h-5 w-5 cursor-pointer' onClick={handleOpen} />
        </div>
        <DialogBody divider>
          <div className='grid gap-6'>
            <div className=' flex w-fit items-center'>
              <img src={rating.product.images ? rating.product.images[0].url : ''} alt='' width={80} />

              <Typography variant='lead' color='blue-gray' className='ml-3 flex items-center font-bold'>
                {rating.product.name}
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
    </>
  )
}

export default UserRating

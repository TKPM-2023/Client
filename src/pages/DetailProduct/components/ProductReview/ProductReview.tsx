import { Card, CardHeader, CardBody, Typography, Avatar, Rating } from '@material-tailwind/react'
import { RatingType } from 'src/types/product.type'

interface Props {
  ratings: RatingType[]
}

export function formatTime(time: string) {
  const dateTime = new Date(time)

  const year = dateTime.getFullYear()
  const month = dateTime.getMonth() + 1
  const day = dateTime.getDate()
  const hours = dateTime.getHours()
  const minutes = dateTime.getMinutes()

  return `${day}/${month}/${year} ${hours}:${minutes}`
}

function ProductReview({ ratings }: Props) {
  if (!ratings) return null
  else if (ratings.length === 0)
    return (
      <>
        <p className='mb-2 mt-5 pl-4 text-base font-medium md:pl-0 md:text-2xl'>Đánh giá sản phẩm</p>
        <div className='ml-16 flex flex-col flex-wrap items-center justify-center gap-x-8'>
          <img
            src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/7d900d4dc402db5304b2090a184404cb.png'
            alt=''
          />
          <div>Sản phẩm này chưa có đánh giá</div>
        </div>
      </>
    )
  return (
    <>
      <p className='mb-2 mt-5 pl-4 text-base font-medium md:pl-0 md:text-2xl'>Đánh giá sản phẩm</p>
      {ratings?.map((rating) => (
        <Card color='transparent' shadow={false} className='mx-10' key={rating.id}>
          <CardHeader
            color='transparent'
            floated={false}
            shadow={false}
            className='mx-0 flex items-center gap-4 pb-8 pt-0'
          >
            <Avatar size='lg' variant='circular' src={rating.User ? rating.User.avatar.url : ''} alt='avatar' />
            <div className='flex w-full flex-col gap-0.5'>
              <div className='flex items-center justify-between'>
                <Typography variant='h5' color='blue-gray'>
                  {rating.User.first_name} {rating.User.last_name}
                </Typography>
                <div className='5 flex items-center gap-0'>
                  <Rating value={rating.point} readonly />
                </div>
              </div>
              <Typography color='blue-gray'>{formatTime(rating.created_at)}</Typography>
            </div>
          </CardHeader>
          <CardBody className='mb-6 p-0'>
            <Typography>{rating.comment}</Typography>
          </CardBody>
        </Card>
      ))}
    </>
  )
}

export default ProductReview

import { Card, CardBody, Typography, Avatar, Rating, IconButton, Button } from '@material-tailwind/react'
import { InboxIcon, ChatBubbleBottomCenterIcon } from '@heroicons/react/24/outline'
import { HeartIcon } from '@heroicons/react/24/solid'
import { RatingType } from 'src/types/product.type'
import { formatTime } from '../ProductReview/ProductReview'
import { toast } from 'react-toastify'
import { useState } from 'react'

interface Props {
  rating: RatingType
}

function UserRating({ rating }: Props) {
  const [isLike, setIsLike] = useState<boolean>(false)
  const handleDeveloping = () => {
    toast.info('Chức năng chưa được phát triển', { position: toast.POSITION.TOP_CENTER, autoClose: 1000 })
  }
  return (
    <Card color='white' shadow={false} className='mx-20 mb-6 px-8'>
      <CardBody className='flex gap-4'>
        <div className='flex w-[35%] items-center gap-2'>
          <Avatar size='xl' variant='rounded' src={rating.User ? rating.User.avatar.url : ''} alt='avatar' />
          <div>
            <Typography variant='h5' color='black'>
              {rating.User.first_name} {rating.User.last_name}
            </Typography>
            <div className='flex gap-1'>
              <Typography variant='small' color='gray' className='font-normal opacity-70'>
                Total spend:
              </Typography>
              <Typography variant='small' color='gray' className='font-normal'>
                Đang phát triển
              </Typography>
            </div>
            <div className='flex gap-1'>
              <Typography variant='small' color='gray' className='font-normal opacity-70'>
                Total reviews:
              </Typography>
              <Typography variant='small' color='gray' className='font-normal'>
                Đang phát triển
              </Typography>
            </div>
          </div>
        </div>
        <div className='flex w-[60%] flex-col gap-2'>
          <div className='5 flex items-center gap-2'>
            <Rating value={rating.point} readonly />
            <Typography color='blue-gray'>{formatTime(rating.created_at)}</Typography>
          </div>
          <Typography>{rating.comment}</Typography>
          <div className='flex gap-4'>
            <IconButton
              onClick={() => setIsLike(!isLike)}
              variant='outlined'
              color={`${isLike ? 'red' : 'blue-gray'}`}
              className='h-8 w-8'
            >
              <HeartIcon className='h-4 w-4' />
            </IconButton>
            <Button
              onClick={handleDeveloping}
              size='sm'
              variant='outlined'
              className=' flex h-8 w-28 items-center gap-2'
            >
              <ChatBubbleBottomCenterIcon strokeWidth={2} className='h-5 w-5' />
              Trả lời
            </Button>
            <Button
              onClick={handleDeveloping}
              size='sm'
              variant='outlined'
              className=' flex h-8 w-32 items-center gap-2'
            >
              <InboxIcon className='h-5 w-5' />
              Nhắn tin
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default UserRating

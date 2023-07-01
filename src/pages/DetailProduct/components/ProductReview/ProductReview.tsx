import { Card, CardBody, Rating, Select, Option, Chip, Progress } from '@material-tailwind/react'
import { RatingType } from 'src/types/product.type'
import { DateRangeItem } from 'src/pages/UserProfile/pages/Orders/Orders'
import { useState, useEffect } from 'react'
import { ArrowTrendingUpIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/24/solid'
import DateRangePicker from 'src/components/DateRangePicker'
import UserRating from '../UserRating'
import _ from 'lodash'

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

function calAveragePoint(ratings: RatingType[]) {
  let averagePoint = 0
  if (ratings.length !== 0) {
    ratings?.map((rating) => (averagePoint += rating.point))
    return Math.round(averagePoint / ratings.length)
  } else return 0
}

function calPercent(ratings: RatingType[], point: number) {
  let percent = 0
  if (ratings.length !== 0) {
    ratings?.map((rating) => (rating.point === point ? (percent += 1) : (percent += 0)))
    return parseFloat(((percent * 100) / ratings.length).toFixed(0))
  } else return 0
}

function calQuantityOfRating(ratings: RatingType[], point: number) {
  let quantity = 0
  ratings?.map((rating) => (rating.point === point ? (quantity += 1) : (quantity += 0)))
  return quantity
}

const sortRating = (typeSort: string, listRating: RatingType[]) => {
  if (typeSort === 'all') {
    listRating = _.sortBy(listRating, 'id')
  } else if (typeSort === 'newest') {
    listRating = _.sortBy(listRating, 'created_at').reverse()
  } else if (typeSort === 'oldest') {
    listRating = _.sortBy(listRating, 'created_at')
  }
  return listRating
}

//Component
function ProductReview({ ratings }: Props) {
  const [selectedPoint, setSelectedPoint] = useState<string>('all')
  const [selectedTime, setSelectedTime] = useState<string>('all')
  const [dateRange, setDateRange] = useState<DateRangeItem>({
    startDate: undefined,
    endDate: undefined,
    key: 'selection'
  })
  const [filteredRatingList, setFilteredRatingList] = useState<RatingType[]>([])

  const handleSelectPointChange = (value?: string) => {
    setSelectedPoint(value as string)
  }

  const handleSelectTimeChange = (value?: string) => {
    setSelectedTime(value as string)
  }

  useEffect(() => {
    let tempList: RatingType[] | undefined
    if (dateRange.startDate && dateRange.endDate) {
      if (selectedPoint === 'all') {
        tempList = ratings?.filter((rating) => {
          const orderDate = new Date(rating.created_at)
          return orderDate >= (dateRange.startDate as Date) && orderDate <= (dateRange.endDate as Date)
        })
        tempList = sortRating(selectedTime, tempList)
      } else if (selectedPoint !== 'all') {
        tempList = ratings?.filter((rating) => {
          const orderDate = new Date(rating.created_at)
          return (
            orderDate >= (dateRange.startDate as Date) &&
            orderDate <= (dateRange.endDate as Date) &&
            ((selectedPoint === '5' && rating.point === 5) ||
              (selectedPoint === '4' && rating.point === 4) ||
              (selectedPoint === '3' && rating.point === 3) ||
              (selectedPoint === '2' && rating.point === 2) ||
              (selectedPoint === '1' && rating.point === 1))
          )
        })
        tempList = sortRating(selectedTime, tempList)
      }
    } else if (selectedPoint !== 'all') {
      tempList = ratings?.filter((rating) => {
        return (
          (selectedPoint === '5' && rating.point === 5) ||
          (selectedPoint === '4' && rating.point === 4) ||
          (selectedPoint === '3' && rating.point === 3) ||
          (selectedPoint === '2' && rating.point === 2) ||
          (selectedPoint === '1' && rating.point === 1)
        )
      })
      tempList = sortRating(selectedTime, tempList)
    } else {
      tempList = ratings
      tempList = sortRating(selectedTime, tempList)
    }
    setFilteredRatingList(tempList as RatingType[])
  }, [dateRange, ratings, selectedPoint, selectedTime])

  if (!ratings) return null
  else
    return (
      <div className='mt-12'>
        {/* filter */}
        <div className='mb-4 flex items-center justify-between'>
          <p className='pl-4 text-base font-medium md:pl-0 md:text-2xl'>Đánh giá sản phẩm</p>
          <div className='flex gap-2'>
            <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
            <div className='z-10 bg-white'>
              <Select value={selectedTime} onChange={handleSelectTimeChange} lockScroll label='Xếp theo'>
                <Option value='all'>Tất cả</Option>
                <Option value='newest'>Mới nhất</Option>
                <Option value='oldest'>Cũ nhất</Option>
              </Select>
            </div>
            <div className='z-10 bg-white'>
              <Select value={selectedPoint} onChange={handleSelectPointChange} lockScroll label='Đánh giá'>
                <Option value='all'>Tất cả</Option>
                <Option value='1'>
                  <StarIcon className='inline h-5 w-5 text-yellow-700' />
                </Option>
                <Option value='2' className='flex'>
                  {Array.from({ length: 2 }, (_, index) => (
                    <StarIcon key={index} className='inline h-5 w-5 text-yellow-700' />
                  ))}
                </Option>
                <Option value='3'>
                  {Array.from({ length: 4 }, (_, index) => (
                    <StarIcon key={index} className='inline h-5 w-5 text-yellow-700' />
                  ))}
                </Option>
                <Option value='4'>
                  {Array.from({ length: 4 }, (_, index) => (
                    <StarIcon key={index} className='inline h-5 w-5 text-yellow-700' />
                  ))}
                </Option>
                <Option value='5'>
                  {Array.from({ length: 5 }, (_, index) => (
                    <StarIcon key={index} className='inline h-5 w-5 text-yellow-700' />
                  ))}
                </Option>
              </Select>
            </div>
          </div>
        </div>
        <div className='flex justify-center'>
          <hr className='w-3/5 border-t-2 border-gray-300 pb-4'></hr>
        </div>
        {/* Thông tin chung */}
        <div className='flex justify-center gap-4'>
          <Card>
            <CardBody>
              <div className='font-medium'>Tổng đánh giá</div>
              <div className='mt-2 gap-4'>
                <span className='text-3xl font-bold text-black'>{ratings?.length}</span>
                <span className='ml-3 text-xs font-normal opacity-70'>Đánh giá</span>
              </div>
              <Chip
                variant='ghost'
                color='green'
                size='sm'
                value={`${Math.floor(Math.random() * 100) + 1}% so với tháng trước`}
                className='mt-1'
                icon={<ArrowTrendingUpIcon />}
              />
              <div className='mt-1 text-xs font-normal opacity-70'>growth in reviews in this year</div>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <div className='font-medium'>Đánh giá trung bình</div>
              <div className='mt-2 gap-4'>
                <span className='text-3xl font-bold text-black'>{calAveragePoint(ratings)}.0</span>
                <Rating className='ml-2' value={calAveragePoint(ratings)} readonly />
              </div>

              <div className='mt-8 text-xs font-normal opacity-70'>average rating in reviews in this year</div>
            </CardBody>
          </Card>
          <Card>
            <CardBody className='mt-1'>
              <div className='flex items-center gap-2'>
                <span className='flex items-center opacity-70'>
                  5 <StarIcon className='h-3 w-3' />
                </span>
                <Progress value={calPercent(ratings, 5)} size='md' color='green' className='w-40' />
                <span className='text-[13px] text-black'>{calPercent(ratings, 5)}%</span>
                <span className='text-[13px] opacity-70'>{calQuantityOfRating(ratings, 5)}</span>
              </div>
              <div className='flex items-center gap-2'>
                <span className='flex items-center opacity-70'>
                  4 <StarIcon className='h-3 w-3' />
                </span>
                <Progress value={calPercent(ratings, 4)} size='md' color='light-green' className='w-40' />
                <span className='text-[13px] text-black'>{calPercent(ratings, 4)}%</span>
                <span className='text-[13px] opacity-70'>{calQuantityOfRating(ratings, 4)}</span>
              </div>
              <div className='flex items-center gap-2'>
                <span className='flex items-center opacity-70'>
                  3 <StarIcon className='h-3 w-3' />
                </span>
                <Progress value={calPercent(ratings, 3)} size='md' color='yellow' className='w-40' />
                <span className='text-[13px] text-black'>{calPercent(ratings, 3)}%</span>
                <span className='text-[13px] opacity-70'>{calQuantityOfRating(ratings, 3)}</span>
              </div>
              <div className='flex items-center gap-2'>
                <span className='flex items-center opacity-70'>
                  2 <StarIcon className='h-3 w-3' />
                </span>
                <Progress value={calPercent(ratings, 2)} size='md' color='orange' className='w-40' />
                <span className='text-[13px] text-black'>{calPercent(ratings, 2)}%</span>
                <span className='text-[13px] opacity-70'>{calQuantityOfRating(ratings, 2)}</span>
              </div>
              <div className='flex items-center gap-2'>
                <span className='flex items-center opacity-70'>
                  1 <StarIcon className='h-3 w-3' />
                </span>
                <Progress value={calPercent(ratings, 1)} size='md' color='red' className='w-40' />
                <span className='text-[13px] text-black'>{calPercent(ratings, 1)}%</span>
                <span className='text-[13px] opacity-70'>{calQuantityOfRating(ratings, 1)}</span>
              </div>
            </CardBody>
          </Card>
        </div>
        <div className='mt-4 flex justify-center'>
          <hr className='w-3/5 border-t-2 border-gray-300 pb-4'></hr>
        </div>
        {/* Các đánh giá của người dùng */}
        {ratings?.length === 0 ? (
          <div>
            <div className='ml-16 flex flex-col flex-wrap items-center justify-center gap-x-8'>
              <img
                src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/7d900d4dc402db5304b2090a184404cb.png'
                alt=''
              />
              <div>Sản phẩm này chưa có đánh giá</div>
            </div>
          </div>
        ) : filteredRatingList?.length === 0 ? (
          <div className='text-center'> Không có bình luận phù hợp</div>
        ) : (
          <div>
            {filteredRatingList?.map((rating) => (
              <UserRating key={rating.id} rating={rating} />
            ))}
          </div>
        )}
      </div>
    )
}

export default ProductReview

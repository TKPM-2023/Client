import ListReview from './components/ListReview'
import FilterReview from './components/FilterReview'
import { DateRangeItem } from 'src/pages/UserProfile/pages/Orders/Orders'
import { useState, useEffect, useContext } from 'react'
import { RatingsConfig, RatingByUser } from 'src/types/rating.type'
import ratingApi from 'src/apis/rating.api'
import { useQuery } from '@tanstack/react-query'
import { AppContext } from 'src/contexts/app.context'
import _ from 'lodash'

const sortRating = (typeSort: string, listRating: RatingByUser[]) => {
  if (typeSort === 'all') {
    listRating = _.sortBy(listRating, 'id')
  } else if (typeSort === 'newest') {
    listRating = _.sortBy(listRating, 'created_at').reverse()
  } else if (typeSort === 'oldest') {
    listRating = _.sortBy(listRating, 'created_at')
  }
  return listRating
}

function Reviews() {
  const { profile } = useContext(AppContext)
  const [selectedPoint, setSelectedPoint] = useState<string>('all')
  const [selectedTime, setSelectedTime] = useState<string>('all')
  const [dateRange, setDateRange] = useState<DateRangeItem>({
    startDate: undefined,
    endDate: undefined,
    key: 'selection'
  })

  const ratingQueryConfig: RatingsConfig = {
    status: -1,
    user_id: `"${profile?.id}"`
  }
  const { data: ratingsData, refetch } = useQuery({
    queryKey: ['ratings', ratingQueryConfig],
    queryFn: () => ratingApi.getListRatingByUser(ratingQueryConfig),
    keepPreviousData: true
  })
  const [filteredRatingList, setFilteredRatingList] = useState<RatingByUser[]>([])

  const listRating = ratingsData?.data.data

  const handleSelectPointChange = (value?: string) => {
    setSelectedPoint(value as string)
  }

  const handleSelectTimeChange = (value?: string) => {
    setSelectedTime(value as string)
  }

  const hanldeRefetch = () => {
    refetch()
  }

  useEffect(() => {
    let tempList: RatingByUser[] | undefined
    if (dateRange.startDate && dateRange.endDate) {
      if (selectedPoint === 'all') {
        tempList = listRating?.filter((rating) => {
          const orderDate = new Date(rating.created_at)
          return orderDate >= (dateRange.startDate as Date) && orderDate <= (dateRange.endDate as Date)
        })
        tempList = sortRating(selectedTime, tempList as RatingByUser[])
      } else if (selectedPoint !== 'all') {
        tempList = listRating?.filter((rating) => {
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
        tempList = sortRating(selectedTime, tempList as RatingByUser[])
      }
    } else if (selectedPoint !== 'all') {
      tempList = listRating?.filter((rating) => {
        return (
          (selectedPoint === '5' && rating.point === 5) ||
          (selectedPoint === '4' && rating.point === 4) ||
          (selectedPoint === '3' && rating.point === 3) ||
          (selectedPoint === '2' && rating.point === 2) ||
          (selectedPoint === '1' && rating.point === 1)
        )
      })
      tempList = sortRating(selectedTime, tempList as RatingByUser[])
    } else {
      tempList = listRating
      tempList = sortRating(selectedTime, tempList as RatingByUser[])
    }
    setFilteredRatingList(tempList as RatingByUser[])
  }, [dateRange, listRating, selectedPoint, selectedTime])

  return (
    <>
      <div className='bg-gray-300 p-16 pt-6'>
        <div className='mt-12 rounded bg-white p-8 shadow'>
          <div className='text-start'>
            <div className='flex justify-between border-b border-gray-400 pb-4'>
              <h1 className='text-2xl font-bold text-gray-700'>Danh sách đánh giá</h1>
            </div>
            <div className='mt-4 flex justify-end border-b border-gray-400 pb-4 text-start text-gray-500'>
              <FilterReview
                selectedPoint={selectedPoint}
                selectedTime={selectedTime}
                dateRange={dateRange}
                handleSelectPointChange={handleSelectPointChange}
                handleSelectTimeChange={handleSelectTimeChange}
                setDateRange={setDateRange}
              />
            </div>
          </div>
          <div className='p-2'>
            {listRating?.length === 0 ? (
              <div className='mt-4 text-center text-xl'>Chưa có đánh giá nào</div>
            ) : filteredRatingList?.length === 0 ? (
              <div className='mt-4 text-center'> Không có bình luận phù hợp</div>
            ) : (
              filteredRatingList?.map((rating) => (
                <ListReview key={rating.id} rating={rating} hanldeRefetch={hanldeRefetch} />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Reviews

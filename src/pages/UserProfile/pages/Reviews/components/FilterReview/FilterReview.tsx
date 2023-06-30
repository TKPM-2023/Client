import { Select, Option } from '@material-tailwind/react'
import { DateRangeItem } from 'src/pages/UserProfile/pages/Orders/Orders'
import { StarIcon } from '@heroicons/react/24/solid'
import DateRangePicker from 'src/components/DateRangePicker'

interface Props {
  dateRange: DateRangeItem
  setDateRange: React.Dispatch<React.SetStateAction<DateRangeItem>>
  selectedTime: string
  handleSelectTimeChange: () => void
  selectedPoint: string
  handleSelectPointChange: () => void
}

function FilterReview({
  dateRange,
  setDateRange,
  selectedTime,
  handleSelectTimeChange,
  selectedPoint,
  handleSelectPointChange
}: Props) {
  return (
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
  )
}

export default FilterReview

import { Popover, PopoverHandler, PopoverContent } from '@material-tailwind/react'
import { CalendarDaysIcon } from '@heroicons/react/24/outline'
import { DateRange } from 'react-date-range'
import { DateRangeItem } from 'src/pages/UserProfile/pages/Orders/Orders'
import 'react-date-range/dist/styles.css' // Import CSS styles
import 'react-date-range/dist/theme/default.css' // Import theme CSS
import vi from 'date-fns/locale/vi'

interface Props {
  dateRange: DateRangeItem
  setDateRange: React.Dispatch<React.SetStateAction<DateRangeItem>>
}

function DateRangePicker({ dateRange, setDateRange }: Props) {
  const padTo2Digits = (num: number): string => {
    return num.toString().padStart(2, '0')
  }

  const formatDate = (date: Date): string => {
    return [padTo2Digits(date.getDate()), padTo2Digits(date.getMonth() + 1), date.getFullYear()].join('/')
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDateChange = (item: any) => {
    setDateRange(item.selection)
  }
  return (
    <Popover
      placement='bottom'
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0, y: 25 }
      }}
    >
      <PopoverHandler>
        <button className='rounded-lg border border-gray-400 bg-white p-2.5 hover:border-blue-500 focus:ring-blue-500'>
          {dateRange?.startDate && dateRange?.endDate ? (
            <div className='flex gap-2'>
              <CalendarDaysIcon className='h-5 w-5' />
              <span className='text-am text-gray-900'>
                {formatDate(dateRange.startDate)} - {formatDate(dateRange.endDate)}
              </span>
            </div>
          ) : (
            <div className='flex gap-2'>
              <CalendarDaysIcon className='h-5 w-5' />
              <span className='text-sm text-gray-900'>Ngày bắt đầu - Kết thúc</span>
            </div>
          )}
        </button>
      </PopoverHandler>
      <PopoverContent>
        <div>
          <DateRange
            locale={vi}
            editableDateInputs={true}
            onChange={handleDateChange}
            moveRangeOnFirstSelection={false}
            ranges={[dateRange]}
            startDatePlaceholder='Ngày bắt đầu'
            endDatePlaceholder='Ngày kết thúc'
            dateDisplayFormat='dd/MM/yyyy'
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default DateRangePicker

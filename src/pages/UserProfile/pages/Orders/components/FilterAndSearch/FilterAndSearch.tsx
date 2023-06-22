import { Select, Option, Popover, PopoverHandler, PopoverContent } from '@material-tailwind/react'
import { CalendarDaysIcon } from '@heroicons/react/24/outline'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css' // Import CSS styles
import 'react-date-range/dist/theme/default.css' // Import theme CSS
import vi from 'date-fns/locale/vi'
import { DateRangeItem } from '../../Orders'

interface Props {
  dateRange: DateRangeItem
  setDateRange: React.Dispatch<React.SetStateAction<DateRangeItem>>
  selectedStatus: string
  setSelectedStatus: React.Dispatch<React.SetStateAction<string>>
}

function FilterAndSearch({ dateRange, setDateRange, selectedStatus, setSelectedStatus }: Props) {
  const handleSelectChange = (value?: string) => {
    setSelectedStatus(value as string)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDateChange = (item: any) => {
    setDateRange(item.selection)
  }

  const padTo2Digits = (num: number): string => {
    return num.toString().padStart(2, '0')
  }

  const formatDate = (date: Date): string => {
    return [padTo2Digits(date.getDate()), padTo2Digits(date.getMonth() + 1), date.getFullYear()].join('/')
  }

  return (
    <div className='mb-4 flex justify-between border-b border-gray-400 pb-4'>
      <label htmlFor='simple-search' className='sr-only'>
        Search
      </label>
      <div className='relative w-[300px]'>
        <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
          <svg
            aria-hidden='true'
            className='h-5 w-5 text-gray-500 dark:text-gray-400'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
              clipRule='evenodd'
            ></path>
          </svg>
        </div>
        <input
          type='text'
          className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
          placeholder='Search'
          required
        />
      </div>
      <div className='flex items-center gap-4'>
        {/* Chọn khoảng ngày */}
        <Popover
          placement='bottom'
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0, y: 25 }
          }}
        >
          <PopoverHandler>
            <button className='rounded-lg border border-gray-400 p-2.5 hover:border-blue-500 focus:ring-blue-500'>
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

        {/* chọn trạng thái */}
        <div className='z-10'>
          <Select value={selectedStatus} onChange={handleSelectChange} lockScroll label='Trạng thái'>
            <Option value='all'>Tất cả</Option>
            <Option value='pending'>Đang chờ xác nhận</Option>
            <Option value='delivery'>Đang giao hàng</Option>
            <Option value='success'>Đã giao hàng</Option>
            <Option value='cancel'>Đã hủy đơn</Option>
          </Select>
        </div>
      </div>
    </div>
  )
}

export default FilterAndSearch

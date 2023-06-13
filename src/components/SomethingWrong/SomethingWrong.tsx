import { Button } from '@material-tailwind/react'

interface SomethingWrongProps {
  handleRefetchData: () => void
}

function SomethingWrong({ handleRefetchData }: SomethingWrongProps) {
  return (
    <div className='flex h-full flex-col items-center justify-center gap-4 bg-gray-300 p-16 pt-6'>
      <div className='text-xl text-red-600'>Đã có lỗi xảy ra</div>
      <Button onClick={handleRefetchData}>Thử lại</Button>
    </div>
  )
}

export default SomethingWrong

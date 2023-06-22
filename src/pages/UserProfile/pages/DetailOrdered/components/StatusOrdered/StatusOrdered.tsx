import { Stepper, Step, Typography } from '@material-tailwind/react'
import { ClockIcon, TruckIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

interface Props {
  status: number
}

function StatusOrdered({ status }: Props) {
  return (
    <div className=' mb-20 flex justify-center'>
      <div className=' mt-8 w-[500px]'>
        <Stepper activeStep={status} className='z-0'>
          <Step>
            <ClockIcon className='h-5 w-5' />
            <div className='absolute -bottom-[3rem] w-max text-center'>
              <Typography variant='h6' color={status === 0 ? 'blue' : 'blue-gray'}>
                Đang chờ xác nhận
              </Typography>
            </div>
          </Step>
          <Step>
            <TruckIcon className='h-5 w-5' />
            <div className='absolute -bottom-[3rem] w-max text-center'>
              <Typography variant='h6' color={status === 1 ? 'blue' : 'blue-gray'}>
                Đang giao hàng
              </Typography>
            </div>
          </Step>
          <Step>
            <CheckCircleIcon className='h-5 w-5' />
            <div className='absolute -bottom-[3rem] w-max text-center'>
              <Typography variant='h6' color={status === 2 ? 'blue' : 'blue-gray'}>
                Giao hàng thành công
              </Typography>
            </div>
          </Step>
        </Stepper>
      </div>
    </div>
  )
}

export default StatusOrdered

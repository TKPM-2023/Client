import { Card, CardBody, Dialog, DialogHeader, DialogBody } from '@material-tailwind/react'
import { useState } from 'react'

type contact = {
  id: string
  name: string
  phone: string
  address: string
}

const table = [
  {
    id: '1',
    name: 'tran anh thi',
    phone: '099988998',
    address: '134 cao bá đạt, võ xu, đức linh, Bình thuận'
  },
  {
    id: '2',
    name: 'tran huỳnh cư',
    phone: '01231234',
    address: '120 tô vĩnh diện, võ xu, đức linh, Bình thuận'
  }
]

function SumaryOrder() {
  const [open, setOpen] = useState<boolean>(false)
  const [isChosenAddress, setIsChosenAddress] = useState<contact>({ id: '', name: '', phone: '', address: '' })

  const hanldeChooseAddress = (contact: contact) => {
    setIsChosenAddress(contact)
    handleOpen()
  }

  const handleOpen = () => setOpen(!open)
  return (
    <>
      <div className='flex w-96 flex-col gap-4'>
        <Card className=' w-full'>
          <CardBody className='flex items-center gap-2'>
            <div className='flex items-center gap-3'>
              <img src='https://www.october16th.store/assets/logo-3c597220.png' alt='logo' width='32' height='32' />
              <div className='font-bold'>CÔNG TY TNHH MTV THƯƠNG MẠI DỊCH VỤ</div>
            </div>
          </CardBody>
        </Card>

        <div className='flex flex-col'>
          <Card className='h-full w-full rounded-b-none'>
            <CardBody>
              <div className=' w-full bg-white'>
                <div className='mb-2 flex items-center justify-between'>
                  <span className='font-bold'>Giao tới</span>
                  <div>
                    <button onClick={handleOpen} className='cursor-pointer text-deep-purple-500'>
                      Thay đổi
                    </button>
                  </div>
                </div>
                {isChosenAddress.id !== '' ? (
                  <div>
                    <div className='flex items-center'>
                      <span className='font-normal'>{isChosenAddress.name}</span>
                      <i className='bg-slate-400 mx-2 h-5 w-[2px] font-bold'>|</i>
                      <span className='font-normal'>{isChosenAddress.phone}</span>
                    </div>
                    <div>
                      <span className='text-zinc-500 font-normal'>{isChosenAddress.address}</span>
                    </div>
                  </div>
                ) : (
                  <div className='text-red-600'>Vui lòng chọn địa chỉ</div>
                )}
              </div>
            </CardBody>
          </Card>
          <Card className=' h-full w-full rounded-none border-t border-gray-300'>
            <CardBody className='flex flex-col gap-2'>
              <div className='flex items-center justify-between'>
                <span className='text-black'>Tạm tính</span>
                <span className='text-sm font-bold text-gray-900'>8.500.000 VNĐ</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-black'>Giảm giá</span>
                <span className='text-sm font-bold text-green-500'>0 VNĐ</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-black'>Phí vận chuyển</span>
                <span className='text-sm font-bold text-gray-900'>50.000 VNĐ</span>
              </div>
            </CardBody>
          </Card>
          <Card className=' h-full w-full rounded-none border-t border-gray-300'>
            <CardBody>
              <div className='flex h-10 items-center justify-between bg-white '>
                <div className='flex items-center gap-1 leading-none'>
                  <span className='text-black'>Tổng cộng</span>
                  <div className='md:hidden'>
                    <span role='img' aria-label='caret-up' className='anticon anticon-caret-up text-gray-500'>
                      <svg
                        viewBox='0 0 1024 1024'
                        focusable='false'
                        data-icon='caret-up'
                        width='1em'
                        height='1em'
                        fill='currentColor'
                        aria-hidden='true'
                      >
                        <path d='M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z'></path>
                      </svg>
                    </span>
                  </div>
                </div>
                <span className='flex flex-col'>
                  <span className='text-xl font-medium text-red-500 md:text-base'>8.500.000 VNĐ</span>
                  <span className='block text-[10px]'>(Đã bao gồm VAT nếu có)</span>
                </span>
              </div>
            </CardBody>
          </Card>

          <button
            disabled={isChosenAddress.id === ''}
            className={` ${
              isChosenAddress.id === '' ? 'pointer-events-none bg-gray-500' : ''
            } w-full rounded-lg rounded-t-none border border-gray-400 bg-deep-purple-400 p-3 text-lg text-white hover:border-indigo-700`}
          >
            Đặt mua
          </button>
        </div>
      </div>

      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Thay đổi địa chỉ nhận hàng</DialogHeader>
        <DialogBody divider className={`${table.length > 6 ? 'h-96 overflow-scroll' : 'h-full'}`}>
          {table.map((contact) => (
            <button
              key={contact.id}
              value={`{'name': ${contact.name},'phone': ${contact.phone},'address': ${contact.address} }`}
              onClick={() => {
                hanldeChooseAddress(contact)
              }}
              className={`${
                contact.id === isChosenAddress.id ? 'border-2 border-deep-purple-500' : ''
              } mb-2 flex w-full flex-col items-start rounded-md bg-gray-200 p-3 text-black hover:bg-deep-purple-500 hover:text-white`}
            >
              <div className='flex items-center'>
                <span className='font-normal'>{contact.name}</span>
                <span className='bg-slate-400 mx-2 font-bold'>|</span>
                <span className='font-normal'>{contact.phone}</span>
              </div>
              <div>
                <span className=' font-normal'>{contact.address} </span>
              </div>
            </button>
          ))}
        </DialogBody>
      </Dialog>
    </>
  )
}

export default SumaryOrder

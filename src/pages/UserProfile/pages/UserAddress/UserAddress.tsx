import {
  Input,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter
} from '@material-tailwind/react'
import { PencilSquareIcon, PlusCircleIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { TrashIcon } from '@heroicons/react/24/outline'
import React from 'react'
const TABLE_HEAD = ['Họ và tên', 'Số điện thoại', 'Địa chỉ', '']

const TABLE_ROWS = [
  {
    name: 'Trần Anh Thi',
    job: '01235679',
    date: 'Kí túc xá khu B đại học quốc gia Phường Linh Trung, Thành Phố Thủ Đức, TP. Hồ Chí Minh'
  },
  {
    name: 'Trần Huỳnh Cư',
    job: '0747477444',
    date: 'Kí túc xá khu B đại học quốc gia Phường Linh Trung, Thành Phố Thủ Đức, TP. Hồ Chí Minh'
  },
  {
    name: 'Trì Anh Thân',
    job: '1834843827',
    date: 'Kí túc xá khu B đại học quốc gia Phường Linh Trung, Thành Phố Thủ Đức, TP. Hồ Chí Minh'
  }
]

function UserAddress() {
  const [open, setOpen] = React.useState<boolean>(false)
  const [openEdit, setOpenEdit] = React.useState<boolean>(false)
  const handleOpen = () => setOpen((cur) => !cur)
  const handleOpenEdit = () => setOpenEdit((cur) => !cur)
  return (
    <>
      <div className='bg-gray-300 p-16 pt-6'>
        <div className='mt-12 rounded bg-white p-8 shadow'>
          {' '}
          <div className='  border-b text-start'>
            <div className=' flex justify-between'>
              {' '}
              <h1 className='text-2xl font-bold text-gray-700'>Địa chỉ của bạn</h1>{' '}
              <Button variant='gradient' className='flex items-center gap-2' onClick={handleOpen}>
                <PlusCircleIcon strokeWidth={2} className='h-5 w-5' /> Thêm địa chỉ
              </Button>
              <Dialog open={open} handler={handleOpen}>
                <div className='flex items-center justify-between'>
                  <DialogHeader>Thêm địa chỉ mới</DialogHeader>
                  <XMarkIcon className='mr-3 h-5 w-5' onClick={handleOpen} />
                </div>
                <DialogBody divider>
                  <div className='grid gap-6'>
                    <Input label='Tên người nhận' />
                    <Input label='Số điện thoại người nhận' />
                    <Input label='Địa chỉ' />
                  </div>
                </DialogBody>
                <DialogFooter className='space-x-2'>
                  <Button variant='outlined' color='red' onClick={handleOpen}>
                    Đóng
                  </Button>
                  <Button variant='gradient' color='green' onClick={handleOpen}>
                    Thêm địa chỉ
                  </Button>
                </DialogFooter>
              </Dialog>
            </div>{' '}
            <div className='mt-4 flex justify-center text-start text-gray-500'></div>{' '}
          </div>
          <div className='mt-8'>
            <table className='w-full min-w-max table-auto text-left'>
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th key={head} className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'>
                      <Typography variant='small' color='blue-gray' className='font-normal leading-none opacity-70'>
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map(({ name, job, date }) => (
                  <tr key={name} className='even:bg-blue-gray-50/50'>
                    <td className='p-4'>
                      <Typography variant='small' color='blue-gray' className='font-normal'>
                        {name}
                      </Typography>
                    </td>
                    <td className='p-4'>
                      <Typography variant='small' color='blue-gray' className='font-normal'>
                        {job}
                      </Typography>
                    </td>
                    <td className='p-4'>
                      <Typography variant='small' color='blue-gray' className='font-normal'>
                        {date}
                      </Typography>
                    </td>
                    <td className='p-4'>
                      <IconButton variant='text' onClick={handleOpenEdit}>
                        <PencilSquareIcon strokeWidth={2} className='h-5 w-5' />
                      </IconButton>

                      <IconButton variant='text'>
                        <TrashIcon strokeWidth={2} className='h-5 w-5' />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Dialog open={openEdit} handler={handleOpenEdit}>
          <div className='flex items-center justify-between'>
            <DialogHeader>Thay đổi địa chỉ</DialogHeader>
            <XMarkIcon className='mr-3 h-5 w-5' onClick={handleOpenEdit} />
          </div>
          <DialogBody divider>
            <div className='grid gap-6'>
              <Input label='Tên người nhận' />
              <Input label='Số điện thoại người nhận' />
              <Input label='Địa chỉ' />
            </div>
          </DialogBody>
          <DialogFooter className='space-x-2'>
            <Button variant='outlined' color='red' onClick={handleOpenEdit}>
              Đóng
            </Button>
            <Button variant='gradient' color='green' onClick={handleOpenEdit}>
              Thêm địa chỉ
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
    </>
  )
}

export default UserAddress

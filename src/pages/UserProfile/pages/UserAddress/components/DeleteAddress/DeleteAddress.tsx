import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Typography } from '@material-tailwind/react'
import { AddressType } from 'src/types/user.type'

interface DeleteAddressProps {
  address: AddressType
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function DeleteAddress({ address, isOpen, setIsOpen }: DeleteAddressProps) {
  return (
    <>
      <Dialog open={isOpen} handler={setIsOpen}>
        <DialogHeader>
          <Typography variant='h5' color='blue-gray'>
            Xóa địa chỉ
          </Typography>
        </DialogHeader>
        <DialogBody divider className='grid place-items-center gap-4'>
          <Typography color='red' variant='h6'>
            Bạn có chắc muốn xóa địa chỉ này
          </Typography>
          <Typography className='text-center font-normal'>
            <div>Tên: {address?.name}</div>
            <div>Số điện thoại: {address?.phone}</div>
            <div>Địa chỉ: {address?.address}</div>
          </Typography>
        </DialogBody>
        <DialogFooter className='space-x-2'>
          <Button variant='text' color='blue-gray' onClick={() => setIsOpen(false)}>
            Đóng
          </Button>
          <Button variant='gradient' color='red' onClick={() => setIsOpen(false)}>
            Xóa
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}

export default DeleteAddress

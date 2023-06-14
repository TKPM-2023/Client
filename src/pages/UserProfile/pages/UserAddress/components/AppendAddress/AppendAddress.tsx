import { Input, Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import React from 'react'

interface EditAddressProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function AppendAddress({ isOpen, setIsOpen }: EditAddressProps) {
  return (
    <>
      <Dialog open={isOpen} handler={setIsOpen}>
        <div className='flex items-center justify-between'>
          <DialogHeader>Thêm địa chỉ mới</DialogHeader>
          <XMarkIcon className='mr-3 h-5 w-5' onClick={() => setIsOpen(false)} />
        </div>
        <DialogBody divider>
          <div className='grid gap-6'>
            <Input label='Tên người nhận' />
            <Input label='Số điện thoại người nhận' />
            <Input label='Địa chỉ' />
          </div>
        </DialogBody>
        <DialogFooter className='space-x-2'>
          <Button variant='outlined' color='red' onClick={() => setIsOpen(false)}>
            Đóng
          </Button>
          <Button variant='gradient' color='green' onClick={() => setIsOpen(false)}>
            Thêm địa chỉ
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}

export default AppendAddress

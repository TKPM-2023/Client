import { Input, Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { AddressType } from 'src/types/user.type'
import React from 'react'

interface EditAddressProps {
  address: AddressType
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function EditAddress({ address, isOpen, setIsOpen }: EditAddressProps) {
  //if (!address) return null
  return (
    <>
      <Dialog open={isOpen} handler={setIsOpen}>
        <div className='flex items-center justify-between'>
          <DialogHeader>Thay đổi địa chỉ</DialogHeader>
          <XMarkIcon className='mr-3 h-5 w-5' onClick={() => setIsOpen(false)} />
        </div>
        <DialogBody divider>
          <div className='grid gap-6'>
            <Input label='Tên người nhận' defaultValue={address?.name} />
            <Input label='Số điện thoại người nhận' defaultValue={address?.phone} />
            <Input label='Địa chỉ' defaultValue={address?.address} />
          </div>
        </DialogBody>
        <DialogFooter className='space-x-2'>
          <Button variant='outlined' color='red' onClick={() => setIsOpen(false)}>
            Đóng
          </Button>
          <Button variant='gradient' color='green' onClick={() => setIsOpen(false)}>
            Hoàn tất
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}

export default EditAddress

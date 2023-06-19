import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Typography } from '@material-tailwind/react'
import { AddressType } from 'src/types/contact.type'
import { useMutation } from '@tanstack/react-query'
import contactApi from 'src/apis/contact.api'
import { toast } from 'react-toastify'

interface DeleteAddressProps {
  address: AddressType
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleRefetchData: () => void
}

function DeleteAddress({ address, isOpen, setIsOpen, handleRefetchData }: DeleteAddressProps) {
  const deleteUserContactMutation = useMutation({
    mutationFn: () => contactApi.deleteContact(address?.id as string),
    onSuccess: () => {
      toast.success('Xóa địa chỉ thành công')
    }
  })

  const handleDeleteUserContact = () => {
    deleteUserContactMutation.mutate()
    handleRefetchData()
    setIsOpen(false)
  }

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
          <div className='text-center font-normal'>
            <div>
              <span className='font-bold text-black'>Tên:</span> {address?.name}
            </div>
            <div>
              <span className='font-bold text-black'>Số điện thoại:</span> {address?.phone}
            </div>
            <div>
              <span className='font-bold text-black'>Địa chỉ:</span> {address?.addr}
            </div>
          </div>
        </DialogBody>
        <DialogFooter className='space-x-2'>
          <Button variant='text' color='blue-gray' onClick={() => setIsOpen(false)}>
            Đóng
          </Button>
          <Button variant='gradient' color='red' onClick={handleDeleteUserContact}>
            Xóa
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}

export default DeleteAddress

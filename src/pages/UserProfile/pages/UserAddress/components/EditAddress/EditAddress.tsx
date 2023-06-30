import { Input, Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { AddressType } from 'src/types/contact.type'
import { useFormik } from 'formik'
import { useMutation } from '@tanstack/react-query'
import contactApi from 'src/apis/contact.api'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

interface EditAddressProps {
  address: AddressType
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleRefetchData: () => void
}

function EditAddress({ address, isOpen, setIsOpen, handleRefetchData }: EditAddressProps) {
  const updateUserContactMutation = useMutation({
    mutationFn: (body: AddressType) => contactApi.updateContact(address?.id as string, body),
    onSuccess: () => {
      toast.success('Cập nhật địa chỉ thành công')
    }
  })

  const formik = useFormik({
    initialValues: {
      name: address?.name || 'abc',
      phone: address?.phone || 'abc',
      addr: address?.addr || 'abc'
    },

    onSubmit: async (newContact) => {
      await updateUserContactMutation.mutateAsync(newContact)
      handleRefetchData()
      setIsOpen(false)
    }
  })

  useEffect(() => {
    if (address) {
      formik.setValues({
        name: address.name,
        phone: address.phone,
        addr: address.addr
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address])

  return (
    <>
      <Dialog open={isOpen} handler={setIsOpen}>
        <form onSubmit={formik.handleSubmit}>
          <div className='flex items-center justify-between'>
            <DialogHeader>Thay đổi địa chỉ</DialogHeader>
            <XMarkIcon className='mr-3 h-5 w-5' onClick={() => setIsOpen(false)} />
          </div>
          <DialogBody divider>
            <div className='grid gap-6'>
              <Input
                name='name'
                id='name'
                value={formik.values.name}
                onChange={formik.handleChange}
                label='Tên người nhận'
                required
              />
              <Input
                name='phone'
                id='phone'
                value={formik.values.phone}
                onChange={formik.handleChange}
                label='Số điện thoại người nhận'
                required
              />
              <Input
                name='addr'
                id='addr'
                value={formik.values.addr}
                onChange={formik.handleChange}
                label='Địa chỉ'
                required
              />
            </div>
          </DialogBody>
          <DialogFooter className='space-x-2'>
            <Button variant='outlined' color='red' onClick={() => setIsOpen(false)}>
              Đóng
            </Button>
            <Button type='submit' variant='gradient' color='green' onClick={() => setIsOpen(false)}>
              Hoàn tất
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  )
}

export default EditAddress

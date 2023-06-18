import { Input, Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react'
import { useFormik } from 'formik'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { useMutation } from '@tanstack/react-query'
import contactApi from 'src/apis/contact.api'
import { AddressType } from 'src/types/contact.type'
import { toast } from 'react-toastify'
import React from 'react'

interface EditAddressProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleRefetchData: () => void
}

function AppendAddress({ isOpen, setIsOpen, handleRefetchData }: EditAddressProps) {
  const createUserContactMutation = useMutation({
    mutationFn: (body: AddressType) => contactApi.createContact(body),
    onSuccess: () => {
      toast.success('Thêm địa chỉ mới thành công')
    }
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      addr: ''
    },

    onSubmit: async (newContact) => {
      await createUserContactMutation.mutateAsync(newContact)
      formik.setValues({
        name: '',
        phone: '',
        addr: ''
      })
      handleRefetchData()
      setIsOpen(false)
    }
  })

  return (
    <>
      <Dialog open={isOpen} handler={setIsOpen}>
        <form onSubmit={formik.handleSubmit}>
          <div className='flex items-center justify-between'>
            <DialogHeader>Thêm địa chỉ mới</DialogHeader>
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
            <Button type='submit' variant='gradient' color='green'>
              Thêm địa chỉ
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  )
}

export default AppendAddress

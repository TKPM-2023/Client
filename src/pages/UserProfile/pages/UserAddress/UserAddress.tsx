import { Button } from '@material-tailwind/react'
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import { AddressType, ContactListConfig } from 'src/types/contact.type'
import contactApi from 'src/apis/contact.api'
import { useState, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AppContext } from 'src/contexts/app.context'

import TableAddress from './components/TableAddress'
import EditAddress from './components/EditAddress'
import AppendAddress from './components/AppendAddress'
import DeleteAddress from './components/DeleteAddress'

function UserAddress() {
  const [isOpenAppendAddress, setIsOpenAppendAddress] = useState<boolean>(false)
  const [isOpenEditAddress, setIsOpenEditAddress] = useState<boolean>(false)
  const [isOpenDeleteAddress, setIsOpenDeleteAddress] = useState<boolean>(false)
  const [deleteAddressData, setDeleteAddressData] = useState<AddressType | null>(null)
  const [editAddressData, setEditAddressData] = useState<AddressType | null>(null)

  const { profile } = useContext(AppContext)

  const contactQueryConfig: ContactListConfig = {
    user_id: `"${profile?.id}"`,
    status: 1
  }
  const { data: contactData, refetch } = useQuery({
    queryKey: ['address', contactQueryConfig],
    queryFn: () => contactApi.getListContact(contactQueryConfig),
    keepPreviousData: true
  })

  const contactList = contactData?.data.data

  const handleClickEditButton = (address: AddressType) => {
    setIsOpenEditAddress(true)
    setEditAddressData(address)
  }

  const handleClickDeleteButton = (address: AddressType) => {
    setIsOpenDeleteAddress(true)
    setDeleteAddressData(address)
  }

  const handleOpenAppendAddress = () => {
    setIsOpenAppendAddress(true)
  }

  const handleRefetchDataa = () => {
    refetch()
  }
  return (
    <>
      <div className='bg-gray-300 p-16 pt-6'>
        <div className='mt-12 rounded bg-white p-8 shadow'>
          {' '}
          <div className='  border-b text-start'>
            <div className=' flex justify-between'>
              {' '}
              <h1 className='text-2xl font-bold text-gray-700'>Địa chỉ của bạn</h1>{' '}
              <Button variant='gradient' className='flex items-center gap-2' onClick={handleOpenAppendAddress}>
                <PlusCircleIcon strokeWidth={2} className='h-5 w-5' /> Thêm địa chỉ
              </Button>
              <AppendAddress
                isOpen={isOpenAppendAddress}
                setIsOpen={setIsOpenAppendAddress}
                handleRefetchData={handleRefetchDataa}
              />
            </div>{' '}
            <div className='mt-4 flex justify-center text-start text-gray-500'></div>{' '}
          </div>
          <TableAddress
            addresses={contactList as AddressType[]}
            handleClickEditButton={handleClickEditButton}
            handleClickDeleteButton={handleClickDeleteButton}
          />
        </div>
        <EditAddress
          address={editAddressData as AddressType}
          isOpen={isOpenEditAddress}
          setIsOpen={setIsOpenEditAddress}
          handleRefetchData={handleRefetchDataa}
        />

        <DeleteAddress
          address={deleteAddressData as AddressType}
          isOpen={isOpenDeleteAddress}
          setIsOpen={setIsOpenDeleteAddress}
          handleRefetchData={handleRefetchDataa}
        />
      </div>
    </>
  )
}

export default UserAddress

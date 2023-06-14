import { Button } from '@material-tailwind/react'
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import TableAddress from './components/TableAddress'
import EditAddress from './components/EditAddress'
import AppendAddress from './components/AppendAddress'
import DeleteAddress from './components/DeleteAddress'
import { AddressType } from 'src/types/user.type'
import { useState } from 'react'

const TABLE_ROWS = [
  {
    name: 'Trần Anh Thi',
    phone: '01235679',
    address: 'Kí túc xá khu B đại học quốc gia Phường Linh Trung, Thành Phố Thủ Đức, TP. Hồ Chí Minh'
  },
  {
    name: 'Trần Huỳnh Cư',
    phone: '0747477444',
    address: '134 Võ Xu, Đức Linh, Bình Thuận'
  },
  {
    name: 'Trì Anh Thân',
    phone: '1834843827',
    address: 'Kí túc xá khu B đại học quốc gia Phường Linh Trung, Thành Phố Thủ Đức, TP. Hồ Chí Minh'
  }
]

function UserAddress() {
  const [isOpenAppendAddress, setIsOpenAppendAddress] = useState<boolean>(false)
  const [isOpenEditAddress, setIsOpenEditAddress] = useState<boolean>(false)
  const [isOpenDeleteAddress, setIsOpenDeleteAddress] = useState<boolean>(false)
  const [deleteAddressData, setDeleteAddressData] = useState<AddressType | null>(null)
  const [editAddressData, setEditAddressData] = useState<AddressType | null>(null)

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
              <AppendAddress isOpen={isOpenAppendAddress} setIsOpen={setIsOpenAppendAddress} />
            </div>{' '}
            <div className='mt-4 flex justify-center text-start text-gray-500'></div>{' '}
          </div>
          <TableAddress
            addresses={TABLE_ROWS}
            handleClickEditButton={handleClickEditButton}
            handleClickDeleteButton={handleClickDeleteButton}
          />
        </div>
        <EditAddress
          address={editAddressData as AddressType}
          isOpen={isOpenEditAddress}
          setIsOpen={setIsOpenEditAddress}
        />

        <DeleteAddress
          address={deleteAddressData as AddressType}
          isOpen={isOpenDeleteAddress}
          setIsOpen={setIsOpenDeleteAddress}
        />
      </div>
    </>
  )
}

export default UserAddress

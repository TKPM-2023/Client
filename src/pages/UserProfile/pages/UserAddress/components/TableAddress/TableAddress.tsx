import { Typography, IconButton } from '@material-tailwind/react'
import { PencilSquareIcon } from '@heroicons/react/24/solid'
import { TrashIcon } from '@heroicons/react/24/outline'
import { AddressType } from 'src/types/contact.type'
const TABLE_HEAD = ['Họ và tên', 'Số điện thoại', 'Địa chỉ', '']

interface TableAddressProps {
  addresses: AddressType[]
  handleClickEditButton: (product: AddressType) => void
  handleClickDeleteButton: (product: AddressType) => void
}

function TableAddress({ addresses, handleClickEditButton, handleClickDeleteButton }: TableAddressProps) {
  if (addresses?.length === 0)
    return (
      <div className='mt-8'>
        <Typography variant='head' color='blue-gray' className='font-normal leading-none opacity-70'>
          Bạn chưa có địa chỉ nào
        </Typography>
      </div>
    )
  return (
    <>
      <div className='mt-8'>
        <table className='w-full min-w-max table-auto text-left'>
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'>
                  <Typography variant='paragraph' color='black' className='font-bold leading-none'>
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {addresses?.map((data) => (
              <tr key={data.id} className='even:bg-blue-gray-50/50'>
                <td className='w-60 p-4'>
                  <Typography variant='small' color='blue-gray' className='font-normal'>
                    {data.name ? data.name : ''}
                  </Typography>
                </td>
                <td className='w-40 p-4'>
                  <Typography variant='small' color='blue-gray' className='font-normal'>
                    {data.phone ? data.phone : ''}
                  </Typography>
                </td>
                <td className='p-4'>
                  <Typography variant='small' color='blue-gray' className='font-normal'>
                    {data.addr ? data.addr : ''}
                  </Typography>
                </td>
                <td className='w-32 p-4'>
                  <IconButton variant='text' onClick={() => handleClickEditButton(data)}>
                    <PencilSquareIcon strokeWidth={2} className='h-5 w-5' />
                  </IconButton>

                  <IconButton variant='text' onClick={() => handleClickDeleteButton(data)}>
                    <TrashIcon strokeWidth={2} className='h-5 w-5' />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default TableAddress

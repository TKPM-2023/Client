import Button from 'src/components/Button'
import Input from 'src/components/Input'
import Modal from 'src/components/Modal'
import { User } from 'src/types/user.type'
import { renderRole } from 'src/utils/utils'

interface Props {
  user: User
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function ViewModal({ user, isOpen, setIsOpen }: Props) {
  if (!user) return null
  return (
    <Modal headingTitle='Xem người dùng' isOpen={isOpen} setIsOpen={setIsOpen}>
      <div>
        <div className='py-4'>
          <div className='grid grid-cols-12 gap-3'>
            <div className='col-span-12'>
              <div className='text-sm font-medium'>ID</div>
              <Input className='mt-2' defaultValue={user.id} />
            </div>

            <div className='col-span-12'>
              <div className='text-sm font-medium'>Email</div>
              <Input className='mt-2' defaultValue={user.email} />
            </div>

            <div className='col-span-6'>
              <div className='text-sm font-medium'>Họ và tên đệm</div>
              <Input className='mt-2' defaultValue={user.first_name} />
            </div>

            <div className='col-span-6'>
              <div className='text-sm font-medium'>Tên</div>
              <Input className='mt-2' defaultValue={user.last_name} />
            </div>

            <div className='col-span-6'>
              <div className='text-sm font-medium'>Điện thoại</div>
              <Input className='mt-2' defaultValue={user.phone} />
            </div>

            <div className='col-span-3'>
              <div className='text-sm font-medium'>Vai trò</div>
              <Input className='mt-2' defaultValue={renderRole(user.role)} />
            </div>

            <div className='col-span-3'>
              <div className='text-sm font-medium'>Trạng thái</div>
              <Input className='mt-2' defaultValue={user.status} />
            </div>
          </div>
        </div>

        <div className='h-[1px] bg-gray-200'></div>

        <div className='flex items-center justify-end gap-1 px-4 py-3'>
          <Button
            type='button'
            className='group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-pink-200 group-hover:from-pink-500 group-hover:to-orange-400 dark:text-white dark:focus:ring-pink-800'
            onClick={() => setIsOpen(false)}
          >
            <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
              Thoát
            </span>
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default ViewModal

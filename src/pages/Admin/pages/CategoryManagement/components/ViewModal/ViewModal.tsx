import Button from 'src/components/Button'
import Input from 'src/components/Input'
import Modal from 'src/components/Modal'
import { Category } from 'src/types/category.type'

interface Props {
  category: Category
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function ViewModal({ category, isOpen, setIsOpen }: Props) {
  if (!category) return null
  return (
    <Modal headingTitle='Xem sản phẩm' isOpen={isOpen} setIsOpen={setIsOpen}>
      <div>
        <div className='py-4'>
          <div className='grid grid-cols-12 gap-3'>
            <div className='col-span-12'>
              <div className='text-sm font-medium'>ID</div>
              <Input className='mt-2' defaultValue={category.id} />
            </div>

            <div className='col-span-12'>
              <div className='text-sm font-medium'>Tên</div>
              <Input className='mt-2' defaultValue={category.name} />
            </div>

            <div className='col-span-12'>
              <div className='text-sm font-medium'>Mô tả</div>
              <textarea
                className='min-h-[100px] w-full border border-gray-300 p-2 text-sm outline-none focus:border-gray-400'
                defaultValue={category.description}
              />
            </div>

            <div className='col-span-6'>
              <div className='text-sm font-medium'>Số lượng sản phẩm</div>
              <Input className='mt-2' defaultValue={category.total_product} />
            </div>

            <div className='col-span-6'>
              <div className='text-sm font-medium'>Trạng thái</div>
              <Input className='mt-2' defaultValue={category.status} />
            </div>

            <div className='col-span-12'>
              <div className='text-sm font-medium'>Biểu tượng</div>

              <div className='mt-3 flex min-h-[160px] flex-wrap items-center justify-center gap-2 rounded border px-4'>
                {category.icon ? (
                  <div className='h-[150px] w-[140px] border'>
                    <img className='h-full w-full object-cover' src={category.icon.url} alt={category.name} />
                  </div>
                ) : (
                  <span className='text-sm text-gray-400'>Hình ảnh xem trước</span>
                )}
              </div>
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

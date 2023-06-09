import Button from 'src/components/Button'
import Input from 'src/components/Input'
import Modal from 'src/components/Modal'
import { Category } from 'src/types/category.type'
import { Product } from 'src/types/product.type'

interface Props {
  product: Product
  categories?: Category[]
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function ViewModal({ product, categories, isOpen, setIsOpen }: Props) {
  if (!product) return null
  return (
    <Modal headingTitle='Xem sản phẩm' isOpen={isOpen} setIsOpen={setIsOpen}>
      <div>
        <div className='py-4'>
          <div className='grid grid-cols-12 gap-3'>
            <div className='col-span-12'>
              <div className='text-sm font-medium'>ID</div>
              <Input className='mt-2' defaultValue={product.id} />
            </div>

            <div className='col-span-12'>
              <div className='text-sm font-medium'>Tên</div>
              <Input className='mt-2' defaultValue={product.name} />
            </div>

            <div className='col-span-12'>
              <div className='text-sm font-medium'>Mô tả</div>
              <textarea
                className='min-h-[100px] w-full border border-gray-300 p-2 text-sm outline-none focus:border-gray-400'
                defaultValue={product.description}
              />
            </div>

            <div className='col-span-6'>
              <div className='text-sm font-medium'>Đơn giá</div>
              <Input className='mt-2' defaultValue={product.price} />
            </div>

            <div className='col-span-6'>
              <div className='text-sm font-medium'>Số lượng</div>
              <Input className='mt-2' defaultValue={product.quantity} />
            </div>

            <div className='col-span-6'>
              <div className='text-sm font-medium'>Thể loại</div>
              <select
                className='mt-2 w-full border border-gray-300 p-2 text-sm outline-none focus:border-gray-400'
                defaultValue={product.category_id}
              >
                <option value='' disabled>
                  -- Thể loại --
                </option>
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className='col-span-3'>
              <div className='text-sm font-medium'>Trạng thái</div>
              <Input className='mt-2' defaultValue={product.status} />
            </div>

            <div className='col-span-3'>
              <div className='text-sm font-medium'>Tổng đánh giá</div>
              <Input className='mt-2' defaultValue={product.total_rating} />
            </div>

            <div className='col-span-12'>
              <div className='text-sm font-medium'>Hình ảnh</div>

              <div className='mt-3 flex min-h-[160px] flex-wrap items-center justify-center gap-2 rounded border px-4'>
                {product.images && product.images.length > 0 ? (
                  product.images.map((image) => (
                    <div key={image.url} className='h-[150px] w-[140px] border'>
                      <img className='h-full w-full object-cover' src={image.url} alt={`${product.name}-${image.id}`} />
                    </div>
                  ))
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

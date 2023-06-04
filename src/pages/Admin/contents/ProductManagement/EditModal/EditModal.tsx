import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useId, useState } from 'react'
import { useForm } from 'react-hook-form'

import Button from 'src/components/Button'
import Input from 'src/components/Input'
import Modal from 'src/components/Modal'
import { Category } from 'src/types/category.type'
import { Product } from 'src/types/product.type'
import { ProductSchema, productSchema } from 'src/utils/rules'

interface Props {
  product: Product | null
  categories: Category[]
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

type FormData = Omit<ProductSchema, 'images'>
const schema = productSchema.omit(['images'])

function EditModal({ product, categories, isOpen, setIsOpen }: Props) {
  const imagesInputId = useId()

  const {
    formState: { errors },
    register,
    setValue,
    handleSubmit
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const [imageFiles, setImageFiles] = useState<FileList | null>(null)
  const [imageUrls, setImageUrls] = useState<string[] | null>(null)

  useEffect(() => {
    if (product) {
      setValue('category_id', product.category_id)
      setValue('description', product.description)
      setValue('name', product.name)
      setValue('price', product.price)
      setValue('quantity', product.quantity)
    }
  }, [product, setValue])

  const handleChangeImageFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length) {
      setImageFiles(files)
      setImageUrls(
        Array.from(files).map((file) => {
          return URL.createObjectURL(file)
        })
      )
    }
  }

  const onSubmit = handleSubmit((data) => {
    console.log(data)
    console.log(imageUrls)
  })

  if (!product) return null
  return (
    <Modal headingTitle='Xem sản phẩm' isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={onSubmit}>
        <div className='py-4'>
          <div className='grid grid-cols-12 gap-3'>
            <div className='col-span-12'>
              <div className='text-sm font-medium'>ID</div>
              <Input className='mt-2' disabled value={product?.id} />
            </div>

            <div className='col-span-12'>
              <div className='text-sm font-medium'>Tên</div>
              <Input className='mt-2' name='name' register={register} errorMessage={errors.name?.message} />
            </div>

            <div className='col-span-12'>
              <div className='text-sm font-medium'>Mô tả</div>
              <div className='mt-2'>
                <textarea
                  className='min-h-[100px] w-full border border-gray-300 p-2 text-sm outline-none focus:border-gray-400'
                  {...register('description')}
                />
                <div className='min-h-[1rem] text-xs text-red-500'>{errors.description?.message}</div>
              </div>
            </div>

            <div className='col-span-6'>
              <div className='text-sm font-medium'>Đơn giá</div>
              <Input className='mt-2' name='price' register={register} errorMessage={errors.price?.message} />
            </div>

            <div className='col-span-6'>
              <div className='text-sm font-medium'>Số lượng</div>
              <Input className='mt-2' name='quantity' register={register} errorMessage={errors.quantity?.message} />
            </div>

            <div className='col-span-6'>
              <div className='text-sm font-medium'>Thể loại</div>
              <div className='mt-2'>
                <select
                  className='w-full border border-gray-300 p-2 text-sm outline-none focus:border-gray-400'
                  {...register('category_id')}
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
                <div className='min-h-[1rem] text-xs text-red-500'>{errors.category_id?.message}</div>
              </div>
            </div>

            <div className='col-span-3'>
              <div className='text-sm font-medium'>Trạng thái</div>
              <Input className='mt-2' disabled value={product?.status} />
            </div>

            <div className='col-span-3'>
              <div className='text-sm font-medium'>Tổng đánh giá</div>
              <Input className='mt-2' disabled value={product?.total_rating} />
            </div>

            <div className='col-span-12'>
              <label
                htmlFor={imagesInputId}
                className='mt-3 inline-flex cursor-pointer select-none items-center justify-center gap-1 rounded bg-cyan-400 px-3 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-cyan-500 active:bg-cyan-600'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='relative top-[1px] h-4 w-4'
                >
                  <path
                    fillRule='evenodd'
                    d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z'
                    clipRule='evenodd'
                  />
                </svg>
                <span>Tải lên ảnh mới</span>
              </label>

              <Input
                id={imagesInputId}
                type='file'
                multiple
                accept='image/png, image/jpeg'
                errorClassName='none'
                hidden
                name='images'
                onChange={handleChangeImageFiles}
              />
              <div className='mt-3 flex min-h-[160px] flex-wrap items-center justify-center gap-2 rounded border px-4 py-1'>
                {!imageUrls &&
                  product.images &&
                  product.images.length > 0 &&
                  product.images.map((image) => (
                    <div key={image.id} className='h-[150px] w-[140px] border'>
                      <img className='h-full w-full object-cover' src={image.url} alt={`${product.name} ${image.id}`} />
                    </div>
                  ))}

                {imageUrls &&
                  imageUrls.length > 0 &&
                  imageUrls.map((image) => (
                    <div key={image} className='h-[150px] w-[140px] border'>
                      <img className='h-full w-full object-cover' src={image} alt={image} />
                    </div>
                  ))}

                {!imageUrls && !product.images && <span className='text-sm text-gray-400'>Preview Image</span>}
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

          <Button
            type='submit'
            className='group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800'
          >
            <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
              Đồng ý
            </span>
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default EditModal

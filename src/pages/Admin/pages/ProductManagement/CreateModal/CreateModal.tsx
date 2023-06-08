import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'

import productApi from 'src/apis/product.api'
import uploadApi from 'src/apis/upload.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import InputNumber from 'src/components/InputNumber'
import Modal from 'src/components/Modal'
import { Category } from 'src/types/category.type'
import { Upload } from 'src/types/upload.type'
import {
  MAX_PRODUCT_DESCRIPTION_CHARACTERS,
  MAX_PRODUCT_NAME_CHARACTERS,
  ProductSchema,
  productSchema
} from 'src/utils/rules'
import InputFile from 'src/components/InputFile'

interface Props {
  categories?: Category[]
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleRefetchData: () => void
}

function CreateModal({ categories, isOpen, setIsOpen, handleRefetchData }: Props) {
  const uploadImageMutation = useMutation({
    mutationFn: uploadApi.upload
  })

  const createProductMutation = useMutation({
    mutationFn: productApi.createProduct
  })

  const {
    control,
    formState: { errors },
    register,
    watch,
    handleSubmit,
    reset
  } = useForm<ProductSchema>({
    resolver: yupResolver(productSchema),
    defaultValues: {
      category_id: '',
      description: '',
      name: '',
      price: 0,
      quantity: 0,
      images: []
    }
  })

  const description = watch('description')
  const name = watch('name')

  const [imageFiles, setImageFiles] = useState<FileList | null>(null)
  const previewImages = useMemo<string[] | null>(() => {
    if (!imageFiles || imageFiles.length === 0) return null

    const filesArr = Array.from(imageFiles)
    const urls = []
    for (const file of filesArr) {
      const url = URL.createObjectURL(file)
      urls.push(url)
    }

    return urls
  }, [imageFiles])

  useEffect(() => {
    if (!isOpen) {
      previewImages && Array.from(previewImages).forEach((imageUrl) => URL.revokeObjectURL(imageUrl))
      setImageFiles(null)
      reset()
    }
  }, [isOpen, previewImages, reset])

  const onFileChange = (files: FileList) => {
    setImageFiles(files)
  }

  const onSubmit = handleSubmit(async (data) => {
    if (!imageFiles || imageFiles.length === 0) {
      toast.error('Vui lòng tải lên hình ảnh')
      return
    }

    const images: Upload[] = []
    const imageFilesArray = Array.from(imageFiles)
    for (const imageFile of imageFilesArray) {
      const formData = new FormData()
      formData.append('file', imageFile)
      formData.append('folder', 'product')
      const imageData = await uploadImageMutation.mutateAsync(formData)
      images.push(imageData.data.data)
    }

    const _data = { ...data, images }
    await createProductMutation.mutateAsync(_data)
    toast.success('Thêm sản phẩm thành công', {
      autoClose: 1000
    })
    handleRefetchData()
    setIsOpen(false)
  })

  return (
    <Modal headingTitle='Thêm sản phẩm' isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={onSubmit}>
        <div className='py-4'>
          <div className='grid grid-cols-12 gap-3'>
            <div className='relative col-span-12'>
              <div className='text-sm font-medium'>Tên</div>
              <Input className='mt-2' name='name' register={register} errorMessage={errors.name?.message} />
              <div className='absolute bottom-0 right-0 text-xs text-gray-500 '>
                {name?.length + '/' + MAX_PRODUCT_NAME_CHARACTERS}
              </div>
            </div>

            <div className='relative col-span-12'>
              <div className='text-sm font-medium'>Mô tả</div>
              <div className='mt-2'>
                <textarea
                  className='min-h-[100px] w-full border border-gray-300 p-2 text-sm outline-none focus:border-gray-400'
                  {...register('description')}
                />
                <div className='min-h-[1rem] text-xs text-red-500'>{errors.description?.message}</div>
              </div>
              <div className='absolute bottom-0 right-0 text-xs text-gray-500 '>
                {description?.length + '/' + MAX_PRODUCT_DESCRIPTION_CHARACTERS}
              </div>
            </div>

            <div className='col-span-6'>
              <div className='text-sm font-medium'>Đơn giá</div>
              <Controller
                control={control}
                name='price'
                render={({ field }) => <InputNumber {...field} className='mt-2' errorMessage={errors.price?.message} />}
              />
            </div>

            <div className='col-span-6'>
              <div className='text-sm font-medium'>Số lượng</div>
              <Controller
                control={control}
                name='quantity'
                render={({ field }) => (
                  <InputNumber {...field} className='mt-2' errorMessage={errors.quantity?.message} />
                )}
              />
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

            <div className='col-span-12'>
              <InputFile title='Tải lên hình ảnh' onFileChange={onFileChange} />

              <div className='mt-3 flex min-h-[160px] flex-wrap items-center justify-center gap-2 rounded border px-4 py-1'>
                {previewImages &&
                  previewImages.length > 0 &&
                  previewImages.map((image) => (
                    <div key={image} className='h-[150px] w-[140px] border'>
                      <img className='h-full w-full object-cover' src={image} alt={image} />
                    </div>
                  ))}

                {!previewImages && <span className='text-sm text-gray-400'>Hình ảnh xem trước</span>}
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
            disabled={createProductMutation.isLoading || uploadImageMutation.isLoading}
          >
            <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
              Thoát
            </span>
          </Button>

          <Button
            type='submit'
            className='group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800'
            disabled={createProductMutation.isLoading || uploadImageMutation.isLoading}
          >
            <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
              {createProductMutation.isLoading ||
                (uploadImageMutation.isLoading && (
                  <svg
                    aria-hidden='true'
                    role='status'
                    className='mr-1 inline h-4 w-4 animate-spin fill-black'
                    viewBox='0 0 100 101'
                    fill='black'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                      fill='#E5E7EB'
                    />
                    <path
                      d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                      fill='currentColor'
                    />
                  </svg>
                ))}
              Đồng ý
            </span>
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default CreateModal

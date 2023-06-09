import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'

import categoryApi from 'src/apis/category.api'
import Button from 'src/components/Button'
import Modal from 'src/components/Modal'
import { Category } from 'src/types/category.type'

interface Props {
  category: Category | null
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleRefetchData: () => void
}

function ConfirmDeleteModal({ category, isOpen, setIsOpen, handleRefetchData }: Props) {
  const deleteCategoryMutation = useMutation({
    mutationFn: categoryApi.deleteCategory
  })

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    deleteCategoryMutation.mutate(category?.id as string, {
      onSuccess: () => {
        toast.success('Xóa sản phẩm thành công', {
          autoClose: 1000
        })
        handleRefetchData()
        setIsOpen(false)
      }
    })
  }

  return (
    <Modal size='sm' headingTitle='Xóa thể loại' isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={onSubmit}>
        <div className='py-6'>
          <div className='flex items-center justify-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              className='text-red h-20 w-20'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                stroke='red'
                fill='white'
              />
            </svg>
          </div>
          <div className='mt-3 text-center font-medium leading-6'>
            Bạn có chắc chắn muốn xóa thể loại
            <br />
            <span className='font-bold'> {category?.name} </span>?
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
            disabled={deleteCategoryMutation.isLoading}
          >
            <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
              {deleteCategoryMutation.isLoading && (
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
              )}
              Đồng ý
            </span>
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default ConfirmDeleteModal

import classNames from 'classnames'
import { formatDate, formatNumber } from 'src/utils/utils'
import { ProductType, QueryConfig } from '../ProductManagement'
import Pagination from 'src/components/Pagination'
import routes from 'src/constants/routes'
import { createSearchParams } from 'react-router-dom'

interface Props {
  products: ProductType[]
  pageSize: number
  queryConfig: QueryConfig
  handleClickViewButton: (product: ProductType) => void
  handleClickEditButton: (product: ProductType) => void
  handleClickDeleteButton: (product: ProductType) => void
}

function Table({
  products,
  pageSize,
  queryConfig,
  handleClickViewButton,
  handleClickEditButton,
  handleClickDeleteButton
}: Props) {
  const page = Number(queryConfig.page)
  const limit = Number(queryConfig.limit)

  return (
    <div className='px-5'>
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-left text-sm text-black dark:text-white'>
          <thead className='bg-gray-50 uppercase text-gray-700 dark:bg-gray-700 dark:text-white'>
            <tr>
              <th scope='col' className='px-4 py-3'>
                STT
              </th>
              <th scope='col' className='px-4 py-3'>
                Tên
              </th>
              <th scope='col' className='px-4 py-3'>
                Đơn giá
              </th>
              <th scope='col' className='px-4 py-3'>
                Số lượng
              </th>
              <th scope='col' className='px-4 py-3'>
                Thể loại
              </th>
              <th scope='col' className='px-4 py-3'>
                Ngày khởi tạo
              </th>
              <th scope='col' className='px-4 py-3'>
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => {
              return (
                <tr
                  key={product.id}
                  className={classNames('border-b hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-600', {
                    'bg-gray-50 dark:bg-gray-800': index % 2 !== 0,
                    'bg-white dark:bg-gray-900': index % 2 === 0
                  })}
                >
                  <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white'>
                    {limit * (page - 1) + index + 1}
                  </th>
                  <td className='px-4 py-2'>{product.name}</td>
                  <td className='px-4 py-2'>{formatNumber(product.price)}</td>
                  <td className='px-4 py-2'>{formatNumber(product.quantity)}</td>
                  <td className='px-4 py-2'>{product.category_name}</td>
                  <td className='px-4 py-2'>{formatDate(product.created_at)}</td>
                  <td className='px-4 py-2'>
                    <div className='flex items-center gap-2'>
                      <button
                        title='Xem'
                        className='px-1 py-2 font-medium text-yellow-600 transition-colors duration-200 hover:text-yellow-700 hover:underline dark:text-yellow-500'
                        onClick={() => handleClickViewButton(product)}
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 24 24'
                          fill='currentColor'
                          className='h-4 w-4'
                        >
                          <path d='M12 15a3 3 0 100-6 3 3 0 000 6z' />
                          <path
                            fillRule='evenodd'
                            d='M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z'
                            clipRule='evenodd'
                          />
                        </svg>
                      </button>

                      <button
                        title='Sửa'
                        className='px-1 py-2 font-medium text-blue-600 transition-colors duration-200 hover:text-blue-700 hover:underline dark:text-blue-500 hover:dark:text-blue-600'
                        onClick={() => handleClickEditButton(product)}
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='h-4 w-4 fill-current'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125'
                          />
                        </svg>
                      </button>

                      <button
                        title='Xóa'
                        className='px-1 py-2 font-medium text-red-600 transition-colors duration-200 hover:text-red-700 hover:underline dark:text-red-500 hover:dark:text-red-600'
                        onClick={() => handleClickDeleteButton(product)}
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='h-4 w-4 fill-current'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <Pagination
        pageSize={pageSize}
        queryConfig={queryConfig}
        to={(page: number) => ({
          pathname: `${routes.home}${routes.admin}/${routes.manageProducts}`,
          search: createSearchParams({ ...queryConfig, page: page.toString() }).toString()
        })}
      />
    </div>
  )
}

export default Table

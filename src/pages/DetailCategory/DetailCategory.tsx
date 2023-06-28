import { Card, CardBody, Breadcrumbs, Collapse, Button } from '@material-tailwind/react'
import { ArchiveBoxXMarkIcon } from '@heroicons/react/24/outline'
import { Helmet } from 'react-helmet-async'
import { useParams, Link } from 'react-router-dom'
import ListProduct from '../Home/components/ListProduct'
import { useQuery } from '@tanstack/react-query'
import categoryApi from 'src/apis/category.api'
import { Product } from 'src/types/product.type'
import { useState } from 'react'
import _ from 'lodash'

const customSizeCard = {
  width: '60',
  gapX: '4'
}

function DetailCategory() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  })
  const { categoryId } = useParams()
  const [open, setOpen] = useState(false)
  const [isDefaultSort, setIsDefaultSort] = useState<boolean>(true)
  const [isDateSort, setIsDateSort] = useState<boolean>(false)
  const [isIncreasingSort, setIsIncreasingSort] = useState<boolean>(false)
  const [isDecreasingSort, setIsDecreasingSort] = useState<boolean>(false)

  const toggleOpen = () => setOpen((cur) => !cur)

  const { data: categoryData } = useQuery({
    queryKey: ['categoryDetail', categoryId],
    queryFn: () => categoryApi.getCategoryDetailFromUser(categoryId as string)
  })

  const categoryDetail = categoryData?.data.data
  let listProduct = categoryDetail?.products

  if (isDefaultSort) {
    listProduct = _.sortBy(listProduct, 'id')
  }
  if (isDateSort) {
    listProduct = _.sortBy(listProduct, 'created_at').reverse()
  }
  if (isIncreasingSort) {
    listProduct = _.sortBy(listProduct, 'price')
  }
  if (isDecreasingSort) {
    listProduct = _.sortBy(listProduct, 'price').reverse()
  }

  const handleButtonDefaultSort = () => {
    setIsDefaultSort(true)
    setIsDateSort(false)
    setIsDecreasingSort(false)
    setIsIncreasingSort(false)
  }

  const handleButtonIncreasingSort = () => {
    setIsDefaultSort(false)
    setIsDateSort(false)
    setIsDecreasingSort(false)
    setIsIncreasingSort(true)
  }

  const handleButtonDecreasingSort = () => {
    setIsDefaultSort(false)
    setIsDateSort(false)
    setIsDecreasingSort(true)
    setIsIncreasingSort(false)
  }

  const handleButtonDateSort = () => {
    setIsDefaultSort(false)
    setIsDateSort(true)
    setIsDecreasingSort(false)
    setIsIncreasingSort(false)
  }

  return (
    <div className='h-full bg-gray-100 py-10'>
      <Helmet>
        <title>Nón Trùm | Danh mục</title>
        <meta name='description' content='Trang chủ' />
      </Helmet>
      <div className='container h-full '>
        <div>
          <Breadcrumbs>
            <Link to='/' className='opacity-60'>
              <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4' viewBox='0 0 20 20' fill='currentColor'>
                <path d='M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z' />
              </svg>
            </Link>
            <div className=''>
              <span>{categoryDetail?.name}</span>
            </div>
          </Breadcrumbs>
        </div>
        <div className='flex h-full gap-4'>
          <div className='h-[480px]'>
            <Button onClick={toggleOpen} className='w-48' color='deep-purple'>
              Khoảng giá
            </Button>
            <Collapse open={open}>
              <Card className='w-48'>
                <CardBody>
                  <div className='flex flex-col gap-2'>
                    <button className='rounded-lg border border-gray-500 px-4 py-1 text-center text-sm font-medium hover:cursor-pointer hover:bg-gray-100'>
                      2 - 4 triệu
                    </button>
                    <button className='rounded-lg border border-gray-500 px-4 py-1 text-center text-sm font-medium hover:cursor-pointer hover:bg-gray-100'>
                      4 - 5 triệu
                    </button>
                    <button className='rounded-lg border border-gray-500 px-4 py-1 text-center text-sm font-medium hover:cursor-pointer hover:bg-gray-100'>
                      5 - 6 triệu
                    </button>
                    <button className='rounded-lg border border-gray-500 px-4 py-1 text-center text-sm font-medium hover:cursor-pointer hover:bg-gray-100'>
                      6 - 7 triệu
                    </button>
                  </div>
                </CardBody>
              </Card>
            </Collapse>
          </div>

          <div className='flex flex-col gap-4'>
            <div className='hidden items-center gap-2 md:flex'>
              <div className='flex items-center gap-1'>
                <span className='font-medium md:block md:text-base'>Sắp xếp theo:</span>
              </div>
              <div className='scroll-main scrollbar-item overflow-x-auto overflow-y-hidden whitespace-nowrap'>
                <div className='item mr-2 inline-block'>
                  <button
                    onClick={handleButtonDefaultSort}
                    className={`rounded-md rounded-md bg-white px-5 py-1 shadow-sm hover:bg-gray-200 ${
                      isDefaultSort ? '!bg-deep-purple-500 text-white' : ''
                    }`}
                  >
                    Mặc định
                  </button>
                </div>
                <div className='item mr-2 inline-block'>
                  <button
                    onClick={handleButtonDateSort}
                    className={`rounded-md bg-white px-5 py-1 shadow-sm hover:hover:bg-gray-200 ${
                      isDateSort ? '!bg-deep-purple-500 text-white' : ''
                    }`}
                  >
                    Mới nhất
                  </button>
                </div>
                <div className='item mr-2 inline-block'>
                  <button
                    onClick={handleButtonDecreasingSort}
                    className={`rounded-md bg-white px-5 py-1 shadow-sm hover:hover:bg-gray-200 
                    ${isDecreasingSort ? '!bg-deep-purple-500 text-white' : ''}`}
                  >
                    Giá giảm dần
                  </button>
                </div>
                <div className='item mr-2 inline-block'>
                  <button
                    onClick={handleButtonIncreasingSort}
                    className={`rounded-md bg-white px-5 py-1 shadow-sm hover:hover:bg-gray-200
                    ${isIncreasingSort ? '!bg-deep-purple-500 text-white' : ''}`}
                  >
                    Giá tăng dần
                  </button>
                </div>
              </div>
            </div>
            {categoryDetail?.products?.length === 0 ? (
              <div className='mt-12'>
                <div className='ml-16 flex flex-col flex-wrap items-center justify-center gap-x-8'>
                  <ArchiveBoxXMarkIcon className='h-16 w-16 opacity-20'></ArchiveBoxXMarkIcon>
                  <p className='mb-2 mt-2 pl-4 text-base font-medium md:pl-0 md:text-2xl'>Không có sản phẩm nào</p>
                </div>
              </div>
            ) : (
              <ListProduct products={listProduct as Product[]} customSizeCard={customSizeCard} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailCategory

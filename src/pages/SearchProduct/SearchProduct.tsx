import { Card, CardBody, Breadcrumbs, Collapse, Button } from '@material-tailwind/react'
import { ArchiveBoxXMarkIcon } from '@heroicons/react/24/outline'
import { Helmet } from 'react-helmet-async'
import { Link, useLocation } from 'react-router-dom'
import ListProduct from '../Home/components/ListProduct'
import { useQuery } from '@tanstack/react-query'
import productApi from 'src/apis/product.api'
import { Product } from 'src/types/product.type'
import { useState, useEffect } from 'react'
import { sortArray } from '../DetailCategory/DetailCategory'

const customSizeCard = {
  width: '60',
  gapX: '4'
}

function SearchProduct() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  })
  const location = useLocation()
  const [open, setOpen] = useState(true)
  const [filteredProductList, setFilteredProductList] = useState<Product[]>([])
  const [typeSort, setTypeSort] = useState<string>('by-default')
  const [priceFilter, setPriceFilter] = useState<string>('all')

  const search = location.search
  const searchParams = new URLSearchParams(search)
  const searchName = searchParams.get('name')

  const toggleOpen = () => setOpen((cur) => !cur)

  const { data: searchData } = useQuery({
    queryKey: ['search', searchName],
    queryFn: () => productApi.searchProduct({ name: searchName as string })
  })

  const listProduct = searchData?.data.data

  useEffect(() => {
    let tempList: Product[] | undefined
    if (priceFilter === 'all') {
      tempList = sortArray(typeSort, listProduct as Product[])
    }
    if (priceFilter === 'low') {
      tempList = listProduct?.filter((product) => {
        return product.price < 300000
      })
      tempList = sortArray(typeSort, tempList as Product[])
    }
    if (priceFilter === 'medium') {
      tempList = listProduct?.filter((product) => {
        return product.price >= 300000 && product.price <= 600000
      })
      tempList = sortArray(typeSort, tempList as Product[])
    }
    if (priceFilter === 'high') {
      tempList = listProduct?.filter((product) => {
        return product.price > 600000 && product.price <= 900000
      })
      tempList = sortArray(typeSort, tempList as Product[])
    }
    if (priceFilter === 'premium') {
      tempList = listProduct?.filter((product) => {
        return product.price > 900000
      })
      tempList = sortArray(typeSort, tempList as Product[])
    }
    setFilteredProductList(tempList as Product[])
  }, [priceFilter, typeSort, listProduct])

  return (
    <div className='h-full bg-gray-100 py-10'>
      <Helmet>
        <title>Nón Trùm | Tìm kiếm</title>
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
              <span>Kết quả tìm kiếm cho: {searchName}</span>
            </div>
          </Breadcrumbs>
        </div>
        <div className='flex h-full gap-4'>
          <div className='h-[480px]'>
            <Button
              onClick={toggleOpen}
              className={`flex w-48 justify-start gap-1 ${open ? 'rounded-b-none' : ''}`}
              color='deep-purple'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className={`h-4 w-4 transition-transform ${open ? 'rotate-90' : ''}`}
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
              </svg>
              <span>Khoảng giá</span>
            </Button>
            <Collapse open={open}>
              <Card className='w-48'>
                <CardBody>
                  <div className='flex flex-col gap-2'>
                    <button
                      onClick={() => setPriceFilter('all')}
                      className={`${
                        priceFilter === 'all' ? '!bg-deep-purple-500 text-white' : ''
                      } rounded-lg border border-gray-500 px-4 py-1 text-center text-sm font-medium hover:cursor-pointer hover:bg-gray-100`}
                    >
                      Tất cả
                    </button>
                    <button
                      onClick={() => setPriceFilter('low')}
                      className={`${
                        priceFilter === 'low' ? '!bg-deep-purple-500 text-white' : ''
                      } rounded-lg border border-gray-500 px-4 py-1 text-center text-sm font-medium hover:cursor-pointer hover:bg-gray-100`}
                    >
                      Dưới 3 trăm
                    </button>
                    <button
                      onClick={() => setPriceFilter('medium')}
                      className={`${
                        priceFilter === 'medium' ? '!bg-deep-purple-500 text-white' : ''
                      } rounded-lg border border-gray-500 px-4 py-1 text-center text-sm font-medium hover:cursor-pointer hover:bg-gray-100`}
                    >
                      3 - 6 trăm
                    </button>
                    <button
                      onClick={() => setPriceFilter('high')}
                      className={`${
                        priceFilter === 'high' ? '!bg-deep-purple-500 text-white' : ''
                      } rounded-lg border border-gray-500 px-4 py-1 text-center text-sm font-medium hover:cursor-pointer hover:bg-gray-100`}
                    >
                      6 - 9 trăm
                    </button>
                    <button
                      onClick={() => setPriceFilter('premium')}
                      className={`${
                        priceFilter === 'premium' ? '!bg-deep-purple-500 text-white' : ''
                      } rounded-lg border border-gray-500 px-4 py-1 text-center text-sm font-medium hover:cursor-pointer hover:bg-gray-100`}
                    >
                      Trên 9 trăm
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
                    onClick={() => setTypeSort('by-default')}
                    className={`rounded-md rounded-md bg-white px-5 py-1 shadow-sm hover:bg-gray-200 ${
                      typeSort === 'by-default' ? '!bg-deep-purple-500 text-white' : ''
                    }`}
                  >
                    Mặc định
                  </button>
                </div>
                <div className='item mr-2 inline-block'>
                  <button
                    onClick={() => setTypeSort('by-date')}
                    className={`rounded-md bg-white px-5 py-1 shadow-sm hover:hover:bg-gray-200 ${
                      typeSort === 'by-date' ? '!bg-deep-purple-500 text-white' : ''
                    }`}
                  >
                    Mới nhất
                  </button>
                </div>
                <div className='item mr-2 inline-block'>
                  <button
                    onClick={() => setTypeSort('by-decreasing')}
                    className={`rounded-md bg-white px-5 py-1 shadow-sm hover:hover:bg-gray-200 
                    ${typeSort === 'by-decreasing' ? '!bg-deep-purple-500 text-white' : ''}`}
                  >
                    Giá giảm dần
                  </button>
                </div>
                <div className='item mr-2 inline-block'>
                  <button
                    onClick={() => setTypeSort('by-increasing')}
                    className={`rounded-md bg-white px-5 py-1 shadow-sm hover:hover:bg-gray-200
                    ${typeSort === 'by-increasing' ? '!bg-deep-purple-500 text-white' : ''}`}
                  >
                    Giá tăng dần
                  </button>
                </div>
              </div>
            </div>
            {filteredProductList?.length === 0 ? (
              <div className='mt-12'>
                <div className='ml-52 mt-16 flex flex-col flex-wrap items-center justify-center gap-x-8'>
                  <ArchiveBoxXMarkIcon className='h-16 w-16 opacity-20'></ArchiveBoxXMarkIcon>
                  <p className='mb-2 mt-2 pl-4 text-base font-medium md:pl-0 md:text-2xl'>
                    Không có sản phẩm nào phù hợp
                  </p>
                </div>
              </div>
            ) : (
              <ListProduct products={filteredProductList as Product[]} customSizeCard={customSizeCard} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchProduct

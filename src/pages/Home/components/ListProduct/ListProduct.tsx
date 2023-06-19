import { Card, CardHeader, CardBody, Typography, Button, CardFooter, Rating } from '@material-tailwind/react'
import Pagination from 'src/components/Pagination'
import { Product, ProductListConfig } from 'src/types/product.type'
import routes from 'src/constants/routes'
import { createSearchParams, Link } from 'react-router-dom'
import useCalAveragePoint from 'src/hooks/useCalAveragePoint'

interface ListProductProps {
  products: Product[]
  productQueryConfig?: ProductListConfig
  pageSize?: number
  customSizeCard?: {
    width: string
    gapX: string
  }
}

function ListProduct({ products, productQueryConfig, pageSize, customSizeCard }: ListProductProps) {
  const CalAveragePoint = (product: Product) => {
    return useCalAveragePoint(product)
  }
  return (
    <div className={`flex flex-wrap items-center ${customSizeCard?.gapX ? 'gap-x-4' : 'gap-x-8'} gap-y-6`}>
      {products?.map((product) => (
        <Card className={`h-fit ${customSizeCard ? `w-${customSizeCard.width}` : 'w-64'}`} key={product.id}>
          <CardHeader shadow={false} floated={false} className='h-48'>
            <img
              src={product.images ? product.images[0].url : ''}
              className={`${customSizeCard ? 'h-[192px] w-[207px]' : 'h-full w-full'} object-fill`}
              alt=''
            />
          </CardHeader>
          <CardBody>
            <div className='mb-2 flex items-center justify-between'>
              <Typography color='blue-gray' className='font-bold'>
                {product.name}
              </Typography>
            </div>
            <div className='flex items-center justify-between'>
              <div className='border-r-2 border-gray-700 pr-2'>
                <Rating
                  value={CalAveragePoint(product) ? CalAveragePoint(product) : 0}
                  readonly
                  unratedColor='red'
                  ratedColor='red'
                />
              </div>
              <Typography variant='small' color='gray' className='font-normal opacity-75'>
                Số lượng: {product.quantity}
              </Typography>
            </div>
            <Typography variant='h6' color='red' className='mt-4 font-semibold'>
              {product.price.toLocaleString('vi-VN')} VNĐ
            </Typography>
          </CardBody>
          <CardFooter className='pt-0'>
            <Link to={`/product/${product.category_id}-${product.id}`}>
              <Button
                ripple={false}
                fullWidth={true}
                className='bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100'
              >
                Thêm vào giỏ
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
      {pageSize && productQueryConfig && (
        <div className='flex w-full justify-center'>
          <Pagination
            pageSize={pageSize}
            queryConfig={productQueryConfig}
            to={(page: number) => ({
              pathname: routes.home,
              search: createSearchParams({ page: page.toString() }).toString()
            })}
          />
        </div>
      )}
    </div>
  )
}

export default ListProduct

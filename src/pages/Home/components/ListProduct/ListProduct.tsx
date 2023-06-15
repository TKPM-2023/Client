import { Card, CardHeader, CardBody, Typography, Button, CardFooter, Rating } from '@material-tailwind/react'
import Pagination from 'src/components/Pagination'
import { Product, ProductListConfig } from 'src/types/product.type'
import routes from 'src/constants/routes'
import { createSearchParams, Link } from 'react-router-dom'

interface ListProductProps {
  products: Product[]
  productQueryConfig: ProductListConfig
  pageSize: number
}

function ListProduct({ products, productQueryConfig, pageSize }: ListProductProps) {
  return (
    <div className='ml-16 flex flex-wrap items-center gap-x-8 gap-y-6'>
      {products?.map((product) => (
        <Card className='h-fit w-64' key={product.id}>
          <CardHeader shadow={false} floated={false} className='h-48'>
            <img src={product.images ? product.images[0].url : ''} className='h-full w-full object-fill' alt='' />
          </CardHeader>
          <CardBody>
            <div className='mb-2 flex items-center justify-between'>
              <Typography color='blue-gray' className='font-bold'>
                {product.name}
              </Typography>
            </div>
            <div className='flex items-center justify-between'>
              <div className='border-r-2 border-gray-700 pr-2'>
                <Rating value={product.total_rating} readonly unratedColor='red' ratedColor='red' />
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
            <Link to={`/product/${product.id}`}>
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
    </div>
  )
}

export default ListProduct

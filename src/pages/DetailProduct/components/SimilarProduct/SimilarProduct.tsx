import { Card, CardHeader, CardBody, Typography, Button, CardFooter, Rating } from '@material-tailwind/react'
import { ArchiveBoxXMarkIcon } from '@heroicons/react/24/outline'
import { Category } from 'src/types/category.type'
import { Link, useParams } from 'react-router-dom'

interface Props {
  category: Category
  handleRefetchData: () => void
}

function SimilarProduct({ category, handleRefetchData }: Props) {
  const { id } = useParams()

  if (!category)
    return (
      <div>
        <p className='mb-2 mt-5 pl-4 text-base font-medium md:pl-0 md:text-2xl'>Sản phẩm tương tự</p>
        <div role='status' className='mx-12  animate-pulse space-y-8 md:flex md:items-center md:space-x-8 md:space-y-0'>
          <Card className=' h-[400px] w-32 rounded bg-gray-500 dark:bg-gray-700 sm:w-64'>{''}</Card>
          <Card className=' h-[400px] w-32 rounded bg-gray-500 dark:bg-gray-700 sm:w-64'>{''}</Card>
          <Card className=' h-[400px] w-32 rounded bg-gray-500 dark:bg-gray-700 sm:w-64'>{''}</Card>
          <Card className=' h-[400px] w-32 rounded bg-gray-500 dark:bg-gray-700 sm:w-64'>{''}</Card>
        </div>
      </div>
    )
  else if (category.products?.length === 1 && category.products[0].id === id?.split('-')[1])
    return (
      <>
        <p className='mb-2 mt-5 pl-4 text-base font-medium md:pl-0 md:text-2xl'>Sản phẩm tương tự</p>
        <div className='ml-16 flex flex-col flex-wrap items-center justify-center gap-x-8'>
          <ArchiveBoxXMarkIcon className='h-16 w-16 opacity-20'></ArchiveBoxXMarkIcon>
          <div>Không có sản phẩm nào tương tự</div>
        </div>
      </>
    )
  else
    return (
      <>
        <p className='mb-2 mt-5 pl-4 text-base font-medium md:pl-0 md:text-2xl'>Sản phẩm tương tự</p>
        <div className='ml-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-6'>
          {category?.products
            ?.filter((item) => item.id !== id?.split('-')[1])
            .slice(0, 4)
            .map((product) => (
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
                  <Link to={`/product/${product.category_id}-${product.id}`} onClick={handleRefetchData}>
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
        </div>
      </>
    )
}

export default SimilarProduct

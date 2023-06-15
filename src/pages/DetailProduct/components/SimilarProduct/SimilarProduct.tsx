import { Card, CardHeader, CardBody, Typography, Button, CardFooter, Rating } from '@material-tailwind/react'
import { Product, ProductListConfig } from 'src/types/product.type'
import { Link } from 'react-router-dom'

interface ListProductProps {
  products: Product[]
  productQueryConfig: ProductListConfig
}

// function SimilarProduct({ products, productQueryConfig }: ListProductProps) {
//   return (
//     <div className='ml-16 flex flex-wrap items-center gap-x-8 gap-y-6'>
//       {products?.map((product) => (
//         <Card className='h-fit w-64' key={product.id}>
//           <CardHeader shadow={false} floated={false} className='h-48'>
//             <img src={product.images ? product.images[0].url : ''} className='h-full w-full object-fill' alt='' />
//           </CardHeader>
//           <CardBody>
//             <div className='mb-2 flex items-center justify-between'>
//               <Typography color='blue-gray' className='font-bold'>
//                 {product.name}
//               </Typography>
//             </div>
//             <div className='flex items-center justify-between'>
//               <div className='border-r-2 border-gray-700 pr-2'>
//                 <Rating value={product.total_rating} readonly unratedColor='red' ratedColor='red' />
//               </div>
//               <Typography variant='small' color='gray' className='font-normal opacity-75'>
//                 Số lượng: {product.quantity}
//               </Typography>
//             </div>
//             <Typography variant='h6' color='red' className='mt-4 font-semibold'>
//               {product.price.toLocaleString('vi-VN')} VNĐ
//             </Typography>
//           </CardBody>
//           <CardFooter className='pt-0'>
//             <Link to={`/product/${product.id}`}>
//               <Button
//                 ripple={false}
//                 fullWidth={true}
//                 className='bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100'
//               >
//                 Thêm vào giỏ
//               </Button>
//             </Link>
//           </CardFooter>
//         </Card>
//       ))}
//     </div>
//   )
// }

function SimilarProduct() {
  return (
    <>
      <p className='mb-2 mt-5 pl-4 text-base font-medium md:pl-0 md:text-2xl'>Sản phẩm tương tự</p>
      <div className='ml-16 flex flex-wrap items-center gap-x-8 gap-y-6'>
        <Card className='h-fit w-64'>
          <CardHeader shadow={false} floated={false} className='h-48'>
            <img
              src='https://storage.googleapis.com/my-image-products/ghe-gaming-corsair-tc100-relaxed-fabric-black-grey-cf-9010052-ww--s230304371.png'
              className='h-full w-full object-fill'
              alt=''
            />
          </CardHeader>
          <CardBody>
            <div className='mb-2 flex items-center justify-between'>
              <Typography color='blue-gray' className='font-bold'>
                Ghế Gaming
              </Typography>
            </div>
            <div className='flex items-center justify-between'>
              <div className='border-r-2 border-gray-700 pr-2'>
                <Rating value={4} readonly unratedColor='red' ratedColor='red' />
              </div>
              <Typography variant='small' color='gray' className='font-normal opacity-75'>
                Số lượng: 100
              </Typography>
            </div>
            <Typography variant='h6' color='red' className='mt-4 font-semibold'>
              100.000 VNĐ
            </Typography>
          </CardBody>
          <CardFooter className='pt-0'>
            <Link to='/'>
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
        <Card className='h-fit w-64'>
          <CardHeader shadow={false} floated={false} className='h-48'>
            <img
              src='https://storage.googleapis.com/my-image-products/ghe-gaming-corsair-tc100-relaxed-fabric-black-grey-cf-9010052-ww--s230304371.png'
              className='h-full w-full object-fill'
              alt=''
            />
          </CardHeader>
          <CardBody>
            <div className='mb-2 flex items-center justify-between'>
              <Typography color='blue-gray' className='font-bold'>
                Ghế Gaming
              </Typography>
            </div>
            <div className='flex items-center justify-between'>
              <div className='border-r-2 border-gray-700 pr-2'>
                <Rating value={4} readonly unratedColor='red' ratedColor='red' />
              </div>
              <Typography variant='small' color='gray' className='font-normal opacity-75'>
                Số lượng: 100
              </Typography>
            </div>
            <Typography variant='h6' color='red' className='mt-4 font-semibold'>
              100.000 VNĐ
            </Typography>
          </CardBody>
          <CardFooter className='pt-0'>
            <Link to='/'>
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
        <Card className='h-fit w-64'>
          <CardHeader shadow={false} floated={false} className='h-48'>
            <img
              src='https://storage.googleapis.com/my-image-products/ghe-gaming-corsair-tc100-relaxed-fabric-black-grey-cf-9010052-ww--s230304371.png'
              className='h-full w-full object-fill'
              alt=''
            />
          </CardHeader>
          <CardBody>
            <div className='mb-2 flex items-center justify-between'>
              <Typography color='blue-gray' className='font-bold'>
                Ghế Gaming
              </Typography>
            </div>
            <div className='flex items-center justify-between'>
              <div className='border-r-2 border-gray-700 pr-2'>
                <Rating value={4} readonly unratedColor='red' ratedColor='red' />
              </div>
              <Typography variant='small' color='gray' className='font-normal opacity-75'>
                Số lượng: 100
              </Typography>
            </div>
            <Typography variant='h6' color='red' className='mt-4 font-semibold'>
              100.000 VNĐ
            </Typography>
          </CardBody>
          <CardFooter className='pt-0'>
            <Link to='/'>
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
        <Card className='h-fit w-64'>
          <CardHeader shadow={false} floated={false} className='h-48'>
            <img
              src='https://storage.googleapis.com/my-image-products/ghe-gaming-corsair-tc100-relaxed-fabric-black-grey-cf-9010052-ww--s230304371.png'
              className='h-full w-full object-fill'
              alt=''
            />
          </CardHeader>
          <CardBody>
            <div className='mb-2 flex items-center justify-between'>
              <Typography color='blue-gray' className='font-bold'>
                Ghế Gaming
              </Typography>
            </div>
            <div className='flex items-center justify-between'>
              <div className='border-r-2 border-gray-700 pr-2'>
                <Rating value={4} readonly unratedColor='red' ratedColor='red' />
              </div>
              <Typography variant='small' color='gray' className='font-normal opacity-75'>
                Số lượng: 100
              </Typography>
            </div>
            <Typography variant='h6' color='red' className='mt-4 font-semibold'>
              100.000 VNĐ
            </Typography>
          </CardBody>
          <CardFooter className='pt-0'>
            <Link to='/'>
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
      </div>
    </>
  )
}

export default SimilarProduct

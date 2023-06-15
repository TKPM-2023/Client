import { Helmet } from 'react-helmet-async'
import { Typography } from '@material-tailwind/react'
import HomeCarousel from './components/HomeCarousel'
import HomeCategory from './components/HomeCategory'
import ListProduct from './components/ListProduct'

function Home() {
  return (
    <>
      <div className='h-full bg-gray-100 py-10'>
        <Helmet>
          <title>Nón Trùm | Trang chủ</title>
          <meta name='description' content='Trang chủ' />
        </Helmet>
        <div className='container h-full'>
          <div className='h-[480px]'>
            <HomeCarousel />
          </div>
          <div>
            <HomeCategory />
          </div>
          <div className='mb-4 text-center'>
            <Typography color='blue-gray' variant='h3' className='font-bold'>
              Tất cả sản phẩm
            </Typography>
          </div>
          <div>
            <ListProduct />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home

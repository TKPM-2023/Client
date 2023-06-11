import { Helmet } from 'react-helmet-async'

function Home() {
  return (
    <div className='h-[400px]'>
      <Helmet>
        <title>Nón Trùm | Trang chủ</title>
        <meta name='description' content='Trang chủ' />
      </Helmet>
      Home
    </div>
  )
}

export default Home

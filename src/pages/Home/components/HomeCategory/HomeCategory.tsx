import { Avatar, Card } from '@material-tailwind/react'

function HomeCategory() {
  return (
    <div className='mb-8 mt-6 flex justify-center gap-16'>
      <a href='/'>
        <Card className='w-fit p-4'>
          <Avatar
            src='https://storage.googleapis.com/my-image-products/iphone-14-pro-max-den-thumb-600x600.jpg'
            alt='avatar'
            variant='rounded'
          />
        </Card>
      </a>
      <Card className='w-fit p-4'>
        <Avatar
          src='https://storage.googleapis.com/my-image-products/iphone-14-pro-max-den-thumb-600x600.jpg'
          alt='avatar'
          variant='rounded'
        />
      </Card>
      <Card className='w-fit p-4'>
        <Avatar
          src='https://storage.googleapis.com/my-image-products/iphone-14-pro-max-den-thumb-600x600.jpg'
          alt='avatar'
          variant='rounded'
        />
      </Card>
      <Card className='w-fit p-4'>
        <Avatar
          src='https://storage.googleapis.com/my-image-products/iphone-14-pro-max-den-thumb-600x600.jpg'
          alt='avatar'
          variant='rounded'
        />
      </Card>
    </div>
  )
}

export default HomeCategory

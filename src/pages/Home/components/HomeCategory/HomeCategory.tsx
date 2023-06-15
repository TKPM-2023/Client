import { Avatar, Card } from '@material-tailwind/react'
import { Category } from 'src/types/category.type'
import { Link } from 'react-router-dom'

interface HomeCategoryProps {
  categories: Category[]
}

function HomeCategory({ categories }: HomeCategoryProps) {
  return (
    <div className='mb-8 mt-6 flex justify-center gap-14'>
      {categories?.map((category) => (
        <Link to={`/category/${category.id}`} key={category.id}>
          <Card className='h-[72px] w-[72px] p-4'>
            <Avatar src={category.icon?.url} alt='avatar' variant='rounded' className='h-full w-full object-fill' />
          </Card>
        </Link>
      ))}
    </div>
  )
}

export default HomeCategory

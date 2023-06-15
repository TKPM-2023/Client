import { Breadcrumbs } from '@material-tailwind/react'
import { Category } from 'src/types/category.type'
import { Product } from 'src/types/product.type'
import { Link } from 'react-router-dom'

interface Props {
  category: Category
  product: Product
}

function ProductBreadcrumbs({ category, product }: Props) {
  if (!category || !product) return null
  return (
    <Breadcrumbs>
      <Link to='/' className='opacity-60'>
        <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4' viewBox='0 0 20 20' fill='currentColor'>
          <path d='M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z' />
        </svg>
      </Link>
      <Link to={`/category/${category.id}`} className='opacity-60'>
        <span>{category.name}</span>
      </Link>
      <div>{product.name}</div>
    </Breadcrumbs>
  )
}

export default ProductBreadcrumbs

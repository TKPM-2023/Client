import { Product } from 'src/types/product.type'

function useCalAveragePoint(product: Product) {
  let averagePoint = 0
  product?.ratings?.map((rating) => (averagePoint += rating.point))
  return Math.round(averagePoint / (product?.total_rating as number))
}

export default useCalAveragePoint

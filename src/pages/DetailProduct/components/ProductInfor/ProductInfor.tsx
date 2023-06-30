import { Card, CardHeader, CardBody, Typography, Button, Rating, Dialog, DialogBody } from '@material-tailwind/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { Product } from 'src/types/product.type'
import { useState, useContext } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import cartApi from 'src/apis/cart.api'
import useCalAveragePoint from 'src/hooks/useCalAveragePoint'
import { AddProductToCartType } from 'src/types/cart.type'
import { AppContext } from 'src/contexts/app.context'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { Upload } from 'src/types/upload.type'

const speed = 1300
const curveDelay = 300
const position: 'fixed' | 'absolute' = 'fixed'

//hoạt ảnh thêm vào giỏ hàng
function animationAddtoCart(locationCart: HTMLElement) {
  const img = document.querySelector<HTMLElement>('#image-product') as HTMLElement
  const imgY = position === 'fixed' ? img.getBoundingClientRect().top : img.offsetTop
  const imgX = position === 'fixed' ? img.getBoundingClientRect().left : img.offsetLeft
  const flyingImg = img.cloneNode(true) as HTMLElement

  const cartButton = locationCart

  flyingImg.classList.add('flyingImg')
  flyingImg.style.position = position
  flyingImg.style.top = `${imgY}px`
  flyingImg.style.left = `${imgX}px`
  flyingImg.style.opacity = '0.5'
  flyingImg.style.width = (img.offsetWidth as unknown as string) + 'px'
  flyingImg.style.height = (img.offsetHeight as unknown as string) + 'px'
  flyingImg.style.zIndex = '100'
  flyingImg.style.transition = `all ${speed / 1000}s ease, top ${(speed + curveDelay) / 1000}s ease, left ${
    speed / 1000
  }s ease, transform ${speed / 1000}s ease ${(speed - 10) / 1000}s`

  document.body.appendChild(flyingImg)

  flyingImg.style.top = `${(cartButton as HTMLElement).offsetTop + (cartButton as HTMLElement).offsetHeight - 30}px`
  flyingImg.style.left = `${(cartButton as HTMLElement).offsetLeft + (cartButton as HTMLElement).offsetWidth - 30}px`
  flyingImg.style.height = '1rem'
  flyingImg.style.width = '1rem'
  flyingImg.style.transform = 'scale(0)'

  setTimeout(() => {
    flyingImg.remove()
  }, speed * 1.5)
}

interface Props {
  product: Product
}

function ProductInfor({ product }: Props) {
  const { profile, setListProductIsOrdering, locationCart } = useContext(AppContext)
  const calAveragePoint = useCalAveragePoint(product)
  const [quantityOrder, setQuantityOrder] = useState<number>(1)
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen((cur) => !cur)

  const handlePlusButton = () => {
    if (quantityOrder < product.quantity) setQuantityOrder(quantityOrder + 1)
    else setQuantityOrder(product.quantity)
  }

  const handleMinusButton = () => {
    if (quantityOrder > 2) setQuantityOrder(quantityOrder - 1)
    else setQuantityOrder(1)
  }

  const handleOrderButton = () => {
    setListProductIsOrdering([
      {
        product_id: product.id,
        price: product.price,
        quantity: quantityOrder,
        name: product.name,
        images: product.images as Upload[]
      }
    ])
  }

  const addProductToCartMutation = useMutation({
    mutationFn: (body: AddProductToCartType[]) => cartApi.addProductToCard(body),
    onSuccess: () => {
      toast.success('Đã thêm vào giỏ hàng', { position: toast.POSITION.TOP_CENTER, autoClose: 1000 })
      refetch()
    }
  })

  const updateProductQuantityMutation = useMutation({
    mutationFn: (body: AddProductToCartType) => cartApi.updateProductQuantity(body),
    onSuccess: () => {
      toast.success('Đã thêm vào giỏ hàng', { position: toast.POSITION.TOP_CENTER, autoClose: 1000 })
      refetch()
    }
  })

  const { data: data, refetch } = useQuery({
    queryKey: ['cart', profile?.cart_id],
    queryFn: () => cartApi.getCart(),
    keepPreviousData: false
  })

  let isInCart = false
  let quantityProductInCart = 0
  if (data?.data?.data?.cart_products && data?.data?.data?.cart_products.length !== 0) {
    for (const cartProduct of data.data.data.cart_products) {
      if (cartProduct.Product.id === product?.id) {
        isInCart = true
        quantityProductInCart = cartProduct.quantity
      }
    }
  }

  const handleAddToCartButton = async () => {
    if (quantityOrder + quantityProductInCart > product.quantity) {
      toast.error('Vượt quá só lượng cho phép')
    } else if (isInCart) {
      await updateProductQuantityMutation.mutateAsync({
        product_id: product.id,
        quantity: quantityOrder + quantityProductInCart
      })
      animationAddtoCart(locationCart)
    } else {
      animationAddtoCart(locationCart)
      await addProductToCartMutation.mutateAsync([{ product_id: product.id, quantity: quantityOrder }])
    }
  }

  if (!product)
    return (
      <div>
        <div role='status' className='mx-12 animate-pulse space-y-8 md:flex md:items-center md:space-x-8 md:space-y-0'>
          <Card className='w-full flex-row'>
            <CardHeader shadow={false} floated={false} className='m-0 h-[377px] w-[377px] shrink-0 rounded-r-none'>
              <Card className='cursor-pointer transition-opacity hover:opacity-90' onClick={handleOpen}>
                <div className='flex h-[377px] w-[377px] items-center justify-center rounded bg-gray-500 dark:bg-gray-700'>
                  <svg
                    className='h-12 w-12 text-gray-200'
                    xmlns='http://www.w3.org/2000/svg'
                    aria-hidden='true'
                    fill='currentColor'
                    viewBox='0 0 640 512'
                  >
                    <path d='M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z' />
                  </svg>
                </div>
              </Card>
            </CardHeader>
            <CardBody>
              <div color='blue-gray' className='mb-2 font-medium'>
                <div className='mb-4 h-[28px] w-[490px] bg-gray-500 dark:bg-gray-700'></div>
              </div>
              <div className='flex items-center justify-start'>
                <div className='mb-4 h-[23px] w-[390px] bg-gray-500 dark:bg-gray-700'></div>
              </div>
              <div className='mb-4 h-[66px] w-[490px] bg-gray-500 dark:bg-gray-700'></div>
              <div color='black' className='mb-2 border-t border-gray-300 pt-2 font-normal'>
                <div className='mb-4 h-[20px] w-[70px] bg-gray-500 dark:bg-gray-700'></div>
              </div>
              <div className='mb-4 h-[38px] w-[340px] bg-gray-500 dark:bg-gray-700'></div>
              <hr className='mb-6 mt-4 border-gray-300'></hr>
              <div className='mx-8 flex justify-center gap-4'>
                <div className='mb-4 h-[50px] w-[200px] bg-gray-500 dark:bg-gray-700'></div>
                <div className='mb-4 h-[50px] w-[200px] bg-gray-500 dark:bg-gray-700'></div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    )

  return (
    <>
      <div className='flex w-full gap-4'>
        <Card className='w-full flex-row'>
          <CardHeader shadow={false} floated={false} className='m-0 h-[377px] w-[377px] shrink-0 rounded-r-none '>
            <Card className='h-full w-full cursor-pointer transition-opacity hover:opacity-90' onClick={handleOpen}>
              <img
                src={product.images ? product.images[0].url : ''}
                id='image-product'
                alt=''
                className='h-full w-full object-fill'
              />
            </Card>
            <Dialog size='xl' open={open} handler={handleOpen}>
              <DialogBody divider={true} className='p-0'>
                <img
                  alt='nature'
                  className='h-[40rem] w-full object-none object-center'
                  src={product.images ? product.images[0].url : ''}
                />
              </DialogBody>
            </Dialog>
          </CardHeader>
          <CardBody>
            <Typography variant='h5' color='blue-gray' className='mb-2 font-medium'>
              {product.name}
            </Typography>
            <div className='flex items-center justify-start'>
              <div className='mr-3 border-r-2 border-gray-700 pr-2'>
                <Rating value={calAveragePoint ? calAveragePoint : 0} readonly unratedColor='red' ratedColor='red' />
              </div>
              <Typography variant='small' color='gray' className='font-normal opacity-75'>
                Số lượng: {product.quantity}
              </Typography>
            </div>
            <div className='my-4 flex w-[490px] items-end rounded bg-gray-200 px-2 py-3 md:px-3 md:py-5'>
              <div className='mr-2 text-xl font-medium text-black md:text-xl'>
                {product.price.toLocaleString('vi-VN')} VNĐ
              </div>
            </div>
            <Typography color='black' className='mb-2 border-t border-gray-300 pt-2 font-normal'>
              Số lượng
            </Typography>
            <div className='flex w-fit items-center rounded border border-gray-700'>
              <Button variant='text' onClick={handleMinusButton} className='rounded-0 flex items-center gap-3'>
                <MinusIcon strokeWidth={2} className='h-3 w-3' />
              </Button>
              <div className='border-x border-gray-700 px-3'>{quantityOrder}</div>
              <Button variant='text' onClick={handlePlusButton} className='flex items-center gap-3'>
                <PlusIcon strokeWidth={2} className='h-3 w-3' />
              </Button>
            </div>
            <hr className='mb-6 mt-4 border-gray-300'></hr>
            <div className='mx-8 flex justify-center gap-4'>
              <Link to={'/order-and-payment'}>
                <Button onClick={handleOrderButton} color='purple' size='lg' className='flex-1'>
                  Mua ngay
                </Button>
              </Link>

              <Button onClick={handleAddToCartButton} color='purple' variant='outlined' className='' size='lg'>
                Thêm vào giỏ hàng
              </Button>
            </div>
          </CardBody>
        </Card>

        <div className='flex w-96 flex-col gap-4'>
          <Card className=' w-full'>
            <CardBody className='flex items-center gap-2'>
              <div className='flex items-center gap-3'>
                <img src='https://www.october16th.store/assets/logo-3c597220.png' alt='logo' width='32' height='32' />
                <div className='font-bold'>CÔNG TY TNHH MTV THƯƠNG MẠI DỊCH VỤ</div>
              </div>
            </CardBody>
          </Card>

          <Card className=' h-full w-full'>
            <CardBody>
              <div color='blue-gray' className='mb-2 text-lg font-bold'>
                Chính sách bán hàng
              </div>
              <div className='mb-3 flex items-center gap-2'>
                <img
                  src='data:image/png;base64,UklGRmQCAABXRUJQVlA4WAoAAAAYAAAAYwAAYwAAVlA4TBsCAAAvY8AYEIegoG0byXvu6Bx/clcahhvJmMNf/82iqG0jKXPyZzWU9rUxzEbSGlwRFuGUzv9zCAF5e+X9tf3zAViYpkiiegRQJTgvEiTYthu3zSdIURxB7X+7AQfBSOeeE9H/CcB/Jq+o8Pq4xCrrhw1W+nxW0lI+K34L/lvA1b6D98vvq5DL0Well4PJKbv4dFo4272ueoz9O5x08fnwEpOqes6/NVRdxxLeqqoQcjn6YKGX3S6wU/WqVLD7SLdtTmoGuRBogizwZc5g5uYnQ0rWOP5aJugCkzLKvF3cWhR4lqShrPLB+oqXqi7PR8MbaAI7VUHfI92qqB9xrzipqcI4MfAKssCXKri47fHSkJKu03vT4oEuMNnFnZCkHsksHvASc49kVQTahLlH0uTCKm34LQ88C8w9kpqbl/tYQ9pIAKiuMHevJPBmpzWEuBogjrbCTUnc4bBxeLQF9mYBo82CjrDTSQcwmiqMvtQ8tCDoAoVFj68mHfxp8bE05pofZ1covJicTZR4vQ+LqPJ2socqH4zm3Hw0GBN4Xu5UZ82YPMkOAEKVeJjiWB6QqUrVkpakjDl1gePXZMPcLSBK60Y0rHqzyhK+BTrhPuZaY1oZBzI+92pLcaVs9Zs+SPZS97OHxQ5Tm8A9SA/Lty1DYs4jhKfx1NmCOtmMMNb3ExXmXgcq2YPQdyrBYkpLPcJqn5pUH4LlLoQQCP9kBgBFWElGIgAAAElJKgAIAAAAAQAxAQIABwAAABoAAAAAAAAAUGljYXNhAAA='
                  alt='shipping-icon'
                  width='24'
                  height='24'
                />
                <h1 className='mb-0'>Miễn phí giao hàng cho đơn hàng từ 5 triệu</h1>
              </div>
              <div className='mb-3 flex items-center gap-2'>
                <img
                  src='data:image/png;base64,UklGRmgDAABXRUJQVlA4WAoAAAAYAAAAYwAAYwAAVlA4TCADAAAvY8AYEIegoG0byXvu6Bx/clcahhvJmMNf/82iqG0jKXPyZzWU9rUxzEbSGlwRFuGUzv9zCAF5e+X9tf3zAViYpkiiegRQJTgvEiRJtlXV0uYAyu9s7vyn+w4IaKuqE9H/CcD/pj2VUn7u02Kjfct33Zys8lWJ09V/khQ+1PhBQfn8lo+RxLHWEVv/ErmU4yroI7LEr/BJOZkEQNcR2X7ufeFunL5g+jZBsl7hJT6EeKXKhxowlDz1t6YrBn+SuyvXZsFs1AfDerszXObiFvBQLl1BMrsDunJt61jobl1C7ds61+aIxdLrCrJvilyZf4Kd7lcWMG4RfVLzFXBiuHJ9oLIjcZh/IQTB2RLClQdMO9SqHq/11dINkWYTvFiawbjusiJeHa1rG17+z879CvldPzmqvEEqSXUnXS9wlX/Tp3mlWb7MK+38YV45jN/llcOOz4rKYcdndY47PqtzqAGHdSuc0DlUj6fB6uvCIl+otzzoHKrHqnCYNJKsMnVzqB7nOet6EGlWmUgcNo+Fl+XWYc3PYpVB4rAKNmCjGuWBH7CKkTisgqXF0B3FqA+QBqweQOKwCtZWo+xIBp8gDaheKodVsJjmveNnhSf4DaiVwyxYHKzfjmD9HqEPJhOW/6ywQ6z8DP1JwvpsYWs1dAH6XMJGNeqe26BfgD6TsNHTvPdE614Br4Mfdt5W3CNWWwKvRsfWZskeZINxCXwj2bE10szY3K20BgjBYW+y+i5Rg7Jou6OpsgvJut5xWQnbvaXyBlHL70M1eL0h0Sw4sFsq5wXa/QQ0g/k4qVbFkd1iPO2mHc5As1TO6rQzDg0Wq5zk1VJ3CpLFdJA02h3HSrOYjpFKO+PgMGA6RCrtKifhN2CRE6TSVo+z04DV7XOVw4jT04AadgXlsOP8NCBv2SE3xzfemEZsYV1oHCe88x6R2a1xmZM33tonyOSeucTZjvd6nSCTm3OJs+rxZskzZI6jmDmdBS+POkO2ywHubpzWiPdLmiJZGx8mwSeGMve0BHxmKKtKwKeGsqIEfK5LOqfJ4ZOll1Hpgu/2qZRSssN/pkVYSUYiAAAASUkqAAgAAAABADEBAgAHAAAAGgAAAAAAAABQaWNhc2EAAA=='
                  alt='protect-icon'
                  width='24'
                  height='24'
                />
                <h1 className='mb-0'>Cam kết chính hãng 100%</h1>
              </div>
              <div className='flex items-center gap-2'>
                <img
                  src='data:image/png;base64,UklGRvIDAABXRUJQVlA4WAoAAAAYAAAAYwAAYwAAVlA4TKkDAAAvY8AYEIegoG0byXvu6Bx/clcahhvJmMNf/82iqG0jKXPyZzWU9rUxzEbSGlwRFuGUzv9zCAF5e+X9tf3zAViYpkiiegRQJTgvEmTJthu3EUWCgyhO+99ui8ADmLl/IvoPQZLkts0CkFYEkxH2Dge/wP0/SjRTru+UUwwfDz7mZ8ipZvpImPeAUy/xY+DKfehSS/48K8Mg9cPE52GUejqIiNzneV35ILehU0dvqY3uRJ7rO0pVItmfQGj8kRyw9i2db9pwYJ7wE3Aq2niyLdCjNRLLtF3Mk7lh9dGnHoUbRBaNsrjbZLbtya5kbz0qyz/UF25t7YGenZ2v3PrW6G7PZTr6uUxvJN1rMsV2pnlGD0Ia+sO+seVMbs8bToNbKGeoQU1ky7Gsr/F9e9BlbXpSWsGFzoIMnmUsR/v9amWhaQdGJ4yB2JhR9cLSvEoV2wQwECT991TqLkIaAlLXV52yY2RtsKnZxiNpbAdMlkyrek5WBVMRHwWjv9RnTx3rb7uOPi6s0jbl0P7uOpa88wkgYkPm5dW/i4q93lkmtilj0lJlN/Q0qdBvEh3d8wS7mgSvCCHmmhc28ZGhJqAhVJ9JMlRkNnOkNy4ZEhH14BQchMoTVnFQGDgQHYMjgUCaZnyvCsJJhJXefn8gSITXA/pAEIigBxjorstr1L6gYImgODuQ2feABr6/fC0ULGE1DUbTOApXqflyGCBX36veTO/Lg8C67TsEbY7bpwB9bKxDIBUigLxJpzVGJRh+sxKQr2CLnWCgNkRoltO6tRZHeEjxgIo0RzJdmQl2kYMQ17g9UmMc5CKBMAgVjpk1/fotpURq8gYXLEoec6tu/XoykYpI1r0GeEGgjQlsVdHjhLVdCxic4w2FNy8HLXP0SnJ73KsqymUoUHXhpBE2x9RXRzSgewkniGMMrX9UgUUwZexxNejkaGo9IjCMIJO+4EiN/tt1tvuhDzao7PHVmV5b/GDhwrq7eVho7sPcQNvZQR/WXYthCSaxqjTkbB90snAg7iHlY+W2iEw9i8nWxShwuP9FhXmqP7F90oOJOV/s/GzhwLYA8qaYqyQEPZO5jZ5GwX3nhPyQxdEuF7WCNXY3AVZETRyHnBFuRo5YEhWSxAflWjBToAhutLUcoCOxCJLtreJNPcneFhuUW8S+FBvus/bjCNwYEhrplRpipsPBvc9itvc5P8se7mmi3ouePDt4G92e+kfauvezPMi4S+Fj/o9Dqe+UUgzuf1JyAEVYSUYiAAAASUkqAAgAAAABADEBAgAHAAAAGgAAAAAAAABQaWNhc2EAAA=='
                  alt='change-icon'
                  width='24'
                  height='24'
                />
                <h1 className='mb-0'>Đổi trả trong vòng 10 ngày</h1>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      <div className='m-auto max-w-7xl px-4 md:p-0'>
        <h1 className='mt-5 text-base font-medium md:text-2xl'>Thông tin sản phẩm</h1>
        <div>
          <p className='mt-2 whitespace-pre-wrap'>{product.description}</p>
        </div>
      </div>
    </>
  )
}

export default ProductInfor

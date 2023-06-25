import { Helmet } from 'react-helmet-async'
import { Typography, Checkbox, Tooltip } from '@material-tailwind/react'
import cartApi from 'src/apis/cart.api'
import { useQuery, useMutation } from '@tanstack/react-query'
import { AppContext } from 'src/contexts/app.context'
import { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import images from 'src/assets/images'
import { AddProductToCartType, ProductIsOrderingType } from 'src/types/cart.type'
import { toast } from 'react-toastify'
import _ from 'lodash'

import ListProductInCart from './components/ListProductInCart'
import SumaryChosen from './components/SumaryChosen'

const isSimilarArray = (arr1: string[], arr2: string[]) => {
  arr1.forEach((item) => _.pull(arr2, item))
  if (arr2.length === 0) return true
  else return false
}

function Cart() {
  const { profile, setListProductIsOrdering } = useContext(AppContext)
  const [listCheckedProduct, setListCheckedProduct] = useState([''])
  const [listPrice, setListPrice] = useState<ProductIsOrderingType[]>([])
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [totalCost, setTotalCost] = useState<number>(0)

  const { data: data, refetch } = useQuery({
    queryKey: ['cart', profile?.cart_id],
    queryFn: () => cartApi.getCart(),
    keepPreviousData: false
  })

  const handleRefetchData = () => {
    refetch()
  }

  const cartData = data?.data.data

  const handleCheckboxChange = (event: { target: { checked: boolean | ((prevState: boolean) => boolean) } }) => {
    setIsChecked(event.target.checked)
  }

  const handleOrderButton = () => {
    setListProductIsOrdering(listPrice)
  }

  const listIdProductInCart = ['']
  if (cartData?.cart_products) {
    cartData?.cart_products.forEach((product) => listIdProductInCart.push(product.product_id))
  }

  useEffect(() => {
    const checkedArray = listIdProductInCart
    if (isSimilarArray(listCheckedProduct, checkedArray)) setIsChecked(true)
    else setIsChecked(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listCheckedProduct])

  useEffect(() => {
    if (isChecked) {
      setListCheckedProduct(listIdProductInCart)
    }
    if (!isChecked) {
      if (listCheckedProduct.length > 1 && listCheckedProduct.length < listIdProductInCart.length)
        setListCheckedProduct([...listCheckedProduct])
      else setListCheckedProduct([''])
      setListPrice([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecked])

  useEffect(() => {
    if (listPrice.length === 0) setTotalCost(0)
    else {
      const tempTotalCost = listPrice.reduce((accumulator, item) => accumulator + item.price * item.quantity, 0)
      setTotalCost(tempTotalCost)
    }
  }, [listPrice, listCheckedProduct])

  const deleteProductFromCartMutation = useMutation({
    mutationFn: (body: AddProductToCartType[]) => cartApi.deleteProductFromCart(body),
    onSuccess: () => {
      handleRefetchData()
      toast.success('Đã xóa khỏi giỏ hàng')
      setListCheckedProduct([''])
    }
  })

  const handleDelteAll = () => {
    const listProductDeltete: AddProductToCartType[] = []
    for (const item of listCheckedProduct) {
      if (item !== '') {
        listProductDeltete.push({ product_id: item })
      }
    }
    deleteProductFromCartMutation.mutate(listProductDeltete)
  }

  if (cartData?.cart_products.length === 0) {
    return (
      <div className='mb-16 text-center'>
        <img src={images.emptyCart} alt='empty-cart' className='inline-block mix-blend-darken md:w-1/3' />
        <p className='mb-4 text-base font-medium md:mb-3'>Bạn chưa có sản phẩm nào trong giỏ hàng!</p>
        <button
          type='button'
          className='ant-btn css-1e3x2xa ant-btn-default h-12 w-full rounded-md bg-[#9333EA] text-base font-bold text-white md:w-72'
        >
          <Link to='/'>Tiếp tục mua sắm</Link>
        </button>
      </div>
    )
  }

  return (
    <>
      <div className='h-full bg-gray-100 py-10'>
        <Helmet>
          <title>Nón Trùm | Giỏ hàng</title>
          <meta name='description' content='Trang chủ' />
        </Helmet>
        <div className='container h-full '>
          <div className='flex w-full gap-4'>
            <div className='flex flex-col '>
              <div className=' grid w-full grid-cols-[400px_150px_170px_175px_25px] rounded-md bg-white'>
                <div color='blue-gray' className='flex items-center font-bold'>
                  <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
                  <Typography variant='small' color='blue-gray' className='flex items-center font-bold'>
                    Tất cả ({cartData?.cart_products.length} sản phẩm)
                  </Typography>
                </div>
                <Typography variant='small' color='blue-gray' className='flex items-center font-bold'>
                  Đơn giá
                </Typography>
                <Typography variant='small' color='blue-gray' className='flex items-center font-bold'>
                  Số lượng
                </Typography>
                <Typography variant='small' color='blue-gray' className='flex items-center font-bold'>
                  Thành tiền
                </Typography>
                <Tooltip
                  content='Xóa các mục đã chọn'
                  animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 }
                  }}
                  placement='bottom'
                >
                  <button onClick={handleDelteAll} className='flex cursor-pointer content-end items-center'>
                    <svg
                      viewBox='64 64 896 896'
                      focusable='false'
                      data-icon='delete'
                      width='1em'
                      height='1em'
                      fill='currentColor'
                      aria-hidden='true'
                    >
                      <path d='M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z'></path>
                    </svg>
                  </button>
                </Tooltip>
              </div>
              {cartData?.cart_products.map((cartProduct) => (
                <ListProductInCart
                  key={cartProduct.Product.id}
                  productInCart={cartProduct}
                  handleRefetchData={handleRefetchData}
                  listCheckedProduct={listCheckedProduct}
                  setListCheckedProduct={setListCheckedProduct}
                  listPrice={listPrice}
                  setListPrice={setListPrice}
                />
              ))}
            </div>
            <SumaryChosen
              listCheckedProduct={listCheckedProduct}
              totalCost={totalCost}
              handleOrderButton={handleOrderButton}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart

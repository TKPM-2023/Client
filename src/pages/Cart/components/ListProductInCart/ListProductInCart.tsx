import { Typography, Checkbox } from '@material-tailwind/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { CartProductType, AddProductToCartType } from 'src/types/cart.type'
import { useMutation } from '@tanstack/react-query'
import cartApi from 'src/apis/cart.api'
import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PriceQuantityType } from 'src/types/cart.type'

interface Props {
  productInCart: CartProductType
  handleRefetchData: () => void
  listCheckedProduct: string[]
  setListCheckedProduct: React.Dispatch<React.SetStateAction<string[]>>
  listPrice: PriceQuantityType[]
  setListPrice: React.Dispatch<React.SetStateAction<PriceQuantityType[]>>
}

const isInList = (id: string, list: string[]) => {
  let yes = 0
  list.forEach((item) => {
    if (id === item) yes += 1
  })
  if (yes !== 0) return true
  else return false
}

const isInList1 = (id: string, list: PriceQuantityType[]) => {
  let yes = 0
  list.forEach((item) => {
    if (id === item.product_id) {
      yes += 1
    }
  })
  if (yes !== 0) return true
  else return false
}

function ListProductInCart({
  productInCart,
  handleRefetchData,
  listCheckedProduct,
  setListCheckedProduct,
  listPrice,
  setListPrice
}: Props) {
  const [quantityOrder, setQuantityOrder] = useState<number>(productInCart.quantity)
  const [isChecked, setIsChecked] = useState<boolean>(false)

  const deleteUserContactMutation = useMutation({
    mutationFn: (body: AddProductToCartType[]) => cartApi.deleteProductFromCart(productInCart.cart_id as string, body),
    onSuccess: () => {
      handleRefetchData()
      toast.success('Đã xóa khỏi giỏ hàng')
    }
  })

  const handlePlusButton = () => {
    if (quantityOrder < productInCart.Product.quantity) setQuantityOrder(quantityOrder + 1)
    else setQuantityOrder(productInCart.Product.quantity)
  }

  const handleMinusButton = () => {
    if (quantityOrder > 2) setQuantityOrder(quantityOrder - 1)
    else setQuantityOrder(1)
  }

  const handleDeleteProductFromCart = () => {
    deleteUserContactMutation.mutate([{ product_id: productInCart.Product.id }])
  }

  const handleCheckboxChange = (event: { target: { checked: boolean | ((prevState: boolean) => boolean) } }) => {
    setIsChecked(event.target.checked)
  }

  useEffect(() => {
    if (isInList(productInCart.product_id, listCheckedProduct)) setIsChecked(true)
    else setIsChecked(false)
  }, [listCheckedProduct])

  useEffect(() => {
    if (isChecked && !isInList(productInCart.product_id, listCheckedProduct)) {
      const newList = [...listCheckedProduct, productInCart.product_id]
      setListCheckedProduct(newList)
    }
    if (!isChecked && isInList(productInCart.product_id, listCheckedProduct)) {
      const newList = listCheckedProduct.filter((item) => item !== productInCart.product_id)
      setListCheckedProduct(newList)
    }
  }, [isChecked])

  useEffect(() => {
    if (isChecked) {
      if (isInList1(productInCart.product_id, listPrice)) {
        const newListPrice = listPrice.filter((item) => item.product_id !== productInCart.product_id)
        newListPrice.push({
          product_id: productInCart.product_id,
          price: productInCart.Product.price,
          quantity: quantityOrder
        })
        setListPrice(newListPrice)
      } else {
        listPrice.push({
          product_id: productInCart.product_id,
          price: productInCart.Product.price,
          quantity: quantityOrder
        })
        const newListPrice = listPrice
        setListPrice(newListPrice)
      }
    } else {
      setListPrice((prevListPrice) => {
        const newListPrice = prevListPrice.filter((item) => item.product_id !== productInCart.product_id)
        return newListPrice
      })
    }
  }, [isChecked, quantityOrder, listCheckedProduct])

  return (
    <div className=''>
      <div className=' mt-3 grid w-full grid-cols-[400px_150px_170px_175px_25px] rounded-md bg-white'>
        <div className='flex items-center font-bold'>
          <Checkbox id={productInCart.Product.id} checked={isChecked} onChange={handleCheckboxChange} />
          <div className='flex items-center py-3 pr-8'>
            <Link to={`/product/${productInCart.Product.category_id}-${productInCart.Product.id}`}>
              <img
                src={productInCart.Product.images ? productInCart.Product.images[0].url : ''}
                alt=''
                width={77}
              ></img>
            </Link>
            <Typography variant='small' color='blue-gray' className='ml-3 flex items-center font-bold'>
              {productInCart.Product.name}
            </Typography>
          </div>
        </div>
        <Typography variant='small' color='red' className='flex items-center '>
          {productInCart.Product.price.toLocaleString('vi-VN')} VNĐ
        </Typography>
        <div color='blue-gray' className='font-meidum flex items-center'>
          <div className='flex w-fit items-center rounded border border-gray-700'>
            <button
              className='rounded-0 flex items-center gap-3 p-3 py-2 hover:rounded hover:bg-gray-300'
              onClick={handleMinusButton}
            >
              <MinusIcon strokeWidth={2} className='h-3 w-3' />
            </button>
            <div className='border-x border-gray-700 px-3 '>{quantityOrder}</div>
            <button
              className='flex items-center gap-3 p-3 py-2 hover:rounded hover:bg-gray-300'
              onClick={handlePlusButton}
            >
              <PlusIcon strokeWidth={2} className='h-3 w-3' />
            </button>
          </div>
        </div>
        <Typography variant='small' color='red' className='flex items-center '>
          {(quantityOrder * productInCart.Product.price).toLocaleString('vi-VN')} VNĐ
        </Typography>
        <button onClick={handleDeleteProductFromCart} className='flex cursor-pointer content-end items-center'>
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
      </div>
    </div>
  )
}

export default ListProductInCart

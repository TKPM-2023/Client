import { Card, CardHeader, CardBody, Typography, Button, Rating } from '@material-tailwind/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

const MAX = 10

function ProductInfor() {
  const [quantityOrder, setQuantityOrder] = useState<number>(1)

  const handlePlusButton = () => {
    if (quantityOrder < MAX) setQuantityOrder(quantityOrder + 1)
    else setQuantityOrder(MAX)
  }

  const handleMinusButton = () => {
    if (quantityOrder > 2) setQuantityOrder(quantityOrder - 1)
    else setQuantityOrder(1)
  }

  return (
    <>
      <div className='flex w-full gap-4'>
        <Card className='w-full flex-row'>
          <CardHeader shadow={false} floated={false} className='m-0 w-2/5 shrink-0 rounded-r-none'>
            <img
              src='https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80'
              alt=''
              className='h-full w-full object-fill'
            />
          </CardHeader>
          <CardBody>
            <Typography variant='h5' color='blue-gray' className='mb-2 font-medium'>
              Lyft launching cross-platform service
            </Typography>
            <div className='flex items-center justify-start'>
              <div className='mr-3 border-r-2 border-gray-700 pr-2'>
                <Rating value={4} readonly unratedColor='red' ratedColor='red' />
              </div>
              <Typography variant='small' color='gray' className='font-normal opacity-75'>
                Số lượng: 10
              </Typography>
            </div>
            <div className='my-4 flex w-[490px] items-end rounded bg-gray-200 px-2 py-3 md:px-3 md:py-5'>
              <div className='mr-2 text-xl font-medium text-black md:text-xl'>8.500.000 VNĐ</div>
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
              <Button color='purple' size='lg' className='flex-1'>
                Mua ngay
              </Button>
              <Button color='purple' variant='outlined' className='' size='lg'>
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
          <p className='whitespace-pre-wrap'>Đang cập nhật</p>
        </div>
      </div>
    </>
  )
}

export default ProductInfor

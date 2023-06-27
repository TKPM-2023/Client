import { Typography } from '@material-tailwind/react'

function Footer() {
  return (
    <footer className='relative w-full py-6'>
      <div className='mx-auto w-full max-w-7xl px-8'>
        <div className='false bg-white'>
          <div className='m-auto flex max-w-7xl flex-col gap-5 bg-white p-4 md:flex-row'>
            <div className='md:w-[30%] md:max-w-[30%]'>
              <h1 className='mb-2 text-base font-semibold'>ĐỒ ÁN CUỐI KÌ</h1>
              <span>
                Đồ án cuối kì Thiết kế phần mềm là project demo 1 số chức năng của một website bán hàng online (Điện
                thoại, laptop &amp; Gaming Gear). Trong quá trình thực hiện project có những lỗi phát sinh, mong nhận
                được ý kiến và đóng góp của mọi người để có thể hoàn thiện hơn. Thanks!
              </span>
              <div className='mt-2'>
                <h2 className='mb-0 mr-1 inline-block font-medium'>Lưu ý:</h2>
                <span>
                  Vì đây là project chỉ mang tính chất demo nên không có chức năng thay thế hoàn toàn các website khác.
                </span>
              </div>
            </div>
            <div className='md:max-w-35%] md:w-[35%]'>
              <h1 className='mb-2 text-base font-semibold'>THÔNG TIN CÔNG TY</h1>
              <h2 className='mb-0'>Trụ sở đặt tại: </h2>
              <div className='mb-2 flex flex-col md:mb-0 md:flex-row md:gap-2'>
                <span>Ấp 3, xã Tân Thành, huyện Tân Thạnh, tỉnh Long An</span>
              </div>
              <h2 className='mb-0'>Trụ sở văn phòng:</h2>
              <div className='mb-2 flex flex-col md:mb-0 md:flex-row md:gap-2'>
                <span>43 Hồ Văn Huê, quận Phú Nhuận, thành phố Hồ Chí Minh</span>
              </div>
              <div className='mb-2 flex gap-2 md:mb-0 md:flex-row'>
                <h2 className='mb-0'>Điện thoại:</h2>
                <span>0123.456.789</span>
              </div>
              <div className='mb-2 flex gap-2 md:mb-0 md:flex-row'>
                <h2 className='mb-0'>Email:</h2>
                <span>lienhehoptac@gmail.com</span>
              </div>
            </div>
            <div className='md:max-w[-20%] md:w-[20%]'>
              <div>
                <h1 className='mb-2 text-base font-semibold'>PHƯƠNG THỨC THANH TOÁN</h1>
                <div>
                  <div className='flex items-center gap-2'>
                    <img
                      src='data:image/png;base64,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'
                      alt='vnpay-icon'
                      width='32'
                      height='32'
                    />
                    <span>VNPAY</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <img
                      src='data:image/png;base64,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'
                      alt='later-money'
                      width='32'
                      height='32'
                    />
                    <span>Tiền mặt</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-12 flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between'>
          <Typography variant='small' className='mb-4 text-center font-normal text-blue-gray-900 md:mb-0'>
            &copy; 2023 <a href='https://material-tailwind.com/'>Thiết kế phần mềm</a>. All Rights Reserved.
          </Typography>
          <div className='flex gap-4 text-blue-gray-900 sm:justify-center'>
            <Typography as='a' href='/' className='opacity-80 transition-opacity hover:opacity-100'>
              <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
                <path
                  fillRule='evenodd'
                  d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z'
                  clipRule='evenodd'
                />
              </svg>
            </Typography>
            <Typography as='a' href='/' className='opacity-80 transition-opacity hover:opacity-100'>
              <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
                <path
                  fillRule='evenodd'
                  d='M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z'
                  clipRule='evenodd'
                />
              </svg>
            </Typography>
            <Typography as='a' href='/' className='opacity-80 transition-opacity hover:opacity-100'>
              <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
                <path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' />
              </svg>
            </Typography>
            <Typography
              as='a'
              href='https://github.com/TKPM-2023'
              className='opacity-80 transition-opacity hover:opacity-100'
            >
              <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
                <path
                  fillRule='evenodd'
                  d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
                  clipRule='evenodd'
                />
              </svg>
            </Typography>
            <Typography as='a' href='/' className='opacity-80 transition-opacity hover:opacity-100'>
              <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
                <path
                  fillRule='evenodd'
                  d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z'
                  clipRule='evenodd'
                />
              </svg>
            </Typography>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

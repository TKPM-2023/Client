function GeneralInfor() {
  return (
    <>
      <div className='bg-gray-300 p-16 pt-6'>
        <div className='mt-24 rounded bg-white p-8 shadow'>
          {' '}
          <div className='grid grid-cols-1 md:grid-cols-3'>
            {' '}
            <div className='order-last mt-20 grid grid-cols-3 text-center md:order-first md:mt-0'>
              {' '}
              <div>
                {' '}
                <p className='text-xl font-bold text-gray-700'>22</p> <p className='text-gray-400'>Đơn mua</p>{' '}
              </div>{' '}
              <div>
                {' '}
                <p className='text-xl font-bold text-gray-700'>10</p> <p className='text-gray-400'>Đánh giá</p>{' '}
              </div>{' '}
              <div>
                {' '}
                <p className='text-xl font-bold text-gray-700'>8</p> <p className='text-gray-400'>Bình luận</p>{' '}
              </div>{' '}
            </div>{' '}
            <div className='relative '>
              {' '}
              <label
                className='group absolute inset-x-0 top-0 mx-auto -mt-24 flex h-48 w-48 cursor-pointer items-center justify-center rounded-full bg-indigo-100 text-indigo-500 shadow-2xl hover:bg-gray-200'
                htmlFor='file-upload'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='block h-24 w-24 w-full transform opacity-100 transition duration-500 ease-in-out group-hover:opacity-50'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  {' '}
                  <path fillRule='evenodd' d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z' clipRule='evenodd' />
                </svg>{' '}
                <div className='absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-center transition duration-500 ease-in-out group-hover:block'>
                  <div className='text text-xl font-semibold text-gray-900'>
                    Thay ảnh{' '}
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='1.5'
                      stroke='currentColor'
                      className='inline h-6 w-6'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125'
                      />
                    </svg>
                  </div>{' '}
                </div>
                <input className='hidden h-1 w-1' id='file-upload' type='file' accept='image/*' />
              </label>{' '}
            </div>{' '}
            <div className='mt-32 flex justify-between space-x-8 md:mt-0 md:justify-center'>
              <button className='transform rounded bg-blue-400 px-4 py-2 font-medium uppercase text-white shadow transition hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-lg'>
                {' '}
                Kết nối
              </button>{' '}
              <button className='transform rounded bg-red-700 px-4 py-2 font-medium uppercase text-white shadow transition hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-lg'>
                {' '}
                Xóa Tài khoản
              </button>{' '}
            </div>{' '}
          </div>{' '}
          <div className='mt-20 border-b text-center'>
            {' '}
            <h1 className='text-4xl font-medium text-gray-700'>Ở đây chỉ là test</h1>{' '}
            <p className='mt-3 font-light text-gray-600'>Tham gia vào 27/5/2023</p>{' '}
            <div className='mt-8 flex justify-center text-start text-gray-500'>
              <form className='w-4/5'>
                <div className='mb-0 grid gap-6 md:grid-cols-2'>
                  <div>
                    <label
                      htmlFor='first_name'
                      className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Họ và tên lót
                    </label>
                    <input
                      type='text'
                      id='first_name'
                      className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                      placeholder='John'
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor='last_name' className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
                      Tên
                    </label>
                    <input
                      type='text'
                      id='last_name'
                      className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                      placeholder='Doe'
                      required
                    />
                  </div>
                  <div className='mb-6'>
                    <label htmlFor='email' className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
                      Email
                    </label>
                    <input
                      type='email'
                      id='email'
                      className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                      placeholder='john.doe@company.com'
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor='phone' className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
                      Số điện thoại
                    </label>
                    <input
                      type='tel'
                      id='phone'
                      className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                      placeholder='123-45-678'
                      pattern='[0-9]{3}-[0-9]{2}-[0-9]{3}'
                      required
                    />
                  </div>
                </div>
              </form>
            </div>{' '}
          </div>{' '}
          <div className='mt-6 flex justify-center'>
            {' '}
            <button
              type='submit'
              className='w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto'
            >
              Lưu thay đổi
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default GeneralInfor

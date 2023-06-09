import React, { Component, ErrorInfo, ReactNode } from 'react'
import routes from 'src/constants/routes'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className='flex h-[calc(100vh-80px)] w-full flex-col items-center justify-center bg-white p-5'>
          <div className='text-center'>
            <div className='inline-flex rounded-full bg-red-100 p-4'>
              <div className='rounded-full bg-red-200 stroke-red-600 p-4'>
                <svg className='h-16 w-16' viewBox='0 0 28 28' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M6 8H6.01M6 16H6.01M6 12H18C20.2091 12 22 10.2091 22 8C22 5.79086 20.2091 4 18 4H6C3.79086 4 2 5.79086 2 8C2 10.2091 3.79086 12 6 12ZM6 12C3.79086 12 2 13.7909 2 16C2 18.2091 3.79086 20 6 20H14'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  ></path>
                  <path
                    d='M17 16L22 21M22 16L17 21'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  ></path>
                </svg>
              </div>
            </div>
            <h1 className='mt-5 text-[36px] font-bold text-slate-800 lg:text-[50px]'>500 - Server error</h1>
            <p className='mt-5 text-slate-600 lg:text-lg'>
              Oops something went wrong. Try to refresh this page or <br /> feel free to contact us if the problem
              presists.
            </p>
          </div>
          <a
            href={routes.home}
            className='mt-6 flex items-center space-x-2 rounded bg-blue-600 px-4 py-2 text-gray-100 transition duration-150 hover:bg-blue-700'
            title='Return Home'
          >
            <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
              <path
                fillRule='evenodd'
                d='M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z'
                clipRule='evenodd'
              ></path>
            </svg>
            <span>Return Home</span>
          </a>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

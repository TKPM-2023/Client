import { createSearchParams, useNavigate } from 'react-router-dom'
import status from 'src/constants/status'
import { role } from 'src/constants/users'
import { renderStatus } from 'src/utils/utils'

interface Props<QueryConfig> {
  queryConfig: QueryConfig
  hasRoleFilter: boolean
}

const statusOptions = [
  { value: status.inStore, name: renderStatus(status.inStore) },
  { value: status.deleted, name: renderStatus(status.deleted) }
]

const limitOptions = [
  { value: '2', name: '2' },
  { value: '5', name: '5' },
  { value: '10', name: '10' }
]

const roleOptions = [
  { value: '', name: 'Tất cả' },
  { value: role.admin, name: 'Quản trị' },
  { value: role.user, name: 'Người dùng' }
]

function Filter<
  QueryConfig extends {
    role?: string
    status?: string
    limit?: string
  }
>({ queryConfig, hasRoleFilter }: Props<QueryConfig>) {
  const navigate = useNavigate()

  const changeParams = (paramName: string) => (event: React.ChangeEvent<HTMLSelectElement>) => {
    navigate({
      pathname: '',
      search: createSearchParams({
        ...queryConfig,
        [paramName]: event.target.value,
        page: '1'
      }).toString()
    })
  }

  return (
    <div className='mb-1 mt-3 flex flex-col px-5 sm:flex-row'>
      <div className='flex'>
        <div className='relative'>
          <select
            className='block h-full w-full appearance-none rounded-l border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none'
            onChange={changeParams('limit')}
            value={queryConfig.limit}
          >
            {limitOptions.map((limitOption) => (
              <option key={limitOption.value} value={limitOption.value}>
                {limitOption.name}
              </option>
            ))}
          </select>
          <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
            <svg className='h-4 w-4 fill-current' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
              <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
            </svg>
          </div>
        </div>
        {hasRoleFilter && (
          <div className='relative'>
            <select
              className='block h-full w-full appearance-none border-y border-r border-gray-400 bg-white px-4 py-2 pr-8 leading-tight text-gray-700 outline-none focus:border-gray-500 focus:bg-white'
              onChange={changeParams('role')}
              value={queryConfig.role}
            >
              {roleOptions.map((roleOption) => (
                <option key={roleOption.value} value={roleOption.value}>
                  {roleOption.name}
                </option>
              ))}
            </select>
            <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
              <svg className='h-4 w-4 fill-current' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
                <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
              </svg>
            </div>
          </div>
        )}

        <div className='relative'>
          <select
            className='block h-full w-full appearance-none rounded-r border-b border-r border-t border-gray-400 bg-white px-4 py-2 pr-8 leading-tight text-gray-700 outline-none focus:border-gray-500 focus:bg-white'
            onChange={changeParams('status')}
            value={queryConfig.status}
          >
            <option value='' disabled>
              -- Trạng thái --
            </option>
            {statusOptions.map((statusOption) => (
              <option key={statusOption.value} value={statusOption.value}>
                {statusOption.name}
              </option>
            ))}
          </select>
          <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
            <svg className='h-4 w-4 fill-current' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
              <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
            </svg>
          </div>
        </div>
      </div>

      {/* <div className='relative mt-2 block sm:mt-0'>
        <span className='absolute inset-y-0 left-0 flex items-center pl-2'>
          <svg viewBox='0 0 24 24' className='h-4 w-4 fill-current text-gray-500'>
            <path d='M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z' />
          </svg>
        </span>
        <input
          placeholder='Tìm kiếm...'
          className='block w-full appearance-none rounded-l rounded-r border border-b border-gray-400 bg-white py-2 pl-8 pr-6 text-sm text-gray-700 placeholder-gray-400 focus:bg-white focus:text-gray-700 focus:placeholder-gray-600 focus:outline-none sm:rounded-l-none'
        />
      </div> */}
    </div>
  )
}

export default Filter

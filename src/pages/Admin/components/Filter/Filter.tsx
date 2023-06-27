import classNames from 'classnames'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { FilterType } from 'src/types/utils.type'

interface Props<QueryConfig> {
  filters: FilterType[]
  queryConfig: QueryConfig
}

function Filter<QueryConfig>({ queryConfig, filters }: Props<QueryConfig>) {
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
        {filters.map((filter, index) => (
          <div key={index} className='relative'>
            <select
              className={classNames(
                'block h-full w-full appearance-none border-gray-400 bg-white px-4 py-2 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none',
                {
                  'rounded-r border-b border-r border-t': index === filters.length - 1,
                  'rounded-l border': index === 0,
                  'border-y border-r': index > 0 && index < filters.length - 1
                }
              )}
              onChange={changeParams(filter.param)}
              value={queryConfig[filter.param as keyof typeof queryConfig] as string}
            >
              {filter.options.map((option) => (
                <option key={option.value} value={option.value} disabled={option.disabled}>
                  {option.name}
                </option>
              ))}
            </select>
            <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
              <svg className='h-4 w-4 fill-current' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
                <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Filter

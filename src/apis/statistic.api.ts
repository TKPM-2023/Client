import { Statistic } from 'src/types/statistic.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'admin/statistic'

const statisticApi = {
  getByYear: (year: string | number = new Date().getFullYear()) => {
    return http.get<SuccessResponse<Statistic>>(`${URL}/${year}`)
  }
}

export default statisticApi

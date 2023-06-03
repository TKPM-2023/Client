import { CategoryList, CategoryListConfig } from 'src/types/category.type'
import http from 'src/utils/http'

const URL = 'admin/categories'

const categoryApi = {
  getCategories: (params: CategoryListConfig) => {
    return http.get<CategoryList>(URL, { params })
  }
}

export default categoryApi

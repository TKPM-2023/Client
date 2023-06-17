import { Category, CategoryList, CategoryListConfig } from 'src/types/category.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'
import { CategorySchema } from 'src/utils/rules'

const URL = 'admin/categories'
const URL_USER = 'categories'

const categoryApi = {
  getCategories: (params: CategoryListConfig) => {
    return http.get<CategoryList>(URL, { params })
  },
  getCategoryDetail: (id: string) => {
    return http.get<SuccessResponse<Category>>(`${URL}/${id}`)
  },
  createCategory: (body: CategorySchema) => {
    return http.post<SuccessResponse<string>>(URL, body)
  },
  updateCategory: (id: string, body: CategorySchema) => {
    return http.patch<SuccessResponse<boolean>>(`${URL}/${id}`, body)
  },
  deleteCategory: (id: string) => {
    return http.delete<SuccessResponse<boolean>>(`${URL}/${id}`)
  },
  getCategoriesFromUser: (params: CategoryListConfig) => {
    return http.get<CategoryList>(URL_USER, { params })
  },
  getCategoryDetailFromUser: (id: string) => {
    return http.get<SuccessResponse<Category>>(`${URL_USER}/${id}`)
  }
}

export default categoryApi

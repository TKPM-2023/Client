import * as yup from 'yup'

export const userSchema = yup
  .object({
    email: yup
      .string()
      .required('Email là bắt buộc')
      .matches(/^[A-Za-z0-9]{1,30}@[a-z0-9]{2,10}(\.[a-z0-9]{2,10}){1,3}$/, 'Email không đúng định dạng')
      .min(5, 'Độ dài từ 5 - 160 ký tự')
      .max(160, 'Độ dài từ 5 - 160 ký tự'),
    first_name: yup.string().required('Họ tên đệm là bắt buộc'),
    last_name: yup.string().required('Tên là bắt buộc'),
    password: yup
      .string()
      .required('Mật khẩu là bắt buộc')
      .min(8, 'Độ dài từ 8 - 160 ký tự')
      .max(160, 'Độ dài từ 8 - 160 ký tự'),
    confirm_password: yup
      .string()
      .required('Nhập lại mật khẩu là bắt buộc')
      .oneOf([yup.ref('password')], 'Mật khẩu nhập lại không khớp')
      .min(8, 'Độ dài từ 8 - 160 ký tự')
      .max(160, 'Độ dài từ 8 - 160 ký tự'),
    phone: yup.string().required('Số điện thoại là bắt buộc').max(20, 'Tối đa 20 kí tự').optional(),
    role: yup.string().oneOf(['user', 'admin'], 'Vai trò là bắt buộc').optional()
  })
  .required()
export type UserSchema = yup.InferType<typeof userSchema>

export const MAX_PRODUCT_NAME_CHARACTERS = 200
export const MAX_PRODUCT_DESCRIPTION_CHARACTERS = 2000
export const productSchema = yup.object({
  name: yup
    .string()
    .required('Tên là bắt buộc')
    .min(5, 'Độ dài tối thiểu là 5 ký tự')
    .max(MAX_PRODUCT_NAME_CHARACTERS, `Độ dài tối đa là ${MAX_PRODUCT_NAME_CHARACTERS} ký tự`),
  description: yup
    .string()
    .required('Mô tả là bắt buộc')
    .min(5, 'Độ dài tối thiểu là 5 ký tự')
    .max(MAX_PRODUCT_DESCRIPTION_CHARACTERS, `Độ dài tối đa là ${MAX_PRODUCT_DESCRIPTION_CHARACTERS} ký tự`),
  quantity: yup
    .number()
    .typeError('Số lượng là bắt buộc')
    .required('Số lượng là bắt buộc')
    .min(1, 'Số lượng tối thiểu 1'),
  price: yup
    .number()
    .typeError('Đơn giá là bắt buộc')
    .required('Đơn giá là bắt buộc')
    .min(1000, 'Đơn giá tối thiểu 1.000 dồng')
    .max(999999, 'Đơn giá tối đa 999.999 dồng'),
  category_id: yup.string().required('Thể loại là bắt buộc'),
  images: yup
    .array(
      yup.object({
        url: yup.string(),
        width: yup.number(),
        height: yup.number()
      })
    )
    .required('Hình ảnh là bắt buộc')
})

export type ProductSchema = yup.InferType<typeof productSchema>

export const MAX_CATEGORY_NAME_CHARACTERS = 200
export const MAX_CATEGORY_DESCRIPTION_CHARACTERS = 2000
export const categorySchema = yup.object({
  name: yup
    .string()
    .required('Tên là bắt buộc')
    .min(5, 'Độ dài tối thiểu là 5 ký tự')
    .max(MAX_CATEGORY_NAME_CHARACTERS, `Độ dài tối đa là ${MAX_CATEGORY_NAME_CHARACTERS} ký tự`),
  description: yup
    .string()
    .required('Mô tả là bắt buộc')
    .min(5, 'Độ dài tối thiểu là 5 ký tự')
    .max(MAX_CATEGORY_DESCRIPTION_CHARACTERS, `Độ dài tối đa là ${MAX_CATEGORY_DESCRIPTION_CHARACTERS} ký tự`),
  icon: yup
    .object({
      id: yup.number(),
      url: yup.string(),
      width: yup.number(),
      height: yup.number()
    })
    .required('Biểu tượng là bắt buộc')
})

export type CategorySchema = yup.InferType<typeof categorySchema>

export const profileSchema = yup.object({
  first_name: yup.string().required('Họ và tên lót là bắt buộc').optional(),
  last_name: yup.string().required('Tên là bắt buộc').optional(),
  email: yup
    .string()
    .required('Email là bắt buộc')
    .matches(/^[A-Za-z0-9]{1,30}@[a-z0-9]{2,10}(\.[a-z0-9]{2,10}){1,3}$/, 'Email không đúng định dạng')
    .optional(),
  phone: yup.string().optional(),
  role: yup.string().optional(),
  avatar: yup
    .object({
      id: yup.number(),
      url: yup.string(),
      width: yup.number(),
      height: yup.number()
    })
    .optional()
})

export type ProfileSchema = yup.InferType<typeof profileSchema>

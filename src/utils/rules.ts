import * as yup from 'yup'

const schema = yup
  .object({
    email: yup
      .string()
      .required('Email là bắt buộc')
      .email('Email không đúng định dạng')
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
      .max(160, 'Độ dài từ 8 - 160 ký tự')
  })
  .required()

export type Schema = yup.InferType<typeof schema>

export default schema

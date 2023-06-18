import { AddressType, ContactList, ContactListConfig } from 'src/types/contact.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'client/contact'

const contactApi = {
  getListContact: (params: ContactListConfig, signal?: AbortSignal) => {
    return http.get<ContactList>(URL, { params, signal })
  },
  createContact: (body: AddressType) => {
    return http.post<SuccessResponse<string>>(URL, body)
  },
  updateContact: (contactId: string, body: AddressType) => {
    return http.patch<SuccessResponse<boolean>>(`${URL}/${contactId}`, body)
  },
  deleteContact: (contactId: string) => {
    return http.delete<SuccessResponse<boolean>>(`${URL}/${contactId}`)
  }
}

export default contactApi

import { Profile } from 'src/types/user.type'

export const LocalStorageEventTarget = new EventTarget()

export const setAccessTokenToLS = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const setRefreshTokenToLS = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const setProfileToLS = (profile: Profile) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}

export const clearLS = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('profile')

  const clearLSEvent = new Event('clearLS')
  LocalStorageEventTarget.dispatchEvent(clearLSEvent)
}

export const getAccessTokenFromLS = () => {
  return localStorage.getItem('access_token') || ''
}

export const getRefreshTokenFromLS = () => {
  return localStorage.getItem('refresh_token') || ''
}

export const getProfileFromLS = () => {
  const result = localStorage.getItem('profile')
  if (result) return JSON.parse(result)
  return null
}

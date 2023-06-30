import { createContext, useState } from 'react'
import { Profile } from 'src/types/user.type'
import { getAccessTokenFromLS, getProfileFromLS } from 'src/utils/auth'
import { ProductIsOrderingType } from 'src/types/cart.type'

type AppContextType = {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: Profile | null
  setProfile: React.Dispatch<React.SetStateAction<Profile | null>>
  reset: () => void
  listProductIsOrdering: ProductIsOrderingType[]
  setListProductIsOrdering: React.Dispatch<React.SetStateAction<ProductIsOrderingType[]>>
  locationCart: HTMLElement
  setLocationCart: React.Dispatch<React.SetStateAction<HTMLElement>>
}

const inititalAppContext: AppContextType = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  reset: () => null,
  listProductIsOrdering: [],
  setListProductIsOrdering: () => null,
  locationCart: document.createElement('div'),
  setLocationCart: () => null
}

export const AppContext = createContext<AppContextType>(inititalAppContext)

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(inititalAppContext.isAuthenticated)
  const [profile, setProfile] = useState<Profile | null>(inititalAppContext.profile)
  const [listProductIsOrdering, setListProductIsOrdering] = useState<ProductIsOrderingType[]>(
    inititalAppContext.listProductIsOrdering
  )
  const [locationCart, setLocationCart] = useState<HTMLElement>(inititalAppContext.locationCart)
  const reset = () => {
    setIsAuthenticated(false)
    setProfile(null)
  }

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        reset,
        listProductIsOrdering,
        setListProductIsOrdering,
        locationCart,
        setLocationCart
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider

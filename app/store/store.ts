import { create } from 'zustand'
import { UserData } from '../../constants/types/normal'

interface UserStore {
    userState: UserData | null
    setUserState: (UserState: UserData | null) => void

}

export const useUserStore = create<UserStore>((set) => ({
    userState: null,
    setUserState: (userState) => set(() => ({ userState: userState }))
}))



interface LoadingLogin {
    loading: boolean
    setLoadingState: (loading: boolean) => void

}


export const useLoadingStore = create<LoadingLogin>((set) => ({
    loading: false,
    setLoadingState: (loading) => set(() => ({ loading: loading }))
}))

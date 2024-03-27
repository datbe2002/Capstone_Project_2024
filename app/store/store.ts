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
interface FavouriteIdDelete {
    itemId: number | null
    setItemIdState: (itemId: number) => void

}

export const useFavouriteId = create<FavouriteIdDelete>((set) => ({
    itemId: null,
    setItemIdState: (itemId) => set(() => ({ itemId: itemId }))
}))



interface UserIDStore {
    userId: string | null
    setUserId: (userId: string | null) => void

}

export const useUserIDStore = create<UserIDStore>((set) => ({
    userId: null,
    setUserId: (userId) => set(() => ({ userId: userId }))
}))

interface RegisterData {
    selectedValues: {
        province: string | null;
        provinceId: string | null;
        district: string | null;
        districtId: string | null;
        ward: string | null;
        wardCode: string | null;
        gender: string | null;
    };
    setSelectedValues: (values: {
        province: string | null;
        provinceId: string | null;
        district: string | null;
        districtId: string | null;
        ward: string | null;
        wardCode: string | null;
        gender: string | null;
    }) => void;
}

export const useRegisterStore = create((set: any) => ({
    selectedValues: {
        province: null,
        provinceId: null,
        district: null,
        districtId: null,
        ward: null,
        wardCode: null,
        gender: null,
    },
    setSelectedValues: (values: any) =>
        set((state: any) => ({
            selectedValues: { ...state.selectedValues, ...values },
        })),
}));




export const useAddressChange = create((set: any) => ({
    selectedAddress: {
        userId: null,
        recipientName: null,
        recipientPhone: null,
        province: null,
        provinceId: null,
        district: null,
        disctrictId: null,
        ward: null,
        wardCode: null,
        street: null,
        isDefault: null,
        id: null,
        isDeleted: null,
        createAt: null,
        updateAt: null,
        updateBy: null,
        createBy: null,
    },
    setSelectedAddress: (values: any) =>
        set((state: any) => ({
            selectedAddress: { ...state.selectedAddress, ...values },
        })),
}));

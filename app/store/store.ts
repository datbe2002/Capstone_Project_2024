import { create } from "zustand";
import { UserData } from "../../constants/types/normal";
import { Product } from "../../constants/Type";

interface UserStore {
  userState: UserData | null;
  setUserState: (UserState: UserData | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  userState: null,
  setUserState: (userState) => set(() => ({ userState: userState })),
}));

interface LoadingLogin {
  loading: boolean;
  setLoadingState: (loading: boolean) => void;
}

export const useLoadingStore = create<LoadingLogin>((set) => ({
  loading: false,
  setLoadingState: (loading) => set(() => ({ loading: loading })),
}));
interface FavouriteIdDelete {
  itemId: number | null;
  setItemIdState: (itemId: number) => void;
}

export const useFavouriteId = create<FavouriteIdDelete>((set) => ({
  itemId: null,
  setItemIdState: (itemId) => set(() => ({ itemId: itemId })),
}));

interface UserIDStore {
  userId: string | null;
  setUserId: (userId: string | null) => void;
}

export const useUserIDStore = create<UserIDStore>((set) => ({
  userId: null,
  setUserId: (userId) => set(() => ({ userId: userId })),
}));
interface OrderIdSuccess {
  orderIdSucc: number | null;
  setOrderIdSucc: (orderIdSucc: number | null) => void;
}

export const useOrderIdSuccess = create<OrderIdSuccess>((set) => ({
  orderIdSucc: null,
  setOrderIdSucc: (orderIdSucc) => set(() => ({ orderIdSucc: orderIdSucc })),
}));
interface AIURLProps {
  urlAI: string | null;
  setUrlAI: (urlAI: string | null) => void;
}

export const useAIURL = create<AIURLProps>((set) => ({
  urlAI: null,
  setUrlAI: (urlAI) => set(() => ({ urlAI: urlAI })),
}));
interface TotalPaymentAmountProps {
  totalAmount: string | null;
  date: string | null;
  setTotalAmount: (totalAmount: string | null) => void;
  setDateNowPay: (date: string | null) => void;
}

export const useTotalPaymentAmount = create<TotalPaymentAmountProps>((set) => ({
  totalAmount: null,
  date: null,
  setTotalAmount: (totalAmount) => set(() => ({ totalAmount: totalAmount })),
  setDateNowPay: (date) => set(() => ({ date: date })),
}));

export const useAfterVoucher = create((set: any) => ({
  itemVoucher: {
    code: null,
    totalVoucherMoney: null,
  },
  setItemVoucher: (values: any) =>
    set((state: any) => ({
      itemVoucher: { ...state.itemVoucher, ...values },
    })),
}));


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
export const useMeasurement = create((set: any) => ({
  selectedMesurement: {
    height: null,
    weight: null,
  },
  setSelectedMesurement: (values: any) =>
    set((state: any) => ({
      selectedMesurement: { ...state.selectedMesurement, ...values },
    })),
}));

export const usePutAddress = create((set: any) => ({
  selectedPutAddress: {
    province: null,
    provinceId: null,
    district: null,
    districtId: null,
    ward: null,
    wardCode: null,
  },
  setSelectedPutAddress: (values: any) =>
    set((state: any) => ({
      selectedPutAddress: { ...state.selectedPutAddress, ...values },
    })),
}));

export const usePostAddress = create((set: any) => ({
  selectedPostAddress: {
    province: null,
    provinceId: null,
    district: null,
    districtId: null,
    ward: null,
    wardCode: null,
    recipientName: null,
    recipientPhone: null,
    street: null,
  },
  setSelectedPostAddress: (values: any) =>
    set((state: any) => ({
      selectedPostAddress: { ...state.selectedPostAddress, ...values },
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

export const useOrderItems = create((set: any) => ({
  orderItems: {
    items: [],
    total: null,
    totalQuantityProd: null,
  },
  setOrderItems: (values: any) =>
    set((state: any) => ({
      orderItems: { ...state.orderItems, ...values },
    })),
}));

// export const useWardove = create((set: any) => ({
//   wardroveItems: [] as Product[],
//   setWardroveItems: (values: Product[]) =>
//     set((state: any) => ({
//       wardroveItems: [...state.wardroveItems, ...values],
//     })),
// }));

export const useWardove = create((set: any) => ({
  wardroveItems: [] as Product[],
  setWardroveItems: (
    values: Product[] | ((prevItems: Product[]) => Product[])
  ) =>
    set((state: any) => ({
      wardroveItems:
        typeof values === "function"
          ? values(state.wardroveItems)
          : [...state.wardroveItems, ...values],
    })),
}));

export const useCategoriesStore = create((set: any) => ({
  categories: [{ id: -1, name: "Tất cả", subCategories: [] }],
  setCategories: (categories: any) =>
    set((state: any) => ({ categories: [...state.categories, ...categories] })),
}));

export const useSizeStore = create((set: any) => ({
  sizes: [{ id: -1, value: "Tất cả" }],
  setSies: (sizes: any) =>
    set((state: any) => ({ sizes: [...state.sizes, ...sizes] })),
}));

export const useColorsStore = create((set: any) => ({
  colors: [],
  setColors: (colors: any) =>
    set((state: any) => ({ colors: [...state.colors, ...colors] })),
}));

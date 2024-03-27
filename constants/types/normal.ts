export interface UserData {
  dob: any | null;
  email: string | null;
  fullName: string | null;
  gender: any | null;
  id: string | null;
  phone: string | null;
  profilePicture: string | null;
  roleId: number | null;
  verified: boolean | null;
  userCartId: string | null;
}

export interface AddressData {
  email: string | null | null;
  password: string | null;
  phone: string | null;
  dob: string | null;
  fullName: string | null;
  gender: number | null;
  address: Address | null;
}

export interface Address {
  recipientName: string | null;
  recipientPhone: string | null;
  recipientEmail: string | null;
  province: string | null;
  provinceId: number | null;
  district: string | null;
  disctrictId: number | null;
  ward: string | null;
  wardCode: string | null;
  street: string | null;
}


export interface AddressSetting extends AddressConfig {
}

export interface AddressConfig {
  userId: string
  recipientName: string
  recipientPhone: string
  province: string
  provinceId: number
  district: string
  disctrictId: number
  ward: string
  wardCode: string
  street: string
  isDefault: boolean
  id: number
  isDeleted: boolean
  createAt: string
  updateAt: any
  updateBy: any
  createBy: any
}
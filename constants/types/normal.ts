export interface UserData {
  dob: string;
  email: string;
  fullName: string;
  gender: any;
  id: string;
  phone: string;
  profilePicture: string;
  roleId: number;
  verified: boolean;
  userCartId: string;
}

export interface AddressData {
  email: string | null;
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

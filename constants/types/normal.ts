export interface UserData {
    dob: string
    email: string
    fullName: string
    gender: any
    id: string
    phone: string
    profilePicture: string
    roleId: number
    verified: boolean
}


export interface AddressData {
    email: string
    password: string
    phone: string
    dob: string
    fullName: string
    gender: number
    address: Address
}

export interface Address {
    recipientName: string
    recipientPhone: string
    recipientEmail: string
    province: string
    provinceId: number
    district: string
    disctrictId: number
    ward: string
    wardCode: string
    street: string
    isDefault: boolean
}

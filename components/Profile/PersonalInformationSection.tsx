import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../assets'
import { useUserStore } from '../../app/store/store'

const PersonalInformationSection = () => {
    const { userState } = useUserStore()

    return (
        <View style={styles.account}>
            <View style={styles.componentText}>
                <Text style={styles.syntaxText}>Thông tin cá nhân</Text>
            </View>
            <View style={styles.information}>
                <View style={styles.informationunder}>
                    <Text style={styles.mainText}>
                        Tên
                    </Text>
                    <Text style={styles.secondText}>
                        {userState?.fullName && userState.fullName}
                    </Text>
                </View>
                {/* <View style={styles.informationunder}>
                    <Text style={styles.mainText}>
                        Họ
                    </Text>
                    <Text style={styles.secondText}>
                        Trương
                    </Text>
                </View> */}
                <View style={styles.informationunder}>
                    <Text style={styles.mainText}>
                        Giới tính
                    </Text>
                    <Text style={styles.secondText}>
                        {userState?.gender && userState.fullName || "Chưa chọn"}
                    </Text>
                </View>
                <View style={styles.informationunder}>
                    <Text style={styles.mainText}>
                        Quốc gia
                    </Text>
                    <Text style={styles.secondText}>
                        Việt Nam
                    </Text>
                </View>
                <View style={styles.informationtop}>
                    <Text style={styles.mainText}>
                        Thành phố/Thị trấn
                    </Text>
                    <Text style={styles.secondText}>
                        Ho Chi Minh City
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default PersonalInformationSection

const styles = StyleSheet.create({
    account: {
        height: 'auto',
        marginHorizontal: 10,
        marginBottom: 50
    },
    componentText: {
        height: 80,
        justifyContent: 'center',
        paddingLeft: 10,
    },
    syntaxText: {
        color: COLORS.blue1,
        fontFamily: 'mon-sb',
        fontSize: 25,
    },
    information: {
        height: 'auto',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    informationunder: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomColor: COLORS.gray,
        borderBottomWidth: 1
    },
    informationtop: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderTopColor: COLORS.gray,
        borderTopWidth: 1,
    },
    mainText: {
        color: COLORS.primary,
        fontSize: 20,
        fontFamily: 'mon-sb',
    },
    secondText: {
        color: COLORS.blue1,
        fontFamily: 'mon',
        fontSize: 18
    },
})
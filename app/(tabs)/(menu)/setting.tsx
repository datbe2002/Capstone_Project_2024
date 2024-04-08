import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CustomButton from '../../../components/Button'
import MyAccount from '../../../components/Setting/MyAccount'
import SupportAccount from '../../../components/Setting/SupportAccount'
import VerifyAlert from '../../../components/Setting/VerifyAlert'
import { useAuth } from '../../context/auth'
import { COLORS } from '../../../assets'

const Setting = () => {

    const { signOut } = useAuth()

    return (
        <View style={{ flex: 1 }}>
            <View>
                <VerifyAlert />
            </View>
            <View style={styles.componentFull}>
                <MyAccount />
                <SupportAccount />

                <CustomButton onPress={signOut} buttonText='Đăng xuất' buttonColor='errorColor' style={{ marginTop: 20 }}></CustomButton>
                <View style={styles.version}>
                    <Text style={styles.versionText}>Phiên bản v2.0.0</Text>
                </View>
            </View>
        </View>
    )
}

export default Setting

const styles = StyleSheet.create({
    componentFull: {
        flex: 1,
        marginHorizontal: 10
    },
    version: {
        height: 50,
        justifyContent: 'center'
    },
    versionText: {
        fontFamily: 'mon-sb',
        textAlign: 'center',
        color: COLORS.darkGray
    }
})
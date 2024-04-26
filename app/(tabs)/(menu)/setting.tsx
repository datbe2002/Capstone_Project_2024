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
        <View style={{
            flex: 1,
            position: 'relative',
        }}>
            <View>
                <VerifyAlert />
            </View>
            <View style={styles.componentFull}>
                <MyAccount />
                <SupportAccount />

            </View>
            <View style={styles.bottom}>
                <CustomButton onPress={signOut} buttonText='Đăng xuất' buttonColor='errorColor' ></CustomButton>
                <View style={styles.version}>
                    <Text style={styles.versionText}>Phiên bản v2.0.1</Text>
                </View>
            </View>
        </View>
    )
}

export default Setting

const styles = StyleSheet.create({
    componentFull: {
        flex: 1,
        marginHorizontal: 10,
    },
    version: {
        height: 50,
        justifyContent: 'center'
    },
    versionText: {
        fontFamily: 'mon-sb',
        textAlign: 'center',
        color: COLORS.darkGray
    },
    bottom: {
        position: 'absolute',
        borderTopWidth: 1,
        borderTopColor: COLORS.gray,
        left: 0,
        right: 0,
        bottom: 10,
        padding: 10,
    }
})
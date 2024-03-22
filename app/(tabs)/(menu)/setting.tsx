import { Button, Keyboard, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import InputV2 from '../../../components/InputV2'
import { COLORS } from '../../../assets'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useAuth } from '../../context/auth'
import CustomButton from '../../../components/Button'
import MyAccount from '../../../components/Setting/MyAccount'
import SettingAccount from '../../../components/Setting/SettingAccount'
import SupportAccount from '../../../components/Setting/SupportAccount'
import VerifyAlert from '../../../components/Setting/VerifyAlert'

const Setting = () => {

    const { signOut } = useAuth()

    return (
        <View style={{ flex: 1 }}>
            <View>
                <VerifyAlert />
            </View>
            <View style={styles.componentFull}>
                <MyAccount />
                <SettingAccount />
                <SupportAccount />
                <CustomButton onPress={signOut} buttonText='Đăng xuất' buttonColor='errorColor' ></CustomButton>
            </View>
        </View>
    )
}

export default Setting

const styles = StyleSheet.create({
    componentFull: {
        flex: 1,
        marginHorizontal: 10
    }
})
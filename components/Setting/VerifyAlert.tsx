import { Feather } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useUserStore } from '../../app/store/store'
import { COLORS } from '../../assets'

const VerifyAlert = () => {
    const { userState } = useUserStore()
    const [isShow, setIsShow] = useState<any>(false)

    const handleVerifyAccount = () => {
        console.log('handle verify account')
    }

    return (
        <View>
            {userState?.verified || isShow ? null : (<Pressable style={styles.verifiedContainer} onPress={handleVerifyAccount}>
                <Text style={styles.verifiedText}>Bạn chưa xác thực tài khoản. Bấm vào để xác thực </Text>
                <Feather name="x" size={20} color={COLORS.white} onPress={() => setIsShow(!isShow)} />
            </Pressable>)}
        </View>
    )
}

export default VerifyAlert

const styles = StyleSheet.create({
    verifiedContainer: {
        display: 'flex',
        flexDirection: 'row',
        height: 50,
        backgroundColor: '#ff002b',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    verifiedText: {
        fontFamily: 'mon-sb',
        color: COLORS.white,
        paddingBottom: 2,
        fontSize: 15,
    }
})
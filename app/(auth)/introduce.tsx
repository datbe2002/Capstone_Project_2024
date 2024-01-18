import { Dimensions, StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../../components/Button'
import { useRouter } from 'expo-router'
const { height, width } = Dimensions.get('window')
import { AntDesign } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../assets'
const IntroducePage = () => {
    const router = useRouter()
    return (
        <View style={styles.containerLogin}>
            <View>
                <Text style={styles.shopName}>FTAI</Text>
            </View>
            <View style={styles.textComponent}>
                <Text style={styles.introduceText}>Beautiful eCommerce UI Kit for your online store</Text>
            </View>
            <CustomButton buttonText='Lets get started' onPress={() => router.push('/(auth)/register')} />

            <Pressable style={styles.accountHad} onPress={() => router.push('/(auth)/login')}>
                <Text>I already have an account</Text>
                <AntDesign name="rightcircle" size={24} color={COLORS.primary} />
            </Pressable>
        </View>
    )
}

export default IntroducePage

const styles = StyleSheet.create({
    containerLogin: {
        height: height,
        width: width,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    shopName: {
        fontSize: 52,
        fontWeight: '700',
    },
    textComponent: {
        height: 80,
        width: 250,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 80
    },
    introduceText: {
        textAlign: 'center',
        fontSize: 19,
        lineHeight: 33,
    },
    accountHad: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }

})
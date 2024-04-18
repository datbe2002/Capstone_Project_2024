import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { COLORS } from '../assets'
const UserProfileButton = () => {
    const router = useRouter()
    return (
        <TouchableOpacity style={styles.mainButton} onPress={() => router.push('/chatStaff')}>
            <View>
                <Ionicons name="chatbubble" size={20} color={COLORS.white} />
            </View>
        </TouchableOpacity>
    )
}

export default UserProfileButton

const styles = StyleSheet.create({
    mainButton: {
        backgroundColor: COLORS.primary,
        width: 32,
        height: 32,
        padding: 5,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
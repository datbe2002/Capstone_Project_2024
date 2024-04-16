import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useRouter } from 'expo-router'
import { COLORS } from '../assets'
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
const UserProfileButton = () => {
    const router = useRouter()
    return (
        <TouchableOpacity style={styles.mainButton} onPress={() => router.push('/chatStaff')}>
            <View>
                <Ionicons name="chatbubble-ellipses-outline" size={25} color={COLORS.white} />
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
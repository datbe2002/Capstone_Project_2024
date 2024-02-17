import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useRouter } from 'expo-router'
import { COLORS } from '../assets'
import { FontAwesome5 } from '@expo/vector-icons';
const UserProfileButton = () => {
    const router = useRouter()
    return (
        <TouchableOpacity style={styles.mainButton} onPress={() => router.push('/(tabs)/(menu)/profile')}>
            <View>
                <FontAwesome5 name="user" size={20} color="white" />
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
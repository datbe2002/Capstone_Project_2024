import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../assets'
import { useRouter } from 'expo-router'

const BackButton = () => {
    const router = useRouter()
    return (
        <TouchableOpacity style={styles.mainButton} onPress={() => router.back()}>
            <View>
                <Ionicons name="arrow-back" size={20} color='white' />
            </View>
        </TouchableOpacity>
    )
}

export default BackButton

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
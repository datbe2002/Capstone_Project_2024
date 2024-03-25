import React from 'react'
import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native'
const { height, width } = Dimensions.get('window')

const LoadingComponent = () => {
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="white" />
        </View>
    )
}

export default LoadingComponent

const styles = StyleSheet.create({
    loadingContainer: {
        position: 'absolute',
        height: height,
        top: 0,
        left: 0,
        bottom: -10,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
    },
})
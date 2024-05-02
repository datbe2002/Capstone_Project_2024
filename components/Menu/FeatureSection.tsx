import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SIZES } from '../../assets'
const { height } = Dimensions.get("window")
const FeatureSection = () => {
    return (
        <View style={styles.main}>
            <Text style={styles.text}>Chức năng đang được phát triển</Text>
        </View>
    )
}

export default FeatureSection

const styles = StyleSheet.create({
    main: {
        height: height / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontFamily: 'mon-sb',
        fontSize: SIZES.medium
    }
})
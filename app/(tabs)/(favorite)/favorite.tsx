import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage'

const favorite = () => {
    const key = "favorites";
    const checkAsyncStorage = async () => {
        try {
            const data = await AsyncStorage.getItem(key);
            console.log("Data in AsyncStorage:", data);
        } catch (error) {
            console.error("Error reading AsyncStorage:", error);
        }
    };

    return (
        <SafeAreaView>
            <View>
                <Button title={'hi'} onPress={checkAsyncStorage} />
            </View>
        </SafeAreaView>
    )
}

export default favorite

const styles = StyleSheet.create({})
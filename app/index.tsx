import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Redirect, Stack } from 'expo-router'

const First = () => {
    return (
        <Redirect href={'/introduce'} />
    )
}

export default First

const styles = StyleSheet.create({})
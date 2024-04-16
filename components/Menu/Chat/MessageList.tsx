import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../../../assets'

export const MessageItem = ({ message, currentUser }: any) => {
    if (currentUser?.id === message.userId) {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10 }}>
                <View style={{ width: '80%' }}>
                    <View style={{ display: 'flex', alignSelf: 'flex-end', padding: 10, borderRadius: 10, backgroundColor: COLORS.primary }}>
                        <Text style={{ color: COLORS.white, fontFamily: 'mon-sb', fontSize: 18 }}>
                            {message?.text}
                        </Text>
                    </View>
                </View>
            </View>
        )
    } else {
        return (
            <View style={{ width: '80%', marginBottom: 10 }}>
                <View style={{ display: 'flex', alignSelf: 'flex-start', padding: 10, borderRadius: 10, backgroundColor: COLORS.white }}>
                    <Text style={{ color: COLORS.black, fontFamily: 'mon-sb', fontSize: 18 }}>
                        {message?.text}
                    </Text>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({})

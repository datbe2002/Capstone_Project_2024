import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import { COLORS } from '../../../assets'

const Input = ({ inputRef, textRef, handleSendMassage }: any) => {
    return (
        <View style={styles.chatInputWrapper}>
            <View style={styles.chatInputContainer}>
                <TextInput
                    ref={inputRef}
                    onChangeText={(value) => (textRef.current = value)}
                    placeholder="Bạn cần giúp đỡ ?"
                    style={{
                        paddingLeft: 10,
                        flex: 1,
                        fontFamily: "mon-sb",
                        fontSize: 16,
                        width: 350,
                    }}
                />
                <TouchableOpacity
                    onPress={handleSendMassage}
                    style={styles.iconSend}
                >
                    <Feather name="send" size={20} color={COLORS.white} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Input

const styles = StyleSheet.create({
    chatInputWrapper: {
        marginBottom: 20,
        height: 50,
        marginHorizontal: 10,
        borderRadius: 50,
        justifyContent: "center",
        borderWidth: 1,
        borderColor: COLORS.darkGray,
    },
    chatInputContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 6,
    },
    iconSend: {
        borderRadius: 50,
        backgroundColor: COLORS.primary,
        padding: 10,
    },
})
import { Alert, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useUserIDStore, useUserStore } from './store/store'
import { Feather } from '@expo/vector-icons'
import MessageList from '../components/Menu/Chat/MessageList'
import { COLORS } from '../assets'
import { getRoomId } from '../shared/helper'
import { setDoc, doc, Timestamp, collection, addDoc } from 'firebase/firestore'
import { db } from './context/firebaseConfig'
import { useRouter } from 'expo-router'
import { TouchableOpacity } from 'react-native'


const ChatStaff = () => {

    const { userState } = useUserStore()
    console.log(userState?.id)

    const router = useRouter()
    const [messages, setMessages] = useState([])
    const textRef = useRef('')
    const inputRef = useRef<any>(null)


    useEffect(() => {
        createRoomIfNotExists()
    }, [])

    const createRoomIfNotExists = async () => {
        let roomId = getRoomId(userState?.id, 'StaffIdToChat')
        await setDoc(doc(db, 'rooms', roomId), {
            roomId,
            createdAt: Timestamp.fromDate(new Date())
        })
    }

    const handleSendMassage = async () => {
        let message = textRef.current.trim()
        if (!message) {
            return
        }
        try {
            let roomId = getRoomId(userState?.id, 'StaffIdToChat')
            const docRef = doc(db, 'rooms', roomId)
            const messagesRef = collection(docRef, 'messages');
            textRef.current = ""
            if (inputRef) inputRef?.current?.clear()
            const newDoc = await addDoc(messagesRef, {
                userId: userState?.id,
                text: message,
                profileUrl: userState?.profilePicture,
                senderName: userState?.fullName,
                createdAt: Timestamp.fromDate(new Date())

            })
            console.log("new message id", newDoc.id)
        } catch (error: any) {
            Alert.alert('Message', error.message)
        }
    }

    return (
        <KeyboardAvoidingView
            behavior='height'
            style={{ height: '100%' }}
            keyboardVerticalOffset={-200}
        >
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ flex: 1 }}
                bounces={false}
                showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={styles.messageList}>
                        <MessageList />
                    </View>
                    <View style={styles.chatInputWrapper}>
                        <View style={styles.chatInputContainer}>
                            <TextInput
                                ref={inputRef}
                                onChangeText={value => textRef.current = value}
                                placeholder='Type...'
                                style={{ paddingLeft: 10, flex: 1, fontFamily: 'mon-sb', fontSize: 16, width: 350 }} />
                            <TouchableOpacity onPress={handleSendMassage} style={styles.iconSend}>
                                <Feather name="send" size={20} color={COLORS.white} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default ChatStaff

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    chatInputWrapper: {
        marginBottom: 20,
        height: 50,
        marginHorizontal: 10,
        borderRadius: 50,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: COLORS.darkGray
    },
    chatInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 6,
    },
    iconSend: {
        borderRadius: 50,
        backgroundColor: COLORS.primary,
        padding: 10
    },
    messageList: {
        flex: 1,
    }
})
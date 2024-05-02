import { Timestamp, addDoc, collection, doc, onSnapshot, orderBy, query, setDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import {
    Alert,
    Dimensions,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Input from "../../../components/Menu/Chat/Input";
import { MessageItem } from "../../../components/Menu/Chat/MessageList";
import { getRoomId } from "../../../shared/helper";
import { db } from "../../context/firebaseConfig";
import { useUserStore } from "../../store/store";
import { SIZES } from "../../../assets";
const { height, width } = Dimensions.get('window')


const ChatStaff = () => {
    const { userState } = useUserStore();
    const [messages, setMessages] = useState<any>([]);
    const textRef = useRef("");
    const inputRef = useRef<any>(null);

    useEffect(() => {
        createRoomIfNotExists();

        let roomId = getRoomId(userState?.id, "StaffIdToChat")
        const docRef = doc(db, 'rooms', roomId)
        const messageRef = collection(docRef, 'messages')
        const q = query(messageRef, orderBy('createdAt', 'asc'))

        let unsub = onSnapshot(q, (snapshot) => {
            let allMessages = snapshot.docs.map(doc => {
                return doc.data()
            })
            setMessages([...allMessages])
        })
        return unsub
    }, []);

    const createRoomIfNotExists = async () => {
        let roomId = getRoomId(userState?.id, "StaffIdToChat");
        await setDoc(doc(db, "rooms", roomId), {
            roomId,
            createdAt: Timestamp.fromDate(new Date()),
        });

    };

    const handleSendMassage = async () => {
        let message = textRef.current.trim();
        if (!message) {
            return;
        }
        try {
            let roomId = getRoomId(userState?.id, "StaffIdToChat");
            const docRef = doc(db, "rooms", roomId);
            const messagesRef = collection(docRef, "messages");
            textRef.current = "";
            if (inputRef) inputRef?.current?.clear();
            const newDoc = await addDoc(messagesRef, {
                userId: userState?.id,
                text: message,
                profileUrl: userState?.profilePicture,
                senderName: userState?.fullName,
                createdAt: Timestamp.fromDate(new Date()),
            });
        } catch (error: any) {
            Alert.alert("Message", error.message);
        }
    };
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={messages}
                renderItem={({ item }: { item: any }) => (
                    <MessageItem message={item} currentUser={userState} />
                )}
                keyExtractor={(_, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}
                ListEmptyComponent={<FirstChat />}
            />
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-191} contentContainerStyle={{ paddingTop: 20 }}>
                <Input inputRef={inputRef} textRef={textRef} handleSendMassage={handleSendMassage} />
            </KeyboardAvoidingView>
        </View>
    );
};

export default ChatStaff;

const FirstChat = () => {
    return <View style={styles.firstChat}>
        <Text style={styles.text}>Đây là khởi đầu của cuộc trò chuyện</Text>
    </View>
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    firstChat: {
        height: height / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontFamily: 'mon-sb',
        fontSize: SIZES.medium
    }
});

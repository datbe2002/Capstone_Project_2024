import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { COLORS } from '../../assets'
import { ActiveProps } from '../../app/(tabs)/(menu)/menu'
import { router } from 'expo-router'
import { useUserStore } from '../../app/store/store'

interface UserSectionProps {
    activeButton: string
    handleButtonClick: (buttonName: ActiveProps) => void
}


const UserSection: React.FC<UserSectionProps> = ({
    activeButton,
    handleButtonClick
}) => {
    const { userState } = useUserStore()
    return (
        <View style={styles.userSection}>
            <View style={styles.leftSection}>
                <TouchableOpacity onPress={() => router.push('/(tabs)/(menu)/profile')}>
                    <Image
                        style={styles.logo}
                        source={{
                            uri: String(userState?.profilePicture),
                        }}
                    />
                </TouchableOpacity>
                <View>
                    <TouchableOpacity style={styles.leadUserProdifle} onPress={() => handleButtonClick('main')}>
                        <Text style={styles.textUser}>Hoạt Động</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.rightSection}>
                {/* <TouchableOpacity
                    style={[
                        styles.tinyLogo,
                        activeButton === 'ticket' && { backgroundColor: COLORS.primary },
                    ]}
                    onPress={() => handleButtonClick('ticket')}
                >
                    <MaterialCommunityIcons name="ticket-percent-outline" size={30} color={activeButton === 'ticket' ? 'white' : COLORS.primary} />
                </TouchableOpacity> */}
                <TouchableOpacity
                    style={[
                        styles.tinyLogo,
                        activeButton === 'noti' && { backgroundColor: COLORS.primary },
                    ]}
                    onPress={() => handleButtonClick('noti')}
                >
                    <Ionicons name="notifications-outline" size={30} color={activeButton === 'noti' ? 'white' : COLORS.primary} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.tinyLogo} onPress={() => router.push('/(tabs)/(menu)/setting')}>
                    <Feather name="settings" size={30} color={COLORS.primary} />
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default UserSection

const styles = StyleSheet.create({
    userSection: {
        height: 80,
        display: 'flex',
        flexDirection: 'row',
    },
    leftSection: {
        width: '50%',
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 65,
        height: 65,
        borderRadius: 50,
        borderWidth: 5,
        borderColor: '#FFFFFF'
    },
    leadUserProdifle: {
        height: 50,
        width: 130,
        backgroundColor: COLORS.primary,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textUser: {
        fontSize: 16,
        fontFamily: 'mon-b',
        color: 'white'
    },
    rightSection: {
        width: '50%',
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'flex-end',
        paddingRight: 10,
        alignItems: 'center'
    },
    tinyLogo: {
        width: 55,
        height: 55,
        borderRadius: 50,
        backgroundColor: COLORS.gray,
        justifyContent: 'center',
        alignItems: 'center'
    }

})
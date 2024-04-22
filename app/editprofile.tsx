import { Keyboard, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../components/Button'
import EditProfileContainer from '../components/Profile/EditProfileContainer'
import { useUserStore } from './store/store'

const EditProfile = () => {

    const { userState } = useUserStore()
    const [userChanged, setUserChanged] = useState<any | null>(userState)


    return (
        <View style={styles.container}>
            <EditProfileContainer userChanged={userChanged} setUserChanged={setUserChanged} />

        </View>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },

})
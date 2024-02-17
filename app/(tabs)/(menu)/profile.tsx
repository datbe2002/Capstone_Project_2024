import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AccountSection from '../../../components/Profile/AccountSection'
import PersonalInformationSection from '../../../components/Profile/PersonalInformationSection'
const { height, width } = Dimensions.get('window')

const Profile = () => {
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.mainSection}>
            <AccountSection />
            <PersonalInformationSection />
        </ScrollView>
    )
}

export default Profile

const styles = StyleSheet.create({
    mainSection: {
        height: height,
    }
})
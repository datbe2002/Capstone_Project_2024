import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import VoucherSection from './VoucherSection'

interface CenterSectionProps {
    activeButton: string
}

const CenterSection: React.FC<CenterSectionProps> = ({ activeButton }) => {
    return (
        <View>
            {activeButton === 'main' && <Text>MainSection</Text>}
            {activeButton === 'noti' && <Text>NotiSection</Text>}
            {activeButton === 'ticket' && <VoucherSection />}
        </View>
    )
}

export default CenterSection

const styles = StyleSheet.create({})
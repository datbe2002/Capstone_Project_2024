import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../assets'
const { height, width } = Dimensions.get('window')
const NoteForShop = ({ note, setNote }: any) => {



    return (
        <View style={styles.container}>
            <View style={styles.lableContainer}>
                <Text style={styles.label}>Ghi chú: </Text>
            </View>
            <TextInput
                style={{ textAlign: 'right', fontFamily: 'mon-sb', fontSize: 16, width: 300, paddingRight: 15 }}
                placeholder="Lưu ý cho chúng tôi..."

            />
        </View>
    )
}

export default NoteForShop

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderWidth: 1,
        borderColor: COLORS.gray,
        backgroundColor: COLORS.white,
        height: 60,
        alignItems: 'center',
        width: width
    },
    lableContainer: {

    },
    label: {
        fontSize: 18,
        fontFamily: 'mon-sb'
    }
})
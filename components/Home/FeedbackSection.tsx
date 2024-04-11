import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-elements'
import { Rating } from 'react-native-ratings'
import { COLORS } from '../../assets'
import { getFeedbackByProdId } from '../../app/context/feedbackApi'
import { useQuery } from '@tanstack/react-query'
import { dateConvert } from '../Voucher/VoucherCard'

const FeedbackCard = ({ item }: any) => {
    return (
        <View style={styles.feedbackSection} key={item.id}>
            <View style={styles.leftSection}>
                <Avatar
                    size={50}
                    rounded
                    source={{ uri: item.user.profilePicture }}
                />
            </View>
            <View style={styles.rightSection}>
                <View style={styles.nameNrating}>
                    <Text style={[styles.Text, {
                        paddingLeft: 25,
                        color: COLORS.primary,
                        fontFamily: 'mon-b'
                    }]}>{item.user.fullName}</Text>
                    <Rating
                        type="star"
                        readonly
                        imageSize={20}
                        ratingCount={5}
                        startingValue={item.rating}
                        style={{ marginLeft: 0 }}
                    />
                </View>
                <View style={styles.feedbackWrapp}>
                    <Text style={styles.Text}>{item.comment}</Text>
                </View>
                <View style={styles.date}>
                    <Text style={[styles.Text, { color: COLORS.darkGray }]}>{dateConvert(item.createAt)}</Text>
                </View>
            </View>

        </View>)
}

const FeedbackSection = ({ productId }: any) => {

    const { data, isFetching, refetch } = useQuery({
        queryKey: ["feedbackProd", productId],
        queryFn: () => getFeedbackByProdId(productId),
        enabled: productId !== null,
    });
    return (
        <View style={{ height: '100%' }}>
            {!isFetching && <FlatList
                data={data?.data}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <FeedbackCard item={item} />}
            />}
        </View>
    )
}

export default FeedbackSection

const styles = StyleSheet.create({
    feedbackSection: {
        marginTop: 20,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        borderTopColor: COLORS.gray,
        borderBottomColor: COLORS.gray,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        padding: 10,
        backgroundColor: COLORS.white
    },
    Text: {
        fontSize: 16,
        fontFamily: 'mon-sb',
    },
    leftSection: {
        width: '10%',
        backgroundColor: 'white',
        alignItems: 'center',
        paddingTop: 3,
    },
    rightSection: {
        width: '90%'

    },
    nameNrating: {
        display: 'flex',
        flexDirection: 'column',
        width: 150
    },
    feedbackWrapp: {
        marginLeft: 25,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10
    },
    date: {
        marginLeft: 25,
    }
})
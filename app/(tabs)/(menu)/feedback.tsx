import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { useUserStore } from '../../store/store';
import { getFeedbackByUserId } from '../../context/feedbackApi';
import { COLORS } from '../../../assets';
import { AirbnbRating } from 'react-native-elements';
import SpaceBet from '../../../components/SpaceBet';
import { SafeAreaView } from 'react-native';

const Feedback = () => {

    const { userState } = useUserStore()

    const { data, isFetching, refetch } = useQuery({
        queryKey: ["feedback", userState?.id],
        queryFn: () => getFeedbackByUserId(userState?.id),
        enabled: userState?.id !== null,
    });

    const FeedbackCard = ({ feedbackData }: any) => {
        return (
            <View style={styles.containerFeedbackCard}>
                <View style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>

                    <View style={styles.imgWrapper}>
                        <Text style={styles.Text}>
                            {feedbackData?.orderItem.product.name}
                        </Text>
                        <Image
                            style={styles.img}
                            source={
                                feedbackData?.orderItem.product.defaultImage
                                    ? { uri: feedbackData?.orderItem.product.defaultImage }
                                    :
                                    require("../../../assets/images/default.png")
                            }
                        />
                    </View>
                    <ScrollView contentContainerStyle={styles.feedbackContainer}>
                        <Text style={styles.Text}>Feedback của bạn: </Text>
                        <Text style={[styles.Text, { color: COLORS.darkGray }]}>
                            {feedbackData?.comment}

                        </Text>

                    </ScrollView>
                </View>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderStyle: 'dashed',
                    borderTopWidth: 2,
                    borderTopColor: COLORS.gray,
                }}>
                    <Text style={styles.Text}>Đánh giá sao của bạn: </Text>
                    <AirbnbRating
                        starContainerStyle={{
                            padding: 5,
                            borderWidth: 1,
                            borderColor: COLORS.gray,
                            borderRadius: 10
                        }}
                        count={5}
                        reviews={["Quá tệ", "OK", "Tốt", "Rất tốt", "Tuyệt vời"]}
                        defaultRating={feedbackData?.rating}
                        size={20}
                        isDisabled
                    />
                </View>
            </View>
        )
    }


    const ListHeaderComponent = () => {
        return <View>
            <SpaceBet height={30} />
        </View>
    }

    return (
        <SafeAreaView>
            <FlatList
                ListHeaderComponent={ListHeaderComponent}
                data={data?.data}
                renderItem={({ item }) => <FeedbackCard feedbackData={item} />}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}

export default Feedback

const styles = StyleSheet.create({
    Text: {
        fontSize: 16,
        fontFamily: 'mon-sb',
    },
    containerFeedbackCard: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        marginBottom: 10,
        backgroundColor: COLORS.white,
        width: "100%",
        paddingVertical: 10
    },
    imgWrapper: {
        width: 200,
        alignItems: "center",
        justifyContent: "center",
        borderRightWidth: 1,
        borderRightColor: COLORS.gray
    },
    img: {
        borderColor: COLORS.gray,
        borderWidth: 1,
        height: 110,
        width: 110,
        objectFit: "cover",
        backgroundColor: "transparent",
    },
    feedbackContainer: {
        borderRightWidth: 1,
        borderRightColor: COLORS.gray,
    }
})
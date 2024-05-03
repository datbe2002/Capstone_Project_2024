import MasonryList from '@react-native-seoul/masonry-list';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import { getProducts } from '../../app/context/productsApi';
import { COLORS } from '../../assets';
import { FavoriteListCard } from './FavoriteListCard';
import SpaceBet from '../SpaceBet';
import { Skeleton } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import { BottomModal } from '../BottomModal';
import FavoriteLogic from '../Home/FavoriteLogic';
const { height, width } = Dimensions.get("window");

const MaybeUCanLike = () => {
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [isFavourite, setIsFavourite] = useState<boolean>(false)
    const [dataLoved, setDataLoved] = useState<any>(null)
    const handleOpenBottom = (item: any) => {
        setDataLoved(item)
        setModalVisible(true)
    }


    const [data, setData] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false)
    const { data: queryData, isSuccess } = useQuery({
        queryKey: ["recommendProducts"],
        queryFn: () => getProducts(6),
    });

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            if (queryData && queryData.items) {
                setData(queryData.items);
                setLoading(false);
            }
        }, 1000)
    }, [queryData]);
    return (
        <View style={styles.container}>
            <View style={styles.mainHeader}>
                <Text style={styles.mainHeaderText}> Có thể bạn sẽ thích </Text>
            </View>
            {loading ? <View style={{ flex: 1 }}>
                <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                    <Skeleton
                        LinearGradientComponent={LinearGradient}
                        animation="wave"
                        width={width / 2.1}
                        height={250}
                        style={{ borderRadius: 10 }}
                    />
                    <Skeleton
                        LinearGradientComponent={LinearGradient}
                        animation="wave"
                        width={width / 2.1}
                        height={250}
                        style={{ borderRadius: 10 }}
                    />
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', gap: 10, marginTop: 10 }}>
                    <Skeleton
                        LinearGradientComponent={LinearGradient}
                        animation="wave"
                        width={width / 2.1}
                        height={150}
                        style={{ borderRadius: 10 }}
                    />
                    <Skeleton
                        LinearGradientComponent={LinearGradient}
                        animation="wave"
                        width={width / 2.1}
                        height={150}
                        style={{ borderRadius: 10 }}
                    />
                </View>
            </View> :
                <>
                    <MasonryList
                        nestedScrollEnabled
                        style={{
                            alignSelf: "stretch",
                        }}
                        data={
                            data
                        }
                        keyExtractor={(item) => item.id}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            alignSelf: "stretch",
                        }}
                        renderItem={({ item, i }) => (
                            <FavoriteListCard item={item} index={i}
                                handleOpenBottom={handleOpenBottom}

                            />
                        )}
                        onEndReachedThreshold={0.1}

                    />
                    <BottomModal
                        isOpen={modalVisible}
                        setIsOpen={setModalVisible}
                        snapHeight={"15%"}>
                        {dataLoved && <View style={{ backgroundColor: COLORS.white, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <FavoriteLogic isFavourite={isFavourite} setIsFavourite={setIsFavourite} item={dataLoved} />
                            <Pressable style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontFamily: 'mon-sb', fontSize: 20, color: COLORS.darkGray }}>Thêm vào sản phẩm yêu thích</Text>
                            </Pressable>
                        </View>}
                    </BottomModal>
                </>
            }
        </View>
    )
}

export default MaybeUCanLike

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    mainHeader: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainHeaderText: {
        fontFamily: 'mon-sb',
        fontSize: 18
    }
})
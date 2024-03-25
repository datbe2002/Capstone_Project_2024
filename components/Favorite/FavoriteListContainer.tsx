import { Dimensions, ImageBackground, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useRef } from 'react'
import MasonryList from '@react-native-seoul/masonry-list';
import { COLORS } from '../../assets';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';
import { router } from 'expo-router';
import { useFavouriteId } from '../../app/store/store';

const { height, width } = Dimensions.get("window");


interface FavouriteListContainerProps {
    favorites: any[],
    handleOpenBottom: (itemId: number) => void;
}

interface FavoriteListCardProps {
    item: any,
    index: number,
    handleOpenBottom: (itemId: number) => void
}



const FavoriteListCard: React.FC<FavoriteListCardProps> = ({ item, index, handleOpenBottom }) => {
    let isEven = index % 2 == 0;

    return (
        <Pressable
            style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginTop: 15,
                paddingTop: index === 1 ? 10 : 0,
                paddingLeft: isEven ? 0 : 8,
                paddingRight: isEven ? 8 : 0,
            }}
            onPress={() => {
                router.push({
                    pathname: "/(tabs)/(home)/product/[id]",
                    params: { id: item.id },
                });
            }}
        >
            <ImageBackground
                source={item.defaultImage ? { uri: item.defaultImage } : require("../../assets/images/default.png")}
                style={{
                    width: "100%",
                    height: index % 3 == 0 ? 180 : 260,
                    alignItems: "flex-end",
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10
                }}
            // imageStyle={{ borderRadius: 16 }}
            >
                <View
                    style={{
                        paddingTop: 10,
                    }}
                >
                </View>
            </ImageBackground>
            <View style={styles.allContainer}>
                <View style={styles.mainInfo}>
                    <Text style={styles.mainNameText}>
                        {item.name}
                    </Text>
                    <View style={styles.priceNTotalCon}>
                        <Text style={styles.textPrice}><Text style={styles.vndText}>đ</Text>{item.productVariants[0].price}</Text>
                        <Text style={styles.totalSoldPrice}>Đã bán {item.totalSold}</Text>
                    </View>
                </View>
                <View style={styles.mainHandle}>
                    <View style={styles.threeDot}>
                        <Entypo name="dots-three-horizontal" size={24} color={COLORS.darkGray} onPress={() =>
                            handleOpenBottom(item.id)
                        } />
                    </View>
                    <TouchableOpacity style={styles.buyProd}>
                        <View>
                            <Ionicons name="cart" size={20} color={COLORS.white} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

        </Pressable>
    )
}


const ListEmptyComponent = () => {
    return (
        <View style={styles.emptyList}>
            <Image style={styles.imageWL} source={require('../../assets/images/wishlistempty.png')} />
            <Text style={{ fontFamily: 'mon', color: COLORS.black, fontSize: 18 }}>Bạn chưa chọn thích sản phẩm nào</Text>
            <Pressable style={{ backgroundColor: COLORS.primary, padding: 15, borderRadius: 2 }} onPress={() => router.push('/(tabs)/(home)/homepage')}>
                <Text style={{ fontFamily: 'mon-sb', color: COLORS.white, fontSize: 16 }}>Mua sắm ngay!</Text>
            </Pressable>
        </View>
    )
}


const FavoriteListContainer: React.FC<FavouriteListContainerProps> = ({ favorites, handleOpenBottom }) => {

    return (
        <View>
            <View style={{ height: "100%", paddingHorizontal: 5 }}>
                <MasonryList
                    style={{
                        alignSelf: "stretch",
                    }}
                    data={
                        favorites
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
                    ListEmptyComponent={ListEmptyComponent}
                />
            </View>

        </View>
    )
}

export default FavoriteListContainer

const styles = StyleSheet.create({
    allContainer: {
        backgroundColor: COLORS.white,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    mainInfo: {
        paddingHorizontal: 10,
    },
    mainHandle: {
        paddingHorizontal: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
        alignItems: 'center',
        paddingBottom: 10
    },
    mainNameText: {
        fontFamily: 'mon',
        fontSize: 16
    },
    vndText: {
        fontSize: 14,
        textDecorationLine: 'underline'
    },
    priceNTotalCon: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10
    },
    textPrice: {
        fontFamily: 'mon-sb',
        fontSize: 20,
        color: COLORS.primary
    },
    totalSoldPrice: {
        fontFamily: 'mon',
        paddingTop: 5,
        fontSize: 14
    },
    threeDot: {

    },
    buyProd: {
        backgroundColor: COLORS.primary,
        width: 32,
        height: 32,
        padding: 5,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    // 
    emptyList: {
        backgroundColor: '#FAFAFC',
        display: 'flex',
        gap: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20,
        paddingTop: 20
    },
    imageWL: {
        width: width / 2,
        objectFit: "cover",
    }
})
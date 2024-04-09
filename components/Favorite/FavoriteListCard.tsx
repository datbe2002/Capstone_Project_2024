import { Dimensions, ImageBackground, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useOrderItems, useUserStore } from "../../app/store/store";
import { router } from "expo-router";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { CartItem } from "../../constants/Type";
import { COLORS } from "../../assets";

interface FavoriteListCardProps {
    item: any,
    index: number,
    handleOpenBottom: (itemId: number) => void
}

const { width } = Dimensions.get("window");


export const FavoriteListCard: React.FC<FavoriteListCardProps> = ({ item, index, handleOpenBottom }) => {
    let isEven = index % 2 == 0;
    const { orderItems, setOrderItems } = useOrderItems();
    const { userState } = useUserStore()

    return (

        <Pressable
            onPress={() => router.push({
                pathname: "/product/[id]",
                params: { id: item.id },
            })}
            style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginTop: 15,
                paddingTop: index === 1 ? 10 : 0,
                paddingLeft: isEven ? 0 : 8,
                paddingRight: isEven ? 8 : 0,
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
                <View style={styles.mainHandle} >
                    <Pressable style={styles.threeDot} onPress={() =>
                        handleOpenBottom(item.id)
                    }>
                        <Entypo name="dots-three-horizontal" size={24} color={COLORS.darkGray} />
                    </Pressable>
                    <TouchableOpacity style={styles.buyProd} onPress={() => {
                        const obj: CartItem = {
                            // userId: userState?.id,
                            cartId: userState?.userCartId,
                            color:
                                item.productVariants[0].color.colorCode,
                            price: item.productVariants[0].price,
                            product: item,
                            productId: item.id,
                            quantity: 1,
                            size: item.productVariants[0].size.value,
                        };
                        setOrderItems({
                            items: [obj],
                            total: obj.price,
                            totalQuantityProd: 1,
                        });
                        router.push("/payment");
                    }}>
                        <View>
                            <Ionicons name="cart" size={20} color={COLORS.white} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

        </Pressable>

    )
}

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
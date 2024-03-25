import { ActivityIndicator, Alert, Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage'
import FavoriteListContainer from '../../../components/Favorite/FavoriteListContainer'
import { useIsFocused } from '@react-navigation/native'
import { clearAsyncWithKey, removeItemsFromAsyncStorage } from '../../../shared/helper'
import { COLORS } from '../../../assets'
import BottomSheet, { BottomSheetBackdrop, BottomSheetFooter, BottomSheetView } from "@gorhom/bottom-sheet";
import { useFavouriteId } from '../../store/store'

const { height, width } = Dimensions.get('window')


const favorite = () => {
    const key = "favorites";
    const [favorites, setFavorites] = useState<any>([]);
    const isFocused = useIsFocused();
    const [loadingState, setLoadingState] = useState(false)
    useEffect(() => {
        // Call only when screen open or when back on screen
        if (isFocused) {
            loadFavorites();
        }
    }, [isFocused]);
    const checkAsyncStorage = async () => {
        try {
            const data = await AsyncStorage.getItem(key);
            console.log("Data in AsyncStorage:", data);

        } catch (error) {
            console.error("Error reading AsyncStorage:", error);
        }
    };

    const loadFavorites = async () => {
        try {
            const favorites = await AsyncStorage.getItem(key);
            if (favorites) {
                setFavorites(JSON.parse(favorites));
            }
        } catch (error) {
            console.error("Error loading favorites:", error);
        }
    };
    const handleRemoveFavorite = async (itemId: number | null) => {
        try {
            await removeItemsFromAsyncStorage(itemId, key);
            setFavorites((prevFavorites: any) =>
                prevFavorites.filter((item: any) => item.id !== itemId)
            );
        } catch (error) {
            console.error("Error removing from favorites:", error);
        }
    };

    const handleDeleteAll = async () => {
        try {
            await clearAsyncWithKey(key);
            setFavorites(() => []);
        } catch (error) {
            console.error("Error removing all favorites:", error);
        }
    };

    const handleConfirm = async () => {
        Alert.alert("Thông báo", "Bạn có muốn xóa tất cả ?", [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
            },
            { text: "OK", onPress: handleDeleteAll },
        ]);
    };

    const { itemId, setItemIdState } = useFavouriteId()
    const bsRef = useRef<BottomSheet>(null)
    const handleOpenBottom = (itemId: number) => {
        setItemIdState(itemId)
        bsRef.current?.expand()
    }
    const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />, [])
    console.log(itemId)
    const handleCheck = () => {
        if (itemId !== null) {
            setLoadingState(true)
            handleRemoveFavorite(itemId)
            setTimeout(() => {
                bsRef.current?.close()
                setLoadingState(false)
            }, 1000)
        } else {
            console.error("Invalid itemId");
        }

    }

    return (

        <View style={{ height: "100%" }}>
            {loadingState ? <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="white" />
            </View> : null}
            <ScrollView style={{ flex: 1 }}>
                {favorites.length > 1 &&
                    <View style={styles.buttonDeleteAllContainer}>
                        <Text style={styles.buttonDeleteAll} onPress={handleConfirm}>Xóa tất cả</Text>
                    </View>
                }
                <FavoriteListContainer favorites={favorites} handleOpenBottom={handleOpenBottom} />

            </ScrollView>
            <BottomSheet
                snapPoints={["25%"]}
                ref={bsRef}
                index={-1}
                enablePanDownToClose={true}
                backdropComponent={renderBackdrop}
                backgroundStyle={{ backgroundColor: COLORS.white }}
            >
                <BottomSheetView style={{}}>
                    <View style={{ backgroundColor: COLORS.white }}>
                        <Pressable onPress={handleCheck} style={{ padding: 15, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 0.5, borderBottomColor: COLORS.darkGray }}>
                            <Text style={{ fontFamily: 'mon-sb', fontSize: 20, color: COLORS.darkGray }}>Bỏ thích</Text>
                        </Pressable>
                        <Pressable style={{ padding: 15, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontFamily: 'mon-sb', fontSize: 20, color: COLORS.darkGray }}>Sản phẩm tương tự</Text>
                        </Pressable>
                    </View>
                </BottomSheetView>
            </BottomSheet>
        </View>
    )
}

export default favorite

const styles = StyleSheet.create({
    buttonDeleteAllContainer: {
        alignItems: 'flex-end',
        paddingHorizontal: 10
    },
    buttonDeleteAll: {
        color: COLORS.errorColor,
        fontFamily: 'mon-sb',
        fontSize: 16
    },
    footerContainer: {
        padding: 12,
        paddingBottom: 25,
        // borderRadius: 12,
        backgroundColor: COLORS.white,
    },
    footerText: {
        textAlign: 'center',
        color: COLORS.darkGray,
        fontFamily: 'mon-sb',
        fontSize: 20
    },
    loadingContainer: {
        position: 'absolute',
        height: height,
        top: 0,
        left: 0,
        bottom: -10,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
    },
})
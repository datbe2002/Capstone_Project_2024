import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage'
import FavoriteListContainer from '../../../components/Favorite/FavoriteListContainer'
import { useIsFocused } from '@react-navigation/native'
import { clearAsyncWithKey, removeItemsFromAsyncStorage } from '../../../shared/helper'
import { COLORS } from '../../../assets'
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import { useFavouriteId } from '../../store/store'

const favorite = () => {
    const key = "favorites";
    const [favorites, setFavorites] = useState<any>([]);
    const isFocused = useIsFocused();
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
        Alert.alert("Delete", "Are you sure to delete all ?", [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
            },
            { text: "OK", onPress: handleDeleteAll },
        ]);
    };

    const bsRef = useRef<BottomSheet>(null)
    const handleOpenBottom = () => {
        bsRef.current?.expand()
    }
    const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />, [])
    const { itemId } = useFavouriteId()
    const handleCheck = () => {
        handleRemoveFavorite(itemId)
        bsRef.current?.close()
    }

    return (
        <SafeAreaView>
            {favorites.length > 1 &&
                <View style={styles.buttonDeleteAllContainer}>
                    <Text style={styles.buttonDeleteAll} onPress={handleConfirm}>Delete all</Text>
                </View>
            }
            <FavoriteListContainer favorites={favorites} handleOpenBottom={handleOpenBottom} />
            <BottomSheet
                snapPoints={["30%"]}
                ref={bsRef}
                index={-1}
                enablePanDownToClose={true}
                backdropComponent={renderBackdrop}
            >
                <BottomSheetView style={{}}>
                    <Button title={'delete'} onPress={handleCheck} />
                </BottomSheetView>
            </BottomSheet>
        </SafeAreaView>
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
    }
})
import { ActivityIndicator, Dimensions, ImageBackground, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import MasonryList from '@react-native-seoul/masonry-list';
import { COLORS } from '../../assets';
import { Entypo, FontAwesome, Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';
import { Link, router } from 'expo-router';
import { useFavouriteId, useOrderItems, useUserStore } from '../../app/store/store';
import EmptyComponentCustom from '../EmptyComponentCustom';
import { CartItem } from '../../constants/Type';
import MaybeUCanLike from './MaybeUCanLike';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../../app/context/productsApi';
import { FavoriteListCard } from './FavoriteListCard';



interface FavouriteListContainerProps {
    favorites: any[],
    handleOpenBottom: (itemId: number) => void;
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
                    ListFooterComponent={<MaybeUCanLike />}
                    ListEmptyComponent={<EmptyComponentCustom icon={<FontAwesome name="tasks" size={45} color={COLORS.white} />} text={'Bạn chưa chọn thích sản phẩm nào'} option={'Mua sắm ngay !'} onPress={() => router.push('/(tabs)/(home)/homepage')} />}
                />
            </View>

        </View>
    )
}

export default FavoriteListContainer


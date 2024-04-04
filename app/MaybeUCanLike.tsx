import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import MasonryList from '@react-native-seoul/masonry-list';
import { FavoriteListCard } from '../components/Favorite/FavoriteListContainer';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from './context/productsApi';
import { useFocusEffect } from 'expo-router';
import { COLORS } from '../assets';

const MaybeUCanLike = ({ mainstading }: any) => {
    const handleOpenBottom = () => {
        console.log('open')
    }
    const [data, setData] = useState<any>([])

    const { data: queryData, isLoading } = useQuery({
        queryKey: ["recommendProducts"],
        queryFn: () => getProducts(6),
    });

    useEffect(() => {
        if (queryData && queryData.items) {
            setData(queryData.items);
        }
    }, [queryData]);
    if (data.length < 1) {
        return <View>
            <ActivityIndicator size={25} color={COLORS.primary} />
        </View>;
    }
    return (
        <View style={styles.container}>
            <View style={styles.mainHeader}>
                <Text style={styles.mainHeaderText}> Có thể bạn sẽ thích </Text>
            </View>
            {!isLoading && <View style={{ height: '100%' }}>
                <MasonryList
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
            </View>}
        </View>
    )
}

export default MaybeUCanLike

const styles = StyleSheet.create({
    container: {
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
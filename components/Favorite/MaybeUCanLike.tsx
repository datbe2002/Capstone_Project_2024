import MasonryList from '@react-native-seoul/masonry-list';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { getProducts } from '../../app/context/productsApi';
import { COLORS } from '../../assets';
import { FavoriteListCard } from './FavoriteListCard';

const MaybeUCanLike = () => {
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
    return (
        <View style={styles.container}>
            <View style={styles.mainHeader}>
                <Text style={styles.mainHeaderText}> Có thể bạn sẽ thích </Text>
            </View>
            {isLoading ? <View>
                <ActivityIndicator size={25} color={COLORS.primary} />
            </View> :
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
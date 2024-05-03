import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import instance from '../../context/axiosConfig'
import { COLORS } from '../../../assets'
import { Feather } from '@expo/vector-icons'

const PaymentMethod = () => {

    const [method, setMethod] = useState<any | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [isChosen, setIsChosen] = useState<boolean>(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await instance.get(`/api/payment/method`);
                setLoading(false)
                setMethod(response.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [])

    const RenderComponent = (props: any) => {
        const { dataEach } = props
        return <Pressable style={styles.accountId} onPress={() => setIsChosen(!isChosen)}>
            <Text style={styles.mainText}>
                {dataEach.name}
            </Text>
            {/* <View>
                {isChosen && <Feather name="check" size={24} color={COLORS.primary} />}
            </View> */}
        </Pressable>
    }
    return (
        <View>
            {loading ? <ActivityIndicator /> :
                <View>
                    {method?.map((me: any) => (
                        <View key={me.id} style={styles.lineFunc}>
                            <RenderComponent dataEach={me} />
                        </View>
                    ))}
                </View>}
        </View>
    )
}

export default PaymentMethod

const styles = StyleSheet.create({
    lineFunc: {
        height: 'auto',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        marginTop: 10
    },
    accountId: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10
    },
    mainText: {
        color: COLORS.primary,
        fontSize: 20,
        paddingLeft: 10,
        fontFamily: 'mon-sb',
    },
})
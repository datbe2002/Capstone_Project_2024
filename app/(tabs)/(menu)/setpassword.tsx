import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../../../assets'
import CustomButton from '../../../components/Button'
import CustomInput from '../../../components/Input'
import SpaceBet from '../../../components/SpaceBet'
const SetPassword = () => {



    return (
        <ScrollView contentContainerStyle={styles.fullcomponent}>
            <SpaceBet height={30} />
            <View style={styles.introCo}>
                <Text style={styles.mainText}>Trương Tấn Đạt {'\u2022'} FTAI Shop</Text>
                <SpaceBet height={5} />

                <Text style={styles.biggerText}>Đổi mật khẩu</Text>
                <SpaceBet height={5} />

                <Text style={styles.mainText}>Mật khẩu của bạn phải có ít nhất 6 ký tự, bao gồm cả chữ số, chữ cái và ký tự đặc biệt (!$@%)</Text>
            </View>
            <SpaceBet height={30} />
            <View style={styles.inputCo}>
                <CustomInput
                    placeholder="Mật khẩu hiện tại"
                    // onChangeText={handleInputUsername}
                    // value={inputUsername}
                    secureTextEntry={true}
                    style={styles.input}
                />
                <SpaceBet height={20} />
                <CustomInput
                    placeholder="Mật khẩu"
                    // onChangeText={handleInputPassword}
                    secureTextEntry={true}
                    // value={inputPassword}
                    style={styles.input}
                />
                <SpaceBet height={20} />
                <CustomInput
                    placeholder="Nhập lại mật khẩu mới"
                    // onChangeText={handleInputPassword}
                    secureTextEntry={true}
                    // value={inputPassword}
                    style={styles.input}
                />
                <SpaceBet height={20} />

                {/* <SpaceBet height={150} /> */}
                <CustomButton
                    buttonText="Đổi mật khẩu"
                    style={{ width: "100%" }}
                // onPress={() => router.replace('/(tabs)/(home)/homepage')}
                />
            </View>
        </ScrollView>
    )
}

export default SetPassword

const styles = StyleSheet.create({
    fullcomponent: {
        flex: 1,
        flexGrow: 1,
        paddingHorizontal: 10,
    },
    introCo: {
        display: 'flex',
    },
    input: {
        width: "100%",
        backgroundColor: COLORS.inputBackgroundColor,
        borderColor: COLORS.inputBackgroundColor,
        elevation: 2,
    },
    inputCo: {
        justifyContent: "center",
        alignItems: "center",
    },
    mainText: {
        fontSize: 18,
        fontFamily: 'mon-sb',
        color: COLORS.primary
    },
    biggerText: {
        fontSize: 35,
        fontFamily: 'mon-b',
        color: COLORS.primary
    }
})
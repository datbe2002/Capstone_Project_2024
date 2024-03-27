import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../assets'
import InputV2 from '../InputV2'
interface ErrorState {
    email?: string,
    password?: string,
    fullName?: string,
    retypeNewPassword?: string,
    street?: string,
    gender?: "Male" | "Female"
}
const EditAddressComponent = ({ item }: any) => {
    const [inputs, setInputs] = React.useState({
        email: '',
        password: '',
        fullName: '',
        retypeNewPassword: '',
        street: '',
        gender: ''
    });
    const [errors, setErrors] = React.useState<ErrorState>({

    });
    const handleOnchange = (text: string, input: string) => {
        setInputs(prevState => ({ ...prevState, [input]: text }));
    };
    const handleError = (error: string | null, input: string) => {
        setErrors(prevState => ({ ...prevState, [input]: error }));
    };
    return (
        <View>
            <View style={styles.componentText}>
                <Text style={styles.syntaxText}>Liên hệ</Text>
            </View>
            <View>
                <InputV2
                    onChangeText={text => handleOnchange(text, 'email')}
                    onFocus={() => handleError(null, 'email')}
                    error={errors.email}
                    placeholder="Email" />
            </View>
        </View>
    )
}

export default EditAddressComponent

const styles = StyleSheet.create({
    componentText: {
        height: 50,
        justifyContent: 'center',
        paddingLeft: 10,
    },
    syntaxText: {
        color: COLORS.darkGray,
        fontFamily: 'mon-sb',
        fontSize: 17,
    },
})
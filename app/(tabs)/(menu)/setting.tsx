import { Button, Keyboard, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import InputV2 from '../../../components/InputV2'
import { COLORS } from '../../../assets'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useAuth } from '../../context/auth'

interface ErrorState {
    email?: string
}

const Setting = () => {

    const { signOut } = useAuth()

    // const [inputs, setInputs] = React.useState({
    //     email: '',
    // });
    // const [errors, setErrors] = React.useState<ErrorState>({

    // });

    // const validate = () => {
    //     Keyboard.dismiss();
    //     let isValid = true;

    //     if (!inputs.email) {
    //         handleError('Please input email', 'email');
    //         isValid = false;
    //     } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
    //         handleError('Please input a valid email', 'email');
    //         isValid = false;
    //     }

    //     if (isValid) {
    //         loginTest({ test: 'hi' });
    //     }
    // };

    // const login = () => {
    //     console.log('login')
    // };
    // const handleOnchange = (text: string, input: string) => {
    //     setInputs(prevState => ({ ...prevState, [input]: text }));
    // };
    // const handleError = (error: string | null, input: string) => {
    //     setErrors(prevState => ({ ...prevState, [input]: error }));
    // };
    return (
        <View style={styles.componentFull}>
            <Text>Testing</Text>

            <Button title='Ddang xuat' onPress={signOut} />
        </View>
    )
}

export default Setting

const styles = StyleSheet.create({
    componentFull: {
        flex: 1,
        marginHorizontal: 10
    }
})
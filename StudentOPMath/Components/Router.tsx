import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity, Alert, StyleSheet, Touchable } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import { TextInput } from 'react-native-paper';
import { Colors, textInputTheme, GlobalStyles } from './Constants';
import { Credential, TryLogin, fetchStudentData } from '../Redux/actions';
import firestore from '@react-native-firebase/firestore';
import HeaderLogo from './common/HeaderLogo';
import Spinner from './common/Spinner';
import { StackNavigationProp } from '@react-navigation/stack';

interface Cred {
    prop: string,
    value: string | any,
}

interface Props {
    navigation: StackNavigationProp<any, any>,
    user: null | object | any,
    errorMessage: string,
    email: string,
    password: string,
    TryLogin: (email: string, password: string) => void;
    Credential: (details: Cred) => void;
    loading: boolean; 3
    fetchStudentData: (uid: string, navigation: StackNavigationProp<any, any>) => void;
}

const Home: React.FC<Props> = (props) => {
    const { Credential, email, password } = props;
    useEffect(() => {
        if (props.user) {
            props.fetchStudentData(props.user.user.uid, props.navigation, Credential)
        }
    }, [props.user])

    const showErrorMessage = () => {
        if (props.errorMessage) {
            return (
                <View style={{ height: 20 }}>
                    <Text style={GlobalStyles.textMissMatch}>
                        {props.errorMessage}
                    </Text>
                </View>
            )
        } else {
            return <View></View>
        }
    }

    const LoginUser = () => {
        const { email, password, TryLogin } = props;
        if (email && password) {
            TryLogin(email, password);
        } else {
            Alert.alert("Email or password can't be empty")
        }
    }

    const showButton = () => {
        if (!props.loading) {
            return (
                <TouchableOpacity style={GlobalStyles.buttonContainer}
                    onPress={() => LoginUser()}
                >
                    <Text style={GlobalStyles.buttonText}>Login</Text>
                </TouchableOpacity>
            )
        } else {
            return (
                <View style={styles.spinnerContainer}>
                    <Spinner size={true} />
                </View>
            )
        }
    }

    //The user object is already cached in memory and the user has logged in before
    //A spinner is returned until the useEffect navigates the user
    if (props.user) {
        return (
            <View style={[GlobalStyles.mainContainer, { backgroundColor: Colors.mainBackground }]}>
                <Spinner size={false} />
            </View>
        )
    } else {
        return (
            <View style={GlobalStyles.mainContainer}>
                <View style={{ bottom: hp('10%') }}>
                    <HeaderLogo />
                </View>
                <View style={GlobalStyles.secondayrContainer}>
                    <TextInput
                        right={<TextInput.Icon name="email" color={Colors.mainForeGround} />}
                        mode="outlined"
                        multiline={false}
                        style={GlobalStyles.textInputContainer}
                        label="Email"
                        value={email}
                        onChangeText={text => Credential({ prop: 'email', value: text })}
                        theme={textInputTheme}
                    />
                    <TextInput
                        right={<TextInput.Icon name="lock" color={Colors.mainForeGround} />}
                        mode="outlined"
                        multiline={false}
                        style={GlobalStyles.textInputContainer}
                        label="Password"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={text => Credential({ prop: 'password', value: text })}
                        theme={textInputTheme}
                    />
                    {showButton()}
                    {showErrorMessage()}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    spinnerContainer: {
        height: hp('5%'),
        justifyContent: 'center',
        alignItems: 'center',
        margin: hp('5%'),
    }, signUp: {
        color: Colors.mainHeader,
        fontSize: hp('2.4%'),
        margin: hp('1%')
    },
})

const mapStateToProps = ({ SignInReducer }) => {
    return {
        user: SignInReducer.user,
        email: SignInReducer.email,
        password: SignInReducer.password,
        errorMessage: SignInReducer.errorMessage,
        loading: SignInReducer.loading,
    }
}

export default connect(mapStateToProps, { Credential, TryLogin, fetchStudentData })(Home);
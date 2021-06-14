import React, { useEffect, useState } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux'
import { TextInput, HelperText } from 'react-native-paper'
import _ from 'lodash'
import { Colors, textInputTheme, GlobalStyles, WIDTH } from '../Constants'
import { Credential, createAccountUser, resetErrorMessage } from '../../Redux/actions'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import HeaderArrow from '../common/HeaderArrow'
import Spinner from '../common/Spinner'
import {validateEmail, validatePassword} from '../Validators';
import { StackNavigationProp } from '@react-navigation/stack'

interface Cred {
  prop: string
  value: string
}

interface Props {
  loading: boolean
  email: string
  password: string
  resetErrorMessage: () => void
  createAccountUser: (
    email: string,
    password: string,
    studentFirstName: string,
    studentLastName: string,
  ) => void
  studentFirstName: string
  studentLastName: string
  address1: string
  address2: string
  Credential: (details: Cred) => void
  user: any
  navigation: StackNavigationProp<any, any>
}

const UserSignupFinal: React.FC<Props> = props => {
  const [error, setError] = useState('')

  const {
    email,
    password,
    Credential,
    createAccountUser,
    studentFirstName,
    studentLastName,
  } = props

  const backToLogin = () => {
    props.navigation.goBack()
  }

  useEffect(() => {
    props.resetErrorMessage()
  }, [])

  const SignUpUser = () => {
    if (validateEmail(email) || validatePassword(password)) {
      Alert.alert('Please fill all form values correctly')
    } else {
      setError('')
      createAccountUser(
        email,
        password,
        studentFirstName,
        studentLastName,
      )
      props.navigation.navigate('Router')
    }
  }

  const showButton = () => {
    if (!props.loading) {
      return (
        <TouchableOpacity
          style={[GlobalStyles.buttonContainer, { flexDirection: 'row' }]}
          onPress={() => SignUpUser()}>
          <Text style={GlobalStyles.buttonText}>Sign up</Text>
          <Icon name={'account-plus'} size={30} color={Colors.mainBackground} />
        </TouchableOpacity>
      )
    } else {
      return (
        <View style={GlobalStyles.spinnerContainer}>
          <Spinner size={true} spinnerColor={Colors.mainBackground} />
        </View>
      )
    }
  }

  const sendMeBack = () => {
    props.navigation.goBack();
  }

  return (
    <View
      style={{ flex: 1, backgroundColor: Colors.mainBackground }}>
      <HeaderArrow
        HeaderText={'Sign up (2 of 2)'}
        HeaderStyle={GlobalStyles.headerContainer}
        TextEdited={[GlobalStyles.headerTextStyle, GlobalStyles.bigHeaderStyle, { left: WIDTH * 0.30 }]}
        navigateMeBack={() => sendMeBack()}
        iconName={'arrow-left'}
        iconColor={Colors.secondaryHeader}
      />
      <View style={GlobalStyles.mainContainer}>
        <TextInput
          right={<TextInput.Icon name='email' color={Colors.mainForeGround} />}
          mode='outlined'
          multiline={false}
          style={GlobalStyles.textInputContainer}
          label='Email'
          value={email}
          onChangeText={text => Credential({ prop: 'email', value: text })}
          theme={textInputTheme}
        />
        <HelperText style={{ color: Colors.errorColor }} type="error" visible={validateEmail(email)}>
          Invalid Email format
          </HelperText>
        <TextInput
          right={<TextInput.Icon name='lock' color={Colors.mainForeGround} />}
          mode='outlined'
          multiline={false}
          style={GlobalStyles.textInputContainer}
          label='Password'
          secureTextEntry={true}
          value={password}
          onChangeText={text => Credential({ prop: 'password', value: text })}
          theme={textInputTheme}
        />
        <HelperText style={{ color: Colors.errorColor, textAlign: 'center' }} type="error" visible={validatePassword(password)}>
          Password must be at least 6 chars long that contains at least one digit, an uppercase and a lowercase letter
                </HelperText>
        {showButton()}
        <Text style={GlobalStyles.textMissMatch}>{error}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: wp('100%'),
    height: hp('100%')
  },
  signUp: {
    color: Colors.mainHeader,
    fontSize: hp('15%'),
    margin: hp('5%'),
  },

})

const mapStateToProps = ({ SignInReducer }) => {
  return {
    password: SignInReducer.password,
    email: SignInReducer.email,
    studentFirstName: SignInReducer.studentFirstName,
    studentLastName: SignInReducer.studentLastName,
    user: SignInReducer.user,
    loading: SignInReducer.loading,
  }
}

export default connect(mapStateToProps, {
  Credential,
  createAccountUser,
  resetErrorMessage,
})(UserSignupFinal)

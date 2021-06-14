import React, { useState } from 'react'
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
import { Credential } from '../../Redux/actions'
import {nameLength} from '../Validators';
import HeaderArrow from '../common/HeaderArrow'
import { StackNavigationProp } from '@react-navigation/stack'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'



interface Cred {
  prop: string
  value: string
}

interface Props {
  studentFirstName: string
  studentLastName: string
  Credential: (details: Cred) => void
  user: any
  navigation: StackNavigationProp<any, any>
}

const UserSignup: React.FC<Props> = props => {


  const { studentFirstName, studentLastName, Credential } = props


  const validFormNavigation = () => {
    if (nameLength(studentFirstName) || nameLength(studentLastName)) {
      Alert.alert("Please fill all the forms")
    } else {
      props.navigation.navigate('UserSignupFinal')
    }
  }

  const sendMeBack = () => {
    props.navigation.goBack()
  }

  return (
    <View
      style={{ flex: 1, backgroundColor: Colors.mainBackground }}>
      <HeaderArrow
        HeaderText={'Sign up (1 of 2)'}
        HeaderStyle={GlobalStyles.headerContainer}
        TextEdited={[GlobalStyles.headerTextStyle, GlobalStyles.bigHeaderStyle, { left: WIDTH * 0.30 }]}
        navigateMeBack={() => sendMeBack()}
        iconName={'arrow-left'}
        iconColor={Colors.secondaryHeader}
      />
      <View style={GlobalStyles.mainContainer}>
        <TextInput
          right={
            <TextInput.Icon name='account' color={Colors.mainForeGround} />
          }
          mode='outlined'
          multiline={false}
          style={GlobalStyles.textInputContainer}
          label='First name'
          value={studentFirstName}
          onChangeText={text => Credential({ prop: 'studentFirstName', value: text })}
          theme={textInputTheme}
        />
        <HelperText style={{ color: Colors.errorColor }} type="error" visible={nameLength(studentFirstName)}>
          First Name must be at least 2 chars long
          </HelperText>
        <TextInput
          right={
            <TextInput.Icon name='account' color={Colors.mainForeGround} />
          }
          mode='outlined'
          multiline={false}
          style={GlobalStyles.textInputContainer}
          label='Last name'
          value={studentLastName}
          onChangeText={text => Credential({ prop: 'studentLastName', value: text })}
          theme={textInputTheme}
        />
        <HelperText style={{ color: Colors.errorColor }} type="error" visible={nameLength(studentLastName)}>
          Last Name must be at least 2 chars long
        </HelperText>
        <TouchableOpacity
          style={[GlobalStyles.buttonContainer, { flexDirection: 'row' }]}
          onPress={() => validFormNavigation()}>
          <Text style={GlobalStyles.buttonText}>Sign up</Text>
          <Icon name={'account-plus'} size={30} color={Colors.mainBackground} />
        </TouchableOpacity>
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
    fontSize: hp('12%'),
    margin: hp('5%'),
  },
  spinnerContainer: {
    height: hp('10%'),
    justifyContent: 'center',
    alignItems: 'center',
    margin: hp('8%'),
    backgroundColor: 'transparent',
  }, pickerStyle: {
    fontSize: hp('3%'),
    color: Colors.mainHeader,
    borderRadius: wp('20%'),
    padding: hp('1%'),
    marginHorizontal: wp('1%')
  }
})

const mapStateToProps = ({ SignInReducer }) => {
  return {
    studentFirstName: SignInReducer.studentFirstName,
    studentLastName: SignInReducer.studentLastName,
  }
}

export default connect(mapStateToProps, { Credential })(UserSignup)

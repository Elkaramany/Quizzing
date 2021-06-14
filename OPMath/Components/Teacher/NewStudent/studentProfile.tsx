import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native'
import { connect } from 'react-redux'
import { StackNavigationProp } from '@react-navigation/stack'
import { TextInput, HelperText } from 'react-native-paper';
import { Colors, textInputTheme, GlobalStyles, isTablet, WIDTH } from '../../Constants';
import {
    studentCredential
} from '../../../Redux/actions';
import {
    nameLength, validateEmail, validatePassword, validateAge, validateConfirm, validatestudentGrade
    , validatestudentSchool, validatestudentSex
} from '../../Validators';
import HeaderArrow from '../../common/HeaderArrow';
import Spinner from '../../common/Spinner';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface Cred {
    prop: string,
    value: string
}

interface Props {
    navigation: StackNavigationProp<any, any>,
    AddNewStudent: (studentFirstName: string, studentLastName: string, studentGrade: string, studentSchool: string,
        studentAge: string, studentSex: string, studentEmail: string, studentPassword: string) => void,
    addStudentLoading: boolean,
    studentFirstName: string, studentLastName: string, studentGrade: string, studentSchool: string,
    studentAge: string, studentSex: string, studentEmail: string, studentPassword: string, Confirm: string,
    studentCredential: (details: Cred) => void,
}

const NewStudent: React.FC<Props> = props => {

    const { studentFirstName, studentLastName, studentGrade, studentSchool, studentAge,
        studentSex, studentEmail, studentPassword, Confirm, studentCredential,
    } = props;

    const validateInfo = () => {
        if (nameLength(studentFirstName) == true || nameLength(studentLastName) == true || validatestudentGrade(studentGrade) == true ||
            validatestudentSchool(studentSchool) == true || validateAge(studentAge) == true || validatestudentSex(studentSex) == true ||
            validateEmail(studentEmail) == true || validatePassword(studentPassword) == true ||
            validateConfirm(Confirm, studentPassword) == true
        ) {
            Alert.alert("Please make sure all form values are valid")
        } else {
            props.navigation.navigate('parentProfile');
        }
    }

    const showButton = () => {
        if (!props.addStudentLoading) {
            return (
                <TouchableOpacity style={GlobalStyles.buttonContainer}
                    onPress={() => validateInfo()}
                >
                    <Text style={GlobalStyles.buttonText}>Next</Text>
                </TouchableOpacity>
            )
        } else {
            return (
                <View style={GlobalStyles.spinnerContainer}>
                    <Spinner size={true} />
                </View>
            )
        }
    }

    const sendMeBack = () => {
        props.navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <HeaderArrow
                HeaderText={'New Student Profile'}
                HeaderStyle={GlobalStyles.headerContainer}
                TextEdited={[GlobalStyles.headerTextStyle, GlobalStyles.bigHeaderStyle, { left: isTablet == true ? WIDTH * 0.35 : WIDTH * 0.2 }]}
                navigateMeBack={() => sendMeBack()}
                iconName={'arrow-left'}
                iconColor={Colors.secondaryHeader}
            />
            <ScrollView style={{ flexGrow: 1 }}
                keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
            >
                <TextInput
                    mode="outlined"
                    multiline={false}
                    style={GlobalStyles.textInputContainer}
                    label="First Name"
                    value={studentFirstName}
                    onChangeText={text => studentCredential({ prop: 'studentFirstName', value: text })}
                    theme={textInputTheme}
                />
                <HelperText style={{ color: Colors.errorColor }} type="error" visible={nameLength(studentFirstName)}>
                    First Name must be at least 2 chars long
                </HelperText>
                <TextInput
                    mode="outlined"
                    multiline={false}
                    style={GlobalStyles.textInputContainer}
                    label="Last Name"
                    value={studentLastName}
                    onChangeText={text => studentCredential({ prop: 'studentLastName', value: text })}
                    theme={textInputTheme}
                />
                <HelperText style={{ color: Colors.errorColor }} type="error" visible={nameLength(studentLastName)}>
                    Last Name must be at least 2 chars long
                </HelperText>
                <TextInput
                    mode="outlined"
                    multiline={false}
                    style={GlobalStyles.textInputContainer}
                    label="Current Grade in School"
                    value={studentGrade}
                    onChangeText={text => studentCredential({ prop: 'studentGrade', value: text })}
                    theme={textInputTheme}
                />
                <HelperText style={{ color: Colors.errorColor }} type="error" visible={validatestudentGrade(studentGrade)}>
                    Current Grade must be at least 1 char long
                </HelperText>
                <TextInput
                    mode="outlined"
                    multiline={false}
                    style={GlobalStyles.textInputContainer}
                    label="Current School"
                    value={studentSchool}
                    onChangeText={text => studentCredential({ prop: 'studentSchool', value: text })}
                    theme={textInputTheme}
                />
                <HelperText style={{ color: Colors.errorColor }} type="error" visible={validatestudentSchool(studentSchool)}>
                    Current School must be at least 4 chars long
                </HelperText>
                <TextInput
                    mode="outlined"
                    multiline={false}
                    style={GlobalStyles.textInputContainer}
                    label="Age"
                    value={studentAge}
                    onChangeText={text => studentCredential({ prop: 'studentAge', value: text })}
                    theme={textInputTheme}
                />
                <HelperText style={{ color: Colors.errorColor }} type="error" visible={validateAge(studentAge)}>
                    Age must be a positive number less than 20
                </HelperText>
                <TextInput
                    mode="outlined"
                    multiline={false}
                    style={GlobalStyles.textInputContainer}
                    label="Sex"
                    value={studentSex}
                    onChangeText={text => studentCredential({ prop: 'studentSex', value: text })}
                    theme={textInputTheme}
                />
                <HelperText style={{ color: Colors.errorColor }} type="error" visible={validatestudentSex(studentSex)}>
                    Sex must be at least 1 char long
                </HelperText>
                <View style={{ marginVertical: hp('4%') }}></View>
                <TextInput
                    right={<TextInput.Icon name='account' color={Colors.mainForeGround} />}
                    mode='outlined'
                    multiline={false}
                    style={GlobalStyles.textInputContainer}
                    label='Email'
                    value={studentEmail}
                    onChangeText={text => studentCredential({ prop: 'studentEmail', value: text })}
                    theme={textInputTheme}
                />
                <HelperText style={{ color: Colors.errorColor }} type="error" visible={validateEmail(studentEmail)}>
                    Invalid Email format
                </HelperText>
                <TextInput
                    right={<TextInput.Icon name='lock' color={Colors.mainForeGround} />}
                    mode='outlined'
                    multiline={false}
                    style={GlobalStyles.textInputContainer}
                    label='Password'
                    secureTextEntry={true}
                    value={studentPassword}
                    onChangeText={text => studentCredential({ prop: 'studentPassword', value: text })}
                    theme={textInputTheme}
                />
                <HelperText style={{ color: Colors.errorColor }} type="error" visible={validatePassword(studentPassword)}>
                    Password must be at least 6 chars long that contains at least one digit, an uppercase and a lowercase letter
                </HelperText>
                <TextInput
                    right={<TextInput.Icon name='lock' color={Colors.mainForeGround} />}
                    mode='outlined'
                    multiline={false}
                    style={GlobalStyles.textInputContainer}
                    label='Re-type Password'
                    secureTextEntry={true}
                    value={Confirm}
                    onChangeText={text => studentCredential({ prop: 'Confirm', value: text })}
                    theme={textInputTheme}
                />
                <HelperText style={{ color: Colors.errorColor }} type="error" visible={validateConfirm(Confirm, studentPassword)}>
                    Password don't match
                </HelperText>
                {showButton()}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.mainBackground,
        padding: hp('2%'),
    }, headerStyle: {
        fontSize: hp('4%'),
        fontWeight: '500',
        color: Colors.secondaryHeader
    },
})

const mapStateToProps = ({ TeacherReducer }) => {
    return {
        addStudentLoading: TeacherReducer.addStudentLoading,
        studentFirstName: TeacherReducer.studentFirstName,
        studentLastName: TeacherReducer.studentLastName,
        studentGrade: TeacherReducer.studentGrade,
        studentSchool: TeacherReducer.studentSchool,
        studentAge: TeacherReducer.studentAge,
        studentSex: TeacherReducer.studentSex,
        studentEmail: TeacherReducer.studentEmail,
        studentPassword: TeacherReducer.studentPassword,
        Confirm: TeacherReducer.Confirm,
    }
}


export default connect(mapStateToProps, {
    studentCredential
})(NewStudent);
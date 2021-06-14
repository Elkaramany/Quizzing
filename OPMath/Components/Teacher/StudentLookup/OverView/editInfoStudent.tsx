import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Platform, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux'
import { TextInput, HelperText } from 'react-native-paper';
import HeaderArrow from '../../../common/HeaderArrow'
import { GlobalStyles, Colors, WIDTH, textInputTheme } from '../../../Constants';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StackNavigationProp, } from '@react-navigation/stack'
import { changeStudentInfo } from '../../../../Redux/actions'
import StudentCreds from '../StudentInterface'
import {
    nameLength, validateEmail, validatePassword, validateAge, validatestudentGrade
    , validatestudentSchool, validatestudentSex, validatePhone, validateAddress
} from '../../../Validators';

import Spinner from '../../../common/Spinner'

interface Props {
    navigation: StackNavigationProp<any, any>,
    route: any
    editLoader: boolean
    changeStudentInfo: (student: StudentCreds) => void
}

const editInfoStudent: React.FC<Props> = props => {
    const { student } = props.route.params;

    //Setting states for the forms to use and edit from
    const [studentFirstName, setStudentFirstName] = useState(student.studentFirstName)
    const [studentLastName, setStudentLastName] = useState(student.studentLastName)
    const [studentGrade, setStudentGrade] = useState(student.studentGrade)
    const [studentSchool, setStudentSchool] = useState(student.studentSchool)
    const [studentAge, setStudentAge] = useState(student.studentAge)
    const [studentSex, setStudentSex] = useState(student.studentSex)
    const [studentEmail, setStudentEmail] = useState(student.studentEmail)
    const [studentPassword, setStudentPassword] = useState(student.studentPassword)
    const [parent1Name, setParent1Name] = useState(student.parent1Name)
    const [parent1Phone, setParen1Phone] = useState(student.parent1Phone)
    const [parent1Email, setParent1Email] = useState(student.parent1Email)
    const [parent1Address, setParen1Address] = useState(student.parent1Address)
    const [parent2Name, setParent2Name] = useState(student.parent2Name)
    const [parent2Phone, setParent2Phone] = useState(student.parent2Phone)
    const [parent2Email, setParent2Email] = useState(student.parent2Email)
    const [parent2Address, setParen2Address] = useState(student.parent2Address)
    const [healthNotes, setHealthNothes] = useState(student.healthNotes)
    const [otherNotes, setOtherNotes] = useState(student.otherNotes)
    const [studentUID, setStudentUID] = useState(student.studentUID)
    const [closed, setClosed] = useState(student.closed)


    const sendMeBack = () => {
        props.navigation.goBack();
    }

    const validateInfo = () => {
        if (nameLength(studentFirstName) == true || nameLength(studentLastName) == true || validatestudentGrade(studentGrade) == true ||
            validatestudentSchool(studentSchool) == true || validateAge(studentAge) == true || validatestudentSex(studentSex) == true ||
            validateEmail(studentEmail) == true || validatePassword(studentPassword) == true || validateEmail(parent1Email) == true || nameLength(parent1Name) == true ||
            validateAddress(parent1Address) == true || validatePhone(parent1Phone) == true
        ) {
            Alert.alert("Please make sure all form values are valid")
        } else {
            let std = {
                studentFirstName,
                studentLastName,
                studentGrade,
                studentSchool,
                studentAge,
                studentSex,
                studentEmail,
                studentPassword,
                //Parent credentials
                parent1Name,
                parent1Phone,
                parent1Email,
                parent1Address,
                parent2Name,
                parent2Phone,
                parent2Email,
                parent2Address,
                healthNotes,
                otherNotes,
                studentUID,
                closed,
                activeAssignments: student.activeAssignments,
                finishedAssignments: student.finishedAssignments,
            }
            props.changeStudentInfo(std);
        }
    }

    const showButton = () => {
        if (!props.editLoader) {
            return (
                <View style={{ backgroundColor: 'transparent' }}>
                    <TouchableOpacity style={[GlobalStyles.buttonContainer, { backgroundColor: Colors.grayBackGround }]}
                        onPress={() => validateInfo()}
                    >
                        <Text style={GlobalStyles.buttonText}>Save Info</Text>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View style={GlobalStyles.spinnerContainer}>
                    <Spinner size={true} />
                </View>
            )
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: Colors.mainBackground }}>
            <HeaderArrow
                HeaderText={'Edit Student Info'}
                HeaderStyle={GlobalStyles.headerContainer}
                TextEdited={[GlobalStyles.headerTextStyle, GlobalStyles.bigHeaderStyle, { left: WIDTH * 0.30 }]}
                navigateMeBack={() => sendMeBack()}
                iconName={'arrow-left'}
                iconColor={Colors.secondaryHeader}
            />
            <ScrollView style={{ flexGrow: 1, marginBottom: hp('4%') }}
                keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
            >
                <Text style={[GlobalStyles.smallText, { marginBottom: hp('1%') }]}>Student Data: </Text>
                <TextInput
                    mode="outlined"
                    multiline={false}
                    style={GlobalStyles.textInputContainer}
                    label="First Name"
                    value={studentFirstName}
                    onChangeText={text => setStudentFirstName(text)}
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
                    onChangeText={text => setStudentLastName(text)}
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
                    onChangeText={text => setStudentGrade(text)}
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
                    onChangeText={text => setStudentSchool(text)}
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
                    onChangeText={text => setStudentAge(text)}
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
                    onChangeText={text => setStudentSex(text)}
                    theme={textInputTheme}
                />
                <HelperText style={{ color: Colors.errorColor }} type="error" visible={validatestudentSex(studentSex)}>
                    Sex must be at least 1 char long
                </HelperText>
                <TextInput
                    right={<TextInput.Icon name='account' color={Colors.mainForeGround} />}
                    mode='outlined'
                    multiline={false}
                    style={GlobalStyles.textInputContainer}
                    label='Email'
                    value={studentEmail}
                    onChangeText={text => setStudentEmail(text)}
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
                    onChangeText={text => setStudentPassword(text)}
                    theme={textInputTheme}
                />
                <HelperText style={{ color: Colors.errorColor }} type="error" visible={validatePassword(studentPassword)}>
                    Password must be at least 6 chars long that contains at least one digit, an uppercase and a lowercase letter
                </HelperText>
                <View style={{ marginVertical: hp('2%') }} />
                <Text style={[GlobalStyles.smallText, { marginBottom: hp('1%') }]}>Parents Data: </Text>
                <TextInput
                    mode="outlined"
                    multiline={false}
                    style={GlobalStyles.textInputContainer}
                    label="Parent Name #1"
                    value={parent1Name}
                    onChangeText={text => setParent1Name(text)}
                    theme={textInputTheme}
                />
                <HelperText style={{ color: Colors.errorColor }} type="error" visible={nameLength(parent1Name)}>
                    Parent 1 Name must be at least 2 chars long
                </HelperText>
                <TextInput
                    mode="outlined"
                    multiline={false}
                    style={GlobalStyles.textInputContainer}
                    label="Parent Phone #1"
                    value={parent1Phone}
                    onChangeText={text => setParen1Phone(text)}
                    theme={textInputTheme}
                />
                <HelperText style={{ color: Colors.errorColor }} type="error" visible={validatePhone(parent1Phone)}>
                    Parent 1 Phone must be at least 8 chars long
                </HelperText>
                <TextInput
                    mode="outlined"
                    multiline={false}
                    style={GlobalStyles.textInputContainer}
                    label="Parent Email #1"
                    value={parent1Email}
                    onChangeText={text => setParent1Email(text)}
                    theme={textInputTheme}
                />
                <HelperText style={{ color: Colors.errorColor }} type="error" visible={validateEmail(parent1Email)}>
                    Invalid Email format
                </HelperText>
                <TextInput
                    mode="outlined"
                    multiline={false}
                    style={GlobalStyles.textInputContainer}
                    label="Parent Address #1"
                    value={parent1Address}
                    onChangeText={text => setParen1Address(text)}
                    theme={textInputTheme}
                />
                <HelperText style={{ color: Colors.errorColor }} type="error" visible={validateAddress(parent1Address)}>
                    Parent 1 Address must be at least 6 chars long
                </HelperText>
                <TextInput
                    mode="outlined"
                    multiline={false}
                    style={GlobalStyles.textInputContainer}
                    label="Parent Name #2 (optional)"
                    value={parent2Name}
                    onChangeText={text => setParent2Name(text)}
                    theme={textInputTheme}
                />
                <TextInput
                    mode="outlined"
                    multiline={false}
                    style={GlobalStyles.textInputContainer}
                    label="Parent Phone #2 (optional)"
                    value={parent2Phone}
                    onChangeText={text => setParent2Phone(text)}
                    theme={textInputTheme}
                />
                <TextInput
                    right={<TextInput.Icon name='account' color={Colors.mainForeGround} />}
                    mode='outlined'
                    multiline={false}
                    style={GlobalStyles.textInputContainer}
                    label='Parent Email #2 (optional)'
                    value={parent2Email}
                    onChangeText={text => setParent2Email(text)}
                    theme={textInputTheme}
                />
                <TextInput
                    right={<TextInput.Icon name='lock' color={Colors.mainForeGround} />}
                    mode='outlined'
                    multiline={false}
                    style={GlobalStyles.textInputContainer}
                    label='Parent Address #2 (optional)'
                    value={parent2Address}
                    onChangeText={text => setParen2Address(text)}
                    theme={textInputTheme}
                />
                <View style={{ marginVertical: hp('4%') }}></View>
                <TextInput
                    mode='outlined'
                    multiline={true}
                    style={GlobalStyles.textInputContainer}
                    label='Health/Medication Notes (optional)'
                    value={healthNotes}
                    onChangeText={text => setHealthNothes(text)}
                    theme={textInputTheme}
                />
                <TextInput
                    mode='outlined'
                    multiline={true}
                    style={GlobalStyles.textInputContainer}
                    label='Other Notes (optional)'
                    value={otherNotes}
                    onChangeText={text => setOtherNotes(text)}
                    theme={textInputTheme}
                />
            </ScrollView>
            {showButton()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
})

const mapStateToProps = ({ TeacherReducer }) => {
    return {
        editLoader: TeacherReducer.editLoader
    }
}

export default connect(mapStateToProps, { changeStudentInfo })(editInfoStudent);
import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native'
import { connect } from 'react-redux'
import { StackNavigationProp } from '@react-navigation/stack'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { TextInput, HelperText } from 'react-native-paper';
import { Colors, textInputTheme, GlobalStyles, isTablet, WIDTH } from '../../Constants';
import { AddNewStudent, studentCredential } from '../../../Redux/actions';
import Header from '../../common/Header';
import Spinner from '../../common/Spinner';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {nameLength, validateEmail, validatePhone, validateAddress} from '../../Validators';

interface Cred {
    prop: string,
    value: string
}

interface Props {
    navigation: StackNavigationProp<any, any>,
    AddNewStudent: (studentFirstName: string, studentLastName: string, studentGrade: string, studentSchool: string,
        studentAge: string, studentSex: string, studentEmail: string, studentPassword: string,
        parent1Name: string,
        parent1Phone: string,
        parent1Email: string,
        parent1Address: string,
        parent2Name: string,
        parent2Phone: string,
        parent2Email: string,
        parent2Address: string,
        healthNotes: string,
        otherNotes: string,
    ) => void,
    addStudentLoading: boolean,
    studentFirstName: string, studentLastName: string, studentGrade: string, studentSchool: string,
    studentAge: string, studentSex: string, studentEmail: string, studentPassword: string, Confirm: string,
    studentCredential: (details: Cred) => void,
    parent1Name: string,
    parent1Phone: string,
    parent1Email: string,
    parent1Address: string,
    parent2Name: string,
    parent2Phone: string,
    parent2Email: string,
    parent2Address: string,
    healthNotes: string,
    otherNotes: string,
}

const NewParent: React.FC<Props> = props => {

    const { studentFirstName, studentLastName, studentGrade, studentSchool, studentAge, studentSex, studentEmail, studentPassword, studentCredential,
        parent1Name, parent2Name, parent1Email, parent2Email, parent1Phone, parent1Address, parent2Address, parent2Phone,
        otherNotes, healthNotes
    } = props;
    

    const validateInfo = () => {
        if (validateEmail(parent1Email) == true || nameLength(parent1Name) == true || 
        validateAddress(parent1Address) == true || validatePhone(parent1Phone) == true
        ) {
            Alert.alert("Please make sure all form values are valid")
        } else {
            props.AddNewStudent(studentFirstName, studentLastName, studentGrade, studentSchool, studentAge, studentSex, studentEmail, studentPassword, parent1Name,
                parent1Phone, parent1Email, parent1Address, parent2Name, parent2Phone, parent2Email, parent2Address,
                healthNotes, otherNotes
            )
        }
    }

    const showButton = () => {
        if (!props.addStudentLoading) {
            return (
                <TouchableOpacity style={GlobalStyles.buttonContainer}
                    onPress={() => validateInfo()}
                >
                    <Text style={[GlobalStyles.buttonText, {textAlign: 'center'}]}>Add New Student</Text>
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

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row',  alignItems: 'center' }}>
                <Ionicons name={'arrow-back'} color={Colors.secondaryHeader} size={30}
                    onPress={() => props.navigation.goBack()}
                />
                <Header HeaderText={'New Student Profile'} HeaderStyle={{ backgroundColor: 'transparent' }}
                    TextStyle={[GlobalStyles.headerTextStyle, styles.headerStyle, {left: isTablet == true ? WIDTH * 0.27: WIDTH * 0.08}]} />
            </View>
            <ScrollView style={{ flexGrow: 1 }}
                keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
            >
                <TextInput
                    mode="outlined"
                    multiline={false}
                    style={GlobalStyles.textInputContainer}
                    label="Parent Name #1"
                    value={parent1Name}
                    onChangeText={text => studentCredential({ prop: 'parent1Name', value: text })}
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
                    onChangeText={text => studentCredential({ prop: 'parent1Phone', value: text })}
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
                    onChangeText={text => studentCredential({ prop: 'parent1Email', value: text })}
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
                    onChangeText={text => studentCredential({ prop: 'parent1Address', value: text })}
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
                    onChangeText={text => studentCredential({ prop: 'parent2Name', value: text })}
                    theme={textInputTheme}
                />
                <TextInput
                    mode="outlined"
                    multiline={false}
                    style={GlobalStyles.textInputContainer}
                    label="Parent Phone #2 (optional)"
                    value={parent2Phone}
                    onChangeText={text => studentCredential({ prop: 'parent2Phone', value: text })}
                    theme={textInputTheme}
                />
                <TextInput
                    right={<TextInput.Icon name='account' color={Colors.mainForeGround} />}
                    mode='outlined'
                    multiline={false}
                    style={GlobalStyles.textInputContainer}
                    label='Parent Email #2 (optional)'
                    value={parent2Email}
                    onChangeText={text => studentCredential({ prop: 'parent2Email', value: text })}
                    theme={textInputTheme}
                />
                <TextInput
                    right={<TextInput.Icon name='lock' color={Colors.mainForeGround} />}
                    mode='outlined'
                    multiline={false}
                    style={GlobalStyles.textInputContainer}
                    label='Parent Address #2 (optional)'
                    value={parent2Address}
                    onChangeText={text => studentCredential({ prop: 'parent2Address', value: text })}
                    theme={textInputTheme}
                />
                <View style={{ marginVertical: hp('4%') }}></View>
                <TextInput
                    mode='outlined'
                    multiline={true}
                    style={GlobalStyles.textInputContainer}
                    label='Health/Medication Notes (optional)'
                    value={healthNotes}
                    onChangeText={text => studentCredential({ prop: 'healthNotes', value: text })}
                    theme={textInputTheme}
                />
                <TextInput
                    mode='outlined'
                    multiline={true}
                    style={GlobalStyles.textInputContainer}
                    label='Other Notes (optional)'
                    value={otherNotes}
                    onChangeText={text => studentCredential({ prop: 'otherNotes', value: text })}
                    theme={textInputTheme}
                />
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
        parent1Name: TeacherReducer.parent1Name,
        parent1Phone: TeacherReducer.parent1Phone,
        parent1Email: TeacherReducer.parent1Email,
        parent1Address: TeacherReducer.parent1Address,
        parent2Name: TeacherReducer.parent2Name,
        parent2Phone: TeacherReducer.parent2Phone,
        parent2Email: TeacherReducer.parent2Email,
        parent2Address: TeacherReducer.parent2Address,
        healthNotes: TeacherReducer.healthNotes,
        otherNotes: TeacherReducer.otherNotes,
        studentFirstName: TeacherReducer.studentFirstName,
        studentLastName: TeacherReducer.studentLastName,
        studentGrade: TeacherReducer.studentGrade,
        studentSchool: TeacherReducer.studentSchool,
        studentAge: TeacherReducer.studentAge,
        studentSex: TeacherReducer.studentSex,
        studentEmail: TeacherReducer.studentEmail,
        studentPassword: TeacherReducer.studentPassword,
    }
}


export default connect(mapStateToProps, { AddNewStudent, studentCredential })(NewParent);
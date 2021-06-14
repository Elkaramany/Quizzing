import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, } from 'react-native'
import { connect } from 'react-redux'
import { closeStudentAccount } from '../../../../Redux/actions';
import { GlobalStyles, Colors } from '../../../Constants';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Table, Rows } from 'react-native-table-component';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Spinner from '../../../common/Spinner';
import { useNavigation } from '@react-navigation/native';
import StudentCreds from '../StudentInterface';


interface Props {
    student: StudentCreds
    closeStudentAccount: (student: StudentCreds) => void
    closeStudentButton: boolean,
    closeSwitch: boolean
}

const studentOverview: React.FC<Props> = props => {
    const [loaded, setLoaded] = useState(false)
    const [studentData, setStudentData] = useState<any>([])
    let { student } = props;

    useEffect(() => {
        if (student) {
            setStudentData([
                ['First Name', student.studentFirstName],
                ['Last Name', student.studentLastName],
                ['Current Grade', student.studentGrade],
                ['Current School', student.studentSchool],
                ['Age', student.studentAge],
                ['Sex', student.studentSex],
                ['Student Email1', student.studentEmail],
                ['Student Password', student.studentEmail],
                ['Parent 1 Name', student.parent1Name],
                ['Parent 1 Phone', student.parent1Phone],
                ['Parent 1 Email', student.parent1Email],
                ['Parent 1 Address', student.parent1Address],
                ['Parent 2 Name', student.parent2Name],
                ['Parent 2 Phone', student.parent2Phone],
                ['Parent 2 Email', student.parent2Email],
                ['Parent 2 Address', student.parent2Address],
                ['Health/Medication notes', student.healthNotes],
                ['Other notes', student.otherNotes],
            ])
            setLoaded(true)
        }
    }, [student])


    const displayAccountStatus = () => {
        if (student.closed == false) {
            return <Text style={[GlobalStyles.smallText, { color: Colors.thirdHeader }]}>Open</Text>
        } else {
            return <Text style={[GlobalStyles.smallText, { color: 'red' }]}>Closed</Text>
        }
    }

    const closeAccountText = () => {
        if (!props.closeStudentButton) {
            if (student.closed == false) return <Text style={GlobalStyles.smallText}>Close Account</Text>
            else return <Text style={GlobalStyles.smallText}>Open Account</Text>
        }
    }

    const showCloseButton = () => {
        if (!props.closeStudentButton) {
            return (
                <TouchableOpacity style={[styles.buttonContainer, { borderColor: student.closed == false ? Colors.thirdHeader : 'red' }]}
                    onPress={() => props.closeStudentAccount(student)}
                >
                    {closeAccountText()}
                </TouchableOpacity>
            )
        } else return <Spinner size={true} spinnerColor={student.closed == true ? Colors.thirdHeader : 'red'} />
    }

    if (!loaded) {
        return (
            <View style={GlobalStyles.mainContainer}>
                <Spinner size={false} />
            </View>
        )
    } else {
        const navigation = useNavigation();
        return (
            <View style={{ flex: 1, marginHorizontal: wp('1%'), borderRadius: wp('5%') }}>
                <ScrollView style={{ flexGrow: 1, backgroundColor: Colors.grayBackGround }}>
                    <Table style={{ borderColor: Colors.secondaryHeader }} borderStyle={{ borderWidth: 1, borderColor: Colors.secondaryHeader }}>
                        <Rows data={studentData} flexArr={[1.5, 2]} style={styles.row} textStyle={[GlobalStyles.smallText, { textAlign: 'center' }]} />
                    </Table>
                </ScrollView>
                <View style={styles.bottomContainer}>
                    <Text style={GlobalStyles.smallText}>Account Status: </Text>
                    {displayAccountStatus()}
                </View>
                <View style={styles.bottomContainer}>
                    <TouchableOpacity style={[styles.buttonContainer, { borderColor: Colors.mainHeader }]}
                        onPress={() => navigation.navigate('editInfoStudent', {
                            student
                        })}
                    >
                        <Text style={GlobalStyles.smallText}>Edit Info</Text>
                    </TouchableOpacity>
                    {showCloseButton()}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: { flex: 1, backgroundColor: '#f6f8fa' },
    row: {
        height: hp('10%')
    }, bottomContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: hp('1.5%'),
        flexDirection: 'row'
    }, buttonContainer: {
        borderColor: Colors.thirdHeader,
        borderWidth: wp('0.5%'),
        borderRadius: wp('5%'),
        padding: hp('1.5%'),
        marginHorizontal: wp('7%')
    }
})

const mapStateToProps = ({ TeacherReducer }) => {
    return {
        closeStudentButton: TeacherReducer.closeStudentButton,
        closeSwitch: TeacherReducer.closeSwitch
    }
}

export default connect(mapStateToProps, { closeStudentAccount })(studentOverview);
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';
const shuffle = require('shuffle-array')


export const fetchStudentData = (uid, navigation, Credential,) => async (dispatch) => {
    const sub = firestore()
        .collection('Students')
        .doc(uid)
        .onSnapshot(doc => {
            if (doc && doc.data() != undefined) {
                if (doc.data()?.closed == true) {
                    navigation.navigate('ClosedStudent', {
                        CPText: 'This is account has been closed by a teacher',
                    })
                } else {
                    Credential({ prop: 'firstName', value: doc.data()?.studentFirstName })
                    Credential({ prop: 'lastName', value: doc.data()?.studentLastName })
                    Credential({ prop: 'teacher', value: doc.data()?.teacher })
                    Credential({ prop: 'activeAssignments', value: doc.data()?.activeAssignments })
                    Credential({ prop: 'fullInfo', value: doc.data() })
                    if (doc.data()?.teacher === true) {
                        navigation.navigate('ClosedStudent', {
                            CPText: 'This is a teacher account not a student account.'
                        })
                    } else {
                        navigation.navigate('StudentNavigator')
                    }
                }
            }
        })
}

export const fetchAllQuestions = () => async (dispatch) => {
    const levels: any = [];
    dispatch({ type: 'fetch_questions_start' })
    const events = await firestore().collection('Questions')
    events.get().then((level) => {
        //Shuffle randomizes the order of the questions using the Fisher-Yates algorithm.
        level.forEach((lev) => {
            if (lev.data().Level1Arr != undefined) {
                levels[0] = shuffle(lev.data().Level1Arr);
            }
            if (lev.data().Level2Arr != undefined) {
                levels[1] = shuffle(lev.data().Level2Arr);
            }
            if (lev.data().Level3Arr != undefined) {
                levels[2] = shuffle(lev.data().Level3Arr)
            }
            if (lev.data().Level4Arr != undefined) {
                levels[3] = shuffle(lev.data().Level4Arr)
            }
            if (lev.data().Level5Arr != undefined) {
                levels[4] = shuffle(lev.data().Level5Arr)
            }
        });
        dispatch({ type: 'assign_Questions', payload: levels })
    }).catch((e) => {
        console.error(e)
        Alert.alert("Error fetching the questions, Please reload the app.")
        dispatch({ type: 'fetch_questions_end' })
    })
}

const getCurrentDate = (separator = '/') => {

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    return `${month < 10 ? `0${month}` : `${month}`}${separator}${date}${separator}${year}`
}

export const submitAnswerToDB = (testScore, Test, Student, testTime, testAnsweringInfo) => async (dispatch) => {
    let arr = Student.activeAssignments.slice(1);
    dispatch({ type: 'submit_test_start' })
    await firestore().collection('Students').doc(Student.studentUID).set({
        studentFirstName: Student.studentFirstName,
        studentLastName: Student.studentLastName,
        studentGrade: Student.studentGrade,
        studentSchool: Student.studentSchool,
        studentAge: Student.studentAge,
        studentSex: Student.studentSex,
        studentEmail: Student.studentEmail,
        studentPassword: Student.studentPassword,
        parent1Name: Student.parent1Name,
        parent1Phone: Student.parent1Phone,
        parent1Email: Student.parent1Email,
        parent1Address: Student.parent1Address,
        parent2Name: Student.parent2Name,
        parent2Phone: Student.parent2Phone,
        parent2Email: Student.parent2Email,
        parent2Address: Student.parent2Address,
        healthNotes: Student.healthNotes,
        otherNotes: Student.otherNotes,
        studentUID: Student.studentUID,
        closed: Student.closed,
        activeAssignments: arr,
        finishedAssignments: [...Student.finishedAssignments, { testScore, Test, testTime, testDate: getCurrentDate(), testAnsweringInfo, }],
    }).then(() => {
        dispatch({ type: 'submit_test_success' })
    }).catch(() => {
        Alert.alert('Error submitting test')
        dispatch({ type: 'submit_test_end' })
    })
}
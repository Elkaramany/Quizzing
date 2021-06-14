import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';
import StudentCreds from '../../Components/Teacher/StudentLookup/StudentInterface';
import { event } from 'react-native-reanimated';
import StudentInterface from '../../Components/Teacher/StudentLookup/StudentInterface';

export const studentCredential = ({ prop, value }) => {
    return {
        type: 'Student_Credential_In',
        payload: { prop, value }
    }
}


//This just takes all the forms values from studentProfile and parentProfile and submits them to firebase
export const AddNewStudent = (studentFirstName: string, studentLastName: string, studentGrade: string, studentSchool: string,
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
    otherNotes: string,) => async (dispatch) => {
        dispatch({ type: 'add_student_started' })
        auth().createUserWithEmailAndPassword(studentEmail, studentPassword).then(user => {
            firestore().collection('userInfo').doc(user.user.uid).set({
                studentFirstName: studentFirstName,
                studentLastName: studentLastName,
                teacher: false,
            })

            firestore().collection('Students').doc(user.user.uid).set({
                studentFirstName,
                studentLastName,
                studentGrade,
                studentSchool,
                studentAge,
                studentSex,
                studentEmail,
                studentPassword,
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
                studentUID: user.user.uid,
                closed: false,
                teacher: false,
                activeAssignments: [],
                finishedAssignments: [],
            }).then(() => {
                Alert.alert("Added New Student")
                dispatch({ type: 'add_student_end' })
            }).catch((e) => {
                console.error(e)
                Alert.alert("Error Adding the student")
                dispatch({ type: 'add_student_end' })
            })
        }).catch(() => {
            Alert.alert("Error Adding the student")
            dispatch({ type: 'add_student_end' })
        })
    }

export const fetchAllStudents = () => async (dispatch) => {
    dispatch({ type: 'fetch_students_started' })
    //Real time firebase changes to check on the user's status as it changes
    let result: any[] = []
    const events = await firestore().collection('Students')
    events.onSnapshot((querySnapshot) => {
        try {
            result = []
            querySnapshot.forEach((doc) => {
                result.push({ ...doc.data() })
            });
            dispatch({ type: 'fetch_students_success', payload: result })
        } catch {
            Alert.alert("Error loading students")
            dispatch({ type: 'fetch_students_fail' })
        }
    })
}

export const closeStudentAccount = (student: StudentCreds) => async (dispatch) => {
    dispatch({ type: 'close_student_started' })
    firestore().collection('Students').doc(student.studentUID).set({
        studentFirstName: student.studentFirstName,
        studentLastName: student.studentLastName,
        studentGrade: student.studentGrade,
        studentSchool: student.studentSchool,
        studentAge: student.studentAge,
        studentSex: student.studentSex,
        studentEmail: student.studentEmail,
        studentPassword: student.studentPassword,
        parent1Name: student.parent1Name,
        parent1Phone: student.parent1Phone,
        parent1Email: student.parent1Email,
        parent1Address: student.parent1Address,
        parent2Name: student.parent2Name,
        parent2Phone: student.parent2Phone,
        parent2Email: student.parent2Email,
        parent2Address: student.parent2Address,
        healthNotes: student.healthNotes,
        otherNotes: student.otherNotes,
        studentUID: student.studentUID,
        closed: !student.closed,
        activeAssignments: student.activeAssignments,
        finishedAssignments: student.finishedAssignments

    }).then(() => {
        if (student.closed == false) {
            Alert.alert(student.studentFirstName + ' ' + student.studentLastName + "'s account is now Closed")
            dispatch({ type: 'close_student_end' })
        } else {
            Alert.alert(student.studentFirstName + ' ' + student.studentLastName + "'s account is now Opened")
            dispatch({ type: 'close_student_end' })
        }
    }).catch(() => {
        Alert.alert("Error Occured while contacting the servers")
        dispatch({ type: 'close_student_end' })
    })
}

export const changeStudentInfo = (student: StudentCreds) => async (dispatch) => {
    dispatch({ type: 'edit_student_start' })
    firestore().collection('Students').doc(student.studentUID).set({
        studentFirstName: student.studentFirstName,
        studentLastName: student.studentLastName,
        studentGrade: student.studentGrade,
        studentSchool: student.studentSchool,
        studentAge: student.studentAge,
        studentSex: student.studentSex,
        studentEmail: student.studentEmail,
        studentPassword: student.studentPassword,
        parent1Name: student.parent1Name,
        parent1Phone: student.parent1Phone,
        parent1Email: student.parent1Email,
        parent1Address: student.parent1Address,
        parent2Name: student.parent2Name,
        parent2Phone: student.parent2Phone,
        parent2Email: student.parent2Email,
        parent2Address: student.parent2Address,
        healthNotes: student.healthNotes,
        otherNotes: student.otherNotes,
        studentUID: student.studentUID,
        teacher: false,
        closed: student.closed,
        activeAssignments: student.activeAssignments,
        finishedAssignments: student.finishedAssignments
    }).then(() => {
        Alert.alert("Student Info Updated successfully")
        dispatch({ type: 'edit_student_end' })
    }).catch(() => {
        Alert.alert("Error Updating student info")
        dispatch({ type: 'edit_student_end' })
    })
}

export const fetchAllQuestions = () => async (dispatch) => {
    const levels: any = [];
    dispatch({ type: 'fetch_questions_start' })
    const events = await firestore().collection('Questions')
    events.get().then((level) => {
        level.forEach((lev) => {
            if (lev.data().Level1Arr != undefined) {
                levels[0] = lev.data().Level1Arr;
            }
            if (lev.data().Level2Arr != undefined) {
                levels[1] = lev.data().Level2Arr
            }
            if (lev.data().Level3Arr != undefined) {
                levels[2] = lev.data().Level3Arr;
            }
            if (lev.data().Level4Arr != undefined) {
                levels[3] = lev.data().Level4Arr
            }
            if (lev.data().Level5Arr != undefined) {
                levels[4] = lev.data().Level5Arr
            }
        });
        dispatch({ type: 'assign_Questions', payload: levels })
    }).catch((e) => {
        console.error(e)
        Alert.alert("Error fetching the questions, Please reload the app.")
        dispatch({ type: 'fetch_questions_end' })
    })
}

interface QuestionInterface {
    Level: string,
    subLevel: string,
    numQuestions: number,
    graded: boolean,
}

export const AddQuestionsToDB = (newQuestions: QuestionInterface[], student: StudentInterface,
    time: number, packet: string, totalNumber: number

) => async (dispatch) => {
    dispatch({ type: 'add_questions_start' })
    firestore().collection('Students').doc(student.studentUID).set({
        studentFirstName: student.studentFirstName,
        studentLastName: student.studentLastName,
        studentGrade: student.studentGrade,
        studentSchool: student.studentSchool,
        studentAge: student.studentAge,
        studentSex: student.studentSex,
        studentEmail: student.studentEmail,
        studentPassword: student.studentPassword,
        parent1Name: student.parent1Name,
        parent1Phone: student.parent1Phone,
        parent1Email: student.parent1Email,
        parent1Address: student.parent1Address,
        parent2Name: student.parent2Name,
        parent2Phone: student.parent2Phone,
        parent2Email: student.parent2Email,
        parent2Address: student.parent2Address,
        healthNotes: student.healthNotes,
        otherNotes: student.otherNotes,
        studentUID: student.studentUID,
        closed: student.closed,
        teacher: false,
        activeAssignments: [...student.activeAssignments, { time, packet, totalNumber, Questions: newQuestions }],
        finishedAssignments: student.finishedAssignments
    }).then(() => {
        Alert.alert("Added questions successfully")
        dispatch({ type: 'add_questions_end' })
    }).catch(() => {
        Alert.alert("Error adding questions")
        dispatch({ type: 'add_questions_end' })
    })
}

export const deleteOnePacket = (index: number, student: StudentInterface) => async (dispatch) => {
    let extra: any[] = []
    for (let i = 0; i < student.activeAssignments.length; i++) {
        if (i !== index) {
            extra.push(student.activeAssignments[i])
        }
    }
    dispatch({ type: 'delete_packet_start' })
    firestore().collection('Students').doc(student.studentUID).set({
        studentFirstName: student.studentFirstName,
        studentLastName: student.studentLastName,
        studentGrade: student.studentGrade,
        studentSchool: student.studentSchool,
        studentAge: student.studentAge,
        studentSex: student.studentSex,
        studentEmail: student.studentEmail,
        studentPassword: student.studentPassword,
        parent1Name: student.parent1Name,
        parent1Phone: student.parent1Phone,
        parent1Email: student.parent1Email,
        parent1Address: student.parent1Address,
        parent2Name: student.parent2Name,
        parent2Phone: student.parent2Phone,
        parent2Email: student.parent2Email,
        parent2Address: student.parent2Address,
        healthNotes: student.healthNotes,
        otherNotes: student.otherNotes,
        studentUID: student.studentUID,
        closed: student.closed,
        teacher: false,
        activeAssignments: extra,
        finishedAssignments: student.finishedAssignments
    }).then(() => {
        Alert.alert("Removed assigned task")
        dispatch({ type: 'delete_packet_end' })
    }).catch(() => {
        Alert.alert("Error removing task")
        dispatch({ type: 'delete_packet_end' })
    })
}
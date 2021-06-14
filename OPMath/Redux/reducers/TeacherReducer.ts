interface Props {
    //Student credentials
    studentFirstName: string,
    studentLastName: string,
    studentGrade: string,
    studentSchool: string,
    studentAge: string,
    studentSex: string,
    studentEmail: string,
    studentPassword: string,
    Confirm: string,
    addStudentLoading: boolean,
    //Parent credentials
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
    //Students arr
    studentsLoaded: false,
    allStudents: any[],
    closeStudentButton: boolean,
    closeSwitch: boolean,
    editLoader: boolean
}

const INITIAL_STATE: Props = {
    studentFirstName: '',
    studentLastName: '',
    studentGrade: '',
    studentSchool: '',
    studentAge: '',
    studentSex: '',
    studentEmail: '',
    studentPassword: '',
    Confirm: '',
    parent1Name: '',
    parent1Phone: '',
    parent1Email: '',
    parent1Address: '',
    parent2Name: '',
    parent2Phone: '',
    parent2Email: '',
    parent2Address: '',
    healthNotes: '',
    otherNotes: '',
    addStudentLoading: false,
    studentsLoaded: false,
    allStudents: [],
    closeStudentButton: false,
    closeSwitch: false,
    editLoader: false,
}

export default (state = { INITIAL_STATE }, action) => {
    switch (action.type) {
        case ('fetch_students_success'):
            return { ...state, allStudents: action.payload, studentsLoaded: true }
        case ('fetch_students_fail'):
            return { ...state, studentsLoaded: true }
        case ('fetch_students_started'):
            return { ...state, studentsLoaded: false }
        case ('Student_Credential_In'):
            return { ...state, [action.payload.prop]: action.payload.value }
        case ('add_student_started'):
            return { ...state, addStudentLoading: true }
        case ('add_student_end'):
            return { ...state, ...INITIAL_STATE }
        case ('sign_me_out_success'):
            return { ...state, ...INITIAL_STATE }
        case ('close_student_started'):
            return { ...state, closeStudentButton: true, closeSwitch: action.payload }
        case ('close_student_end'):
            return { ...state, closeStudentButton: false, closeSwitch: action.payload }
        case ('edit_student_end'):
            return { ...state, editLoader: false }
        case ('edit_student_start'):
            return { ...state, editLoader: true }
        default:
            return state;
    }
}

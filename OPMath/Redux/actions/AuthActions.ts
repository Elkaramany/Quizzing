import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


export const Credential = ({ prop, value }) => {
    return {
        type: 'Credential_In',
        payload: { prop, value }
    }
}

export const TryLogin = (email: string, password: string) => {
    return (dispatch) => {
        dispatch({ type: 'login_started' })
        auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
                dispatch({ type: 'login_success', payload: user })
            }).catch((e) => {
                console.log(e)
                dispatch({ type: 'login_failed' })
            })
    }
}

export const createAccountUser = (email: string, password: string, studentFirstName: string, studentLastName: string) => {
    return (dispatch) => {
        dispatch({ type: 'login_started' })
        auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {
                firestore()
                    .collection('userInfo').doc(user.user.uid)
                    .set({
                        studentFirstName,
                        studentLastName,
                        teacher: true,
                    }).then(() => {
                        dispatch({ type: 'create_account_success', payload: 'Account created successfully, Please login' })
                    }).catch(() => {
                        dispatch({ type: 'create_account_fail', payload: 'Failed to create account with those credentials, Please try again with different ones' })
                    })

                firestore()
                    .collection('Teachers').doc(user.user.uid)
                    .set({
                        studentFirstName,
                        studentLastName,
                    })
            }).catch(() => {
                dispatch({ type: 'create_account_fail', payload: 'Failed to create account with those credentials, Please try again with different ones' })
            })
    }
}

export const signMeOut = () => {
    return (dispatch) => {
        auth().signOut().then(() => {
            dispatch({ type: 'sign_me_out_success' })
        }).catch(() => {
            dispatch({ type: 'sign_me_out_fail', payload: 'Sign Out Failed' })
        })
    }
}


export const EditUserInfo = (uid: number, studentFirstName: string, studentLastName: string) => {
    return (dispatch) => {
        dispatch({ type: 'edit_start' })
        firestore()
            .collection('userInfo').doc(uid.toString())
            .set({
                studentFirstName,
                studentLastName,
            }).then(() => {
                dispatch({ type: 'edit_success', payload: 'Changes saved' })
            }).catch(() => {
                dispatch({ type: 'edit_fail', payload: 'Error saving changes' })
            })
    }
}


export const resetErrorMessage = () => {
    return (dispatch) => {
        dispatch({ type: 'edit_out', payload: '' });
    }
}
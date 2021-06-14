import auth from '@react-native-firebase/auth';


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
                dispatch({ type: 'login_failed' })
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


export const resetErrorMessage = () => {
    return (dispatch) => {
        dispatch({ type: 'edit_out', payload: '' });
    }
}
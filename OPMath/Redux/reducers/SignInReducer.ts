interface Props {
  email: string
  password: string
  firstName: string
  lastName: string
  teacher: boolean | null
  uid: null | number
  user: object | null
  errorMessage: string
  loading: boolean
  editLoading: boolean
}

const INITIAL_STATE: Props = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  teacher: null,
  uid: null,
  user: null,
  errorMessage: '',
  loading: false,
  editLoading: false,
}

export default (state = { INITIAL_STATE }, action) => {
  switch (action.type) {
    case ('Credential_In'):
      return { ...state, [action.payload.prop]: action.payload.value }
    case ('login_success'):
      return { ...state, ...INITIAL_STATE, user: action.payload }
    case ('login_failed'):
      return {
        ...state,
        ...INITIAL_STATE,
        errorMessage: 'Email or password is incorrect',
      }
    case ('create_account_success' || 'create_account_fail'):
      return { ...state, ...INITIAL_STATE, errorMessage: action.payload }
    case ('login_started'):
      return { ...state, loading: true }
    case (
      'edit_success' ||
      'edit_fail' ||
      'sign_me_out_fail' ||
      'edit_out'
    ):
      return { ...state, editLoading: false, errorMessage: action.payload }
    case ('edit_start'):
      return { ...state, editLoading: true }
    case ('sign_me_out_success'):
      return { ...state, ...INITIAL_STATE }
    default:
      return state
  }
}

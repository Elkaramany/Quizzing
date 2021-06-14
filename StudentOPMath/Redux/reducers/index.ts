import {combineReducers} from 'redux';
import SignInReducer from './SignInReducer';
import QuestionsReducer from './QuestionsReducer';

export default combineReducers({
    SignInReducer,
    QuestionsReducer,
})
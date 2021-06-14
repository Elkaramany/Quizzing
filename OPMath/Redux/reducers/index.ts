import {combineReducers} from 'redux';
import SignInReducer from './SignInReducer';
import TeacherReducer from './TeacherReducer';
import QuestionsReducer from './QuestionsReducer';

export default combineReducers({
    SignInReducer,
    TeacherReducer,
    QuestionsReducer,
})
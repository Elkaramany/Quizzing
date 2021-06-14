import { AllQuestions, QuestionsTitles } from './AllQuestions/index';
import LevelInterface from './AllQuestions/LevelInterface';


interface Props {
    QuestionsArr: LevelInterface[],
    Level1Arr: LevelInterface[],
    Level2Arr: LevelInterface[],
    Level3Arr: LevelInterface[],
    Level4Arr: LevelInterface[],
    Level5Arr: LevelInterface[],
    QuestionsTitles: any[],
    questionsLoading: boolean,
    submitLoading: boolean
}

const INITIAL_STATE: Props = {
    QuestionsArr: [],
    Level1Arr: [],
    Level2Arr: [],
    Level3Arr: [],
    Level4Arr: [],
    Level5Arr: [],
    QuestionsTitles: [],
    questionsLoading: false,
    submitLoading: false
}

export default (state = { INITIAL_STATE }, action) => {
    switch (action.type) {
        case 'fetch_questions_start':
            return { ...state, questionsLoading: true }
        case 'fetch_questions_end':
            return { ...state, questionsLoading: false }
        case 'assign_Questions':
            return {
                ...state, ...INITIAL_STATE, QuestionsTitles,
                Level1Arr: action.payload[0],
                Level2Arr: action.payload[1],
                Level3Arr: action.payload[2],
                Level4Arr: action.payload[3],
                Level5Arr: action.payload[4]
            }
        case 'submit_test_start':
            return { ...state, submitLoading: true }
        case 'submit_test_end':
            return { ...state, submitLoading: false }
        case 'submit_test_success':
            return { ...state, submitLoading: false }
        case('sign_me_out_success'):
            return{...state, ...INITIAL_STATE}
        default:
            return {
                ...state,
                QuestionsTitles,
            };
    }
}

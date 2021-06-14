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
    questionsTypes: string[],
    addLoaded: boolean
}

const INITIAL_STATE: Props = {
    QuestionsArr: [],
    Level1Arr: [],
    Level2Arr: [],
    Level3Arr: [],
    Level4Arr: [],
    Level5Arr: [],
    questionsTypes: [],
    QuestionsTitles: [],
    questionsLoading: false,
    addLoaded: false
}

export default (state = { INITIAL_STATE }, action) => {
    switch (action.type) {
        case 'fetch_questions_start':
            return { ...state, questionsLoading: true }
        case 'fetch_questions_end':
            return { ...state, questionsLoading: false }
        case 'add_questions_start':
            return { ...state, addLoaded: true }
        case 'add_questions_end':
            return { ...state, addLoaded: false }
        case 'assign_Questions':
            return {
                ...state, ...INITIAL_STATE, QuestionsTitles,
                questionsTypes: ['Pre-Work',
                    'Learning',
                    'Mastery',
                    'Test',
                    'Custom',
                    'Homework1',
                    'Homework2',
                    'Homework3'],
                Level1Arr: action.payload[0],
                Level2Arr: action.payload[1],
                Level3Arr: action.payload[2],
                Level4Arr: action.payload[3],
                Level5Arr: action.payload[4]
            }
        default:
            return {
                ...state,
                questionsTypes: ['Pre-Work',
                    'Learning',
                    'Mastery',
                    'Test',
                    'Custom',
                    'Homework1',
                    'Homework2',
                    'Homework3'],
                QuestionsTitles,
            };
    }
}

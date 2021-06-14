import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Touchable, Alert } from 'react-native'
import LevelInterface from '../../Redux/reducers/AllQuestions/LevelInterface';
import SignatureScreen, { SignatureViewRef } from 'react-native-signature-canvas';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux'
import { GlobalStyles, Colors, textInputTheme, isTablet } from '../Constants';
import Spinner from '../common/Spinner'
import * as Progress from 'react-native-progress';
import { TextInput } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

interface QuestionsArr {
    Level: string,
    subLevel: string,
    numQuestions: number,
    graded: boolean
}

interface QuestionProps {
    time: number,
    packet: string,
    totalNumber: number,
    Questions: QuestionsArr[],
}

interface Props {
    QuestionsArr: LevelInterface[],
    Level1Arr: LevelInterface[],
    Level2Arr: LevelInterface[],
    Level3Arr: LevelInterface[],
    Level4Arr: LevelInterface[],
    Level5Arr: LevelInterface[],
    AllQuestions: QuestionProps,
    SendMeToScore: (testScore: number[][], Test: QuestionProps, testTime: number, testAnsweringInfo: AnswerInfo[]) => void;
}

interface AnswerInfo {
    answerStatus: string,
    studentAnswer: string,
    correctAnswer: string,
    problemLink: string,
    timeTaken: number,
    problemTitle: string,
}

let testScore: any[] = [];
let testAnsweringInfo: AnswerInfo[] = [];

const TestPage: React.FC<Props> = props => {
    const ref = useRef<SignatureViewRef>(null);
    const Test = props.AllQuestions
    const [currentPacket, setCurrentPacket] = useState(0);
    const [testTime, setTestTime] = useState(Test.time * 60);
    const [lastRecordedTime, setLastRecordedTime] = useState(Test.time * 60);
    const [qCounter, setQCounter] = useState(1);
    const [currentQ, setCurrentQ] = useState(1);
    const [qLoaded, setQLoaded] = useState(false);
    const [item, setItem] = useState(null)
    const [answer, setAnswer] = useState('');
    const [intervalID, setIntervalID] = useState<any>(null)

    const curr = Test.Questions[currentPacket]

    useEffect(() => {
        testScore = [];
        // index of Correct, incorrect, skipped and unattempted respectively
        getNewQuestion(0);
        for (let i = 0; i < Test.Questions.length; i++) {
            testScore.push({
                correct: 0, inCorrect: 0, skipped: 0,
                unAttempted: Test.Questions[i].numQuestions, total: Test.Questions[i].numQuestions,
            })
        }

        for (let i = 0; i < Test.totalNumber; i++) {
            testAnsweringInfo.push({
                answerStatus: 'Unattempted',
                studentAnswer: '',
                correctAnswer: '',
                problemLink: '',
                timeTaken: 0,
                problemTitle: '',
            })
        }

    }, [])

    useEffect(() => {
        setIntervalID(setInterval(() => {
            updateTimer();
        }, 1000));

        return () => clearInterval(intervalID);
    }, [])

    useEffect(() => {
        if (testTime <= 0) {
            props.SendMeToScore(testScore, Test, testTime, testAnsweringInfo)

            return () => clearInterval(intervalID)
        }
    }, [testTime])

    const updateTimer = () => {
        setTestTime(testTime => testTime - 1)
    }

    function displayTime(seconds) {
        const format = val => `0${Math.floor(val)}`.slice(-2)
        const minutes = (seconds % 3600) / 60

        return [minutes, seconds % 60].map(format).join(':')
    }

    const getRemainingTime = () => {
        let finalTime = displayTime(testTime)
        return <Text style={[GlobalStyles.smallText, { alignSelf: 'center' }]}>{finalTime} minutes left</Text>
    }

    const changeLevelArr = (index) => {
        switch (Test.Questions[index].Level) {
            case ('1'):
                return props.Level1Arr
            case ('2'):
                return props.Level2Arr
            case ('3'):
                return props.Level3Arr
            case ('4'):
                return props.Level4Arr
            case ('5'):
                return props.Level5Arr
            default:
                return props.AllQuestions;
        }
    }

    const getNewQuestion = (index) => {
        let arr = changeLevelArr(index)
        if (arr) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].SubLevel == Test.Questions[index].subLevel && arr[i].asked !== 'true') {
                    arr[i].asked = 'true'
                    setItem(arr[i]);
                    break;
                }
            }
        }
    }

    const handleClear = () => {
        //setRef(null)
    }

    const nextQuestion = async () => {
        /*HereI want to capture all the user has done:
        1. Time taken to solve each questions
        2. Their correctnes
        3. Problem image link to be displayed in the admin app
        4. And then update their test score to be displayed after the user is done with their exam and to be sent to the admin app
        */
        testAnsweringInfo[currentQ - 1].timeTaken = lastRecordedTime - testTime;
        setLastRecordedTime(testTime);
        testAnsweringInfo[currentQ - 1].studentAnswer = answer;
        testAnsweringInfo[currentQ - 1].problemTitle = item.Title;
        testAnsweringInfo[currentQ - 1].correctAnswer = item.Answer;
        testAnsweringInfo[currentQ - 1].problemLink = item.ImageLink;
        if (answer == item.Answer && answer.length != 0) {
            testScore[currentPacket].correct = testScore[currentPacket].correct + 1;
            testScore[currentPacket].unAttempted = testScore[currentPacket].unAttempted - 1;
            testAnsweringInfo[currentQ - 1].answerStatus = 'Correct'
        } else {
            if (answer == '') {
                testScore[currentPacket].skipped = testScore[currentPacket].skipped + 1;
                testScore[currentPacket].unAttempted = testScore[currentPacket].unAttempted - 1;
                testAnsweringInfo[currentQ - 1].answerStatus = 'Skipped'
            } else {
                testScore[currentPacket].inCorrect = testScore[currentPacket].inCorrect + 1;
                testScore[currentPacket].unAttempted = testScore[currentPacket].unAttempted - 1;
                testAnsweringInfo[currentQ - 1].answerStatus = 'Incorrect'
            }
        }

        /*
        Here i want to programmitcally update the question counter and get a new questions based on that
        */
        setQLoaded(true);
        if (qCounter >= curr.numQuestions) {
            if (currentQ == Test.totalNumber) {
                setQLoaded(false);
                props.SendMeToScore(testScore, Test, testTime, testAnsweringInfo)
            } else {
                getNewQuestion(currentPacket + 1);
                await newPacket()
            }
        } else {
            await newQCounter();
            getNewQuestion(currentPacket);
        }
        setAnswer('')
        setQLoaded(false);
    }

    const newPacket = async () => {
        await setCurrentPacket(currentPacket => currentPacket + 1)
        await setQCounter(1);
        await setCurrentQ(currentQ + 1);
    }

    const newQCounter = async () => {
        await setQCounter(qCounter => qCounter + 1);
        await setCurrentQ(currentQ + 1);
    }

    const showQuestion = () => {
        if (item != null && item) {
            if (qLoaded) {
                return (
                    <>
                        <Spinner size={true} />
                    </>
                )
            } else {
                return (
                    <View style={styles.MainQContainer}>
                        <Text style={[GlobalStyles.smallText, { alignSelf: 'center' }]}>{item.Instructions}</Text>
                        <Image
                            style={styles.questionImage}
                            source={{
                                uri: item.ImageLink,
                            }}
                            defaultSource={require('../../Assets/Images/Default.png')}
                        />
                        <Text style={[GlobalStyles.smallText, { alignSelf: 'center' }]}>{item.Instructions}</Text>
                    </View>
                )
            }
        } else return <View />
    }

    const style = isTablet == true ? `
    .m-signature-pad {
        position: absolute;
        font-size: 10px;
        width: 1000px;
        height: 300px;
        top: 72%;
        left: 50%;
        margin-left: -500px;
        margin-top: -250px;
        background-color: #fff;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27), 0 0 40px rgba(0, 0, 0, 0.08) inset;
      }
      .save {
        display: none
            }
        `: 
        `
        .m-signature-pad {
            position: absolute;
            font-size: 10px;
            width: 345px;
            height: 300px;
            top: 50%;
            left: 30%;
            margin-left: -100px;
            margin-top: -183px;
            background-color: #fff;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27), 0 0 40px rgba(0, 0, 0, 0.08) inset;
          }
          .save {
            display: none
                }
            `;

    if (changeLevelArr(0) && changeLevelArr(0) != undefined) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.container}>
                    {getRemainingTime()}
                    {showQuestion()}

                    <View
                        style={{ flex: 1, alignItems: 'center', marginRight: wp('2%'), }}>
                        <SignatureScreen
                            ref={ref}
                            backgroundColor={'#ffffff'}
                            onClear={() => handleClear}
                            autoClear={true}
                            descriptionText={''}
                            webStyle={style}
                        />
                        <View style={{ justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={() => setAnswer('')}
                                style={{ borderWidth: wp('0.3%'), borderColor: 'black', padding: wp('1%'), marginRight: wp('2%') }}>
                                <Image source={require('../../Assets/Images/pencil_color.png')}
                                    style={{ width: wp('4%'), height: hp('2.5%') }} resizeMode={'contain'} />
                            </TouchableOpacity>

                            <TextInput
                                mode="outlined"
                                multiline={false}
                                style={[GlobalStyles.textInputContainer, { width: wp('30%') }]}
                                label="Answer"
                                value={answer}
                                onChangeText={text => setAnswer(text)}
                                theme={textInputTheme}
                            />
                        </View>
                    </View>
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: 'row', justifyContent: 'space-around', marginVertical: hp('2%'),
                    width: '95%', alignItems: 'center'
                }}>
                    <View style={{ height: hp('3%'), width: wp('30%') }}>
                        <Progress.Bar progress={currentQ / Test.totalNumber} width={wp('30%')} height={hp('3%')} color={Colors.thirdHeader}
                            unfilledColor={'rgb(216,216,216)'}
                        />
                    </View>
                    <Text style={[GlobalStyles.smallText, { right: isTablet != true ? wp('5%') : wp('15%') }]}>{currentQ} / {Test.totalNumber}</Text>
                    <TouchableOpacity
                        style={styles.nextButton}
                        onPress={() => nextQuestion()}>
                        <Text style={GlobalStyles.smallText}>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    } else {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Spinner size={true} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 7,
        borderWidth: wp('0.3%'),
        borderColor: 'black',
        width: '95%',
    }, MainQContainer: {
        marginTop: hp('12%'),
        justifyContent: 'center',
        alignItems: 'center',
        height: hp('5%'),
    }, singleQuestion: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    }, questionContainer: {
        marginHorizontal: wp('4%'),
        padding: wp('3%'),
        marginBottom: hp('1%'),
    }, questionImage: {
        width: wp('25%'),
        height: hp('20%'),
        borderRadius: wp('5%'),
        alignSelf: 'center',
    }, nextButton: {
        backgroundColor: 'rgb(216,216,216)',
        padding: wp('1%'),
        borderRadius: wp('1%')
    }
})

const mapStateToProps = ({ QuestionsReducer }) => {
    return {
        QuestionsArr: QuestionsReducer.QuestionsArr,
        Level1Arr: QuestionsReducer.Level1Arr,
        Level2Arr: QuestionsReducer.Level2Arr,
        Level3Arr: QuestionsReducer.Level3Arr,
        Level4Arr: QuestionsReducer.Level4Arr,
        Level5Arr: QuestionsReducer.Level5Arr,
    }
}

export default connect(mapStateToProps, {})(TestPage);
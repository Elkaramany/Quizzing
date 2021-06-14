import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Colors, GlobalStyles, isTablet } from '../Constants';
import { connect } from 'react-redux'
import Header from '../common/Header'
import HeaderLogo from '../common/HeaderLogo';
import { signMeOut, submitAnswerToDB } from '../../Redux/actions'
import { StackNavigationProp } from '@react-navigation/stack'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FlatList } from 'react-native-gesture-handler';
import Pie from 'react-native-pie'

const CORRECT_COLOR = 'rgb(146,207,72)'
const INCORRECT_COLOR = 'rgb(191,43,38)'
const SkIPPED_COLOR = 'rgb(245,230,81)'
const UNATTEMPTED_COLOR = 'rgb(91,144,220)'

interface QuestionsArr {
    Level: string,
    subLevel: string,
    numQuestions: number,
    graded: boolean
}

interface AnswerInfo{
    answerStatus: string,
    studentAnswer: string,
    correctAnswer: string,
    problemLink: string,
    timeTaken: number,
    problemTitle: string,
}

interface QuestionProps {
    time: number,
    packet: string,
    totalNumber: number,
    Questions: QuestionsArr[],
}

interface Props {
    Test: QuestionProps,
    testScore: any[]
    signMeOut: () => void,
    navigation: StackNavigationProp<any, any>,
    route: any,
    submitLoading: boolean,
    fullInfo: object | any
    submitAnswerToDB: (testScore: any[], Test: QuestionProps, fullInfo: object, testTime, testAnsweringInfo: AnswerInfo[]) => void
}

const FinishedTest: React.FC<Props> = props => {
    const { Test, testScore, testTime, testAnsweringInfo } = props.route.params
    const [overAll, setOverAll] = useState(0);

    useEffect(() => {
        //Send the test's information to the database to be displayed in the admin app
        props.submitAnswerToDB(testScore, Test, props.fullInfo, testTime, testAnsweringInfo);
    }, [])

    useEffect(() => {
        let total = 0
        for (let i = 0; i < testScore.length; i++) {
            total += testScore[i].correct
        }
        setOverAll(total / Test.totalNumber * 100);
    }, [])

    const logOutFunctions = () => {
        props.signMeOut();
        props.navigation.navigate('Router')
    }

    const renderItem = ({ item, index }) => {
        return (
            <View style={{
                marginHorizontal: wp('5%'),
                alignItems: 'center', marginVertical: hp('2%'),
                paddingHorizontal: wp('5%'),
            }}>
                <Pie
                    radius={isTablet == true ? 80 : 60}
                    sections={[
                        {
                            percentage: item.correct / item.total * 100,
                            color: CORRECT_COLOR,
                        },
                        {
                            percentage: item.inCorrect / item.total * 100,
                            color: INCORRECT_COLOR,
                        },
                        {
                            percentage: item.skipped / item.total * 100,
                            color: SkIPPED_COLOR,
                        },
                        {
                            percentage: item.unAttempted / item.total * 100,
                            color: UNATTEMPTED_COLOR,
                        },
                    ]}
                    strokeCap={'butt'}
                />
                <Text style={GlobalStyles.smallText}>
                    {Test.Questions[index].subLevel}
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Text style={[GlobalStyles.smallText, { color: CORRECT_COLOR, }]}>{item.correct / item.total * 100}%</Text>
                    <Text style={[GlobalStyles.smallText, { color: INCORRECT_COLOR }]}>    {item.inCorrect / item.total * 100}%</Text>
                    <Text style={[GlobalStyles.smallText, { color: SkIPPED_COLOR }]}>  {item.skipped / item.total * 100}%</Text>
                    <Text style={[GlobalStyles.smallText, { color: UNATTEMPTED_COLOR }]}>  {item.unAttempted / item.total * 100}%</Text>
                </View>
            </View>
        )
    }

    function display(seconds) {
        const format = val => `0${Math.floor(val)}`.slice(-2)
        const minutes = (seconds % 3600) / 60

        return [minutes, seconds % 60].map(format).join(':')
    }

    return (
        <View style={{ flex: 1, backgroundColor: Colors.mainBackground }}>
            <HeaderLogo />
            <View style={styles.headerContainer}>
                <TouchableOpacity style={[styles.logoutButtonStyle, { borderColor: Colors.thirdHeader }]}
                    onPress={() => props.navigation.navigate('StudentMenu')}
                >
                    <Text style={styles.TopBarText}>Home</Text>
                </TouchableOpacity>
                <Header
                    HeaderStyle={{ backgroundColor: 'transparent' }}
                    TextStyle={{ fontSize: hp('3%') }}
                    HeaderText={Test.packet + ' score'}
                />
                <TouchableOpacity style={styles.logoutButtonStyle}
                    onPress={() => logOutFunctions()}
                >
                    <Text style={styles.TopBarText}>Log off</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.mainBodyContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={GlobalStyles.smallText}>Overall Score: {overAll}%</Text>
                    <Text style={GlobalStyles.smallText}>Total Questions: {Test.totalNumber}</Text>
                </View>
                <Text style={GlobalStyles.smallText}>Total time taken: {display((Test.time * 60) - testTime)} minutes</Text>
                <FlatList
                    contentContainerStyle={{ justifyContent: 'center', }}
                    data={testScore}
                    horizontal={true}
                    renderItem={renderItem}
                    keyExtractor={score => score}
                />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ justifyContent: 'flex-end' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={[styles.colorContainer, { backgroundColor: CORRECT_COLOR }]} />
                            <Text style={GlobalStyles.smallText}>   Correct</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={[styles.colorContainer, { backgroundColor: INCORRECT_COLOR }]} />
                            <Text style={GlobalStyles.smallText}>   Incorrect</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={[styles.colorContainer, { backgroundColor: SkIPPED_COLOR }]} />
                            <Text style={GlobalStyles.smallText}>   Skipped</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={[styles.colorContainer, { backgroundColor: UNATTEMPTED_COLOR }]} />
                            <Text style={GlobalStyles.smallText}>   Unattempted</Text>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.SubmitTestButton}
                            onPress={() => props.navigation.navigate('StudentMenu')}
                        >
                            <Text style={GlobalStyles.buttonText}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    }, logoutButtonStyle: {
        paddingHorizontal: hp('2%'),
        paddingVertical: hp('0.5%'),
        borderColor: 'red',
        borderWidth: wp('0.5%'),
        borderRadius: wp('10%'),
    }, TopBarText: {
        fontSize: hp('2%')
    },
    mainBodyContainer: {
        flex: 1,
        backgroundColor: Colors.mainFooter,
        marginHorizontal: wp('2%'),
        marginVertical: hp('2%'),
        marginBottom: hp('5%')
    }, colorContainer: {
        width: isTablet == true ? wp('3%') : wp('5%'),
        height: isTablet == true ? wp('3%') : wp('5%'),
    }, SubmitTestButton: {
        backgroundColor: 'rgb(164,190,219)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: wp('1%'),
        paddingHorizontal:isTablet == true ? wp('5%') : wp('15%'),
        borderRadius: wp('5%'),
        borderWidth: wp('0.5%'),
        borderColor: 'rgb(127,172,221)',
        left: isTablet == true ? wp('20%') : wp('5%')
    }
})

const mapStateToProps = ({ QuestionsReducer, SignInReducer }) => {
    return {
        submitLoading: QuestionsReducer.submitLoading,
        fullInfo: SignInReducer.fullInfo,
    }
}

export default connect(mapStateToProps, { signMeOut, submitAnswerToDB })(FinishedTest);
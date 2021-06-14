import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import HeaderArrow from '../common/HeaderArrow';
import { GlobalStyles, Colors, isTablet, WIDTH } from '../Constants';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import TestPage from './TestPage';
import LevelInterface from '../../Redux/reducers/AllQuestions/LevelInterface';
import { connect } from 'react-redux'
import Spinner from '../common/Spinner';

interface Props {
    route: any,
    navigation: StackNavigationProp<any, any>,
    Level1Arr: LevelInterface[]
}

const PreQuestions: React.FC<Props> = props => {

    const [started, setStarted] = useState(false);
    const [navigated, setNavigated] = useState(false)

    const pack = props.route.params.Question

    const sendMeBack = () => {
        if (!started) {
            props.navigation.goBack()
        } else {
            Alert.alert(
                "Leaving penalty",
                "Leaving the packet now will lose your progress, Do you still want to leave?",
                [
                    {
                        text: "No",
                        onPress: () => { },
                    },
                    { text: "Yes", onPress: () => props.navigation.navigate('StudentMenu') }
                ]
            )
        }
    }

    const ShowScore = (testScore, Test, testTime, testAnsweringInfo) => {
        if (!navigated) {
            props.navigation.navigate('FinishedTest', {
                Test,
                testScore,
                testTime,
                testAnsweringInfo
            })
        }
        setNavigated(true)
    }

    const showMiddle = () => {
        if (!props.Level1Arr || !props.Level1Arr.length || props.Level1Arr.length == 0) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Spinner size={true} />
                </View>
            )
        } else {
            if (!started) {
                return (
                    <>
                        <Text style={[styles.mainText, { fontWeight: 'bold' }]}>Ready to Start?</Text>
                        <Text style={styles.mainText}>This packet has a time limit of {pack.time} minutes</Text>
                        <TouchableOpacity style={styles.navigationButtonContainer}
                            onPress={() => setStarted(true)}
                        >
                            <Text style={GlobalStyles.buttonText}>Let's do this!</Text>
                        </TouchableOpacity>
                    </>

                )
            } else {
                return (
                    <View style={{ flex: 1 }}>
                        <TestPage AllQuestions={pack} SendMeToScore={(testScore, Test, testTime, testAnsweringInfo) => ShowScore(testScore, Test, testTime, testAnsweringInfo)} />
                    </View>
                )
            }
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: Colors.mainBackground }}>
            <HeaderArrow
                iconName={'arrow-left'}
                iconColor={Colors.secondaryHeader}
                HeaderText={pack.packet}
                HeaderStyle={{ backgroundColor: 'transparent' }}
                TextEdited={{ left: isTablet == true ? WIDTH * 0.4 : WIDTH * 0.25 }}
                navigateMeBack={() => sendMeBack()}
            />
            <View style={styles.container}>
                {showMiddle()}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: wp('2%'),
    }, mainText: {
        fontSize: hp('2.5%')
    }, navigationButtonContainer: {
        backgroundColor: 'rgb(164,190,219)',
        padding: wp('3%'),
        paddingHorizontal: wp('5%'),
        marginVertical: hp('5%'),
        borderRadius: hp('5%'),
    }
})

const mapStateToProps = ({ QuestionsReducer }) => {
    return {
        Level1Arr: QuestionsReducer.Level1Arr
    }
}

export default connect(mapStateToProps, {})(PreQuestions);
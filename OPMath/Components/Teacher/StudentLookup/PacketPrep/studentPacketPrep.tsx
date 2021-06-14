import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Pressable, TouchableOpacity, ScrollView, Modal } from 'react-native'
import { connect } from 'react-redux'
import TwoModals from '../../../common/TwoModals';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { GlobalStyles } from '../../../Constants';
import AssignedQuestion from './AssignedQuestion';
import StudentCreds from '../StudentInterface';
import StatsPacketPrep from './StatsPacketPrep';

interface Props {
    questionsTypes: string[]
    student: StudentCreds
}

interface QuestionInterface {
    Level: string,
    subLevel: string,
    numQuestions: number,
    graded: boolean,
}

const studentPacketPrep: React.FC<Props> = props => {

    const [timesLimits, setTimeLimits] = useState<number[]>([
        0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60
    ])


    const [HWType, setHWType] = useState(props.questionsTypes[0])
    const [modalHWVisible, setModalHWVisible] = useState(false);
    const [modalTimeVisible, setModalTimeVisible] = useState(false);
    const [time, setTime] = useState(5);


    const changePacketType = (item, index) => {
        setHWType(item)
        setModalHWVisible(false);
    }

    const changeTimeLimit = (item, index) => {
        setTime(item)
        setModalTimeVisible(false);
    }

    const TopPacketView = () => {
        return (
            <TwoModals
                firstModalVisible={modalHWVisible}
                setFirstModalVisibility={(modalView) => setModalHWVisible(modalView)}
                firstModalTitle={'Select Packet type:'}
                firstModalSelected={HWType}
                firstItemValue={props.questionsTypes.map((item, index) => {
                    return (
                        <Pressable onPress={() => changePacketType(item, index)} style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={[GlobalStyles.smallText, { padding: hp('0.5%') }]}>{item}</Text>
                        </Pressable>
                    )
                })}
                secondModalVisible={modalTimeVisible}
                setSecondModalVisibility={(modalView) => setModalTimeVisible(modalView)}
                secondModalTitle={'Select time limit:'}
                secondModalSelected={time + ' min'}
                secondItemValue={timesLimits.map((item, index) => {
                    return (
                        <Pressable onPress={() => changeTimeLimit(item, index)}>
                            <Text style={[GlobalStyles.smallText, { padding: hp('0.5%') }]}>{item} min</Text>
                        </Pressable>
                    )
                })}
            />
        )
    }


    return (
        <View style={{ flex: 1 }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: hp('1%') }}>
                <StatsPacketPrep
                    student={props.student.finishedAssignments.reverse()}
                />
            </View>
            {TopPacketView()}
            <AssignedQuestion selectedTime={time} student={props.student}
                selectedPacket={HWType}
            />
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

})

const mapStateToProps = ({ QuestionsReducer }) => {
    return {
        questionsTypes: QuestionsReducer.questionsTypes
    }
}

export default connect(mapStateToProps)(studentPacketPrep);
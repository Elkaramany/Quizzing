import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Modal, Pressable, ScrollView } from 'react-native'
import { VictoryBar, VictoryChart, VictoryTheme, VictoryArea, VictoryAxis, VictoryLabel } from "victory-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { GlobalStyles, Colors, isTablet } from '../../../Constants'
import TwoModals from '../../../common/TwoModals';
import { connect } from 'react-redux'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface Props {
    QuestionsTitles: any[],
    questionsTypes: String[],
    student: any[]
}

const studentProgressReport: React.FC<Props> = props => {

    const { QuestionsTitles, questionsTypes } = props;

    const [selectedLevel, setSelectedLevel] = useState(QuestionsTitles[0][0])
    const [selectedLevelIndex, setSelectedLevelIndex] = useState(0);
    const [selectedSub, setSelectedSub] = useState(QuestionsTitles[0][2][0]);
    const [modalLevelVisible, setModalLevelVisible] = useState(false);
    const [modalSubLevelVisible, setModalSubLevelVisible] = useState(false);
    const [modalPacketVisible, setModalPacketVisible] = useState(false);
    const [modalPacketSelected, setModalPacketSelected] = useState(questionsTypes[0]);
    const [barSubLevel, setBarSubLevel] = useState<{ name: string, value: number }[]>([]);
    const [valuesArray, setValuesArray] = useState(QuestionsTitles[selectedLevelIndex][1])

    const yAxis = [100, 90, 80, 70, 60, 50, 40, 30, 20, 10];

    const changeLevel = async(itemValue, itemIndex) => {
        await setSelectedLevel(itemValue[0])
        await setSelectedLevelIndex(itemIndex);
        await setModalLevelVisible(false);
        calculateBarData(modalPacketSelected)
    }

    useEffect(() => {
        calculateBarData(questionsTypes[0])
    }, [])

    useEffect(() =>{
        setValuesArray(QuestionsTitles[selectedLevelIndex][1])
    },[selectedLevelIndex])

    useEffect(() => {
        for(let i = 0; i < barSubLevel.length;i++){
            for(let j = 0; j < valuesArray.length;j++){
                if(valuesArray[j].name == barSubLevel[i].name){
                    changeSubLevelValues(j, barSubLevel[i].value)
                }
            }
        }        
    }, [barSubLevel])

    const changeSubLevelValues = (index, item) => {
        setValuesArray(
            valuesArray.map((l, levelIndex) =>
                index === levelIndex
                    ? { ...l, number: item }
                    : {...l, number: 0}
            ))
    }


    const calculateBarData = (item) => {
        setBarSubLevel([]);
        props.student.map((std, stdIndex) => {
            if (std.Test.packet == item) {
                std.Test.Questions.map((entry, eIndex) => {
                    if (entry.Level == selectedLevel) {
                        setBarSubLevel(barSubLevel => [...barSubLevel, { name: entry.subLevel, value: (std.testScore[eIndex].correct / std.testScore[eIndex].total) }])
                    }
                })
            }
        })
    }

    const changeSubLevel = (itemValue, itemIndex) => {
        setSelectedSub(itemValue);
        setModalSubLevelVisible(false);
    }

    useEffect(() => {
        setSelectedSub(QuestionsTitles[selectedLevelIndex][2][0])
    }, [selectedLevelIndex])


    const changePacketType = (item) => {
        setModalPacketSelected(item)
        setModalPacketVisible(false)
        calculateBarData(item)
    }

    const showBar = (sub) => {
        if (selectedSub == 'Snapshot' || selectedSub == sub.type) {
            if (sub.number && sub.number != 0) {
                return <View style={[styles.barStyle, { height: hp('70%') * sub.number }]} />
            } else return <View style={styles.barStyle} />
        }
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: hp('0.5%') }}>
                    <TwoModals
                        modalViewStyle={{ backgroundColor: 'rgb(75,75,75)', marginHorizontal: wp('3%') }}
                        firstModalVisible={modalLevelVisible}
                        setFirstModalVisibility={(modalView) => setModalLevelVisible(modalView)}
                        firstModalTitle={'Level:'}
                        firstModalSelected={selectedLevel}
                        firstItemValue={QuestionsTitles.map((item, index) => {
                            return (
                                <Pressable onPress={() => changeLevel(item, index)}>
                                    <Text style={[GlobalStyles.smallText, { padding: hp('0.5%'), fontSize: hp('3%') }]}>{item[0]}</Text>
                                </Pressable>
                            )
                        })}
                        secondModalVisible={modalSubLevelVisible}
                        setSecondModalVisibility={(modalView) => setModalSubLevelVisible(modalView)}
                        secondModalTitle={'Sub-Topic Level:'}
                        secondModalSelected={selectedSub}
                        secondItemValue={QuestionsTitles[selectedLevelIndex][2].map((item, index) => {
                            return (
                                <Pressable onPress={() => changeSubLevel(item, index)} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={[GlobalStyles.smallText, { padding: hp('0.5%') }]}>{item}</Text>
                                </Pressable>
                            )
                        })}
                    />
                    <View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalPacketVisible}
                            onRequestClose={() => {
                                setModalPacketVisible(!!modalPacketVisible);
                            }}
                        >
                            <View style={GlobalStyles.ModalContainer}>
                                <View style={GlobalStyles.ModalView}>
                                    <Text style={[GlobalStyles.smallText, { bottom: hp('5%'), fontSize: hp('2.5%') }]}>Select Packet Type:</Text>
                                    {questionsTypes.map((item, index) => {
                                        return (
                                            <Pressable onPress={() => changePacketType(item)}>
                                                <Text style={[GlobalStyles.smallText, { fontSize: hp('2.5%') }]}>{item}</Text>
                                            </Pressable>
                                        )
                                    })}
                                    <Pressable
                                        style={[GlobalStyles.buttonContainer, { backgroundColor: Colors.mainHeader, borderWidth: 0 }]}
                                        onPress={() => setModalPacketVisible(!modalPacketVisible)}
                                    >
                                        <Text style={GlobalStyles.smallText}>Cancel</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </Modal>
                        <Pressable style={styles.studentSelector} onPress={() => setModalPacketVisible(true)}>
                            <Text style={[GlobalStyles.smallText, { fontSize: hp('2%'), }]}>{modalPacketSelected}</Text>
                            <MaterialIcons name={'arrow-drop-down'} size={20} color={Colors.secondaryHeader} />
                        </Pressable>
                    </View>
                </View>
                <ScrollView style={{ flexGrow: 1 }}
                    horizontal={true}
                    contentContainerStyle={{ right: isTablet == true ? wp('6%') : wp('8%'), height: isTablet == true ? hp('45%') : hp('74.5'), }}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={[GlobalStyles.smallText, {
                            transform: [
                                { rotate: "-90deg" },
                            ],
                        }]}>Percent scored</Text>
                        <View style={{ flexDirection: 'column', borderRightWidth: wp('0.5%'), borderColor: 'white', }}>
                            {yAxis.map((y, yIndex) => {
                                return (
                                    <View>
                                        <Text style={[GlobalStyles.smallText, { marginBottom: isTablet == true ? hp('2.05%') : hp('5%'),}]}>{y}%</Text>
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                    <ScrollView style={{ flexGrow: 1 }}
                        horizontal={true}
                    >
                        {valuesArray.map((sub, subIndex) => {
                            return (
                                <View style={{ justifyContent: 'flex-end' }}>
                                    {showBar(sub)}
                                    <View style={{ borderTopWidth: wp('0.5%'), borderColor: '#ffffff' }}>
                                        <Text style={[GlobalStyles.smallText, { marginHorizontal: hp('1%'), textAlign: 'center' }]}>{sub.name}</Text>
                                    </View>
                                </View>
                            )
                        })}
                    </ScrollView>
                </ScrollView>
                <Text style={[GlobalStyles.smallText, { textAlign: 'center', marginBottom: hp('2.5%') }]}>Sub-Topics</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(42,42,42)',
        width: '95%',
        alignSelf: 'center',
        borderRadius: wp('5%')
    }, GraphStyle: {
        borderRadius: wp('5%'),
        color: 'red'
    }, studentSelector: {
        flexDirection: 'row',
        paddingHorizontal: wp('2.5%'),
        paddingVertical: hp('1%'),
        borderRadius: hp('5%'),
        backgroundColor: 'rgb(75,75,75)',
        justifyContent: 'center',
        alignItems: 'center'
    }, barStyle: {
        height: hp('70%') * 0,
        width: wp('10%'),
        borderWidth: wp('0.3%'),
        borderColor: 'rgb(140,199,69)',
        backgroundColor: 'rgb(69,88,43)',
        marginHorizontal: wp('2%'),
    }
})

const mapStateToProps = ({ QuestionsReducer }) => {
    return {
        questionsTypes: QuestionsReducer.questionsTypes,
        QuestionsTitles: QuestionsReducer.QuestionsTitles,
    }
}

export default connect(mapStateToProps)(studentProgressReport);
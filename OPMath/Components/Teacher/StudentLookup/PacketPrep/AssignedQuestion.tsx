import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Pressable, Modal, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Colors, GlobalStyles } from '../../../Constants';
import { Switch } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AddQuestionsToDB } from '../../../../Redux/actions';
import StudentCreds from '../StudentInterface';
import Spinner from '../../../common/Spinner';

interface QuestionInterface {
    Level: string,
    subLevel: string,
    numQuestions: number,
    graded: boolean,
}


interface Props {
    QuestionsTitles: any[],
    questionsTypes: string[],
    selectedTime: number,
    selectedPacket: string,
    AddQuestionsToDB: (questionsSets: QuestionInterface[], student: StudentCreds, time: number, packet: string, totalNumber: number) => void;
    addLoaded: boolean,
    student: StudentCreds
}

const AssignedQuestion: React.FC<Props> = props => {
    const [numQuestions, setNumQuestions] = useState<number[]>([
        5, 10, 15, 20, 25, 30, 35, 40, 45, 50
    ])
    const [totalNumber, setTotalNumber] = useState(0);
    const [questionsSets, setQuestionSets] = useState<QuestionInterface[]>([])
    const [modalLevelVisible, setModalLevelVisible] = useState<boolean[]>([]);
    const [modalSubLevelVisible, setModalSubLevelVisible] = useState<boolean[]>([]);
    const [modalNumQuestionsVisible, setModalNumQuestionsVisible] = useState<boolean[]>([]);
    const [modalLevelSelected, setModalLevelSelected] = useState<string[]>([])
    const [modalSubLevelSelected, setModalSubLevelSelected] = useState<string[]>([])
    const [modalNumQuestionsSelected, setModalNumQuestionsSelected] = useState<number[]>([])
    const [switchGradedSelected, setswitchGradedSelected] = useState<boolean[]>([]);
    const [selectedLevelIndex, setSelectedLevelIndex] = useState<number[]>([]);

    useEffect(() => {
        addQuestionsSet();
    }, [])

    useEffect(() => {
        let total = 0;
        for (let i = 0; i < modalNumQuestionsSelected.length; i++) {
            total += modalNumQuestionsSelected[i]
        }
        setTotalNumber(total);
    }, [modalNumQuestionsSelected])


    const addQuestionsSet = () => {
        //Adds an index to each array to hold the new question info

        setQuestionSets(questionsSets.concat({ Level: '1', subLevel: '1.A.1', numQuestions: 5, graded: false }))
        setModalLevelSelected(modalLevelSelected.concat('1'))
        setModalSubLevelSelected(modalSubLevelSelected.concat('1.A.1'))
        setModalNumQuestionsSelected(modalNumQuestionsSelected.concat(5))
        setswitchGradedSelected(switchGradedSelected.concat(false))
        setSelectedLevelIndex(selectedLevelIndex.concat(0))
        setModalLevelVisible(modalLevelVisible.concat(false))
        setModalSubLevelVisible(modalSubLevelVisible.concat(false))
        setModalNumQuestionsVisible(modalNumQuestionsVisible.concat(false))
    }

    const changeLevel = (itemValue, i, itemIndex) => {
        //Change the value in the questions sets as it's the one that will be sent to firebase
        setQuestionSets(
            questionsSets.map((l, levelIndex) =>
                i === levelIndex
                    ? { ...l, Level: itemValue[0], subLevel: props.QuestionsTitles[itemIndex][1][0].name }
                    : l
            ))

        //Change the value of level
        setModalLevelSelected(
            modalLevelSelected.map((l, levelIndex) =>
                i === levelIndex
                    ? itemValue[0]
                    : l
            ))

        //Change the value of the modal visibility to false again since the user picked the value they want for the level
        setModalLevelVisible(
            modalLevelVisible.map((l, levelIndex) =>
                i === levelIndex
                    ? false
                    : l
            ))
        //Change the index value of that level
        setSelectedLevelIndex(
            selectedLevelIndex.map((l, levelIndex) =>
                i === levelIndex
                    ? itemIndex
                    : l
            ))

        //change the Value of the sublevel in it's array
        setModalSubLevelSelected(
            modalSubLevelSelected.map((l, levelIndex) =>
                i === levelIndex
                    ? props.QuestionsTitles[itemIndex][1][0].name
                    : l
            ))

    }


    const changeModalLevelVisibility = (modalView, i) => {
        setModalLevelVisible(
            modalLevelVisible.map((l, levelIndex) =>
                i === levelIndex
                    ? modalView
                    : l
            )
        )
    }

    const changeModalSubLevelVisibility = (modalView, i) => {
        setModalSubLevelVisible(
            modalSubLevelVisible.map((l, levelIndex) =>
                i === levelIndex
                    ? modalView
                    : l
            )
        )
    }

    const changeSubLevel = (itemValue, i) => {
        setQuestionSets(
            questionsSets.map((l, levelIndex) =>
                i === levelIndex
                    ? { ...l, subLevel: itemValue }
                    : l
            ))

        setModalSubLevelSelected(
            modalSubLevelSelected.map((l, levelIndex) =>
                i === levelIndex
                    ? itemValue
                    : l
            ))

        setModalSubLevelVisible(
            modalSubLevelVisible.map((l, levelIndex) =>
                i === levelIndex
                    ? false
                    : l
            ))
    }

    const changeModalNumQuestionsVisibility = (modalView, i) => {
        setModalNumQuestionsVisible(
            modalNumQuestionsVisible.map((l, levelIndex) =>
                i === levelIndex
                    ? modalView
                    : l
            )
        )
    }

    const changeNumQuestions = (itemValue, i) => {

        setQuestionSets(
            questionsSets.map((l, levelIndex) =>
                i === levelIndex
                    ? { ...l, numQuestions: itemValue }
                    : l
            ))

        setModalNumQuestionsSelected(
            modalNumQuestionsSelected.map((l, levelIndex) =>
                i === levelIndex
                    ? itemValue
                    : l
            )
        )

        setModalNumQuestionsVisible(
            modalNumQuestionsVisible.map((l, levelIndex) =>
                i === levelIndex
                    ? false
                    : l
            )
        )
    }

    const changeSwitchValue = (val, i) => {
        setQuestionSets(
            questionsSets.map((l, levelIndex) =>
                i === levelIndex
                    ? { ...l, graded: val }
                    : l
            ))

        setswitchGradedSelected(
            switchGradedSelected.map((l, levelIndex) =>
                i === levelIndex
                    ? val
                    : l
            )
        )
    }

    const showButton = () => {
        if (!props.addLoaded) {
            return (
                <TouchableOpacity style={styles.createButton}
                    onPress={() => props.AddQuestionsToDB(questionsSets, props.student, props.selectedTime, props.selectedPacket, totalNumber)}
                >
                    <Text style={styles.buttonSendText}>Create and send</Text>
                </TouchableOpacity>
            )
        } else {
            return (
                <Spinner size={true} />
            )
        }
    }

    return (
        <ScrollView style={{ flexGrow: 1, marginBottom: hp('1%'), }}>
            <View>
                <Text style={[GlobalStyles.smallText, { alignSelf: 'flex-end', marginRight: wp('2%') }]}>Grade?</Text>
                {questionsSets.map((q, qIndex) => {
                    return (
                        <ScrollView style={{ flexGrow: 1 }}
                            contentContainerStyle={{ flexDirection: 'row', marginBottom: hp('1%'), justifyContent: 'center' }}
                        >
                            <View style={styles.outsideContainer}>
                                <Modal
                                    animationType="slide"
                                    transparent={true}
                                    visible={modalLevelVisible[qIndex]}
                                    onRequestClose={() => {
                                        changeModalLevelVisibility(!modalLevelVisible[qIndex], qIndex);
                                    }}
                                >
                                    <View style={GlobalStyles.ModalContainer}>
                                        <View style={GlobalStyles.ModalView}>
                                            <Text style={[GlobalStyles.smallText, { marginBottom: hp('2%'), fontSize: hp('2.5%') }]}>Select Level:</Text>
                                            {props.QuestionsTitles.map((item, index) => {
                                                return (
                                                    <Pressable onPress={() => changeLevel(item, qIndex, index)}>
                                                        <Text style={[GlobalStyles.smallText, { padding: hp('0.5%') }]}>{item[0]}</Text>
                                                    </Pressable>
                                                )
                                            })}
                                            <Pressable
                                                style={[GlobalStyles.buttonContainer, { backgroundColor: Colors.mainHeader, borderWidth: 0 }]}
                                                onPress={() => changeModalLevelVisibility(!modalLevelVisible[qIndex], qIndex)}
                                            >
                                                <Text style={GlobalStyles.smallText}>Cancel</Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                </Modal>
                                <Pressable style={styles.studentSelector} onPress={() => changeModalLevelVisibility(true, qIndex)}>
                                    <Text style={[GlobalStyles.smallText, { fontSize: hp('2%'), }]}>Level {modalLevelSelected[qIndex]}</Text>
                                    <MaterialIcons name={'arrow-drop-down'} size={20} color={Colors.secondaryHeader} />
                                </Pressable>
                            </View>



                            <View style={styles.outsideContainer}>
                                <Modal
                                    animationType="slide"
                                    transparent={true}
                                    visible={modalSubLevelVisible[qIndex]}
                                    onRequestClose={() => {
                                        changeModalSubLevelVisibility(!modalSubLevelVisible[qIndex], qIndex);
                                    }}
                                >
                                    <View style={GlobalStyles.ModalContainer}>
                                        <View style={GlobalStyles.ModalView}>
                                            <Text style={[GlobalStyles.smallText, { marginBottom: hp('2%'), fontSize: hp('2.5%') }]}>Select Sub-Level:</Text>
                                            <ScrollView style={{ flexGrow: 1 }}>
                                                {props.QuestionsTitles[selectedLevelIndex[qIndex]][1].map((item, index) => {
                                                    return (
                                                        <Pressable onPress={() => changeSubLevel(item.name, qIndex)}>
                                                            <Text style={[GlobalStyles.smallText, { padding: hp('0.5%') }]}>{item.name}</Text>
                                                        </Pressable>
                                                    )
                                                })}
                                            </ScrollView>
                                            <Pressable
                                                style={[GlobalStyles.buttonContainer, { backgroundColor: Colors.mainHeader, borderWidth: 0 }]}
                                                onPress={() => changeModalSubLevelVisibility(!modalSubLevelVisible[qIndex], qIndex)}
                                            >
                                                <Text style={GlobalStyles.smallText}>Cancel</Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                </Modal>
                                <Pressable style={styles.studentSelector} onPress={() => changeModalSubLevelVisibility(true, qIndex)}>
                                    <Text style={[GlobalStyles.smallText, { fontSize: hp('2%'), }]}>{modalSubLevelSelected[qIndex]}</Text>
                                    <MaterialIcons name={'arrow-drop-down'} size={20} color={Colors.secondaryHeader} />
                                </Pressable>
                            </View>


                            <View style={styles.outsideContainer}>
                                <Modal
                                    animationType="slide"
                                    transparent={true}
                                    visible={modalNumQuestionsVisible[qIndex]}
                                    onRequestClose={() => {
                                        changeModalNumQuestionsVisibility(!modalNumQuestionsVisible[qIndex], qIndex);
                                    }}
                                >
                                    <View style={GlobalStyles.ModalContainer}>
                                        <View style={GlobalStyles.ModalView}>
                                            <Text style={[GlobalStyles.smallText, { marginBottom: hp('2%'), fontSize: hp('2.5%') }]}>Number of questions:</Text>
                                            <ScrollView style={{ flexGrow: 1 }}>
                                                {numQuestions.map((n, nIndex) => {
                                                    return (
                                                        <Pressable onPress={() => changeNumQuestions(n, qIndex)}>
                                                            <Text style={[GlobalStyles.smallText, { padding: hp('0.5%') }]}>{n}</Text>
                                                        </Pressable>
                                                    )
                                                })}
                                            </ScrollView>
                                            <Pressable
                                                style={[GlobalStyles.buttonContainer, { backgroundColor: Colors.mainHeader, borderWidth: 0 }]}
                                                onPress={() => changeModalNumQuestionsVisibility(false, qIndex)}
                                            >
                                                <Text style={GlobalStyles.smallText}>Cancel</Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                </Modal>
                                <Pressable style={styles.studentSelector} onPress={() => changeModalNumQuestionsVisibility(true, qIndex)}>
                                    <Text style={[GlobalStyles.smallText, { fontSize: hp('2%'), }]}>{modalNumQuestionsSelected[qIndex]} questions</Text>
                                    <MaterialIcons name={'arrow-drop-down'} size={20} color={Colors.thirdHeader} />
                                </Pressable>
                            </View>




                            <View style={styles.outsideContainer}>
                                <Switch value={switchGradedSelected[qIndex]} color={Colors.thirdHeader}
                                    onValueChange={(val) => changeSwitchValue(val, qIndex)}

                                />
                            </View>
                        </ScrollView>
                    )
                })}
            </View>
            <View style={{marginVertical: hp('2%')}}>
                <TouchableOpacity style={[styles.createButton, { marginBottom: hp('3%'), paddingVertical: hp('1%') }]}
                    onPress={() => addQuestionsSet()}
                >
                    <Text style={styles.buttonSendText}>Add a new question</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: wp('5%') }}>
                    <View>
                        <Text style={GlobalStyles.smallText}># of QS: {totalNumber}</Text>
                        <Text style={GlobalStyles.smallText}>Average time/Q: {Math.round(((props.selectedTime / totalNumber) + Number.EPSILON) * 100) / 100} min</Text>
                    </View>
                    {showButton()}
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }, studentSelector: {
        flexDirection: 'row',
        paddingVertical: hp('0.8%'),
        borderRadius: hp('5%'),
        paddingHorizontal: wp('2.5%'),
        backgroundColor: Colors.grayBackGround,
        justifyContent: 'center',
        alignItems: 'center'
    }, outsideContainer: {
        marginHorizontal: wp('1%'),
    }, createButton: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: wp('5%'),
        paddingVertical: hp('0.3%'),
        borderWidth: wp('0.5%'),
        borderRadius: wp('10%'),
        borderColor: Colors.thirdHeader
    }, buttonSendText: {
        fontSize: hp('2%'),
        color: Colors.secondaryHeader
    }
})

const mapStateToProps = ({ QuestionsReducer }) => {
    return {
        QuestionsTitles: QuestionsReducer.QuestionsTitles,
        questionsTypes: QuestionsReducer.questionsTypes,
        addLoaded: QuestionsReducer.addLoaded,
    }
}

export default connect(mapStateToProps, { AddQuestionsToDB })(AssignedQuestion);
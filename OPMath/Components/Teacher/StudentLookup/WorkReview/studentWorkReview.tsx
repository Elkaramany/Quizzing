import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, Modal, Pressable, Image } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import StudentCreds from '../StudentInterface';
import { GlobalStyles, Colors } from '../../../Constants';
import { calculateScore, displayTime, calculateAverage } from '../../../Validators';
import { connect } from 'react-redux'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Switch } from 'react-native-paper';


interface Props {
    student: any[],
    questionsTypes: string[]
}

interface answerInfo {
    problemTitle: string,
    correctAnswer: string,
    studentAnswer: string,
    timeTaken: number,
    answerStatus: string,
    problemLink: string
}

const studentWorkReview: React.FC<Props> = props => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalAnswerVisible, setModalAnswerVisible] = useState(false);
    const [modalItems, setModalItems] = useState<answerInfo>();
    const [imageBorder, setImageBorder] = useState(Colors.CORRECT_COLOR)
    const [correctSwitch, setCorrectSwitch] = useState(true);
    const [inCorrectSwitch, setInCorrectSwitch] = useState(true);
    const [skippedSwitch, setSkippedSwitch] = useState(true);
    const [unAttemptedSwitch, setUnattemptedSwitch] = useState(true);
    const [selectedPacket, setSelectedPacket] = useState('Pre-Work')

    const renderItem = ({ item }) => {
        if (item.Test.packet == selectedPacket) {
            return (
                <View style={{ marginTop: hp('2%'), marginHorizontal: wp('1%') }}>
                    <Text style={[GlobalStyles.smallText, { textDecorationLine: 'underline' }]}>
                        {item.testDate}
                    </Text>
                    <FlatList
                        horizontal={true}
                        data={item.testAnsweringInfo}
                        renderItem={renderAnsweringInfo}
                    />
                </View>
            )
        }
    }

    const changeModalView = (item) => {
        if(item.answerStatus == 'Correct'){
            setImageBorder(Colors.CORRECT_COLOR)
        }else if(item.answerStatus == 'Incorrect'){
            setImageBorder(Colors.INCORRECT_COLOR)
        }else if(item.answerStatus == 'Skipped'){
            setImageBorder(Colors.SkIPPED_COLOR)
        }else if(item.answerStatus == 'Unattempted'){
            setImageBorder(Colors.UNATTEMPTED_COLOR)
        }
        setModalItems(item)
        setModalAnswerVisible(true)
    }

    const modalAnswerView = () => {
        if (modalItems) {
            return (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalAnswerVisible}
                    onRequestClose={() => {
                        setModalAnswerVisible(!modalAnswerVisible);
                    }}
                >
                    <View style={GlobalStyles.ModalContainer}>
                        <View style={[GlobalStyles.ModalView, { height: hp('80%'), width: wp('90%'), justifyContent: 'center' }]}>
                            <Text style={[GlobalStyles.smallText, { fontSize: hp('2.5%'), bottom: hp('12%') }]}>{modalItems.problemTitle}</Text>
                            {displayImage(modalItems.problemLink)}
                            <View style={{ justifyContent: 'center', alignItems: 'center', height: hp('20%') }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: wp('80%') }}>
                                    <Text style={GlobalStyles.smallText}>Student's answer: {modalItems.studentAnswer}</Text>
                                    <Text style={GlobalStyles.smallText}>Correct answer: {modalItems.correctAnswer}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: wp('80%') }}>
                                    <Text style={GlobalStyles.smallText}>Answer status: {modalItems.answerStatus}</Text>
                                    <Text style={GlobalStyles.smallText}>Time taken: {modalItems.timeTaken} secs</Text>
                                </View>
                            </View>
                            <Pressable
                                style={[GlobalStyles.buttonContainer, { backgroundColor: Colors.mainHeader, borderWidth: 0 }]}
                                onPress={() => setModalAnswerVisible(!modalAnswerVisible)}
                            >
                                <Text style={GlobalStyles.smallText}>Done</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            )
        }
    }

    const displayImage = (imageLink: string) => {
        if (imageLink && imageLink.length != 0) {
            return (
                <Image
                    style={{ width: wp('50%'), height: hp('20%'), borderRadius: wp('5%'), borderColor: imageBorder, borderWidth: wp('1%') }}
                    source={{ uri: imageLink }}
                    defaultSource={require('../../../../Assets/Images/Default.png')}
                />
            )
        }
    }

    const renderAnsweringInfo = ({ item }) => {
        if (item.answerStatus == 'Correct' && correctSwitch == true) {
            return (
                <View>
                    <Pressable style={[styles.singlePacketContainer, { borderColor: Colors.CORRECT_COLOR }]}
                        onPress={() => changeModalView(item)}
                    >
                        <Text style={[GlobalStyles.smallText, { color: 'black' }]}>Answered: {item.studentAnswer}</Text>
                    </Pressable>
                    {modalAnswerView()}
                </View>
            )
        }
        if (item.answerStatus == 'Incorrect' && inCorrectSwitch == true) {
            return (
                <View>
                    <Pressable style={[styles.singlePacketContainer, { borderColor: Colors.INCORRECT_COLOR }]}
                        onPress={() => changeModalView(item)}
                    >
                        <Text style={[GlobalStyles.smallText, { color: 'black' }]}>Answered: {item.studentAnswer}</Text>
                    </Pressable>
                    {modalAnswerView()}
                </View>
            )
        }
        if (item.answerStatus == 'Skipped' && skippedSwitch == true) {
            return (
                <View>
                    <Pressable style={[styles.singlePacketContainer, { borderColor: Colors.SkIPPED_COLOR }]}
                        onPress={() => changeModalView(item)}>
                        <Text style={[GlobalStyles.smallText, { color: 'black' }]}>Answered: Empty Answer</Text>
                    </Pressable>
                    {modalAnswerView()}
                </View>
            )
        }
        if (item.answerStatus == 'Unattempted' && unAttemptedSwitch == true) {
            return (
                <View>
                    <Pressable style={[styles.singlePacketContainer, { borderColor: Colors.UNATTEMPTED_COLOR }]}
                        onPress={() => changeModalView(item)}>
                        <Text style={[GlobalStyles.smallText, { color: 'black' }]}>Answered: Unattempted</Text>
                    </Pressable>
                    {modalAnswerView()}
                </View>
            )
        }
    }

    const changePacket = (item) => {
        setSelectedPacket(item)
        setModalVisible(false);
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ marginHorizontal: wp('1%') }}>
                        <Switch value={correctSwitch} color={Colors.CORRECT_COLOR}
                            onValueChange={(val) => setCorrectSwitch(val)}
                        />
                    </View>
                    <View style={{ marginHorizontal: wp('1%') }}>
                        <Switch value={inCorrectSwitch} color={Colors.INCORRECT_COLOR}
                            onValueChange={(val) => setInCorrectSwitch(val)}
                        />
                    </View>
                    <View style={{ marginHorizontal: wp('1%') }}>
                        <Switch value={skippedSwitch} color={Colors.SkIPPED_COLOR}
                            onValueChange={(val) => setSkippedSwitch(val)}
                        />
                    </View>
                    <View style={{ marginHorizontal: wp('1%') }}>
                        <Switch value={unAttemptedSwitch} color={Colors.UNATTEMPTED_COLOR}
                            onValueChange={(val) => setUnattemptedSwitch(val)}
                        />
                    </View>
                </View>
                <View style={{ backgroundColor: 'rgb(75,75,75)', borderRadius: wp('5%'), margin: wp('2%') }}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={GlobalStyles.ModalContainer}>
                            <View style={GlobalStyles.ModalView}>
                                <Text style={[GlobalStyles.smallText, { marginBottom: hp('2%'), fontSize: hp('2.5%') }]}>Select packet type:</Text>
                                {props.questionsTypes.map((item, index) => {
                                    return (
                                        <Pressable onPress={() => changePacket(item)} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={[GlobalStyles.smallText, { padding: hp('0.5%') }]}>{item}</Text>
                                        </Pressable>
                                    )
                                })}
                                <Pressable
                                    style={[GlobalStyles.buttonContainer, { backgroundColor: Colors.mainHeader, borderWidth: 0 }]}
                                    onPress={() => setModalVisible(!modalVisible)}
                                >
                                    <Text style={GlobalStyles.smallText}>Cancel</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                    <Pressable style={styles.studentSelector} onPress={() => setModalVisible(true)}>
                        <Text style={[GlobalStyles.smallText, { fontSize: hp('2%'), }]}>{selectedPacket}</Text>
                        <MaterialIcons name={'arrow-drop-down'} size={20} color={Colors.secondaryHeader} />
                    </Pressable>
                </View>
            </View>
            <View style={{ marginBottom: hp('3%') }}>
                <FlatList
                    data={props.student}
                    renderItem={renderItem}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(42,42,42)',
        alignItems: 'center',
        width: '100%',
        borderRadius: wp('10%'),
    }, studentSelector: {
        flexDirection: 'row',
        paddingHorizontal: wp('2.5%'),
        paddingVertical: hp('1%'),
        borderRadius: hp('5%'),
        justifyContent: 'center',
        alignItems: 'center'
    }, singlePacketContainer: {
        marginHorizontal: wp('1%'),
        backgroundColor: '#fff',
        paddingHorizontal: wp('15%'),
        paddingVertical: hp('5%'),
        borderRadius: wp('2%'),
        marginTop: hp('1%'),
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: wp('1%'),
        borderBottomWidth: wp('1%'),
    }, questionImage: {
        width: wp('20%'),
        height: hp('10%'),
        marginVertical: hp('1.5%'),
        borderRadius: wp('5%'),
        alignSelf: 'center',
    },
})

const mapStateToProps = ({ QuestionsReducer }) => {
    return {
        questionsTypes: QuestionsReducer.questionsTypes
    }
}

export default connect(mapStateToProps)(studentWorkReview);
import React, { useState } from 'react'
import { View, Text, StyleSheet, Modal, FlatList, Pressable } from 'react-native'
import { connect } from 'react-redux'
import StudentInterface from '../StudentInterface';
import { Colors, GlobalStyles } from '../../../Constants';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Pie from 'react-native-pie'
import {calculateScore,displayTime, calculateAverage} from '../../../Validators';

interface Props {
    student: any[],
    questionsTypes: string[]
}

const StatsPacketPrep: React.FC<Props> = props => {

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedPacket, setSelectedPacket] = useState('Pre-Work')

    const renderItem = ({ item }) => {
        if (item.Test.packet == selectedPacket) {
            return (
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginHorizontal: wp('3%') }}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={[GlobalStyles.smallText, { textDecorationLine: 'underline' }]}>{item.testDate}</Text>
                        <Text style={GlobalStyles.smallText}>Score: {(calculateScore(item.testScore) / item.Test.totalNumber) * 100}%</Text>
                        <Text style={GlobalStyles.smallText}># of QS: {item.Test.totalNumber}</Text>
                        <Text style={GlobalStyles.smallText}>Time: {displayTime((item.Test.time * 60) - item.testTime)} minutes</Text>
                        <Text style={GlobalStyles.smallText}>Average: {calculateAverage(item.Test.time * 60, item.testTime, item.Test.totalNumber)} sec</Text>
                    </View>
                    {renderTestScores(item)}
                </View>
            )
        } else return <View style={{ height: 0.01, width: 0.01 }}></View>
    }

    const renderTestScores = (packet) => {
        return packet.testScore.map((item, index) => {
            return (
                <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: wp('2%') }} key={index}>
                    <Text style={[GlobalStyles.smallText, { marginBottom: hp('1%') }]}>{packet.Test.Questions[index].subLevel}</Text>
                    <Pie
                        radius={40}
                        sections={[
                            {
                                percentage: item.correct / item.total * 100,
                                color: Colors.CORRECT_COLOR,
                            },
                            {
                                percentage: item.inCorrect / item.total * 100,
                                color: Colors.INCORRECT_COLOR,
                            },
                            {
                                percentage: item.skipped / item.total * 100,
                                color: Colors.SkIPPED_COLOR,
                            },
                            {
                                percentage: item.unAttempted / item.total * 100,
                                color: Colors.UNATTEMPTED_COLOR,
                            },
                        ]}
                        strokeCap={'butt'}
                    />
                    <Text style={[GlobalStyles.smallText, { marginTop: hp('1%') }]}># of QS: {item.total}</Text>
                </View>
            )
        })
    }

    const changePacket = (item) => {
        setSelectedPacket(item)
        setModalVisible(false);
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row' }}>
                    <View>
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
                        <View style={{ justifyContent: 'flex-end' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={[styles.colorContainer, { backgroundColor: Colors.CORRECT_COLOR }]} />
                                <Text style={GlobalStyles.smallText}>   Correct</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={[styles.colorContainer, { backgroundColor: Colors.INCORRECT_COLOR }]} />
                                <Text style={GlobalStyles.smallText}>   Incorrect</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={[styles.colorContainer, { backgroundColor: Colors.SkIPPED_COLOR }]} />
                                <Text style={GlobalStyles.smallText}>   Skipped</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={[styles.colorContainer, { backgroundColor: Colors.UNATTEMPTED_COLOR }]} />
                                <Text style={GlobalStyles.smallText}>   Unattempted</Text>
                            </View>
                        </View>
                    </View>
                    <FlatList
                        data={props.student}
                        renderItem={renderItem}
                        horizontal={true}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: hp('20%'),
        width: '100%',
        borderRadius: wp('5%'),
        backgroundColor: 'rgb(42,42,42)'
    }, studentSelector: {
        flexDirection: 'row',
        paddingHorizontal: wp('2.5%'),
        paddingVertical: hp('1%'),
        borderRadius: hp('5%'),
        justifyContent: 'center',
        alignItems: 'center'
    }, colorContainer: {
        width: wp('5%'),
        height: wp('5%'),
        marginVertical: hp('0.2%'),
        marginLeft: wp('3%')
    },
})

const mapStateToProps = ({ QuestionsReducer }) => {
    return {
        questionsTypes: QuestionsReducer.questionsTypes
    }
}

export default connect(mapStateToProps, {})(StatsPacketPrep);
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, Modal, Pressable, ScrollView } from 'react-native'
import { fetchAllStudents } from '../../../Redux/actions';
import { connect } from 'react-redux'
import HeaderArrow from '../../common/HeaderArrow';
import { GlobalStyles, Colors, isTablet, WIDTH } from '../../Constants';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StackNavigationProp } from '@react-navigation/stack'
import Spinner from '../../common/Spinner';

import StudentOverview from './OverView/studentOverview';
import StudentManageTaskDeskigns from './ManageTasks/studentManageTaskDeskigns';
import StudentPacketPrep from './PacketPrep/studentPacketPrep';
import StudentPacketScores from './PacketScores/studentPacketScores';
import StudentProgressReport from './ProgressReport/studentProgressReport';
import StudentWorkReview from './WorkReview/studentWorkReview';
import TwoModals from '../../common/TwoModals';

interface Props {
    navigation: StackNavigationProp<any, any>,
    allStudents: any[],
    studentsLoaded: boolean
    fetchAllStudents: () => void
}

let arr = [
    {
        name: 'Overview',
        destination: 'studentOverview',
        id: 0,
    }, {
        name: 'Progress Report',
        destination: 'studentProgressReport',
        id: 1,
    }, {
        name: 'Packet Score',
        destination: 'studentPacketScores',
        id: 2,
    }, {
        name: 'Work Review',
        destination: 'studentWorkReview',
        id: 3,
    }, {
        name: 'Packet Prep',
        destination: 'studentPacketPrep',
        id: 4,
    }, {
        name: 'Manage Task Designs',
        destination: 'studentManageTaskDeskigns',
        id: 5,
    }
]

const studentLookup: React.FC<Props> = props => {

    const [selectedStudent, setSelectedStudent] = useState(" ")
    const [modalNames, setModalNames] = useState(false);
    const [modalView, setModalView] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedReport, setSelectedReport] = useState('Overview')

    useEffect(() => {
        props.fetchAllStudents();
    }, [])

    useEffect(() => {
        if (props.allStudents && props.allStudents.length) {
            setSelectedStudent(props.allStudents[0].studentFirstName + ' ' + props.allStudents[0].studentLastName);
        }
    }, [props.allStudents])

    const sendMeBack = () => {
        props.navigation.goBack()
    }

    const changeStudent = (itemValue, itemIndex) => {
        setSelectedStudent(itemValue.studentFirstName + ' ' + itemValue.studentLastName);
        setSelectedIndex(itemIndex)
        setModalNames(false)
    }

    const changeReport = (itemValue, index) => {
        setSelectedReport(itemValue)
        setModalView(false)
    }

    const showStudentTab = () => {
        switch (selectedReport) {
            case ('Overview'):
                return <StudentOverview student={props.allStudents[selectedIndex]} />
            case ('Progress Report'):
                return <StudentProgressReport student={props.allStudents[selectedIndex].finishedAssignments.reverse()}/>
            case ('Packet Score'):
                return <StudentPacketScores student={props.allStudents[selectedIndex]} />
            case ('Work Review'):
                return <StudentWorkReview student={props.allStudents[selectedIndex].finishedAssignments.reverse()}/>
            case ('Packet Prep'):
                return <StudentPacketPrep student={props.allStudents[selectedIndex]} />
            case ('Manage Task Designs'):
                return <StudentManageTaskDeskigns student={props.allStudents[selectedIndex]} />
            default:
                return <StudentOverview />
        }
    }

    const showStudents = () => {
        return (
            <View>
                <TwoModals
                    firstModalVisible={modalNames}
                    setFirstModalVisibility={(modalView) => setModalNames(modalView)}
                    firstModalTitle={'Select student:'}
                    firstModalSelected={selectedStudent}
                    firstItemValue={props.allStudents.map((item, index) => {
                        return (
                            <Pressable onPress={() => changeStudent(item, index)}>
                                <Text style={[GlobalStyles.smallText, { padding: hp('0.5%'), fontSize: hp('2.5%') }]}>{item.studentFirstName} {item.studentLastName}</Text>
                            </Pressable>
                        )
                    })}
                    secondModalVisible={modalView}
                    setSecondModalVisibility={(modalView) => setModalView(modalView)}
                    secondModalTitle={'Select view:'}
                    secondModalSelected={selectedReport}
                    secondItemValue={arr.map((item, index) => {
                        return (
                            <Pressable onPress={() => changeReport(item.name, index)} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[GlobalStyles.smallText, { padding: hp('0.5%'), fontSize: hp('2.5%') }]}>{item.name}</Text>
                            </Pressable>
                        )
                    })}
                />
            </View>
        )
    }

    const showLoader = () => {
        if (props.studentsLoaded == false) {
            return (
                <View style={GlobalStyles.mainContainer}>
                    <Spinner size={false} />
                </View>
            )
        } else {
            if (props.allStudents) {
                if (props.allStudents.length == 0) {
                    return (
                        <View style={GlobalStyles.mainContainer}>
                            <Text style={GlobalStyles.smallText}>No students are added</Text>
                        </View>
                    )
                } else {
                    return (
                        <View style={{ flex: 1 }}>
                            { showStudents()}
                            { showStudentTab()}
                        </View>
                    )
                }
            }
        }
    }

    return (
        <View style={styles.container}>
            <HeaderArrow
                HeaderText={'Student Lookup'}
                HeaderStyle={GlobalStyles.headerContainer}
                TextEdited={[GlobalStyles.headerTextStyle, GlobalStyles.secondayrHeaderStyle,{left: isTablet == true ? WIDTH * 0.15 : WIDTH * 0.3}]}
                navigateMeBack={() => sendMeBack()}
                iconName={'arrow-left'}
                iconColor={Colors.secondaryHeader}
            />
            {showLoader()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#191919'
    }, studentSelector: {
        flexDirection: 'row',
        paddingHorizontal: wp('5%'),
        paddingVertical: hp('1%'),
        borderRadius: hp('5%'),
        backgroundColor: Colors.grayBackGround,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

const mapStateToProps = ({ TeacherReducer }) => {
    return {
        allStudents: TeacherReducer.allStudents,
        studentsLoaded: TeacherReducer.studentsLoaded
    }
}

export default connect(mapStateToProps, { fetchAllStudents })(studentLookup);
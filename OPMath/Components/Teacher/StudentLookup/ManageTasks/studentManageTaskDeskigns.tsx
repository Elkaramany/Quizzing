import React, { useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native'
import { Colors, GlobalStyles } from '../../../Constants'
import { connect } from 'react-redux'
import { deleteOnePacket } from '../../../../Redux/actions';
import StudentCreds from '../StudentInterface';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Header from '../../../common/Header';

interface Props {
    student: StudentCreds,
    deleteOnePacket: (index: number, student: StudentCreds) => void;
}

const studentManageTaskDeskigns: React.FC<Props> = props => {


    const deleteTask = (index) => {
        console.log(index)
        Alert.alert(
            "Are you sure",
            "Deleting a task cannot be undome",
            [
                {
                    text: "No",
                    onPress: () => { },
                },
                { text: "Yes", onPress: () => props.deleteOnePacket(index, props.student) }
            ]
        )
    }

    const renderItem = ({ item, index }) => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={GlobalStyles.smallText}>{item.packet}</Text>
                <TouchableOpacity style={[GlobalStyles.buttonContainer, { borderColor: 'tomato', paddingHorizontal: wp('5%') }]}
                    onPress={() => deleteTask(index)}
                >
                    <Text style={GlobalStyles.smallText}>Delete</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const showActiveTasks = () => {
        if (props.student.activeAssignments.length == 0) {
            return <Text style={[GlobalStyles.smallText, {textAlign: 'center'}]}>There are no currently assigned tasks for this student</Text>
        } else {
            return (
                <FlatList
                    contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                    data={props.student.activeAssignments}
                    renderItem={renderItem}
                />
            )
        }
    }

    return (
        <View style={styles.container}>
            <Header
                HeaderText={'Currently assigned tasks'}
                HeaderStyle={{ backgroundColor: 'transparent' }}
                TextStyle={{ color: Colors.secondaryHeader, fontSize: hp('2.5%') }}
            />
            {showActiveTasks()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})


export default connect(null, { deleteOnePacket })(studentManageTaskDeskigns);
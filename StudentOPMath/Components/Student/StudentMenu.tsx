import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native'
import { connect } from 'react-redux'
import HeaderLogo from '../common/HeaderLogo';
import QuestionsMenu from './QuestionsMenu';
import { signMeOut, fetchAllQuestions } from '../../Redux/actions';
import { isTablet, GlobalStyles } from '../Constants'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StackNavigationProp } from '@react-navigation/stack'
import HomeworkMenu from './HomeworkMenu';
import { Colors } from '../Constants'

interface Props {
    activeAssignments: any[],
    firstName: string,
    lastName: string
    signMeOut: () => void,
    navigation: StackNavigationProp<any, any>,
    fetchAllQuestions: () => void;
}

const StudentMenu: React.FC<Props> = props => {

    const logOutFunctions = () => {
        console.log('clicked')
        props.signMeOut();
        props.navigation.navigate('Router')
    }

    const showMiddle = () => {
        if (props.activeAssignments.length == 0) {
            return (
                <View style={{ justifyContent: 'center', alignItems: 'center', top: hp('30%') }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                        All Complete!
                    </Text>
                    <Text style={{ fontSize: 15, textAlign: 'center' }}>
                        You have no incomplete assignments. Your instructor will assign your next tasks.
                    </Text>
                </View>
            )
        } else {
            props.fetchAllQuestions();
            let pack = props.activeAssignments[0]
            if (pack.packet === 'Learning' || pack.packet === 'Mastery' || pack.packet === 'Test'
                || pack.packet === 'Custom' || pack.packet === 'Pre-Work') {
                return (
                    <QuestionsMenu packet={pack} navigation={props.navigation} />
                )
            } else {
                return <HomeworkMenu packet={pack} navigation={props.navigation} />
            }
        }
    }

    const showTopBar = () => {
        return (
            <View>
                <HeaderLogo />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: wp('5%'), alignItems: 'center' }}>
                    <Text style={styles.TopBarText}>Welcome {props.firstName}</Text>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.TopBarText}>{props.firstName} {props.lastName}</Text>
                        <TouchableOpacity style={styles.logoutButtonStyle}
                            onPress={() => logOutFunctions()}
                        >
                            <Text style={styles.TopBarText}>Log off</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: Colors.mainBackground }}>
            {showTopBar()}
            {showMiddle()}
        </View>
    )

}

const styles = StyleSheet.create({
    logoutButtonStyle: {
        paddingHorizontal: hp('2%'),
        paddingVertical: hp('0.5%'),
        borderColor: 'red',
        borderWidth: wp('0.5%'),
        borderRadius: wp('10%'),
    }, TopBarText: {
        fontSize: hp('2%')
    }
})

const mapStateToProps = ({ SignInReducer }) => {
    return {
        activeAssignments: SignInReducer.activeAssignments,
        firstName: SignInReducer.firstName,
        lastName: SignInReducer.lastName
    }
}

export default connect(mapStateToProps, { signMeOut, fetchAllQuestions })(StudentMenu);
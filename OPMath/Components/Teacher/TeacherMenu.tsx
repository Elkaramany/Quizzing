import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { connect } from 'react-redux';
import { signMeOut } from '../../Redux/actions'
import { Colors, GlobalStyles } from '../Constants';
import HeaderLogo from '../common/HeaderLogo';
import { StackNavigationProp } from '@react-navigation/stack'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


interface Props {
    firstName: string,
    lastName: string,
    signMeOut: () => void,
    navigation: StackNavigationProp<any, any>,
}


//The name is the button's name to be appear on the screen, destination is what the component to be navigated to
//is called in the navigator
let arr = [
    {
        name: 'New Student Profile',
        destination: 'studentProfile',
        id: 0,
    }, {
        name: 'Question & Answer Banks',
        destination: 'allQuestions',
        id: 1,
    }, {
        name: 'Student Lookup',
        destination: 'studentLookup',
        id: 2,
    },
]

const TeacherMenu: React.FC<Props> = props => {

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={GlobalStyles.buttonContainer}
                onPress={() => props.navigation.navigate(item.destination)}
            >
                <Text style={[GlobalStyles.buttonText, { textAlign: 'center', paddingVertical: hp('2%') }]}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    const logOutFunctions = () => {
        props.signMeOut();
        props.navigation.navigate('Router')
    }

    return (
        <View style={styles.container}>
            <HeaderLogo />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: hp('2%') }}>
                <Text style={[GlobalStyles.smallText, { fontSize: hp('2.5%') }]}>Welcome, {props.firstName}!</Text>
                <TouchableOpacity style={[GlobalStyles.buttonContainer, styles.logoutButtonStyle]}
                    onPress={() => logOutFunctions()}
                >
                    <Text style={GlobalStyles.buttonText}>Log off</Text>
                </TouchableOpacity>
            </View>
            <View style={{ top: hp('18%') }}>
                <FlatList
                    data={arr}
                    renderItem={renderItem}
                    keyExtractor={dest => dest.id.toString()}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.mainBackground,
        paddingHorizontal: hp('1%')
    }, logoutButtonStyle: {
        paddingHorizontal: hp('2%'),
        borderColor: 'red'
    },
    TeacherMenuButton: {
        padding: wp('0%'),
        borderWidth: wp('0.8%'),
        paddingVertical: hp('5%'),
        paddingHorizontal: wp('10%'),
        borderColor: Colors.thirdHeader,

    }
})

const mapStateToProps = ({ SignInReducer }) => {
    return {
        firstName: SignInReducer.firstName,
        lastName: SignInReducer.lastName
    }
}

export default connect(mapStateToProps, { signMeOut })(TeacherMenu);
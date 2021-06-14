import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Colors, GlobalStyles } from '../Constants';
import {signMeOut} from '../../Redux/actions';
import { StackNavigationProp } from '@react-navigation/stack';

interface Props {
    signMeOut: () => void,
    navigation: StackNavigationProp<any, any>,
}

const StudentMenu: React.FC<Props> = props => {

    const logOutFunctions = () => {
        props.signMeOut();
        props.navigation.navigate('Router')
    }

    return (
        <View style={styles.container}>
            <Text style={GlobalStyles.smallText}>Students are not allowed to use this app</Text>
            <TouchableOpacity style={[GlobalStyles.buttonContainer, { borderColor: 'tomato' }]}
                onPress={() => logOutFunctions()}
            >
                <Text style={GlobalStyles.smallText}>Log off</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.mainBackground
    },
})


export default connect(null, {signMeOut})(StudentMenu);
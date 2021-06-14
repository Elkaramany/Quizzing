import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import {GlobalStyles} from '../Constants'
import {connect} from 'react-redux'
import {signMeOut} from '../../Redux/actions';
import { StackNavigationProp } from '@react-navigation/stack'


const ClosedStudent: React.FC<{ route: any, signMeOut: () => void, navigation: StackNavigationProp<any, any>, }> = props => {

    const SignOut =()=>{
        props.signMeOut();
        props.navigation.navigate('Router')
    }

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Text style={{ color: 'tomato', fontSize: 20, textAlign: 'center' }}>{props.route.params.CPText}</Text>
            <TouchableOpacity style={[GlobalStyles.buttonContainer, {borderColor: 'red'}]}
                onPress={() => SignOut()}
            >
                <Text style={GlobalStyles.buttonText}>SignOut</Text>
            </TouchableOpacity>
        </View>
    )
}



export default connect (null, {signMeOut})(ClosedStudent);
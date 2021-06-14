import React from 'react';
import {View, Text, Dimensions, Platform, ViewStyle, TextStyle, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../Constants';

const WIDTH = Dimensions.get('window').width;

interface Props{
    HeaderStyle?: ViewStyle;
    TextStyle?: TextStyle;
    HeaderText:string;
    iconName: string;
    TextEdited?: TextStyle | any;
    iconColor: string;
    navigateMeBack: () => void;
}

const HeaderArrow: React.FC<Props> =  (props) =>{
    return(
        <View style={[styles.HeaderContainer, props.HeaderStyle]}>
            <Icon name={props.iconName} size={30} color={props.iconColor} onPress={() => props.navigateMeBack()}/>
            <Text style={[styles.TextStyle, props.TextEdited]}>
                {props.HeaderText}
            </Text>
        </View>
    )
}


const styles = StyleSheet.create({
    HeaderContainer:{
        flexDirection: 'row',
        marginTop: hp('1%'),
        backgroundColor: 'transparent',
    },
    TextStyle:{
        fontSize: hp('4%'),
        fontWeight: '500',
        textAlign: 'center',
        color: Colors.mainHeader,
        left: WIDTH * 0.25
    }
})

export default HeaderArrow;
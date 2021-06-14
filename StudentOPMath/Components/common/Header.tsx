import React from 'react';
import {View, Text, ViewStyle, TextStyle, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

interface Props{
    HeaderStyle?: ViewStyle;
    TextStyle?: TextStyle | any;
    HeaderText:string;
}

const Header: React.FC<Props> =  ({HeaderStyle, TextStyle, HeaderText}) =>{
    return(
        <View style={[styles.HeaderContainer, HeaderStyle]}>
            <Text style={[styles.TextStyle, TextStyle]}>
                {HeaderText}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    HeaderContainer:{
        backgroundColor: '#f8f8f8',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp('1%'),
    },
    TextStyle:{
        fontSize: hp('4%'),
        marginBottom: hp('2%'),
    }
})

export default Header;
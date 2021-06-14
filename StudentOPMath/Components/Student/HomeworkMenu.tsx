import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { GlobalStyles, isTablet } from '../Constants';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fetchAllQuestions } from '../../Redux/actions';
import Header from '../common/Header'
import { connect } from 'react-redux';
import { Colors } from 'react-native/Libraries/NewAppScreen';

interface Props {
    packet: any,
    navigation: any,
    fetchAllQuestions: () => void;
}

let arr = [
    {
        name: 'Practice 1',
        value: 'Homework1',
        ID: 0
    }, {
        name: 'Practice 2',
        value: 'Homework2',
        ID: 1
    }, {
        name: 'Practice 3',
        value: 'Homework3',
        ID: 2
    },
]

const HomeworkMenu: React.FC<Props> = props => {

    const [COL, setCOL] = useState(1)

    useEffect(() => {
        if (isTablet) {
            setCOL(3)
        }
    }, [])

    const NavigateToPacket = (item) => {
        props.fetchAllQuestions();
        if (props.packet.packet == item.value) {
            props.navigation.navigate('PreQuestions', {
                Question: props.packet
            })
        }
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={{
                borderColor:'rgb(174,205,141)',
                borderWidth: wp('0.5%'),
                backgroundColor: props.packet.packet == item.value ? 'rgb(174,206,146)' : 'transparent',
                borderRadius: wp('3%'),
                paddingVertical: hp('25%'),
                paddingHorizontal: wp('20%'),
                marginHorizontal: wp('5%')
            }}
                onPress={() => NavigateToPacket(item)}
            >
                <Text style={[GlobalStyles.buttonText, { textAlign: 'center', paddingVertical: hp('2%') }]}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{backgroundColor: Colors.mainBackground}}>
            <Header
            HeaderStyle={{backgroundColor: 'transparent'}}
            HeaderText={'Your mission'}
            />
            <Text style={[GlobalStyles.buttonText, { textAlign: 'center', fontSize: wp('3.5%') }]}>Complete these assignments before your next center visit!</Text>
            <Text style={[GlobalStyles.buttonText, { textAlign: 'center', fontSize: wp('3.5%'), marginBottom: hp('1%')}]}>You decide when to do them, But you must complete each practice fully in one go once you start it.</Text>
            <FlatList
                data={arr}
                horizontal={true}
                renderItem={renderItem}
                numColumns={COL}
                keyExtractor={dest => dest.ID.toString()}
            />
        </View>
    )
}


export default connect(null, { fetchAllQuestions })(HomeworkMenu)
import React from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { GlobalStyles, isTablet } from '../Constants';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fetchAllQuestions } from '../../Redux/actions';
import { connect } from 'react-redux';

interface Props {
    packet: any,
    navigation: any,
    fetchAllQuestions: () => void;
}

let arr = [
    {
        name: 'Pre-Work',
        value: 'Pre-Work',
        ID: 0
    }, {
        name: 'Learning Packet',
        value: 'Learning',
        ID: 1
    }, {
        name: 'Mastery Packet',
        value: 'Mastery',
        ID: 2
    }, {
        name: 'Test',
        value: 'Test',
        ID: 3
    }, {
        name: 'Custom',
        value: 'Custom',
        ID: 4
    },
]

const QuestionsMenu: React.FC<Props> = props => {

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
            <TouchableOpacity style={[GlobalStyles.buttonContainer, { backgroundColor: props.packet.packet == item.value ? 'rgb(174,206,146)' : 'transparent', 
            marginHorizontal: wp('20%'), marginVertical: isTablet == true ? 0 : hp('2%')  }]}
                onPress={() => NavigateToPacket(item)}
            >
                <Text style={[GlobalStyles.buttonText, { textAlign: 'center', paddingVertical: hp('1%') }]}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', top: isTablet == true ? 0: hp('10%') }}>
            <FlatList
                data={arr}
                renderItem={renderItem}
                keyExtractor={dest => dest.ID.toString()}
            />
        </View>
    )
}


export default connect(null, { fetchAllQuestions })(QuestionsMenu)
import React, {useEffect} from 'react'
import { View, Text, StyleSheet, Modal, Pressable, ScrollView, ViewStyle } from 'react-native'
import { GlobalStyles, Colors } from '../Constants';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

interface Props {
    firstModalTitle: string,
    firstItemValue: any
    firstModalSelected: string
    firstModalVisible: boolean,
    setFirstModalVisibility: (modalView: boolean) => void;
    secondModalTitle: string,
    secondItemValue: any,
    secondModalSelected: string | number,
    secondModalVisible: boolean,
    setSecondModalVisibility: (modalView: boolean) => void;
    TwoModalsStyle?: ViewStyle,
    modalViewStyle?: ViewStyle,
}

const TwoModals: React.FC<Props> = props => {

    const { firstModalVisible, setFirstModalVisibility,
        secondModalVisible, setSecondModalVisibility,
    } = props;

    return (
        <View style={[{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: hp('1%') }, props.TwoModalsStyle]}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={firstModalVisible}
                onRequestClose={() => {
                    setFirstModalVisibility(!firstModalVisible);
                }}
            >
                <View style={GlobalStyles.ModalContainer}>
                    <View style={GlobalStyles.ModalView}>
                        <Text style={[GlobalStyles.smallText, { marginBottom: hp('2%'), fontSize: hp('2.5%') }]}>{props.firstModalTitle}</Text>
                        <ScrollView style={{ flexGrow: 1 }}>
                            {props.firstItemValue}
                        </ScrollView>
                        <Pressable
                            style={[GlobalStyles.buttonContainer, { backgroundColor: Colors.mainHeader, borderWidth: 0 }]}
                            onPress={() => setFirstModalVisibility(!firstModalVisible)}
                        >
                            <Text style={GlobalStyles.smallText}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Pressable style={[styles.studentSelector, props.modalViewStyle]} onPress={() => setFirstModalVisibility(true)}>
                <Text style={[GlobalStyles.smallText, { fontSize: hp('2%'), }]}>{props.firstModalSelected}</Text>
                <MaterialIcons name={'arrow-drop-down'} size={20} color={Colors.secondaryHeader} />
            </Pressable>
            <Modal
                animationType="slide"
                transparent={true}
                visible={secondModalVisible}
                onRequestClose={() => {
                    setSecondModalVisibility(!secondModalVisible);
                }}
            >
                <View style={GlobalStyles.ModalContainer}>
                    <View style={GlobalStyles.ModalView}>
                        <Text style={[GlobalStyles.smallText, { marginBottom: hp('2%'), fontSize: hp('2.5%') }]}>{props.secondModalTitle}</Text>
                        <ScrollView style={{ flexGrow: 1, }}>
                            {props.secondItemValue}
                        </ScrollView>
                        <Pressable
                            style={[GlobalStyles.buttonContainer, { backgroundColor: Colors.mainHeader, borderWidth: 0 },]}
                            onPress={() => setSecondModalVisibility(!secondModalVisible)}
                        >
                            <Text style={GlobalStyles.smallText}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Pressable style={[styles.studentSelector, props.modalViewStyle]} onPress={() => setSecondModalVisibility(true)}>
                <Text style={[GlobalStyles.smallText, { fontSize: hp('2%'), }]}>{props.secondModalSelected}</Text>
                <MaterialIcons name={'arrow-drop-down'} size={20} color={Colors.secondaryHeader} />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }, studentSelector: {
        flexDirection: 'row',
        paddingHorizontal: wp('2.5%'),
        paddingVertical: hp('1%'),
        borderRadius: hp('5%'),
        backgroundColor: Colors.grayBackGround,
        justifyContent: 'center',
        alignItems: 'center'
    },
})


export default TwoModals;
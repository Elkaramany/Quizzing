import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, Image, Pressable, } from 'react-native'
import { connect } from 'react-redux'
import { Colors, GlobalStyles, WIDTH, isTablet } from '../../Constants';
import { fetchAllQuestions } from '../../../Redux/actions';
import LevelInterface from '../../../Redux/reducers/AllQuestions/LevelInterface';
import { StackNavigationProp } from '@react-navigation/stack';
import HeaderArrow from '../../common/HeaderArrow';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Spinner from '../../common/Spinner';
import TwoModals from '../../common/TwoModals';

interface Props {
    navigation: StackNavigationProp<any, any>,
    QuestionsArr: LevelInterface[],
    Level1Arr: LevelInterface[],
    Level2Arr: LevelInterface[],
    Level3Arr: LevelInterface[],
    Level4Arr: LevelInterface[],
    Level5Arr: LevelInterface[],
    QuestionsTitles: any[],
    fetchAllQuestions: () => void;
    questionsLoading: boolean
}

const allQuestions: React.FC<Props> = props => {
    const { QuestionsTitles } = props;

    const sendMeBack = () => props.navigation.goBack()

    const [selectedLevel, setSelectedLevel] = useState(QuestionsTitles[0][0])
    const [selectedLevelIndex, setSelectedLevelIndex] = useState(0);
    const [selectedSub, setSelectedSub] = useState(QuestionsTitles[0][1][0].name);
    const [modalLevelVisible, setModalLevelVisible] = useState(false);
    const [modalSubLevelVisible, setModalSubLevelVisible] = useState(false);

    const changeLevel = (itemValue, itemIndex) => {
        setSelectedLevel(itemValue[0])
        setSelectedLevelIndex(itemIndex);
        setModalLevelVisible(false);
    }

    useEffect(() => {
        props.fetchAllQuestions()
    }, [])

    const flatListArr = () => {
        switch (selectedLevel) {
            case ('1'):
                return props.Level1Arr
            case ('2'):
                return props.Level2Arr
            case ('3'):
                return props.Level3Arr
            case ('4'):
                return props.Level4Arr
            case ('5'):
                return props.Level5Arr
        }
    }

    const changeSubLevel = (itemValue, itemIndex) => {
        setSelectedSub(itemValue);
        setModalSubLevelVisible(false);
    }

    useEffect(() => {
        setSelectedSub(QuestionsTitles[selectedLevelIndex][1][0].name)
    }, [selectedLevelIndex])


    const renderItem = ({ item }) => {
        if (item) {
            if (item.SubLevel == selectedSub) {
                return (
                    <View style={styles.questionContainer}>
                        <View style={styles.singleQuestion}>
                            <Text style={GlobalStyles.smallText}># {item.Title}</Text>
                            <Text style={GlobalStyles.smallText}>     Answer: {item.Answer}</Text>
                        </View>
                        <Image
                            style={styles.questionImage}
                            source={{
                                uri: item.ImageLink,
                            }}
                            defaultSource={require('../../../Assets/Images/Default.png')}
                        />
                        <Text style={[GlobalStyles.smallText, { alignSelf: 'center', fontSize: hp('1.75%'), }]}>Instructions: {item.Instructions}</Text>
                    </View>
                )
            }
            //App bugs without this line
            else return <View style={{ height: 0.01, width: 0.01 }}></View>
        } else return <Spinner size={true} />
    }

    const showQuestions = () => {
        if (props.questionsLoading == true) {
            return (
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <Spinner size={false} />
                </View>
            )
        } else {
            return (
                <View>
                    <TwoModals
                        firstModalVisible={modalLevelVisible}
                        setFirstModalVisibility={(modalView) => setModalLevelVisible(modalView)}
                        firstModalTitle={'Level:'}
                        firstModalSelected={selectedLevel}
                        firstItemValue={QuestionsTitles.map((item, index) => {
                            return (
                                <Pressable onPress={() => changeLevel(item, index)}>
                                    <Text style={[GlobalStyles.smallText, { padding: hp('0.5%'), fontSize: hp('3%') }]}>{item[0]}</Text>
                                </Pressable>
                            )
                        })}
                        secondModalVisible={modalSubLevelVisible}
                        setSecondModalVisibility={(modalView) => setModalSubLevelVisible(modalView)}
                        secondModalTitle={'Sub-Level:'}
                        secondModalSelected={selectedSub}
                        secondItemValue={QuestionsTitles[selectedLevelIndex][1].map((item, index) => {
                            return (
                                <Pressable onPress={() => changeSubLevel(item.name, index)}>
                                    <Text style={[GlobalStyles.smallText, { padding: hp('0.5%') }]}>{item.name}</Text>
                                </Pressable>
                            )
                        })}
                    />
                    <FlatList
                        data={flatListArr()}
                        renderItem={renderItem}
                        keyExtractor={Q => Q.Title}
                    />
                </View>
            )
        }
    }

    return (
        <View style={styles.container}>
            <HeaderArrow
                HeaderText={'Questions and answers bank'}
                HeaderStyle={GlobalStyles.headerContainer}
                TextEdited={[GlobalStyles.headerTextStyle, GlobalStyles.bigHeaderStyle, { left: isTablet == true ? WIDTH * 0.3 : WIDTH * 0.1 }]}
                navigateMeBack={() => sendMeBack()}
                iconName={'arrow-left'}
                iconColor={Colors.secondaryHeader}
            />
            {showQuestions()}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.mainBackground
    }, row: {
        height: hp('10%')
    }, singleQuestion: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    }, questionContainer: {
        marginHorizontal: wp('4%'),
        padding: wp('1%'),
        marginBottom: hp('1%'),
        borderWidth: wp('0.5%'),
        borderColor: Colors.mainHeader,
        borderRadius: wp('5%')
    }, questionImage: {
        width: wp('56.25%'),
        height: hp('15%'),
        marginVertical: hp('1.5%'),
        borderRadius: wp('5%'),
        alignSelf: 'center',
    },
    LevelSelectorStyle: {
        flexDirection: 'row',
        paddingHorizontal: wp('10%'),
        paddingVertical: hp('1%'),
        borderRadius: hp('5%'),
        backgroundColor: Colors.grayBackGround,
    },
})

const mapStateToProps = ({ QuestionsReducer }) => {
    return {
        QuestionsArr: QuestionsReducer.QuestionsArr,
        Level1Arr: QuestionsReducer.Level1Arr,
        Level2Arr: QuestionsReducer.Level2Arr,
        Level3Arr: QuestionsReducer.Level3Arr,
        Level4Arr: QuestionsReducer.Level4Arr,
        Level5Arr: QuestionsReducer.Level5Arr,
        QuestionsTitles: QuestionsReducer.QuestionsTitles,
        questionsLoading: QuestionsReducer.questionsLoading,
    }
}

export default connect(mapStateToProps, { fetchAllQuestions })(allQuestions);
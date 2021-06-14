import React from 'react'
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import StudentCreds from '../StudentInterface';
import { GlobalStyles, Colors, isTablet } from '../../../Constants';
import { calculateScore, displayTime, calculateAverage } from '../../../Validators';
import Pie from 'react-native-pie'

interface Props {
    student: StudentCreds,
}

const studentPacketScores: React.FC<Props> = props => {

    const renderItem = ({ item }) => {
        return (
            <View style={{ marginTop: hp('2%') }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: wp('3%') }}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={GlobalStyles.smallText}>{item.Test.packet}</Text>
                        <Text style={[GlobalStyles.smallText, { textDecorationLine: 'underline', marginBottom: hp('3%') }]}>{item.testDate}</Text>
                        <Text style={GlobalStyles.smallText}>Score: {(calculateScore(item.testScore) / item.Test.totalNumber) * 100}%</Text>
                        <Text style={GlobalStyles.smallText}># of QS: {item.Test.totalNumber}</Text>
                        <Text style={GlobalStyles.smallText}>Time: {displayTime((item.Test.time * 60) - item.testTime)} minutes</Text>
                        <Text style={GlobalStyles.smallText}>Average: {calculateAverage(item.Test.time * 60, item.testTime, item.Test.totalNumber)} sec</Text>
                    </View>
                    <ScrollView style={{ flexGrow: 1 }}
                        horizontal={true}
                    >
                        {renderTestScores(item)}
                    </ScrollView>
                </View>
                <View style={{ flex: 1, borderColor: 'black', borderWidth: wp('0.25%'), marginTop: hp('2%') }} />
            </View>
        )
    }

    const renderTestScores = (packet) => {
        return packet.testScore.map((item, index) => {
            return (

                <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: wp('10%') }}>
                    <Text style={[GlobalStyles.smallText, { marginBottom: hp('1%') }]}>{packet.Test.Questions[index].subLevel}</Text>
                    <Pie
                        radius={isTablet == true ? 60 : 40}
                        sections={[
                            {
                                percentage: item.correct / item.total * 100,
                                color: Colors.CORRECT_COLOR,
                            },
                            {
                                percentage: item.inCorrect / item.total * 100,
                                color: Colors.INCORRECT_COLOR,
                            },
                            {
                                percentage: item.skipped / item.total * 100,
                                color: Colors.SkIPPED_COLOR,
                            },
                            {
                                percentage: item.unAttempted / item.total * 100,
                                color: Colors.UNATTEMPTED_COLOR,
                            },
                        ]}
                        strokeCap={'butt'}
                    />
                    <Text style={[GlobalStyles.smallText, { marginTop: hp('1%') }]}># of QS: {item.total}</Text>
                </View>
            )
        })
    }

    const showFlatListFooter = () => {
        return (
            <View style={{ flexDirection: 'row', marginTop: hp('2%')}}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={[styles.colorContainer, { backgroundColor: Colors.CORRECT_COLOR }]} />
                    <Text style={GlobalStyles.smallText}>   Correct</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={[styles.colorContainer, { backgroundColor: Colors.INCORRECT_COLOR }]} />
                    <Text style={GlobalStyles.smallText}>   Incorrect</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={[styles.colorContainer, { backgroundColor: Colors.SkIPPED_COLOR }]} />
                    <Text style={GlobalStyles.smallText}>   Skipped</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={[styles.colorContainer, { backgroundColor: Colors.UNATTEMPTED_COLOR }]} />
                    <Text style={GlobalStyles.smallText}>   Unattempted</Text>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={{ marginBottom: hp('3%') }}>
                <FlatList
                    data={props.student.finishedAssignments.reverse()}
                    renderItem={renderItem}
                />
                {showFlatListFooter()}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(42,42,42)',
        width: '100%',
        borderRadius: wp('10%'),
    }, colorContainer: {
        width: wp('3%'),
        height: wp('3%'),
        marginVertical: hp('0.2%'),
        marginLeft: wp('2%')
    },
})


export default studentPacketScores;
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Dimensions, Platform, StyleSheet } from 'react-native';

const WIDTH: number = Dimensions.get('window').width;
const HEIGHT: number = Dimensions.get('window').height;
const aspectRatio = HEIGHT / WIDTH;

const isTablet : boolean = aspectRatio < 1.6 ? true: false; 

const Colors = {
    mainBackground: 'rgb(0,0,0)',
    mainForeGround: '#216FD7',
    grayBackGround: 'rgb(51,51,51)',
    mainFooter: 'rgb(224,224,224)',
    mainHeader: 'rgb(126,171,221)',
    secondaryHeader: 'rgb(255,255,255)',
    thirdHeader: 'rgb(175,205,147)',
    errorColor: 'tomato',
    CORRECT_COLOR: 'rgb(146,207,72)',
    INCORRECT_COLOR: 'rgb(191,43,38)',
    SkIPPED_COLOR: 'rgb(245,230,81)',
    UNATTEMPTED_COLOR: 'rgb(91,144,220)',
}

const GlobalStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.mainBackground
    }, secondayrContainer: {
        justifyContent: 'center', alignItems: 'center', width: '100%'
    },
    textInputContainer: {
        marginBottom: hp('1%'),
        width: '90%',
        borderRadius: wp('50%'),
    }, headerTextStyle: {
        color: Colors.mainHeader,
        fontSize: wp('12%'),
        fontWeight: '700'
    }, buttonContainer: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        padding: wp('1%'),
        paddingHorizontal: wp('5%'),
        borderRadius: wp('50%'),
        margin: hp('1%'),
        borderWidth: wp('0.75%'),
        borderColor: Colors.thirdHeader
    }, buttonText: {
        fontSize: hp('3%'),
        fontWeight: '600',
        color: Colors.secondaryHeader
    }, textMissMatch: {
        color: Colors.secondaryHeader,
        fontSize: hp('2%'),
        fontWeight: 'bold',
        textAlign: 'center'
    }, headerContainer: {
        marginBottom: hp('2%'),
    }, secondayrHeaderStyle: {
        fontSize: hp('3%'),
        fontWeight: '500',
        color: Colors.secondaryHeader,
        position: 'absolute',
        textAlign: 'center',
    }, bigHeaderStyle: {
        fontSize: hp('3%'),
        fontWeight: '500',
        color: Colors.secondaryHeader,
        position: 'absolute',
        alignSelf: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    }, smallText: {
        fontSize: hp('1.7%'),
        color: Colors.secondaryHeader
    }, ModalContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }, ModalView: {
        width: wp('80%'),
        height: hp('60%'),
        borderWidth: wp('0.5%'),
        borderColor: '#fff',
        borderRadius: wp('10%'),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.mainBackground,
        paddingTop: hp('0.5%'),
        paddingHorizontal: wp('1%'),
    }, spinnerContainer: {
        height: hp('5%'),
        justifyContent: 'center',
        alignItems: 'center',
        margin: hp('5%'),
    },
})

const textInputTheme = {
    colors: {
        placeholder: Colors.mainForeGround, text: Colors.mainForeGround, primary: Colors.mainForeGround,
        underlineColor: Colors.mainForeGround, background: Colors.mainBackground
    }
}

export { Colors, textInputTheme, GlobalStyles, WIDTH, HEIGHT, isTablet };
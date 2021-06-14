import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { GlobalStyles, Colors } from '../Constants'
import Header from './Header'

interface Props {

}

const HeaderLogo: React.FC<Props> = props => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Header HeaderText={'Operation '} HeaderStyle={{ backgroundColor: 'transparent' }}
                TextStyle={[GlobalStyles.headerTextStyle, { color: Colors.secondaryHeader }]} />
            <Header HeaderText={'Ma'} HeaderStyle={{ backgroundColor: 'transparent' }}
                TextStyle={GlobalStyles.headerTextStyle} />
            <Header HeaderText={'['} HeaderStyle={{ backgroundColor: 'transparent' }}
                TextStyle={[GlobalStyles.headerTextStyle, { color: Colors.thirdHeader }]} />
            <Header HeaderText={'th'} HeaderStyle={{ backgroundColor: 'transparent' }}
                TextStyle={GlobalStyles.headerTextStyle} />
            <Header HeaderText={']'} HeaderStyle={{ backgroundColor: 'transparent' }}
                TextStyle={[GlobalStyles.headerTextStyle, { color: Colors.thirdHeader }]} />
        </View>
    )
}



export default HeaderLogo;
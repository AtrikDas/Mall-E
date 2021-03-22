import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Icon, SearchBar} from 'react-native-elements';

export default class Header extends React.Component {
    render() {
        return(
            <View style = {styles.header}>
                <LinearGradient colors={['#047580', '#A5F2F9']}
                style={styles.headerBackground}>
                    <Text style={{fontFamily: 'Roboto' ,fontSize: 24, color: 'white', marginTop: 15, marginBottom: -10}}>Mall-E</Text>
                    <View style = {styles.search}>
                        <Icon name="list"
                            type="feather"
                            size={40}>
                        </Icon>
                        <SearchBar placeholder="Type Here..."
                            style={styles.searchBox}
                            lightTheme="true"
                            platform="ios"
                            containerStyle={{backgroundColor: ['#047580', '#A5F2F9'], borderWidth: 0, width: "85%"}}>
                        </SearchBar>
                    </View>
                </LinearGradient>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '15%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    search: {
        width: '100%',
        flexDirection: 'row',
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },

    headerBackground: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
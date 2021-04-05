import React, { Component } from 'react';
import {
    Container, Header, Content, List, ListItem, Thumbnail,
    Text, Left, Body, Right, Button, Title
} from 'native-base';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import MallItemList from '../MallsTab/MallItemLayout';

const SettingsScreen = () => {

    const [name, setName] = useState([]);

    const [bookmarkList, bookMarkList] = useState([]);
    const [Loading, setLoading] = useState(true);

    //onPressReload = (async () => {
    onPressReload = (() => {

        AsyncStorage.getItem('bookmarks')
            .then((result) => {
                ;
                bookMarkList(JSON.parse(result));
                bookMarkListFiltered(bookmarkList);
            })
            .then(console.log("Bookmark list length :" + bookmarkList.length))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));

    }, [Loading]);


    onPressDelete = async () => {
        var value = await AsyncStorage.removeItem('bookmarks');
        setName(value)
        console.log(name)
    }

    return (
        <View
            style={styles.ContainerOne}
        >
            {
                Loading ? (
                    <ActivityIndicator />
                ) : (bookMarkListFiltered == null ? (
                    <Text>No Malls Found!</Text>
                ) : (
                    <Container>
                        <FlatList
                            style={{ flex: 1, paddingHorizontal: 10 }}
                            data={bookMarkListFiltered}
                            ItemSeparatorComponent={renderSeparator}
                            initialNumToRender={5}
                            renderItem={({ item, index }) => (<MallItemList mallItem={item} />)}
                            keyExtractor={(item) => item.place_id}
                        />
                    </Container>
                ))
            }
        </View>
    );

}

export default SettingsScreen;

const styles = StyleSheet.create({
    ContainerOne: {
        width: '100%',
        height: '100%',
    },
});

let renderSeparator = () => (
    <View
        style={{
            backgroundColor: 'grey',
            height: 0.5,
        }}
    />
);




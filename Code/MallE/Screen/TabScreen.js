import React, { Component } from 'react';
import { Container, Header, Content, Left, Body, Right, Title, Tab, Tabs } from 'native-base';

import Tab1 from './tabs/tab1';

export default class TabsExample extends Component {
    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: '#25CCDC' }} hasTabs>
                    <Left />
                    <Body >
                        <Title style={{ color: 'white' }} >News</Title>
                    </Body>
                    <Right />
                </Header>
                <Tabs tabBarUnderlineStyle={{ backgroundColor: 'white' }}>
                    <Tab tabStyle={{ backgroundColor: '#25CCDC' }} activeTabStyle={{ backgroundColor: '#25CCDC' }} textStyle={{ color: 'white' }} activeTextStyle={{ color: 'white' }} heading="NEWS">
                        <Tab1 />
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}
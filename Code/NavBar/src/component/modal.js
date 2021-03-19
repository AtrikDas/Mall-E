//import libraries
import React, { Component } from 'react';
import { Dimensions, Modal, Share, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';
import { Container, Header, Content, Body, Left, Icon, Right, Title, Button } from 'native-base';

const webViewHeight = Dimensions.get('window').height - 56;

// create a component
export default class ModalComponent extends Component {

    constructor(props) {
        super(props);
    }

    handleClose = () => {
        return this.props.onClose();
    }

    handleShare = () => {
        const { url, title } = this.props.articleData;
        message = `${title}\n\nRead More @${url}\n\nShared via MAll-E App`;
        return Share.share(
            { title, message, url: message },
            { dialogTitle: `Share ${title}` }
        );
    }

    render() {
        const { showModal, articleData } = this.props;
        const { url } = articleData;
        if (url != undefined) {
            return (
                <Modal
                    animationType="slide"
                    transparent
                    visible={showModal}
                    onRequestClose={this.handleClose}
                >
                    <Container style={{ margin: 15, marginBottom: 0, backgroundColor: '#fff' }}>
                        <Header style={{ backgroundColor: '#25CCDC' }}>
                            <Left>
                                <Button onPress={this.handleClose} transparent>
                                    <Icon name="close" style={{ color: 'white', fontSize: 18 }} />
                                </Button>
                            </Left>
                            <Body>
                                <Title children={articleData.title} style={{ color: 'white' }} />
                            </Body>
                            <Right>
                                <Button onPress={this.handleShare} transparent>
                                    <Icon name="share" style={{ color: 'white', fontSize: 18 }} />
                                </Button>
                            </Right>
                        </Header>
                        <Content contentContainerStyle={{ flexGrow: 1 }}>
                            <WebView source={{ uri: url }} style={{ flex: 1 }}
                                onError={this.handleClose} startInLoadingState
                                scalesPageToFit scrollEnabled
                            />
                        </Content>
                    </Container>
                </Modal>
            );
        } else {
            return null;
        }
    }
}



import React from 'react';
import { Text, StyleSheet } from 'react-native';
import {Container, Header, Title, Button, Icon, Left, Right, Body} from 'native-base';

export class MenuHeader extends React.Component {

  render() {
    return (
                <Header>
                    <Body style={styles.hackyHack}><Title>Menu</Title></Body>
                    <Right style={styles.hackyHack}>
                    <Button transparent>
                        <Icon name="ios-menu" />
                    </Button>
                    </Right>
                </Header>
    );
  }
}

const styles = StyleSheet.create({
	hackyHack: {
		flex: 1
	}
});

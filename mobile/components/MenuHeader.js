import React from 'react';
import { Text, StyleSheet } from 'react-native';
import {Container, Header, Title, Button, Icon, Left, Right, Body} from 'native-base';

export class MenuHeader extends React.Component {

  render() {
    let button = this.props.category ? 
                    (<Left>
                      <Button tranparent onPress={() => {this.props.onBackPressed({category: null, buttonPressed: 0})}}>
                        <Icon name="ios-arrow-back" />
                      </Button>
                    </Left>) : 
                    <Text></Text>
    return (
    
                <Header>
                    {button}
                    <Body style={styles.hackyHack}>
                      <Title>Menu{this.props.category ? ' - ' + this.props.category : ''}</Title>
                    </Body>
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

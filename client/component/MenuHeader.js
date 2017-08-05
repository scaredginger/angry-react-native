import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Container, Header, Title, Button, Icon, Left, Right, Body} from 'native-base';

export default class MenuHeader extends React.Component {

  render() {
    let buttonCheck = this.props.buttonPressed;
    console.log(buttonCheck);
    if(buttonCheck != 1 && buttonCheck != 3 && buttonCheck != 4) {
      var button = (<Left></Left>)
    } else{
      var button = (<Left>
                      <Button style={styles.simpleButton} tranparent onPress={() => {this.props.onBackPressed({category: null, buttonPressed: 0})}}>
                        <Text>Back</Text> 
                      </Button>
                    </Left>)
    }
    return (

                <Header style={styles.customHeader}>
                    {button}
                    <Body style={styles.hackyHack}>
                      <Title>Menu{this.props.category ? ' - ' + this.props.category : ''}</Title>
                    </Body>
                    <Right style={styles.hackyHack}>
                    <Button style={styles.simpleButton} transparent onPress={() => {this.props.onFilter({buttonPressed: 2})}}>
                        <Text>Filter</Text>
                    </Button>
                    </Right>
                </Header>
    );
  }
}

const styles = StyleSheet.create({
	hackyHack: {
		flex: 1
	},
  backButton: {
    fontSize: 20
  },
  simpleButton: {
    color: 'black',
    backgroundColor: '#45A0FD',
    borderRadius: 10,
    borderColor: 'gray',
    padding: 2
  },
  customHeader: {
    backgroundColor: "#49A7FD"
  }
});

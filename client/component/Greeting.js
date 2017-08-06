import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View
} from 'react-native';
import {
  Header,
  Body,
  Title,
  Card,
  CardItem,
  Button,
  Icon,
  Container,
  Content,
  Footer,
  List,
  ListItem
} from 'native-base';

export default class Greeting extends React.Component {

  render() {
      return <View style={styles.mainView}>
        {this.getRes()}
        {this.assistAndTable()}
        {this.menuButton()}
      </View>
  }

  getRes() {

    const theMenu = this.props.menu;
    const resName = theMenu["vendor"]["name"];

      return (
          <View style={styles.topView}>
          <Text style={styles.welcomeText}>Welcome to {resName}!</Text>
          </View>
      );
  }

  assistAndTable() {

    return (
        <View style={styles.middleView}>
        <Image style={styles.resImage} source={require('../uniHackLogo.png')}/>
        <View>
            <Text style={styles.tableText}> You are at Table Number: {this.props.tableNumber} </Text>
        </View>
        <View style={styles.assistance}>
            <Button style={styles.changeButton}><Text style={styles.buttonText}> Press for Assistance </Text></Button>
        </View>
        </View>
    );
  }

  menuButton() {
      return (
          <View style={styles.bottomView}>
              <Button style={styles.toMenuButton} onPress={() => {this.props.beginDine({buttonPressed: 0})}}><Text>I'm ready to Eat!</Text></Button>
          </View>
      );
  }

}

const styles = StyleSheet.create({
    mainView: {
        marginTop: 40,
        flex: 2
    },
    changeButton: {
        backgroundColor: "#49A7FD"
    },
    welcomeText: {
        fontSize: 32,
        textAlign: 'center'
    },
    tableText: {
        fontSize: 24
    },
    buttonText: {
        fontSize: 20
    },
    assistance: {
        alignSelf: 'center'
    },
    resImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain'
    },
    toMenuButton: {
        backgroundColor: "#49A7FD",
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
        padding: 40,
        fontSize: 28,
        alignSelf: 'stretch'
    },
    middleView: {
        marginTop: 20,
        alignSelf: 'center',
        flex: 3
    },
    bottomView: {
        flex: 2,
        justifyContent: 'flex-end'
    }
});
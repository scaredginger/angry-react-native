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
import { WebBrowser } from 'expo';
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

export default class MainMenu extends React.Component {
    
    getMainCats(mainCategory) {

      let catItems = [];
      for(let i = 0; i <  mainCategory.length; i++) {
        const cat = mainCategory[i];
        catItems.push(
          <ListItem><TouchableHighlight key={cat} onPress={() => {this.props.onPress({category: cat, buttonPressed: 1})}} underlayColor="gray"><Text> {cat} </Text></TouchableHighlight></ListItem>
        )
      }
      return catItems;
  }

  menuToCardView(menu, subIndex) {

  //first here, parse the JSON ready to be handled by the card views

  let mainCategory = [];

  for(let i in menu["vendor"]["menu"]["structure"]) {
      mainCategory.push(i);
  }

    return this.getMainCats(mainCategory);

}
  render() {
      return <View>
        {this.menuToCardView(this.props.menu)}
      </View>
  }
}
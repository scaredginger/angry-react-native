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

export default class SubMenu extends React.Component {
    
    render() {
        return (
            <View>
                {this.getFucked()}
            </View>
        );
    }

    getFucked() {

        subItems = this.props.category;
        console.log(subItems);
        let products = this.props.menu.vendor.menu.products;
        let goodMenuItems = [];

        for(let i = 0; i < products.length; i++) {
            let tags = products[i].tags;
            for(let j = 0; j < tags.length; j++) {
                let tag = tags[j];
                if(tag == subItems) {
                    //console.log(products[i]["name"]);
                    goodMenuItems.push(
                        <ListItem><Text>{products[i]["name"]}</Text></ListItem>
                    )
                    break;
                }
            }
        }
        //console.log(goodMenuItems);
        return goodMenuItems;
    }

}
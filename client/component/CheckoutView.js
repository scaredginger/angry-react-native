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
  Container,
  Content,
  Footer,
  List,
  Thumbnail,
  CheckBox,
  Left,
  Right,
  ListItem
} from 'native-base';

export default class CheckoutView extends React.Component {
    render(){
        return (
            <View style={styles.mainItemView}>
                {this.getCart()}
                <Button style={styles.bottomButton} onPress={this.sendOrder()}>
                    <Text>Send Order</Text>
                </Button>
            </View>
        );
    }

    getCart() {
        //read from menu by passing props of item
        const theMenu = this.props.menu;
        const items = theMenu.vendor.menu.products;

        let purchases = [];

        const cartItemIds = this.props.cartItemIds;
        for(let i = 0; i < cartItemIds.length; i+=2) {
            purchases.push(
                <ListItem>
                    <Left>
                <Text style={styles.itemName}>
                    {items[cartItemIds[i]]["name"]}
                </Text>
                </Left>
                <Right>
                <Text style={styles.priceText}>
                    {"$"+Math.floor(items[cartItemIds[i]]["price"]/100)+'.'+items[cartItemIds[i]]["price"]%100}
                </Text>
                </Right>
                </ListItem>
            );
        }

        //include in this the final cost as well as all items prices.

        return (
            <View>
                <Text style={styles.titleText} >Total Order</Text>
                <List>
                    {purchases}
                </List>
            </View>
        );
    }

    sendOrder() {

        var restaurant_id = this.props.resID;
        var orderUrl = "waitless.com/order/" + restaurant_id;

        //format the data for POST request then send

        

    }

}

const styles = StyleSheet.create({
    bottomButton: {
        alignSelf: 'stretch',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        backgroundColor: "#49A7FD"
    },
    titleText: {
        fontSize: 24
    },
    mainItemView: {
        marginTop: 20
    }
});
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
                <Text style={styles.money}>Total: {this.getTotal()}</Text>
                <Button style={styles.bottomButton} onPress={() => this.sendOrder()}>
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
        for(let i = 0; i < cartItemIds.length; i++) {
            purchases.push(
                <ListItem>
                    <Left>
                <Text style={styles.itemName}>
                    {items[cartItemIds[i]]["name"]}
                </Text>
                </Left>
                <Right>
                <Text style={styles.priceText}>
                    {"$"+Number(Math.floor(items[cartItemIds[i]]["price"]/100)+items[cartItemIds[i]]["price"]%100).toFixed(2)}
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

    getTotal() {

        const theMenu = this.props.menu;
        const items = theMenu.vendor.menu.products;
        const cartItemIds = this.props.cartItemIds;
        let total = 0

        for(let i = 0; i < cartItemIds.length; i++) {
            total += items[cartItemIds[i]]["price"];

        }

        let priceString = "$"+Number(Math.floor(total/100)+total%100).toFixed(2);

        return priceString;
    }

    sendOrder() {
        var orderURL = this.props.apiHost + "/order/" + this.props.resID;

        //format the data for POST request then send
        /*
          "item": "sandwhich",
                      "table": 2,
                      "created": time.strftime("%c")
                      "created": time.strftime("%c"),
                      "id": 420
        */
        var order = {
          "table": this.props.tableNumber,
          "items": []
        };

        for (i = 0; i < this.props.cartItemIds.length; i++) {
          order["items"].push({
            "name": this.props.menu.vendor.menu.products[this.props.cartItemIds[i]]["name"],
            "id": this.props.cartItemIds[i]
          });
        }

        console.log("SENDING ORDER", order)

        fetch(orderURL, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },

          body: JSON.stringify(order)
        })

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
    },
    money: {
        marginTop: 20,
        fontSize: 18
    }
});

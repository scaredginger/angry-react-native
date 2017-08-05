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
  ListItem
} from 'native-base';

let newCartItemIds;

export default class ItemView extends React.Component {
    render(){
        if(this.props.itemsInCart == false){
            return (
            <View style={styles.mainItemView}>
                {this.getItem()}
                <Button onPress={() => {this.props.onAddToCart({cartItemIds: newCartItemIds, itemsInCart: true, buttonPressed: 3})}} style={styles.bottomButton}>
                    <Text>Add To Order</Text>
                </Button>
            </View>
            );
        } else {
            return (
                <View style={styles.mainItemView}>
                {this.getItem()}
                <Button onPress={() => {this.props.onAddToCart({cartItemIds: newCartItemIds})}} style={styles.bottomButton}>
                    <Text>Add To Order</Text>
                </Button>
                <Button onPress={() => {this.props.onBeginCheckout({buttonPressed: 4})}} style={styles.bottomButton}>
                    <Text>Checkout</Text>
                </Button>
                </View>
            );
        }
    }

    getItem() {
        //read from menu by passing props of item
        const theMenu = this.props.menu;
        const items = theMenu.vendor.menu.products;
        var itemIndex = 0;

        for(let i = 0; i < items.length; i++) {
            if(items[i]["name"] == this.props.itemSelected) {
                itemIndex = i;
                break;
            }
        }

        console.log("Item index is: " + itemIndex);

        newCartItemIds = this.props.cartItemIds;
        newCartItemIds.push(itemIndex);

        return (
            <View style={styles.info}>
                <Text style={styles.itemName}>{this.props.itemSelected}</Text>
                <Text> {items[itemIndex]["desc"]}</Text>
                <Text style={styles.priceText}>{"$"+Number(Math.floor(items[itemIndex]["price"]/100)+items[itemIndex]["price"]%100).toFixed(2)}</Text>
                <Image source={items[itemIndex]["image"]}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainItemView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    itemName: {
        fontSize: 30,
        textAlign: 'left'
    },
    priceText: {
        fontSize: 24,
        textAlign: 'left'
    },
    info: {
        justifyContent: 'flex-start'
    },
    bottomButton: {
        alignSelf: 'stretch',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        backgroundColor: "#49A7FD"
    }
});
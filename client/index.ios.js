import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  AppRegistry,
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
import MenuHeader from './component/MenuHeader';
import MainMenu from './component/MainMenu';
import SubMenu from './component/SubMenu';
import FilterBar from './component/FilterBar';
import ItemView from './component/ItemView';
import CheckoutView from './component/CheckoutView';

let menu = {
  "vendor": {
    "id": "a_unique_identifier",
    "name": "Our Sample Restuarant",
    "location": "101 Angry Lane, Clayton VIC",

    "menu": {
      "products": [
        {
          "id": 0,
          "name": "Garlic Bread",
          "price": 400,
          "variants": [],
          "tags": [
            "entrees",
            "vegetarian",
            "nut free",
          ]
        },

        {
          "id": 1,
          "name": "Sandwhich",
          "price": 800,
          "variants": ["Chicken", "Steak"],
          "tags": [
            "mains",
            "nut free",
          ]
        },

        {
          "id": 2,
          "name": "Cheesecake",
          "price": 600,
          "variants": [],
          "tags": [
            "desserts",
            "specials"
          ]
        },

        {
          "id": 3,
          "name": "Spring rolls",
          "price": 300,
          "variants": [],
          "tags": [
            "entrees",
            "vegetarian"
          ]
        },

        {
          "id": 4,
          "name": "Steak and side",
          "price": 1500,
          "variants": ["Rare", "Medium", "Well Done"],
          "tags": [
            "mains",
            "specials"
          ]
        },

        {
          "id": 5,
          "name": "Ice cream",
          "price": 400,
          "variants": ["Chocolate", "Vanilla", "Strawberry"],
          "tags": [
            "dessert",
            "specials"
          ]
        }
      ],

      "structure": {
        "entrees": {

        },
        "mains": {

        },
        "desserts": {

        },
        "specials": {

        }
      },

      "style": {

      }
    }
  }
};

export default class EatingScreen extends React.Component {

constructor() {
    super();
    this.state = {
      category: null,
      menuItems: [],
      buttonPressed: 0,
      filtered: false,
      filterTags: [],
      itemSelected: "",
      currentItemId: 0,
      itemsInCart: false,
      cartItemIds: [],
      tableNumber: 0,
      resID: 5
    }
}

  render() {
    console.log('rendering eating')

    let view = null;

    console.log(this.state);

    switch (this.state.buttonPressed) {
      case 0:
      console.log("Case 0");
      view =  (
        //sub menu, with category from state
        <Container>
              <MenuHeader buttonPressed={this.state.buttonPressed} category={this.state.category} onFilter={this.setState.bind(this)} onBackPressed={this.setState.bind(this)}></MenuHeader>
              <Content>
                <List>
                  <MainMenu menu={menu} onPress={this.setState.bind(this)}></MainMenu>
                </List>
              </Content>
        </Container>
      );
      break;
      case 1:
      console.log("Case 1");
      view =  (
        //main menu
        <Container>
              <MenuHeader buttonPressed={this.state.buttonPressed} category={this.state.category} onFilter={this.setState.bind(this)} onBackPressed={this.setState.bind(this)}></MenuHeader>
              <Content>
                <List>
                  <SubMenu menu={menu} buttonPressed={this.state.buttonPressed} onSelect={this.setState.bind(this)} itemSelected={this.state.itemSelected} category={this.state.category}></SubMenu>
                </List>
              </Content>
        </Container>
    );
    break;
    case 2:
    console.log("Case 2");
    view =  (
      <Container>
        <FilterBar menu={menu} onBackPressed={this.setState.bind(this)}>
        </FilterBar>
      </Container>
    );
    break;
    case 3:
    view = (
      <Container>
        <MenuHeader buttonPressed={this.state.buttonPressed} category={this.state.category} onFilter={this.setState.bind(this)} onBackPressed={this.setState.bind(this)} />
        <ItemView menu={menu} cartItemIds={this.state.cartItemIds} buttonPressed={this.state.buttonPressed} itemsInCart={this.state.itemsInCart} currentItemId={this.state.currentItemId} itemSelected={this.state.itemSelected} onBeginCheckout={this.setState.bind(this)} onAddToCart={this.setState.bind(this)}/>
      </Container>
    );
    break;
    case 4:
    view = (
      <Container>
        <MenuHeader buttonPressed={this.state.buttonPressed} category={this.state.category} onFilter={this.setState.bind(this)} onBackPressed={this.setState.bind(this)} />
        <CheckoutView menu={menu} resID={this.state.resID} cartItemIds={this.state.cartItemIds} tableNumber={this.state.tableNumber}/>
      </Container>
    );
    break;
    default:
      console.log(this.state.buttonPressed);
    }
    console.log(view)
    return view;
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

AppRegistry.registerComponent('client', () => EatingScreen);
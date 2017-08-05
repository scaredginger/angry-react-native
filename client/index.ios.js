import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  AppRegistry,
  View,
  DeviceEventEmitter
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
import Greeting from './component/Greeting';

import Beacons from 'react-native-ibeacons';

var region = {
    identifier: 'UniHack restaurant',
    uuid: '5B45DD15-DBF1-4F78-ABFF-2AFE41DD040C'
};

Beacons.requestWhenInUseAuthorization();

Beacons.startMonitoringForRegion(region);
Beacons.startRangingBeaconsInRegion(region);

Beacons.startUpdatingLocation();

var api_host = "http://118.138.101.61:8000";
var restaurant_id = region.uuid; // Static for demonstration
let beacon_history = [];
var table_number = -1;

let accessor = null;

var subscription = DeviceEventEmitter.addListener(
  'beaconsDidRange',
  (data) => {
    // data.region - The current region
    // data.region.identifier
    // data.region.uuid

    // data.beacons - Array of all beacons inside a region
    //  in the following structure:
    //    .uuid
    //    .major - The major version of a beacon
    //    .minor - The minor version of a beacon
    //    .rssi - Signal strength: RSSI value (between -100 and 0)
    //    .proximity - Proximity value, can either be "unknown", "far", "near" or "immediate"
    //    .accuracy - The accuracy of a beacon

    //console.log(data.beacons);

    var beacons = data.beacons;
    var max = ["#", -101];

    for (i = 0; i < beacons.length; i++) {
      beacon = beacons[i];

      if (max[1] < beacon.rssi) {
        max[1] = beacon.rssi;
        max[0] = beacon.minor;
      }
    }
    console.log("Strongest: ", max[0])
    console.log(beacon_history);
    if (beacon_history.length > 9) {
      beacon_history.shift();
      beacon_history.push(max[0]);
    } else {
      beacon_history.push(max[0]);
    }

    table_number = getTableNumber();

    if (accessor) {
      accessor.setState({
        tableNumber: table_number
      })
    }
  }
);

function getTableNumber() {
  var count = {};
  for (i = 0; i < beacon_history.length; i++) {
    if (count[beacon_history[i]] != undefined) {
      count[beacon_history[i]] += 1;
    } else {
      count[beacon_history[i]] = 1;
    }
  }

  var mode = ["#", 0];

  Object.keys(count).forEach(function(table) {
    if (mode[1] < count[table]) {
      mode[1] = count[table];
      mode[0] = table;
    }
  });

  return mode[0]
}

let menu = {
  "vendor": {
    "id": "a_unique_identifier",
    "name": "loading...",
    "location": "101 Angry Lane, Clayton VIC",

    "menu": {
      "products": [

      ],

      "structure": {

      },

      "style": {

      }
    }
  }
};

function loadMenu(id, component) {
  console.log("loading menu for " + id)
  fetch(api_host + "/menu/" + restaurant_id, {method: "GET"})
    .then((response) => response.json())
    .then((responseData) => {
        menu = responseData;
        console.log("Menu response: ", menu);
        component.forceUpdate();
    })
    .done();
}


export default class EatingScreen extends React.Component {

  constructor() {
      super();
      this.state = {
        category: null,
        menuItems: [],
        buttonPressed: -1,
        filtered: false,
        filterTags: [],
        itemSelected: "",
        currentItemId: 0,
        itemsInCart: false,
        cartItemIds: [],
        tableNumber: 0,
        resID: restaurant_id,
        apiHost: api_host
      }

      accessor = this;

      loadMenu(restaurant_id, this)
  }

  render() {
    console.log('rendering eating')

    let view = null;

    console.log(this.state);

    switch (this.state.buttonPressed) {
      case -1:
      view = (
        <Container>
          <Greeting menu={menu} tableNumber={this.state.tableNumber} beginDine={this.setState.bind(this)} />
        </Container>
      );
      break;
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
        <CheckoutView menu={menu} apiHost={this.state.apiHost} resID={this.state.resID} cartItemIds={this.state.cartItemIds} tableNumber={this.state.tableNumber}/>
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

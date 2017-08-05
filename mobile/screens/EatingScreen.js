import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
import { MonoText } from '../components/StyledText';
import { MenuHeader } from '../components/MenuHeader';
import { MainCategory } from '../components/MenuCategoryView'

var menu = {
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
        "main": {

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
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      viewOne: true
    };
  }

  changeView(){
     this.setState({
       viewOne: !this.state.viewOne
     })
  };

  render() {
    if(!this.state.viewOne) return <MainCategory changeView={ () => this.changeView() } />
    return (
    <Container>
          <MenuHeader></MenuHeader>
          <Content>
            <List>
              {getMenuFromServer()}
            </List>
          </Content>
    </Container>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use
          useful development tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/development-mode'
    );
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

function getMenuFromServer() {

    return menuToCardView(menu);

  }

  function menuToCardView(menu) {

  //first here, parse the JSON ready to be handled by the card views

  let mainCategory = [];

  //menu["vendor"]["menu"]["structure"] gives an object containing main categories, each of which is an object

  for(var i in menu["vendor"]["menu"]["structure"]) {
    mainCategory.push(i);
  }

  function getMainCats() {
      var catItems = [];
      for(var i = 0; i <  mainCategory.length; i++) {
        var cat = mainCategory[i];
        catItems.push(
          <ListItem><Text> {cat} </Text></ListItem>
        )
      }
      return catItems;
  }

  return getMainCats();
  
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

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
  CheckBox,
  ListItem
} from 'native-base';

export default class FilterBar extends React.Component {
    render(){
        return (
            <View style={styles.mainFilterView}>
                <Text>Filter by these options:</Text>
                    {this.generateFilters()}
                <Button>
                    <Text>Done</Text>
                </Button>
            </View>
        );
    }

    generateFilters() {
        const menu = this.props.menu;

        //loop through menu and find all tags to sort by.

        //this should return to a item view with filtered tags
    }    
}

const styles = StyleSheet.create({
    mainFilterView: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
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

var filters = []

export default class FilterBar extends React.Component {
    render(){
        return (
            <View style={styles.mainFilterView}>
                <Text style={styles.filterText}>Filter by these options:</Text>
                    {this.generateFilters()}
                <Button style={styles.doneButton} onPress={() => {this.props.onBackPressed({category: null, buttonPressed: 0})}}>
                    <Text>Done</Text>
                </Button>
            </View>
        );
    }

    generateFilters() {
        const theMenu = this.props.menu;
        const items = theMenu.vendor.menu.products;
        let options = [];
        let filterCheckBoxes = [];
        //loop through menu and find all tags to sort by.
        for(let i = 0; i < items.length; i++) {
            for(let j = 0; j < items[i]["tags"].length; j++) {
                if(options.indexOf(items[i]["tags"][j]) < 0) {
                    options.push(items[i]["tags"][j]);
                    filterCheckBoxes.push(
                        <View style={styles.checkBoxView}>
                            <Text>{items[i]["tags"][j]}</Text>
                            <CheckBox/>
                        </View>
                    );
                }
            }
        }
        console.log(filterCheckBoxes);
        return filterCheckBoxes;

        //this should return to a submenu view with items filtered according to checkboxes
    }

    finaliseFilters(filters) {
        this.setState({
            filterTags: filters,
            filtered: true
        });
    }

}

const styles = StyleSheet.create({
    mainFilterView: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    checkBoxView: {
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    filterText: {
        padding: 10
    },
    doneButton: {
        alignSelf: 'stretch',
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
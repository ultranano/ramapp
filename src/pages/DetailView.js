import React, {Component} from 'react';
import {Button, Image, StyleSheet, Text, View, FlatList, TouchableWithoutFeedback} from 'react-native';

class DetailView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      items: []
     };
  }

  componentDidMount(){


    /*
    console.log('fetchData https://rickandmortyapi.com/api/character')
    fetch("https://rickandmortyapi.com/api/character")
    .then(response => response.json())
    .then((responseJson)=> {
      this.setState({
       dataSource: responseJson,
       items: responseJson.results
      })
    })
    .catch(error=>console.log(error)) //to catch the errors if any
    */
  }

    fetchMoreData = () => {
      console.log('fetchMoreData ' + this.state.dataSource.info.next)
      fetch(this.state.dataSource.info.next)
      .then(response => response.json())
      .then((responseJson)=> {
        this.setState({
         dataSource: responseJson,
         items: this.state.items.concat(responseJson.results)
        })
      })
      .catch(error=>console.log(error)) //to catch the errors if any
    };

    render(){

     const { navigate } = this.props.navigation;

     return(
      <View style={{padding:10}}>

      </View>
     )}
}

const DetailScreen = ({ route, navigation }) => {

  const {item} = route.params;

   return (
     <View>
      <Text>{item.name}}</Text>
      <DetailView navigation={navigation}/>
      </View>
   );
};

export default DetailScreen;

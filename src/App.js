import React, {Component} from 'react';
import {Platform, Image, StyleSheet, Text, View, FlatList} from 'react-native';

const styles = StyleSheet.create({
  previewImage: {
    width: 50,
    height: 50,
  },
});

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource:[]
     };
   }

  componentDidMount(){
    fetch("https://rickandmortyapi.com/api/character")
    .then(response => response.json())
    .then((responseJson)=> {
      this.setState({
       dataSource: responseJson
      })
    })
    .catch(error=>console.log(error)) //to catch the errors if any
    }

    render(){
     return(
      <View style={{padding:10}}>
      <FlatList
      padding ={30}
         data={this.state.dataSource.results}
         renderItem={({item}) =>
         <View style={{height: 150}}>
         <View style={{height: 10}}></View>
         <Image
          style={styles.previewImage}
          source={{
            uri: item.image,
            width: 38,
            height: 38
          }}
         />
         <Text style={{height: 150}}>{item.name}</Text>
         <View style={{height: 10}}></View>
         <View style={{height: 1,backgroundColor:'gray'}}></View>
         </View>
        }
       />
     </View>
     )}
}

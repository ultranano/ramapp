import React, {Component} from 'react';
import {Platform, Image, StyleSheet, Text, View, FlatList, TouchableWithoutFeedback} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  mainCardView: {
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    shadowColor: '#696969',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 14,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 16,
    marginRight: 16,
  },
  subCardView: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#000',
    borderColor: '#eeeeee',
    borderWidth: 1,
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
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
         <TouchableWithoutFeedback
        onPress={() => {
          this.redirectToChatConverstion(item);
        }}>
        <View style={styles.mainCardView}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.subCardView}>
              <Image
                source={item.image}
                resizeMode="contain"
                style={{
                  borderRadius: 25,
                  height: 50,
                  width: 50,
                }}
              />
            </View>
            <View style={{marginLeft: 12}}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#000',
                  fontWeight: 'bold',
                  fontFamily: 'lucida grande',
                  textTransform: 'capitalize',
                }}>
                {item.name}
              </Text>
              <View
                style={{
                  marginTop: 4,
                  borderWidth: 0,
                  width: '85%',
                }}>
                <Text
                  style={{
                    color: '#696969',
                    fontSize: 12,
                  }}>
                  Species: {item.species}
                  Gender: {item.gender}
                  Origin: {item.origin.name}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              height: 25,
              backgroundColor: '#FF35B8',
              borderWidth: 0,
              width: 25,
              marginLeft: -26,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 50,
            }}>
            <Text style={{color: '#FFFFFF'}}>
              {item.unread_messages_count}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
        }
       />
     </View>
     )}
}

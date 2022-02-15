import React, {Component} from 'react';
import {Platform, Image, StyleSheet, Text, View, FlatList, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import InfiniteScroll from 'react-infinite-scroll-component';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  mainCardView: {
    height: 120,
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
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 16,
    marginRight: 16,
  },
  subCardView: {
    height: 82,
    width: 82,
    borderRadius: 15,
    backgroundColor: '#696969',
    borderColor: '#696969',
    borderWidth: 1,
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      items: []
     };
   }

  componentDidMount(){

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
     return(
      <View style={{padding:10}}>

      <InfiniteScroll
        dataLength={this.state.items.length} //This is important field to render the next data
        next={this.fetchMoreData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        >
        <FlatList
        padding ={50}
           data={this.state.items}
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
                    borderRadius: 14,
                    height: 80,
                    width: 80,
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
                    width: '100%',
                  }}>
                  <Text
                    style={{
                      color: '#696969',
                      fontSize: 12,
                    }}>
                    Species: {item.species}
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 4,
                    borderWidth: 0,
                    width: '100%',
                  }}>
                  <Text
                    style={{
                      color: '#696969',
                      fontSize: 12,
                    }}>
                    Gender: {item.gender}
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 4,
                    borderWidth: 0,
                    width: '100%',
                  }}>
                  <Text
                    style={{
                      color: '#696969',
                      fontSize: 12,
                    }}>
                    Origin: {item.origin.name}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
          }
         />
    </InfiniteScroll>

     </View>
     )}
}

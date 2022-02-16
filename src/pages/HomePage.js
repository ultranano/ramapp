//Project: ramapp
//Version: 1.0 Beta
//Author: Andrea Baldon
//Contact: baldon.andrea@gmail.com

//import dependencies
import React, {Component} from 'react';
import {Image, StyleSheet, Text, View, FlatList, TouchableWithoutFeedback} from 'react-native';
import InfiniteScroll from 'react-infinite-scroll-component';
import { BsArrowRightCircle, BsFillCircleFill } from "react-icons/bs";

//styles
const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#FFFFFF',
  },
  mainCardView: {
    height: 130,
    alignItems: 'center',
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
    marginTop: 12,
    marginBottom: 12,
    marginLeft: 16,
    marginRight: 16,
  },
  subCardView: {
    height: 92,
    width: 92,
    borderRadius: 15,
    backgroundColor: '#696969',
    borderColor: '#696969',
    borderWidth: 1,
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
    fontFamily: 'lucida grande',
    textTransform: 'capitalize',
    marginLeft: 4
  },
  subTitlesView: {
    marginTop: 4,
    marginLeft: 4,
    borderWidth: 0,
    width: '100%'
  },
  subTitlesText: {
    color: '#696969',
    fontSize: 12
  },
});

//HomePage
class HomePage extends Component {

  //constructor
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      items: []
     };
  }

  //componentDidMount
  componentDidMount(){
    console.log('fetchData https://rickandmortyapi.com/api/character')
    fetch("https://rickandmortyapi.com/api/character", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then((responseJson)=> {
      this.setState({
       dataSource: responseJson,
       items: responseJson.results
      })
    })
    .catch(error=>console.log(error)) //to catch the errors if any
  }

  //fetchMoreData
  fetchMoreData = () => {
    console.log('fetchMoreData ' + this.state.dataSource.info.next)
    fetch(this.state.dataSource.info.next, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then((responseJson)=> {
      this.setState({
        dataSource: responseJson,
        items: this.state.items.concat(responseJson.results)
      })
    })
    .catch(error=>console.log(error)) //to catch the errors if any
  };

  //render
  render(){

    const { navigate } = this.props.navigation;

    return(
      <View style={{padding:10}}>
      <InfiniteScroll
        dataLength={this.state.items.length}
        next={this.fetchMoreData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>This is the end! :-)</b>
          </p>
        }
        >
        <FlatList padding ={45}
           data={this.state.items}
           renderItem={({item}) =>
           <TouchableWithoutFeedback onPress={() => navigate("DetailView", {item})}>
            <View style={styles.mainCardView}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={styles.subCardView}>
                  <Image source={item.image} resizeMode="contain" style={{ borderRadius: 14, height: 90, width: 90 }}
                  />
                </View>
                <View style={{marginLeft: 10}}>
                  <Text style={styles.titleText}>
                    {item.name.indexOf('(') === -1 ? item.name : item.name.substring(0, item.name.indexOf('('))}
                  </Text>
                  <View style={styles.subTitlesView}>
                    <Text style={styles.subTitlesText}>
                      {item.status === "Alive" ?
                        <BsFillCircleFill style={{ height: 8, width: 8, color: '#008000'}}/>
                        : item.status === "unknown" ?
                          <BsFillCircleFill style={{ height: 8, width: 8, color: '#CCCCCC'}}/>
                          :
                          <BsFillCircleFill style={{ height: 8, width: 8, color: '#000000'}}/>
                      } {item.status} - {item.species}
                    </Text>
                  </View>
                  <View style={styles.subTitlesView}>
                    <Text style={styles.subTitlesText}>
                      Type: {item.type === "" ? 'Unknown' : item.type.indexOf('(') === -1 ? item.type : item.type.substring(0, item.type.indexOf('('))}
                    </Text>
                  </View>
                  <View style={styles.subTitlesView}>
                    <Text style={styles.subTitlesText}>
                      Gender: {item.gender}
                    </Text>
                  </View>
                  <View style={styles.subTitlesView}>
                    <Text style={styles.subTitlesText}>
                      Origin: {item.origin.name.indexOf('(') === -1 ? item.origin.name : item.origin.name.substring(0, item.origin.name.indexOf('('))}
                    </Text>
                  </View>
                </View>
              </View>
              <View>
                <BsArrowRightCircle style={{ height: 30, width: 30}}/>
              </View>
            </View>
           </TouchableWithoutFeedback>
          }
         />
      </InfiniteScroll>
     </View>
     )}
}

//HomeScreen
const HomeScreen = ({ navigation }) => {
   return (
      <HomePage navigation={navigation}/>
   );
};

export default HomeScreen;

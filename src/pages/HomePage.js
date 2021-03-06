//Project: ramapp
//Version: 1.0 Beta
//Author: Andrea Baldon
//Contact: baldon.andrea@gmail.com

//import dependencies
import React, {Component} from 'react';
import {Image, Text, View, FlatList, TouchableWithoutFeedback} from 'react-native';
import InfiniteScroll from 'react-infinite-scroll-component';
import { BsArrowRightCircle, BsFillCircleFill } from "react-icons/bs";
import styles from "../styles/HomePageStyle.js";

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
        pullDownToRefresh={false}
        loader={
          <p style={{ textAlign: 'center' }}>
            <b>Loading Data...</b>
          </p>
        }
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>This is the end! :-)</b>
          </p>
        }
        >
        <FlatList padding ={45}
           data={this.state.items}
           onScroll={this.handleScroll}
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

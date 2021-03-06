//Project: ramapp
//Version: 1.0 Beta
//Author: Andrea Baldon
//Contact: baldon.andrea@gmail.com

//import dependencies
import React, {Component} from 'react';
import {Image, FlatList, Text, View} from 'react-native';
import { BsFillCircleFill, BsGeoAltFill, BsTv } from "react-icons/bs";
import { IoIosPlanet } from "react-icons/io";
import styles from "../styles/DetailPageStyle.js";

//DetailView
class DetailView extends Component {

  //constructor
  constructor(props) {
    super(props);
    this.state = {
      dataSourceLocation: [],
      dataSourceOrigin: [],
      dataSourceEpisodes: [],
      dataIDEpisodes: [],
      amountOfResidentsForOrigin: 0,
      amountOfResidentsForLocation: 0,
      loadingOrigin: true,
      loadingLocation: true,
      loadingEpisodes: true,
      noMoreDataOrigin: true,
      noMoreDataLocation: true,
     };
  }

  //componentDidMount
  componentDidMount(){

    const { item } = this.props.route.params;

    //GET Detailed Origin data
    console.log("Origin Url " +item.origin.url)
    //check simple url validation
    if (item.origin.url !== "") {
      fetch(item.origin.url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(response => response.json())
      .then((responseJson)=> {
        this.setState({
         loadingOrigin: false,
         noMoreDataOrigin: false,
         dataSourceOrigin: responseJson,
         amountOfResidentsForOrigin: responseJson.residents.length
        })
      })
      .catch(error=>console.log(error)) //to catch the errors if any
    }

    //GET Detailed Location data
    console.log("Location Url " +item.location.url)

    if (item.location.url !== "") {
      fetch(item.location.url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(response => response.json())
      .then((responseJson)=> {
        this.setState({
         loadingLocation: false,
         noMoreDataLocation: false,
         dataSourceLocation: responseJson,
         amountOfResidentsForLocation: responseJson.residents.length
        })
      })
      .catch(error=>console.log(error)) //to catch the errors if any
    }

    //Prepare Episodes IDs for Query
    var strIDEpisodes = "";

    //Collect Episodes IDs
    for(let index = 0; index < item.episode.length; index++){
      var strIDPos = item.episode[index].lastIndexOf('/')
      strIDEpisodes = strIDEpisodes +","+ item.episode[index].substring(strIDPos+1, item.episode[index].length)
	  }

    //GET Detailed Data for Episodes
    var getMultipleEpisodes = "https://rickandmortyapi.com/api/episode/"+strIDEpisodes
    console.log("getMultipleEpisodes " +getMultipleEpisodes)
    fetch(getMultipleEpisodes, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then((responseJson)=> {
      this.setState({
       loadingEpisodes: false,
       dataSourceEpisodes: responseJson
      })
    })
    .catch(error=>console.log(error)) //to catch the errors if any
  }

  FlatListItemSeparator = () => {
    return (
     <View
       style={{
         height: 1,
         width: "100%",
         backgroundColor: "#CCC",
       }}
     />
    );
  }

  //render DetailView
  render(){

     const { item } = this.props.route.params;

     return(
      <View style={{padding:10, flex:1}}>
      <View style={styles.container}>
      <View style={styles.card_container}>
      <View style={styles.card_template}>
        <View>
          <Image source={item.image} style={styles.card_image} />
          </View>
      </View>
      <View style={{marginLeft: 0}}>
        <Text style={{ marginTop:10, fontSize: 24, color: '#000', fontWeight: 'bold', fontFamily: 'lucida grande', textTransform: 'capitalize'}}>
          {item.name}
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
        <View style={{padding:10}}/>
        <this.FlatListItemSeparator />
        <View style={{padding:6}}/>
        <View style={styles.subTitlesView}>
          <IoIosPlanet style={{height: 38, width: 38, color: '#696969'}}/>
          <Text style={styles.mainSubTitlesText}>
            <b>Origin: {item.origin.name}</b>
          </Text>
        </View>
        {this.state.noMoreDataOrigin ?
          <View style={styles.subInfoTitlesView}>
            <Text style={styles.subTitlesText}>
              No more data for Origin
            </Text>
          </View> :
          this.state.loadingOrigin ?
            <View style={styles.subInfoTitlesView}>
              <Text style={styles.subTitlesText}>
                Getting detailed data from origin...
              </Text>
            </View> :
            <View>
            <View style={styles.subInfoTitlesView}>
              <Text style={styles.subTitlesText}>
                Type: {this.state.dataSourceOrigin.type}
              </Text>
            </View>
            <View style={styles.subInfoTitlesView}>
              <Text style={styles.subTitlesText}>
                Dimension: {this.state.dataSourceOrigin.dimension}
              </Text>
            </View>
            <View style={styles.subInfoTitlesView}>
              <Text style={styles.subTitlesText}>
                Amount of Residents: {this.state.amountOfResidentsForOrigin}
              </Text>
            </View>
            </View>
          }
        <View style={{padding:10}}/>
        <this.FlatListItemSeparator />
        <View style={{padding:6}}/>
        <View style={styles.subTitlesView}>
          <BsGeoAltFill style={{height: 28, width: 28, marginLeft:3, marginRight:3, color: '#696969'}}/>
          <Text style={styles.mainSubTitlesTextGeo}>
            <b>Location: {item.location.name}</b>
          </Text>
        </View>
        {this.state.noMoreDataLocation ?
          <View style={styles.subInfoTitlesView}>
            <Text style={styles.subTitlesText}>
              No more data for Location
            </Text>
          </View> :
          this.state.loadingLocation ?
          <View style={styles.subInfoTitlesView}>
            <Text style={styles.subTitlesText}>
              Getting detailed data from location...
            </Text>
          </View> :
              <View>
              <View style={styles.subInfoTitlesView}>
                <Text style={styles.subTitlesText}>
                  Type: {this.state.dataSourceLocation.type}
                </Text>
              </View>
              <View style={styles.subInfoTitlesView}>
                <Text style={styles.subTitlesText}>
                  Dimension: {this.state.dataSourceLocation.dimension}
                </Text>
              </View>
              <View style={styles.subInfoTitlesView}>
                <Text style={styles.subTitlesText}>
                  Amount of Residents: {this.state.amountOfResidentsForLocation}
                </Text>
              </View>
              </View>
            }
            <View style={{padding:10}}/>
            <this.FlatListItemSeparator />
            <this.FlatListItemSeparator />
            <View style={{padding:6}}/>
            <View style={styles.subTitlesView}>
              <BsTv style={{ height: 28, width: 28, marginRight:10, color: '#696969'}}/>
              <Text style={styles.mainSubTitlesTextTv}>
                { item.episode.length <= 1 ?
                <b>Featured on {item.episode.length} episode</b>
                :
                <b>Featured on {item.episode.length} episodes</b>
                }
              </Text>
            </View>
            { this.state.loadingEpisodes ?
              <View style={styles.subInfoTitlesView}>
                <Text style={styles.subTitlesText}>
                  Getting detailed data from episodes...
                </Text>
              </View> :
              <FlatList padding ={45}
                 data={this.state.dataSourceEpisodes}
                 ItemSeparatorComponent = { this.FlatListItemSeparator }
                 renderItem={({item}) =>
                 <View style={styles.subEpisodesView}>
                   <Text style={styles.subEpisodesText}>
                     <br/>
                     Episode {item.episode}<br/>
                     <b>"{item.name}"</b><br/>
                     On Air date {item.air_date}<br/><br/>
                   </Text>
                 </View>
                }
               />
            }
        </View>
        </View>
      </View>
      </View>
     )}
}

//DetailScreen
const DetailScreen = ({ route, navigation }) => {
   return (
     <View>
      <DetailView route={route} navigation={navigation}/>
     </View>
   );
};

export default DetailScreen;

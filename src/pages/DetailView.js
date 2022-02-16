//Project: ramapp
//Version: 1.0 Beta
//Author: Andrea Baldon
//Contact: baldon.andrea@gmail.com

//import dependencies
import React, {Component} from 'react';
import {Image, FlatList, StyleSheet, Text, View} from 'react-native';

//styles
const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card_container:{
    width: '100%',
  },
  card_template:{
    width: 252,
    height: 252,
    borderColor: '#696969',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius : 15
  },
  card_image: {
    width: 250,
    height: 250,
    borderRadius : 15
  },
  subCardView: {
    height: 122,
    width: 122,
    borderRadius: 15,
    backgroundColor: '#696969',
    borderColor: '#696969',
    borderWidth: 1,
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subTitlesView: {
    marginTop: 4,
    borderWidth: 0,
    width: '100%'
  },
  subTitlesText: {
    color: '#696969',
    fontSize: 14
  },
  subInfoTitlesView: {
    marginTop: 5,
    marginLeft: 12,
    color: '#696969',
    fontSize: 14
  },
  subEpisodesView: {
    borderWidth: 0,
    width: '100%'
  },
  subEpisodesText: {
    color: '#696969',
    fontSize: 12
  }
});

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
            Status: {item.status}
          </Text>
        </View>
        <View style={styles.subTitlesView}>
          <Text style={styles.subTitlesText}>
            Species: {item.species}
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
        <View style={styles.subTitlesView}>
          <Text style={styles.subTitlesText}>
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
        <View style={styles.subTitlesView}>
          <Text style={styles.subTitlesText}>
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
            <View style={styles.subTitlesView}>
              <Text style={styles.subTitlesText}>
                <b>Featured on {item.episode.length} episodes</b>
              </Text>
            </View>
            <View style={{padding:10}}/>
            { this.state.loadingEpisodes ?
              <View style={styles.subInfoTitlesView}>
                <Text style={styles.subTitlesText}>
                  Getting detailed data from episodes...
                </Text>
              </View> :
              <FlatList padding ={45}
                 data={this.state.dataSourceEpisodes}
                 renderItem={({item}) =>
                 <View style={styles.subEpisodesView}>
                   <Text style={styles.subEpisodesText}>
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

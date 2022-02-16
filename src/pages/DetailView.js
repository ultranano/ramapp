//Project: ramapp
//Version: 1.0 Beta
//Author: Andrea Baldon
//Contact: baldon.andrea@gmail.com

//import dependencies
import React, {Component} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({

  container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card_container:{
    width: 252,
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
    marginLeft: 12,
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
    fontSize: 12
  },
  subInfoTitlesView: {
    marginTop: 5,
    marginLeft: 12,
    color: '#696969',
    fontSize: 12
  }
});

class DetailView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSourceLocation: [],
      dataSourceOrigin: [],
      dataSourceEpisodes: [],
      amountOfResidentsForOrigin: 0,
      amountOfResidentsForLocation: 0,
      loadingOrigin: true,
      loadingLocation: true,
      loadingEpisodes: true,
      noMoreDataOrigin: true,
      noMoreDataLocation: true,
      noMoreDataEpisodes: true,
     };
  }

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
  }

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
      <View style={{marginLeft: 12}}>
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
            Origin: {item.origin.name}
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
            Location: {item.location.name}
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
        </View>
        </View>
      </View>
      </View>
     )}
}

const DetailScreen = ({ route, navigation }) => {
   return (
     <View>
      <DetailView route={route} navigation={navigation}/>
     </View>
   );
};

export default DetailScreen;

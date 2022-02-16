import React, {Component} from 'react';
import {Button, Image, StyleSheet, Text, View, FlatList, TouchableWithoutFeedback} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  mainCardView: {
    height: 120,
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
     };
  }


  componentDidMount(){

    const { item } = this.props.route.params;

    console.log(item.origin.url)
    fetch(item.origin.url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then((responseJson)=> {
      this.setState({
       dataSourceOrigin: responseJson,
       amountOfResidentsForOrigin: responseJson.residents.length
      })
    })
    .catch(error=>console.log(error)) //to catch the errors if any

    console.log(item.location.url)
    fetch(item.location.url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then((responseJson)=> {
      this.setState({
       dataSourceLocation: responseJson,
       amountOfResidentsForLocation: responseJson.residents.length
      })
    })
    .catch(error=>console.log(error)) //to catch the errors if any
  }

    render(){

     const { navigate } = this.props.navigation;
     const { item } = this.props.route.params;

     return(
      <View style={{padding:10}}>
      <View style={styles.subCardView}>
        <Image source={item.image} resizeMode="contain" style={{ borderRadius: 14, height: 120, width: 120 }} />
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
        <View style={styles.subTitlesView}>
          <Text style={styles.subTitlesText}>
            Origin: {item.origin.name}
          </Text>
        </View>
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
        <View style={styles.subTitlesView}>
          <Text style={styles.subTitlesText}>
            Location: {item.location.name}
          </Text>
        </View>
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

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
  subTitlesView: {
    marginTop: 4,
    borderWidth: 0,
    width: '100%'
  },
  subTitlesText: {
    color: '#696969',
    fontSize: 12
  },
});

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
     const {item} = this.props.route.params;

     return(
      <View style={{padding:10}}>
      <View style={styles.mainCardView}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.subCardView}>
            <Image source={item.image} resizeMode="contain" style={{ borderRadius: 14, height: 80, width: 80 }}
            />
          </View>
          <View style={{marginLeft: 12}}>
            <Text style={{ fontSize: 14, color: '#000', fontWeight: 'bold', fontFamily: 'lucida grande', textTransform: 'capitalize'}}>
              {item.name}
            </Text>
            <View style={styles.subTitlesView}>
              <Text style={styles.subTitlesText}>
                Species: {item.species}
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

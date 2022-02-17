//Project: ramapp
//Version: 1.0 Beta
//Author: Andrea Baldon
//Contact: baldon.andrea@gmail.com

import { StyleSheet } from "react-native"

export default StyleSheet.create({
    //styles
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
      flexDirection:'row',
    },
    mainSubTitlesText: {
      color: '#696969',
      fontSize: 14,
      marginTop: 10,
    },
    mainSubTitlesTextGeo: {
      color: '#696969',
      fontSize: 14,
      marginTop: 6,
      marginBottom: 12,
    },
    mainSubTitlesTextTv: {
      color: '#696969',
      fontSize: 14,
      marginTop: 4,
    },
    subTitlesText: {
      color: '#696969',
      fontSize: 14,
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
    subEpisodesViewOdd: {
      borderWidth: 0,
      width: '100%',
      backgroundColor: '#FFFFFF'
    },
    subEpisodesViewEven: {
      borderWidth: 0,
      width: '100%',
      backgroundColor: '#CCCCCC'
    },
    subEpisodesText: {
      color: '#696969',
      fontSize: 12
    }
})

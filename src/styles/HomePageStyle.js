//Project: ramapp
//Version: 1.0 Beta
//Author: Andrea Baldon
//Contact: baldon.andrea@gmail.com

import { StyleSheet } from "react-native"

export default StyleSheet.create({
    //styles
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
      fontSize: 13,
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
})

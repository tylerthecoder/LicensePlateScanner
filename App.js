import React from 'react';
import { StyleSheet, Text, Button, View, Alert, TouchableHighlight, ScrollView } from 'react-native';

class LPRCam extends React.Component {

  render () {
    return (
      <View>
        <Text> Tyler </Text>
      </View>
    );
  }
}

export default class App extends React.Component {

  constructor (props) {
    super(props)
    this.state = {"plate":"Tyler","selectedLot":1,"scanning":0}
  }

  _onPressButton(value) {
    this.setState({"selectedLot":value})
    console.log("Scanned Before", this.state.scanned)
    if (this.state.scanning != value){
      this.setState({
        "scanning":value
      })
      console.log("Scanned", this.state.scanned)
      fetch("http://freshies11app.8p2bkaeb3m.us-east-1.elasticbeanstalk.com/accept?plate=" + value, {
        method: 'GET'
      })
      .then(data => {
        return data.json()
      })
      .then(data => {
        Alert.alert(data.valid)
      })
    }
    
  }

  render() {
    initialArr = [1,2,3,4,5];

    buttonsListArr = initialArr.map(LotNum => {
      let click = this._onPressButton.bind(this, LotNum);
      if (this.state.selectedLot == LotNum) {
        sty = styles.selectedLot
      }else {
        sty = styles.lot
      }
        return (
          <TouchableHighlight key={LotNum} style={sty} onPress={click}>
            <Text style={styles.coolText}>{LotNum}</Text>
          </TouchableHighlight>
        )
    })
    return (
      <View>
        <Text>{this.state.plate}</Text>
        <ScrollView style={styles.scroll}>
          {buttonsListArr}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lot: {
    backgroundColor: "#AAA",
    alignItems: 'center',
    justifyContent: 'center',
    height:100,
    width:425,
    marginBottom:20,
    borderRadius: 4,
    borderWidth: 3,
    borderColor: '#000',
  },
  selectedLot: {
    backgroundColor: "#D22",
    alignItems: 'center',
    justifyContent: 'center',
    height:100,
    width:425,
    marginBottom:20,
    borderRadius: 4,
    borderWidth: 3,
    borderColor: '#000',
  },
  headerText:{
    fontSize:70,
    alignItems: 'center',
  },
  coolText: {
    fontSize:40,
  },
  scroll:{
    width:425
  }
});

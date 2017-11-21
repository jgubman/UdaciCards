import React, { Component } from 'react'
import { View, FlatList, Text, StyleSheet, Platform, TouchableOpacity, TextInput } from 'react-native'
import { addDeck } from '../actions'
import { saveDeckTitle } from '../utils/api'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation';

class NewDeck extends Component {
  state = { text: "" }

  render() {
    const { text } = this.state
    return (
      <View style={styles.container}>
          <TextInput
            value={text}
            style={styles.input}
            onChangeText={(text) => this.setState({text})}
            onSubmitEditing={this._handleTextChange}
            placeholder='Deck Title' />
      </View>
    )
  }

  _handleTextChange = (event) => {
    const text = event.nativeEvent.text
    if ((text === '') || (text === null))
      return
    const deck = {
      [text]: {
        title: text,
        questions: []
      }
    }
    saveDeckTitle(deck)
      .then(() => {
        this.setState({text: ''})
        this.props.dispatch(addDeck(deck))
        this.props.navigation.navigate('Decks')
    })
  }

}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  input: {
    borderWidth: 1
  }
})


export default connect()(NewDeck)

import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Navigator } from 'react-native'
import { connect } from 'react-redux'
import { fetchDecks } from '../utils/api'
import { receiveDecks, addDeck, quizStart } from '../actions'
import { AppLoading} from 'expo'
import Card from './Card'

class Deck extends Component {

  render() {
    const { navigate, state } = this.props.navigation
    const { deckKey } = state.params
    const { dispatch, decks } = this.props

    if (decks === null) {
      return
    }

    const { questions, title } = decks[deckKey]

    return (
      <View>
        <Text>{title}</Text>
        <Text>{questions.length} Cards</Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('NewCard', {deck: deckKey}) }>
          <Text>Add New Card</Text>
        </TouchableOpacity>
        {questions.length > 0 && (
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Quiz', {deck: deckKey}) }>
            <Text>Start Quiz</Text>
          </TouchableOpacity>
        )}
      </View>
    )

  }
}


function mapStateToProps (state, ownProps) {
  return {
    decks: state.decks
  }
}

export default connect(mapStateToProps)(Deck)

import React, { Component, PropTypes } from 'react';
import { View, Text, TextInput, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux'
import { addCardToDeck } from '../utils/api'
import { addQuestion } from '../actions'

class NewCard extends Component {

  state = {
    questionText: '',
    answerText: ''
  }

  _handleTextChange = (event) => {
    const { questionText, answerText } = this.state
    const { dispatch, navigation } = this.props
    const { deck } = navigation.state.params

    if ((questionText !== '') && (answerText !== '')) {
      const card = {
        question: questionText,
        answer: answerText
      }

      addCardToDeck(card, deck)
        .then((results) => {
          dispatch(addQuestion(deck, card))
          navigation.goBack()
        })
    }
  }


  render() {
    const { navigate, state } = this.props.navigation
    const { deck } = state.params
    const { questionText, answerText } = this.state

    return (
      <View>
        <Text>{deck}</Text>
        <TextInput
          value={questionText}
          //style={styles.input}
          onChangeText={(questionText) => this.setState({questionText})}
          onSubmitEditing={this._handleTextChange}
          placeholder='Question' />
        <TextInput
          value={answerText}
          //style={styles.input}
          onChangeText={(answerText) => this.setState({answerText})}
          onSubmitEditing={this._handleTextChange}
          placeholder='Answer' />
      </View>
    )
  }
}

export default connect()(NewCard)

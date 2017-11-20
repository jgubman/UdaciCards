import React, { Component, PropTypes } from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import { answerQuestion } from '../actions'

class AnswerButtons extends Component {

  render() {
    const { dispatch } = this.props

    return (
      <View>
        <TouchableHighlight onPress={dispatch(answerQuestion(true))}>
          <Text>Correct</Text>
        </TouchableHighlight>
        <TouchableHighlight>
          <Text>Incorrect</Text>
        </TouchableHighlight>
      </View>

    )
  }

}


export default connect()(AnswerButtons)

import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import AnswerButtons from './AnswerButtons'

export default class Card extends Component {
  state = {
    showAnswer: false
  }

  handleShowAnswer() {
    this.setState({showAnswer: true})
  }

  handleShowQuestion() {
    this.setState({showAnswer: false})
  }

  render() {
    const { question, answer } = this.props.question
    const { showAnswer } = this.state

    return (
      <View>
        { showAnswer
          ? <Answer handleShowQuestion={this.handleShowQuestion.bind(this)} answer={answer} />
          : <Question handleShowAnswer={this.handleShowAnswer.bind(this)} question={question} />
        }
        <AnswerButtons />
      </View>
    )
  }
}


export function Question({ question, handleShowAnswer }) {
  return (
    <View>
      <Text>{ question }</Text>
      <TouchableHighlight onPress={handleShowAnswer}>
        <Text>Answer</Text>
      </TouchableHighlight>
    </View>
  )
}

export function Answer({ answer, handleShowQuestion }) {
  return (
    <View>
      <Text>{ answer }</Text>
      <TouchableHighlight onPress={handleShowQuestion}>
        <Text>Question</Text>
      </TouchableHighlight>
    </View>
  )
}

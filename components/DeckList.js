import React, { Component } from 'react'
import { View, FlatList, Text, StyleSheet, Platform, TouchableOpacity, TouchableHighlight, TextInput, BackHandler } from 'react-native'
import { connect } from 'react-redux'
import { getDecks, getLastQuizDate } from '../utils/api'
import { receiveDecks, addDeck, resetQuiz, lastQuized } from '../actions'
import { AppLoading} from 'expo'
import { black, white, red, lightGrey } from '../utils/colors'

class DeckList extends Component {

  _keyExtractor = (item, index) => item;

  state = {
    showInput: false
  }

  componentWillMount () {
    const { dispatch } = this.props
    getLastQuizDate()
      .then((date) => dispatch(lastQuized(date)))
    getDecks()
      .then((decks) => dispatch(receiveDecks(decks)))
  }

  render() {
    const { decks, lastQuized } = this.props
    const { showInput, input } = this.state
    const oneDayInMS = 1000*60*60*24

    if (decks === null) {
      return <AppLoading />
    }

    const keys = Object.keys(decks)

    if (keys.length === 0) {
      return (
        <View style={{paddingTop: 50}}>
          <Text style={styles.warning}>Add some decks to get started!</Text>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        {((lastQuized === null) || ((new Date().getTime() - lastQuized) > oneDayInMS)) && (
          <Text style={styles.warning}>Don't forget to take a quiz!</Text>
        )}

        <FlatList
          data={Object.keys(decks)}
          keyExtractor={this._keyExtractor}
          extraData={this.state}
          renderItem={this._renderItem}
          containerStyle={{borderBottomWidth: 2}}
          contentContainerStyle={styles.centeredCell} />
      </View>
    )
  }

  _renderItem = ({item}) => {
    const { title, questions } = this.props.decks[item];
    const { navigate } = this.props.navigation;
    return (
      <TouchableHighlight style={styles.item} onPress={() => {
        navigate('Deck', {deckKey: item, title: title, questions: questions})
      } }>
        <View>
          <Text style={styles.deckTitle}>{title}</Text>
          <Text style={styles.cardCount}>{questions.length} cards</Text>
        </View>
      </TouchableHighlight>
    )

  }

}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22,
   backgroundColor: white
  },
  header: {
    fontSize: 22,
    color: 'red',
    backgroundColor: '#efefef'
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    width: 140,
    borderRadius: 5,
    height: 30,
    backgroundColor: 'red'
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    padding: 20,
    margin: 20,
    borderBottomWidth: 1
  },
  centeredCell: {
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  deckTitle: {
    textAlign: 'center',
    color: black,
    fontWeight: 'bold',
    fontSize: 32
  },
  cardCount: {
    textAlign: 'center',
    fontSize: 24,
    color: lightGrey
  },
  warning: {
    fontSize: 28,
    textAlign: 'center',
    color: red
  }

})

function mapStateToProps (state) {
  return {
    decks: state.decks,
    lastQuized: state.lastQuized.date
  }
}

export default connect(mapStateToProps)(DeckList)

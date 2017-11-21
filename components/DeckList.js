import React, { Component } from 'react'
import { View, FlatList, Text, StyleSheet, Platform, TouchableOpacity, TouchableHighlight, TextInput, BackHandler } from 'react-native'
import { connect } from 'react-redux'
import { getDecks } from '../utils/api'
import { receiveDecks, addDeck, resetQuiz } from '../actions'
import { AppLoading} from 'expo'

class DeckList extends Component {

  _keyExtractor = (item, index) => item;

  state = {
    showInput: false
  }

  componentWillMount () {
    const { dispatch } = this.props
    getDecks()
      .then((decks) => dispatch(receiveDecks(decks)))
  }

  render() {
    const { decks } = this.props
    const { showInput, input } = this.state

    if (decks === null) {
      return <AppLoading />
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={Object.keys(decks)}
          keyExtractor={this._keyExtractor}
          extraData={this.state}
          renderItem={this._renderItem}
          ListHeaderComponent={this._renderHeader}
          contentContainerStyle={styles.centeredCell} />
      </View>
    )
  }

  _renderItem = ({item}) => {
    const { title, questions } = this.props.decks[item];
    const { navigate } = this.props.navigation;
    return (
      <TouchableHighlight style={styles.item} onPress={() => {
        this.props.dispatch(resetQuiz())
        navigate('Deck', {deck: item, title: title, questions: questions})
      } }>
        <Text>{title}: {questions.length} Cards</Text>
      </TouchableHighlight>
    )

  }

  _renderHeader = () => (
    <View>
      <Text style={styles.header}>Decks</Text>
    </View>
  )

  _renderFooter = () => (
    <View style={{alignItems: 'center'}}>
      <TouchableOpacity onPress={this._addNewDeck} style={styles.footer}>
        <Text>Add New Deck</Text>
      </TouchableOpacity>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
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
    backgroundColor: '#888',
    padding: 20,
    margin: 20
  },
  centeredCell: {
    justifyContent: 'space-between',
    alignItems: 'stretch',
  }
})

function mapStateToProps (decks) {
  return {
    decks: decks.decks
  }
}

export default connect(mapStateToProps)(DeckList)

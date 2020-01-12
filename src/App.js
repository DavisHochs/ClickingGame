import React, {Component} from 'react';
import Card from './components/CharacterCard/Card';
import Score from './components/Score';
import characters from './characters.json';
import './App.css';
import { HashRouter } from 'react-router-dom';

class App extends Component {

  state = {
    characters: characters,
    hasPicked: [],
    topScore: 0,
    message: ""
  }

  isPicked = e => {
    const name = e.target.attributes.getNamedItem('name').value
    console.log(e.target.attributes.getNamedItem('name').value)
    console.log(this.state)
    this.shuffleCharacters();
    this.checkGuess(name, this.updateTopScore);
  }

  updateTopScore = (newState, cb) => {
    if (newState.hasPicked.length > newState.topScore) {
      newState.topScore++;
      this.setState({ topScore: newState.topScore })
    }
    cb(newState);
  }

  shuffleCharacters = () => {
    this.setState({characters: this.shuffleArray(this.state.characters)})
  }

  shuffleArray = (array) => {
    let i, j, x;
    for (i = array.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = array[i];
      array[i] = array[j];
      array[j] = x;
    }
    return array;
  }

  checkGuess = (name, cb) => {
    const newState = { ...this.state };
    if (newState.hasPicked.includes(name)) {
      newState.message = `You already chose that character. Game Over!`
      newState.hasPicked = []
      alert(`You already chose that character. Game Over!`)
      this.setState({ message: newState.message})
      this.setState({ hasPicked: []})
    } else {
      newState.hasPicked.push(name);
      this.setState({ hasPicked: newState.hasPicked })
    }
    cb(newState, this.checkWin)
  }

  checkWin = (e) => {
    if(e.hasPicked.length === 12) {
      e.message = `You win! Congratulations`
      alert(`You win! Congratulations`)
      e.hasPicked = [];
      this.setState({ message: e.message})
      this.setState({ hasPicked: [] });
    }
  }

  render() {
    return (
      <HashRouter basename='/'>
        <div className="center">
         <h1>Clicking Game</h1>
          <div className="container">
            <div className="row score-info valign-wrapper">
              <div className="col m12 s12 center">
                <Score type="Score" score={this.state.hasPicked.length}/>
                <Score type="Top Score" score={this.state.topScore}/>
                <h3>Don't click the same character twice!</h3>
              </div>
            </div>
          </div>
          <div id="grid" className="container">
            {this.state.characters.map(character => (
              <Card
                key={character.id}
                id={character.id}
                name={character.name}
                image={character.image}
                isPicked={this.isPicked}
              />
            ))}
          </div>
        </div>
      </HashRouter>
    )
  }
}

export default App;

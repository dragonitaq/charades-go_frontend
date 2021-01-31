import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import textFit from '../../utils/textFit';

import { updateItems, addCorrectWord, addGuessedWord, updateItemIndex, decreaseItemIndex, resetGuessedItems, resetCorrectItems } from '../../redux/playContent/playContent.action';
import { convertDurationToInitialTimer, copyInitialTimerToCurrentTimer, countDownTimer } from '../../redux/playDuration/playDuration.action';
import { toggleSound } from '../../redux/utilities/utilities.action';
import { selectVocabulary, selectItemIndex, selectCorrectAmount } from '../../redux/playContent/playContent.selector';
import { selectCurrentTimer } from '../../redux/playDuration/playDuration.selector';
import { selectSound } from '../../redux/utilities/utilities.selector';
import sprite from '../../assets/sprite.svg';

import './play.style.scss';

class Play extends React.Component {
  state = {
    intervalId: null,
  };

  startSound = new Audio('/sound-start.mp3');
  tickSound = new Audio('/sound-tick.mp3');
  tockSound = new Audio('/sound-tock.mp3');
  gameOverSound = new Audio('/sound-end.mp3');
  correctSound = new Audio('/sound-correct.mp3');
  nextSound = new Audio('/sound-next.mp3');

  componentDidMount() {
    if (this.props.sound) {
      this.startSound.play();
    }
    document.addEventListener('keydown', this.handleKeyPress);
    this.props.convertDurationToInitialTimer();
    this.props.copyInitialTimerToCurrentTimer();
    this.props.resetGuessedItems();
    this.props.resetCorrectItems();
    // To run textFit for the initial item
    this.textFit();
    // Make the timer tick for each second
    this.intervalId = setInterval(() => {
      this.props.countDownTimer();
    }, 1000);
  }

  componentDidUpdate(props) {
    //Make sound for last 10 seconds.
    if (this.props.currentTimer === 10 || this.props.currentTimer === 8 || this.props.currentTimer === 6 || this.props.currentTimer === 4 || this.props.currentTimer === 2) {
      if (this.props.sound) {
        this.tickSound.play();
      }
    }
    if (this.props.currentTimer === 9 || this.props.currentTimer === 7 || this.props.currentTimer === 5 || this.props.currentTimer === 3 || this.props.currentTimer === 1) {
      if (this.props.sound) {
        this.tockSound.play();
      }
    }

    // Every time this component update, check the timer. When the timer reaches 0 second, play game over sound and then redirect to /result page.
    if (this.props.currentTimer === 0) {
      if (this.props.sound) {
        this.gameOverSound.play();
      }
      this.props.history.push('/result');
    }

    /* To improve performance, textFit only run when the item changes. It also won't run when item finishes. This is because textFit is a large fn which may potentially affect performance.
    We can access previous state using the props passed in here by Redux. */
    if (this.props.itemIndex !== props.itemIndex && this.props.itemIndex >= 0) {
      this.textFit();
    }
  }

  componentWillUnmount() {
    // Remove keydown event listener to prevent user pressing space or enter again.
    document.removeEventListener('keydown', this.handleKeyPress);
    if (this.props.vocabulary[this.props.itemIndex]) {
      this.props.addGuessedWord(this.props.vocabulary[this.props.itemIndex]);
    }
    // Stop the timer count.
    clearInterval(this.intervalId);
  }

  textFit = () => {
    textFit(document.getElementsByClassName('item-container'), { maxFontSize: 250, multiLine: true });
  };

  handleKeyPress = (event) => {
    // When space key is pressed, update guessedWord array
    if (event.keyCode === 32) {
      if (this.props.sound) {
        this.nextSound.play();
      }
      this.props.addGuessedWord(this.props.vocabulary[this.props.itemIndex]);
      this.props.decreaseItemIndex();
    }
    // When enter key is pressed, update correctWord array
    if (event.keyCode === 13) {
      if (this.props.sound) {
        this.correctSound.play();
      }
      this.props.addCorrectWord(this.props.vocabulary[this.props.itemIndex]);
      this.props.decreaseItemIndex();
    }
  };

  render() {
    const { vocabulary, itemIndex, correctAmount, currentTimer, addCorrectWord, addGuessedWord, decreaseItemIndex, history, toggleSound, sound } = this.props;

    return (
      <div className='play-root' onKeyDown={(event) => this.handleKeyPress(event)}>
        <div className='play-header'>
          <div className='metrics'>
            <div className='timer'>
              <svg className='sand-timer-icon'>
                <use href={sprite + '#sand-timer'} />
              </svg>
              <div className='timer-count'>{currentTimer}s</div>
            </div>
            <div className='score'>
              <svg className='checkmark-icon'>
                <use href={sprite + '#checkmark'} />
              </svg>
              <div className='score-count'>{correctAmount}</div>
            </div>
          </div>
          <div className='nav-button'>
            <svg className='exit-button' onClick={() => history.push('/')}>
              <use href={sprite + '#exit-button'} />
            </svg>
            {sound ? (
              <svg className='mute-button' onClick={() => toggleSound()}>
                <use href={sprite + '#sound'} />
              </svg>
            ) : (
              <svg className='mute-button' onClick={() => toggleSound()}>
                <use href={sprite + '#mute'} />
              </svg>
            )}
          </div>
        </div>
        <div className='item-container'>{itemIndex >= 0 ? vocabulary[itemIndex].toUpperCase() : history.push('/result')}</div>

        <div className='play-buttons'>
          <div
            className='correct-button'
            onClick={() => {
              if (sound) {
                this.correctSound.play();
              }
              addCorrectWord(vocabulary[itemIndex]);
              decreaseItemIndex();
            }}
          >
            <span className='correct-button__text'>Correct</span>
            <span className='correct-button__shortcut'>(Press Enter)</span>
          </div>
          <div
            className='next-button'
            onClick={() => {
              if (sound) {
                this.nextSound.play();
              }
              addGuessedWord(vocabulary[itemIndex]);
              decreaseItemIndex();
            }}
          >
            <span className='next-button__text'>Skip</span>
            <span className='next-button__shortcut'>(Press Spacebar)</span>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateItems: (vocabulary) => dispatch(updateItems(vocabulary)),
    addCorrectWord: (item) => dispatch(addCorrectWord(item)),
    addGuessedWord: (item) => dispatch(addGuessedWord(item)),
    updateItemIndex: () => dispatch(updateItemIndex()),
    decreaseItemIndex: () => dispatch(decreaseItemIndex()),
    convertDurationToInitialTimer: () => dispatch(convertDurationToInitialTimer()),
    copyInitialTimerToCurrentTimer: () => dispatch(copyInitialTimerToCurrentTimer()),
    countDownTimer: () => dispatch(countDownTimer()),
    resetGuessedItems: () => dispatch(resetGuessedItems()),
    resetCorrectItems: () => dispatch(resetCorrectItems()),
    toggleSound: () => dispatch(toggleSound()),
  };
};

const mapStateToProps = createStructuredSelector({
  vocabulary: selectVocabulary,
  itemIndex: selectItemIndex,
  correctAmount: selectCorrectAmount,
  currentTimer: selectCurrentTimer,
  sound: selectSound,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Play));

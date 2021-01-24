import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import textFit from '../../utils/textFit';

import { updateItems, addCorrectWord, addGuessedWord, updateItemIndex, decreaseItemIndex, resetGuessedItems, resetCorrectItems } from '../../redux/playContent/playContent.action';
import { convertDurationToInitialTimer, copyInitialTimerToCurrentTimer, countDownTimer } from '../../redux/playDuration/playDuration.action';
import { selectVocabulary, selectItemIndex, selectCorrectAmount } from '../../redux/playContent/playContent.selector';
import { selectCurrentTimer } from '../../redux/playDuration/playDuration.selector';
import sprite from '../../assets/sprite.svg';

import './play.style.scss';

class Play extends React.Component {
  state = {
    intervalId: null,
  };

  componentDidMount() {
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
    // Every time this component update, check the timer. When the timer reaches 0 second, redirect to /result page.
    if (this.props.currentTimer === 0) {
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
      this.props.addGuessedWord(this.props.vocabulary[this.props.itemIndex]);
      this.props.decreaseItemIndex();
    }
    // When enter key is pressed, update correctWord array
    if (event.keyCode === 13) {
      this.props.addCorrectWord(this.props.vocabulary[this.props.itemIndex]);
      this.props.decreaseItemIndex();
    }
  };

  render() {
    const { vocabulary, itemIndex, correctAmount, currentTimer, addCorrectWord, addGuessedWord, decreaseItemIndex, history } = this.props;

    return (
      <div className='play-root' onKeyDown={(event) => this.handleKeyPress(event)}>
        <div className='play-header'>
          <div className='metrics'>
            <div className='timer'>
              <svg className='sand-timer-icon'>
                <use href={sprite + '#sand-timer'} />
              </svg>
              <div className='timer-count'>{currentTimer}S</div>
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
            {/* At the moment, I modify this mute button to end the game for development purpose. */}
            {/* <svg className='mute-button' onClick={() => history.push('/result')}>
              <use href={sprite + '#sound'} />
            </svg> */}
          </div>
        </div>
        <div className='item-container'>{itemIndex >= 0 ? vocabulary[itemIndex].toUpperCase() : history.push('/result')}</div>

        <div className='play-buttons'>
          <div
            className='correct-button'
            onClick={() => {
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
              addGuessedWord(vocabulary[itemIndex]);
              decreaseItemIndex();
            }}
          >
            <span className='next-button__text'>Next</span>
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
  };
};

const mapStateToProps = createStructuredSelector({
  vocabulary: selectVocabulary,
  itemIndex: selectItemIndex,
  correctAmount: selectCorrectAmount,
  currentTimer: selectCurrentTimer,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Play));

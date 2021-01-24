import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectDuration } from '../../redux/playDuration/playDuration.selector';
import { selectLanguage } from '../../redux/playContent/playContent.selector';
import { selectShowHowToPlay } from '../../redux/utilities/utilities.selector';
import { increaseDuration, decreaseDuration } from '../../redux/playDuration/playDuration.action';
import { updateLanguage, getCategoriesAsync, updateItems } from '../../redux/playContent/playContent.action';
import { toggleHowToPlay } from '../../redux/utilities/utilities.action';
import sprite from '../../assets/sprite.svg';

import './settings.style.scss';
import HowToPlay from '../howToPlay/howToPlay.component';

class GameSettings extends React.Component {
  componentDidMount() {
    const language = document.getElementById('language').value;
    this.props.updateLanguage(language);
    this.props.getCategoriesAsync(language);
  }

  getCategories = (event) => {
    const language = event.target.value;
    this.props.updateLanguage(language);
    this.props.getCategoriesAsync(language);
  };

  render() {
    const { language, duration, increaseDuration, decreaseDuration, showHowToPlay, toggleHowToPlay } = this.props;
    return (
      <div className='game-settings'>
        {showHowToPlay ? <HowToPlay /> : null}
        <h2>Game Settings</h2>
        <div>
          <label className='label-language' htmlFor='language'>
            Language:{' '}
          </label>
          <select className='select-language' name='language' id='language' defaultValue={`${language ? language : 'english'}`} onChange={this.getCategories}>
            <option value='english'>English</option>
            <option value='chinese'>Chinese</option>
          </select>
        </div>
        <div className='duration'>
          <p>Duration:</p>
          <svg
            className={`arrow-icon ${duration === 1 ? 'arrow-icon--grey' : null}`}
            onClick={
              duration === 1
                ? null
                : () => {
                    decreaseDuration();
                  }
            }
          >
            <use href={sprite + '#left-arrow'} />
          </svg>
          <span>
            {duration} {`${duration === 1 ? 'minute' : 'minutes'}`}
          </span>
          <svg
            className={`arrow-icon ${duration === 3 ? 'arrow-icon--grey' : null}`}
            onClick={
              duration === 3
                ? null
                : () => {
                    increaseDuration();
                  }
            }
          >
            <use href={sprite + '#right-arrow'} />
          </svg>
        </div>
        <div
          className='how-to-play'
          onClick={() => {
            toggleHowToPlay();
          }}
        >
          How to play?
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateLanguage: (language) => dispatch(updateLanguage(language)),
    getCategoriesAsync: (language) => dispatch(getCategoriesAsync(language)),
    updateItems: (vocabulary) => dispatch(updateItems(vocabulary)),
    increaseDuration: () => dispatch(increaseDuration()),
    decreaseDuration: () => dispatch(decreaseDuration()),
    toggleHowToPlay: () => dispatch(toggleHowToPlay()),
  };
};

const mapStateToProps = createStructuredSelector({
  language: selectLanguage,
  duration: selectDuration,
  showHowToPlay: selectShowHowToPlay,
});

export default connect(mapStateToProps, mapDispatchToProps)(GameSettings);

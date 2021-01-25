import React from 'react';
import { connect } from 'react-redux';

import { toggleHowToPlay } from '../../redux/utilities/utilities.action';
import sprite from '../../assets/sprite.svg';

import './howToPlay.style.scss';

class HowToPlay extends React.Component {
  closeHowToPlay = (event) => {
    if (event.target.className === 'how-to-play__background') {
      this.props.toggleHowToPlay();
    }
  };

  render() {
    const { toggleHowToPlay } = this.props;
    return (
      <div
        className='how-to-play__background'
        onClick={(event) => {
          this.closeHowToPlay(event);
        }}
      >
        <div className='how-to-play__content'>
          <h6 className='how-to-play__title'>
            <div></div>
            <span>How to play?</span>
            <svg
              onClick={() => {
                toggleHowToPlay();
              }}
            >
              <use className='how-to-play__cross' href={sprite + '#cross'} />
            </svg>
          </h6>
          <div className='how-to-play__description'>
            <p>&#10102; You need at least 2 players. Select a language and a category to play with.</p>
            <p>
              &#10103; Choose one party to describe the item (words or phrases) that is displayed on the screen. The default describing method is to use vocal without mentioning any word that appears
              on the screen.
            </p>
            <p>&#10104; The other party is to try to guess the correct item (words or phrases) that is being described without viewing the screen.</p>
            <p>
              &#10105; You can set a duration. With every successive guessing, you gain a point. Either party can choose to skip the current item if they find it too difficult. Until the timer is over,
              you end with the amount of point you get.
            </p>
            <p>
              &#10106; There are different methods to describe the item on screen. For example, one is only allowed to act without making any sound. Another example is to make sound effect only without saying a word.
              Usually if the method is not the default, it is mentioned in the category's description.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleHowToPlay: () => dispatch(toggleHowToPlay()),
  };
};

export default connect(null, mapDispatchToProps)(HowToPlay);

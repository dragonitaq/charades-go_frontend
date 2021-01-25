import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCategories } from '../../redux/playContent/playContent.selector';
import { selectSound } from '../../redux/utilities/utilities.selector';
import { selectCategory, updateItems, updateItemIndex } from '../../redux/playContent/playContent.action';
import { toggleNoFnPopUp } from '../../redux/utilities/utilities.action';
import sprite from '../../assets/sprite.svg';

import './category.style.scss';

class Category extends React.Component {
  redirectToPlay() {
    this.props.history.push('/play');
  }

  // This is array shuffling algorithm known as Fisher–Yates Shuffle. Credit: https://bost.ocks.org/mike/shuffle/
  shuffle(array) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  // Hope it's ok to do all actions in one function.
  selectAndShuffleAndUpdateItems(categoryId) {
    const selectedCategory = this.props.categories.find((category) => category._id === categoryId);
    this.props.selectCategory(selectedCategory);
    const shuffledItems = this.shuffle(selectedCategory.vocabulary);
    this.props.updateItems(shuffledItems);
  }

  render() {
    const { category, updateItemIndex, toggleNoFnPopUp } = this.props;

    // Coerce array into string (Work in Chrome)
    // const coercedTags = `#${category.tags}`;
    // const formattedTags = coercedTags.replaceAll(',', ' #');

    // I found out Safari can't coerce array into string. Not sure about Firefox. So I have to use for-loop.
    let formattedTags;
    for (let ii = 0; ii < category.tags.length; ii++) {
      if (formattedTags) {
        formattedTags = `${formattedTags} #${category.tags[ii]}`;
      } else {
        formattedTags = `#${category.tags[ii]}`;
      }
    }

    return (
      <div className='category-card'>
        <div className='category-details'>
          <h3 className='category-details__title'>{category.title.toUpperCase()}</h3>
          <div className='category-details__horizontal-divider'></div>
          <p className='category-details__description'>{category.description}</p>
          <div className='category-details__tags'>
            <p className='category-details__items'>{formattedTags}</p>
          </div>
          <div className='category-details__meta'>
            <p className='category-details__author'>{`Author: ${category.authorName}`}</p>
            <p className='category-details__item-count'>{`${category.vocabulary.length} items`}</p>
          </div>
          <div className='category-details__btn'>
            <div
              className='category-details__btn-like'
              title='like'
              onClick={() => {
                toggleNoFnPopUp();
                setTimeout(() => {
                  toggleNoFnPopUp();
                }, 1500);
              }}
            >
              <svg className='category-details__btn-icon'>
                <use href={sprite + '#like'} />
              </svg>
              <p className='category-details__btn-like--number'>{category.likedAmount ? category.likedAmount : '0'}</p>
            </div>
            <div
              className='category-details__btn-save'
              title='save'
              onClick={() => {
                toggleNoFnPopUp();
                setTimeout(() => {
                  toggleNoFnPopUp();
                }, 1500);
              }}
            >
              <svg className=' category-details__btn-icon'>
                <use href={sprite + '#save'} />
              </svg>
              <p className='category-details__btn-save--number'>{category.savedAmount ? category.savedAmount : '0'}</p>
            </div>
            <div
              className='category-details__btn-report'
              title='report'
              onClick={() => {
                toggleNoFnPopUp();
                setTimeout(() => {
                  toggleNoFnPopUp();
                }, 1500);
              }}
            >
              <svg className=' category-details__btn-icon'>
                <use href={sprite + '#report'} />
              </svg>
              <p className='category-details__btn-report--number'>Report</p>
            </div>
          </div>
        </div>
        <div
          className='category-play-btn'
          onClick={() => {
            // The order of these functions is important
            this.selectAndShuffleAndUpdateItems(category._id);
            updateItemIndex();
            this.redirectToPlay();
          }}
        >
          <p>Play!</p>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectCategory: (category) => dispatch(selectCategory(category)),
    updateItems: (vocabulary) => dispatch(updateItems(vocabulary)),
    updateItemIndex: () => dispatch(updateItemIndex()),
    toggleNoFnPopUp: () => dispatch(toggleNoFnPopUp()),
  };
};

const mapStateToProps = createStructuredSelector({
  categories: selectCategories,
  sound: selectSound,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Category));

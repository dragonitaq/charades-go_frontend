import axios from 'axios';

/* ########################## Synchronous ######################### */

export const updateLanguage = (language) => {
  return {
    type: 'updateLanguage',
    payload: language,
  };
};

export const getCategoriesStart = () => {
  return {
    type: 'getCategoriesStart',
  };
};

export const updateCategories = (categories) => {
  return {
    type: 'updateCategories',
    payload: categories,
  };
};

export const getCategoriesFailure = (message) => {
  return {
    type: 'getCategoriesFailure',
    payload: message,
  };
};

export const resetNeedLoader = () => {
  return {
    type: 'resetNeedLoader',
  };
};

export const selectCategory = (category) => {
  return {
    type: 'selectCategory',
    payload: category,
  };
};

export const updateItems = (vocabulary) => {
  return {
    type: 'updateItems',
    payload: vocabulary,
  };
};

export const addCorrectWord = (item) => {
  return {
    type: 'addCorrectWord',
    payload: item,
  };
};

export const addGuessedWord = (item) => {
  return {
    type: 'addGuessedWord',
    payload: item,
  };
};

export const updateItemIndex = () => {
  return {
    type: 'updateItemIndex',
  };
};

export const decreaseItemIndex = () => {
  return {
    type: 'decreaseItemIndex',
  };
};

export const resetGuessedItems = () => {
  return {
    type: 'resetGuessedItems',
  };
};

export const resetCorrectItems = () => {
  return {
    type: 'resetCorrectItems',
  };
};

/* ######################### Asynchronous ######################### */

export const getCategoriesAsync = (language) => {
  return (dispatch) => {
    dispatch(getCategoriesStart());

    // This is use to test loader animation with 3 seconds delay
    // setTimeout(() => {
    //   axios
    //     .get(`http://localhost:4000/api/v1/category/${language}`)
    //     .then((response) => {
    //       dispatch(updateCategories(response.data.data));
    //     })
    //     .catch((error) => {
    //       dispatch(getCategoriesFailure(error.message));
    //     });
    // }, 3000);

    // if (process.env.NODE_ENV === 'development') {
    //   console.log('in development');
    // }

    // if (process.env.NODE_ENV === 'production') {
    //   console.log('in production');
    // }

    axios
      /* At development, I need to change the IP address manually instead of just use localhost so that other devices in the same network can make API call. This is because localhost address for each device will be different.
      I need use other devices like phone and ipad because I want to test responsive design. when I'm not, I can use back localhost. */
      .get(`https://charadesgo.herokuapp.com/api/v1/category/${language}`)
      .then((response) => {
        dispatch(updateCategories(response.data.data));
      })
      .catch((error) => {
        dispatch(getCategoriesFailure(error.message));
      });
  };
};

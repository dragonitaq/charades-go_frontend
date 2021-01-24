export const increaseDuration = () => {
  return {
    type: 'increaseDuration',
  };
};

export const decreaseDuration = () => {
  return {
    type: 'decreaseDuration',
  };
};

export const convertDurationToInitialTimer = () => {
  return {
    type: 'convertDurationToInitialTimer',
  };
};

export const copyInitialTimerToCurrentTimer = () => {
  return {
    type: 'copyInitialTimerToCurrentTimer',
  };
};

export const countDownTimer = () => {
  return {
    type: 'countDownTimer',
  };
};

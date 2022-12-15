export const prettyDate = (date) => {

    const difference = new Date().getTime() - new Date(date).getTime();
    const hour = 3600 * 1000;
    const minute = 60 * 1000;

    if (difference > (24 * hour)) {
      const diffPretty = Math.round(difference /(24 * hour));
      return date = ` ${diffPretty} ч`;
    } else if (difference >= hour) {
      const diffPretty = Math.round(difference / hour);
      return date = ` ${diffPretty} ч`;
    } else if(difference < hour) {
      const diffPretty = Math.round(difference / minute);
      return date = ` ${diffPretty} мин`;
    }
};

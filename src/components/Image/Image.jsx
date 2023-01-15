import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const wrapperStyle = {
  width: '100%',
  height: '0',
  position: 'relative',
  overflow: 'hidden',
  paddingBottom: '170%', // ratio
};

const imgStyle = {
  position: 'absolute',
  left: '-50%',
  top: '-50%',
  right: '-50%',
  bottom: '-50%',
  heigth: 'auto',
  width: '100%',
  margin: 'auto',
};

function Image({ title, images = [] }) {
  const [showIndex, setShowIndex] = useState(0);
  const [goodImages, setGoodImages] = useState([]);

  useEffect(() => {
    setGoodImages(images);
    return () => {};
  }, []);

  const handleMouseEnter = () => {
    if ((goodImages.length > 1) && (showIndex < goodImages.length - 1)) {
      setShowIndex(showIndex + 1);
    }
  };

  const handleMouseLeave = () => {
    if (goodImages.length > 1) setShowIndex(0);
  };

  const handleError = () => {
    if (showIndex === goodImages.length - 1) setShowIndex(0);
    setGoodImages(goodImages.filter((_, index) => index !== showIndex));
  };

  return (
    <>
      { images.length && (
        <div style={wrapperStyle}>
          <img
            src={goodImages[showIndex]}
            // className="card-img-top img-fluid"
            alt={title}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={imgStyle}
            onError={handleError}
          />
        </div>
      )}
    </>
  );
}

Image.propTypes = {
  title: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Image;

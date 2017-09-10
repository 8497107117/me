import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class TagLabel extends React.PureComponent {
  constructor(props) {
    super(props);

    const { mode, articleNum } = this.props;
    /* 1(187, 187, 238) to 10(41, 140, 180) */
    const labelColor = {
      r: articleNum < 10 ? Math.round(187 - (articleNum * 14.6)) : 41,
      g: articleNum < 10 ? Math.round(187 - (articleNum * 4.7)) : 140,
      b: articleNum < 10 ? Math.round(238 - (articleNum * 5.8)) : 180,
    };
    this.state = {
      labelStyle: mode === 'cloud' && articleNum > 0 ? {
        backgroundColor: `rgba(${labelColor.r}, ${labelColor.g}, ${labelColor.b}, 1)`
      } : null
    };
  }

  render() {
    const { mode, tagName, articleNum, fromTags } = this.props;
    const { labelStyle } = this.state;
    const Component = mode === 'cloud' ? Link : 'div';

    return (
      <Component
        className="tag-label"
        style={labelStyle}
        to={mode === 'cloud' ? { pathname: `/tags/${tagName.replace(' ', '')}/`, state: { fromTags } } : ''}
      >
        {mode === 'label' && <i className="fa fa-tag" aria-hidden="true"></i>}
        {mode === 'cloud' && articleNum > 0 ? `${tagName} (${articleNum})` : `${tagName}`}
      </Component>
    );
  }
}

TagLabel.propTypes = {
  mode: PropTypes.string.isRequired,
  tagName: PropTypes.string.isRequired,
  articleNum: PropTypes.number,
  fromTags: PropTypes.bool
};

TagLabel.defaultProps = {
  articleNum: 0,
  fromTags: false
};

export default TagLabel;

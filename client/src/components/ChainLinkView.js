import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';

const styles = {
  layout: {

  }
};

export default class ChainLinkView extends Component {
  constructor(props) {
    super(props);
  }

  static getDerivedStateFromProps(props, state) {
    return {
      data: props.data
    };
  }

  /***************************************************************************
   * Render                                                                  *
   ***************************************************************************/

  getMainComponent = () => {
    if (this.state.data.word) {
      return (
        <Typography>
          {this.state.data.nickName} guessed: {this.state.data.word}
        </Typography>
      );
    } else {
      return (
        <Typography>
          {this.state.data.nickName} drew this: {this.state.data.image}
        </Typography>
      );
    }
  }

  // TODO: This is ugly AF.
  render() {
    return (
      <div style={styles.layout}>
        {this.getMainComponent()}
      </div>
    );
  }

};
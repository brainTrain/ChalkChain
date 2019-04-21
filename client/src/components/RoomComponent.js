import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const styles = {
  layout: {

  },
};

export default class RoomComponent extends Component {
  constructor(props) {
    super(props);

    this.roomRef = props.roomRef;
    this.roomName = props.roomName;
    this.uid = props.viewProps.uid;
    this.state = {
      users: [],
      sharedState: {
        drawTime: 60,
      },
    };

  }

  /***************************************************************************
   * Lifecycle functions                                                     *
   ***************************************************************************/

  componentDidMount = () => {
    // Register a listener for users to update list of users in room.
    this.userRef = this.roomRef.child('users');
    this.userRef.on('value', (snapshot) => {
      // Construct array of object's values' nickName.
      this.setState({
        users: Object.values(snapshot.val()).map((value) => {
          return value.nickName;
        })
      });
    });

    // Register a listener for shared room state, such as round time limit.
    this.sharedRef = this.roomRef.child('waiting_room_state');
    this.sharedRef.on('value', (snapshot) => {
      if (snapshot.val()) {
        this.setState({
          sharedState: snapshot.val()
        });
      }
    });
  }

  componentWillUnmount() {
    this.userRef.off('value');
    this.sharedRef.off('value');
  }

  /***************************************************************************
   * Button Events                                                           *
   ***************************************************************************/

  handleSaveButton = (event) => {
    // This assumes set cannot fail.
    this.sharedRef.set(this.state.sharedState);
  }

  handleStartButton = (event) => {
    console.log('Start game button pressed.');
  }

  /***************************************************************************
   * Render                                                                  *
   ***************************************************************************/

  getUserListItems = () => {
    return this.state.users.map((user) => {
      return (
        <ListItem>
          <ListItemText primary={user} />
        </ListItem>
      )
    });
  }

  // TODO: This is ugly AF.
  render() {
    return (
      <div style={styles.layout}>
        <Typography>
          Room name: {this.roomName}
        </Typography>
        <TextField
          label='Seconds per drawing'
          value={this.state.sharedState.drawTime}
          onChange={(event) => this.setState({sharedState: {drawTime: event.target.value}})}
        />
        <Button
          variant='contained'
          onClick={this.handleSaveButton}
        >
          Save Settings
        </Button>
        <Button
          variant='contained'
          onClick={this.handleStartButton}
        >
          Start Game
        </Button>
        <List>
          {this.getUserListItems()}
        </List>
      </div>
    );
  }
};

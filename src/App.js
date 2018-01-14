import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { LARGE, SMALL } from 'material-ui/utils/withWidth';
import Header from './components/Header.jsx';
import LeftDrawer from './components/LeftDrawer.jsx';
import CreateEvent from './containers/CreateEvent.jsx';
import SimpleForm from './containers/SimpleForm';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
    };
    this.handleChangeRequestNavDrawer = this.handleChangeRequestNavDrawer.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.width !== nextProps.width) {
      this.setState({ drawerOpen: nextProps.width === LARGE });
    }
  }

  handleChangeRequestNavDrawer() {
    this.setState({
      drawerOpen: !this.state.drawerOpen,
    });
  }

  renderLeftDrawer() {
    return (
      <LeftDrawer
        drawerOpen={this.state.drawerOpen}
      />
    );
  }

  onOverlayClick = () => {
    this.setState({ drawerOpen: false });
  };

  render() {
    const drawerOpen = this.state.drawerOpen;
    const paddingLeftDrawerOpen = 236;
    const styles = {
      header: {
        paddingLeft: drawerOpen ? paddingLeftDrawerOpen : 0,
      },
      container: {
        margin: '80px 20px 20px 15px',
        paddingLeft: drawerOpen && this.props.width !== SMALL ? paddingLeftDrawerOpen : 0,
      },
    };
    return (
      <MuiThemeProvider>
        <div>
          <Header
            styles={styles.header}
            handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer}
          />
          {this.renderLeftDrawer()}
          <div style={styles.container}>
            <Switch>
              <Route
                path="/events/new"
                component={CreateEvent}
              />
              <Route
                  path="/events/old"
                  component={SimpleForm}
              />
            </Switch>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
  width: PropTypes.number,
};

export default App;

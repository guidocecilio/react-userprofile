import React from 'react';
import AuthService from '../modules/AuthService';
import ListProfiles from '../components/ListProfiles.jsx';
import UserService from '../modules/UserService';


class DashboardPage extends React.Component {
  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
    UserService.get()
      .then((response) => {
          console.log(response);
          this.setState({
            data: response.data
          });
        });
  }

  /**
   * Render the component.
   */
  render() {
    return (<ListProfiles data={this.state.data} />);
  }

}

export default DashboardPage;
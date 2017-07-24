import React from 'react';
import AuthService from '../modules/AuthService';
import ProfileDetails from '../components/ProfileDetails.jsx';
import ProfileService from '../modules/ProfileService';


class ProfileDetailsPage extends React.Component {
  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
    const token = AuthService.getIdToken();
    const userData = AuthService.getDecodedToken(token);

    ProfileService.getById(userData.user_id)
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
    return (<ProfileDetails data={this.state.data} />);
  }

}

export default ProfileDetailsPage;
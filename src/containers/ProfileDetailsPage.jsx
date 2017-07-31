import React, { PropTypes } from 'react';
import AuthService from '../modules/AuthService';
import ProfileDetails from '../components/ProfileDetails.jsx';
import ProfileService from '../modules/ProfileService';
import TopicService from '../modules/TopicService';
import { populate } from '../modules/utils';


class ProfileDetailsPage extends React.Component {
  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);
    console.log(this.props);
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
    if (!token || !userData) {
      this.context.router.replace('/');
    }

    // this.props.params.id
    Promise.all([
      TopicService.get(),
      ProfileService.getById(userData.user_id),
    ])
    .then(([topics, profile]) => {
      profile.favorite_topics = profile.favorite_topics.map((d) => {
        return populate(d, topics);
      });
      this.setState({
        data: profile
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


ProfileDetailsPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default ProfileDetailsPage;
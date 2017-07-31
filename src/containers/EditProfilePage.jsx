import React, { PropTypes } from 'react';
import ProfileForm from '../components/ProfileForm.jsx';
import ProfileService from '../modules/ProfileService';
import AuthService from '../modules/AuthService';

class EditProfilePage extends React.Component {
  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    // set the initial component state
    this.state = {
      errors: {},
      profile: {
        id: '',
        first_name: '',
        last_name: '',
        email: '',
        current_position: '',
        about_you: '',
        favorite_topics: []
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeProfile = this.changeProfile.bind(this);
  }

  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
    const token = AuthService.getIdToken();
    const userData = AuthService.getDecodedToken(token);

    // this.props.params.id
    ProfileService.getById(userData.user_id)
      .then((response) => {
          console.log(response);
          this.setState({
            profile: response.data
          });
        });
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    ProfileService.update({
        id: this.state.profile.id, 
        first_name: this.state.profile.first_name,
        last_name: this.state.profile.last_name,
        email: this.state.profile.email,
        current_position: this.state.profile.current_position,
        about_you: this.state.profile.about_you,
        favorite_topics: this.state.profile.favorite_topics,
      })
      .then((response) => { 
        // change the component-container state
        this.setState({
          errors: {}
        });
        // change the current URL to /
        this.context.router.replace('/view-profile');
      })
      .catch((xhr) => {
        // change the component state
        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.statusText;

        this.setState({
          errors
        });
      });
  }

  /**
   * Change the profile object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeProfile(event) {
    const field = event.target.name;
    const profile = this.state.profile;
    profile[field] = event.target.value;
    this.setState({
      profile
    });
  }


  /**
   * Render the component.
   */
  render() {
    return (
      <ProfileForm
        onSubmit={this.processForm}
        onChange={this.changeProfile}
        errors={this.state.errors}
        profile={this.state.profile}
      />
    );
  }
}

EditProfilePage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default EditProfilePage;
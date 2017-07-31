import React, { PropTypes } from 'react';
import { Card, CardTitle, CardHeader, CardText } from 'material-ui/Card';


const ProfileDetails = ({ data }) => ( 
  <Card className="container">
    {data.first_name && data.last_name && <CardTitle className="title"
    	title={data.first_name + ' ' + data.last_name} titleColor="white" />}
	  <i className="material-icons"
	  	style={{ marginTop: '20px', fontSize: '150px', color: '#dfdfdf' }}>face</i>
	  <h1 className="current-position">{data.current_position}</h1>
    <div className="division"></div>
	  <CardText style={{ textAlign: 'left' }}>
	  	<h3 className="profile-aboutme">about me</h3>
      {data.about_you}
      <h3 className="profile-aboutme">favorite topics</h3>
      <div className="topics-container">
      	{ data.favorite_topics && data.favorite_topics.map((topic, index) => (
            <div className="topic-box">{ topic.name }</div>
          ))}
      </div>
    </CardText>
  </Card>
);

ProfileDetails.propTypes = {
  data: PropTypes.object.isRequired
};

export default ProfileDetails;
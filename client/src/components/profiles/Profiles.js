import React, { Component } from "react";
import PropType from "prop-types";
import Spinner from "../common/Spinner";
import { getProfiles } from "../../actions/profileAction";
import { connect } from "react-redux";
import ProfileItem from "./ProfileItem";

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }
  render() {
    const { profiles, loading } = this.props.profile;
    return (
      <div>
        {loading ? (
          <Spinner />
        ) : (
          <div>
            <h1 className="large text-primary">Developers</h1>
            <p className="lead">
              <i className="fab fa-connectdevelop">
                Browse and Connet with Developers
              </i>
            </p>
            <div className="profiles">
              {profiles.length > 0 ? (
                profiles.map((profile) => (
                  <ProfileItem key={profile._id} profile={profile} />
                ))
              ) : (
                <h4>No Profile Found ...</h4>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

Profiles.PropType = {
  getProfiles: PropType.func.isRequired,
  profile: PropType.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);

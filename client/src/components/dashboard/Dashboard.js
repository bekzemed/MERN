import React, { Component } from "react";
import { connect } from "react-redux";
import PropType from "prop-types";
import { getCurrentProfile, deleteAccount } from "../../actions/profileAction";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";
import ProfileActions from "./ProfileActions";
import Experience from "./Experience";
import Education from "./Education";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDelteClick(event) {
    event.preventDefault();
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // check logged in user has profie data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            <ProfileActions />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <div style={{ marginBottom: "60px" }} />
            <button
              onClick={this.onDelteClick.bind(this)}
              className="btn btn-danger"
            >
              Delete My Account
            </button>
          </div>
        );
      } else {
        // user logged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not setup profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              {" "}
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">{dashboardContent}</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.PropType = {
  profile: PropType.object.isRequired,
  getCurrentProfile: PropType.func.isRequired,
  deleteAccount: PropType.func.isRequired,
  auth: PropType.object.isRequired,
};

const mapStateToProp = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProp, { getCurrentProfile, deleteAccount })(
  Dashboard
);

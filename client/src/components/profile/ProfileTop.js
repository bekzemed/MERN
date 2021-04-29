import React from "react";
import PropTypes from "prop-types";

const ProfileTop = ({
  profile: {
    status,
    company,
    location,
    website,
    social,
    user: { name, avatar },
  },
}) => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card card-body bg-info text-white mb-3">
          <div className="row">
            <div className="col-4 col-md-3 m-auto">
              <img className="rounded-circle" src={avatar} alt="" />
            </div>
          </div>
          <div className="text-center">
            <h1 className="display-4 text-center">{name}</h1>
            <p className="lead text-center">
              {status} {company && <span> at {company}</span>}
            </p>
            <p>{location && <span>{location}</span>}</p>
            <p>
              {website && (
                <a className="text-white p-2" href={website}>
                  <i className="fas fa-globe fa-2x"></i>
                </a>
              )}

              {social && social.twitter && (
                <a className="text-white p-2" href={social.twitter}>
                  <i className="fab fa-twitter fa-2x"></i>
                </a>
              )}
              {social && social.facebook && (
                <a className="text-white p-2" href={social.facebook}>
                  <i className="fab fa-facebook fa-2x"></i>
                </a>
              )}
              {social && social.linkedin && (
                <a className="text-white p-2" href={social.linkedin}>
                  <i className="fab fa-linkedin fa-2x"></i>
                </a>
              )}
              {social && social.instagram && (
                <a className="text-white p-2" href={social.instagram}>
                  <i className="fab fa-instagram fa-2x"></i>
                </a>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;

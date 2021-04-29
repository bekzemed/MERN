// import React, { useState } from "react";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import { addPost } from "../../actions/postsAction";

// const PostForm = ({ addPost }) => {
//   const [text, setText] = useState("");

//   function onChange(e) {
//     setText({ [e.target.name]: e.target.value });
//   }

//   function onSubmit(e) {
//     e.preventDefault();
//     addPost(text);
//     setText("");
//   }

//   return (
//     <div className="post-form">
//       <div className="bg-primary p">
//         <h3></h3>
//       </div>
//       <form className="form my-1" onSubmit={onSubmit}>
//         <textarea
//           name="text"
//           placeholder="Create a Post"
//           cols="30"
//           rows="5"
//           value={text}
//           onChange={onChange}
//         ></textarea>
//         <input type="submit" className="btn btn-dark my-1" />
//       </form>
//     </div>
//   );
// };

// PostForm.propTypes = {
//   addPost: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   post: PropTypes.object.isRequired,
// };

// const mapStateToProps = (state) => ({
//   auth: state.auth,
//   post: state.post,
// });

// export default connect(mapStateToProps, { addPost })(PostForm);

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/postsAction";

class PostForm extends Component {
  constructor() {
    super();
    this.state = {
      text: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newPost = {
      text: this.state.text,
    };

    this.props.addPost(newPost);
  }

  render() {
    return (
      <div className="post-form">
        <div className="bg-primary p">
          <h3></h3>
        </div>
        <form className="form my-1" onSubmit={this.onSubmit}>
          <textarea
            name="text"
            placeholder="Create a Post"
            cols="30"
            rows="5"
            value={this.state.text}
            onChange={this.onChange}
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" />
        </form>
      </div>
    );
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
});

export default connect(mapStateToProps, { addPost })(PostForm);

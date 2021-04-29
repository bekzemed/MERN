import React, { useState } from "react";
import PropTypes from "prop-types";
import { addComment } from "../../actions/postsAction";
import { connect } from "react-redux";

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    addComment(postId, { text });
    setText("");
  }

  function onChange(e) {
    setText({ [e.target.name]: e.target.value });
  }

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Leave a Comment</h3>
      </div>
      <form className="form my-1" onSubmit={onSubmit}>
        <textarea
          name="text"
          placeholder="Create a Post"
          cols="30"
          rows="5"
          value={text}
          onChange={onChange}
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);

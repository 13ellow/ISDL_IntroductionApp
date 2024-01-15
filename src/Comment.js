import React from "react";

const Comment = ({ text, date }) => {
  return (
    <div className="comment">
      <p>{text}</p>
      <p>
        <font color="grey" size="2">投稿日時: {date}</font>
      </p>
    </div>
  );
};

export default Comment;

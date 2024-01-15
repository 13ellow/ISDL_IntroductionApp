import React, { useState } from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import "./style/AboutPic.css";
import { Box } from "@chakra-ui/react";

const AboutPic = ({ image, text, title }) => {
  // 異なるimage名ごとにコメントを管理するためのオブジェクト
  const [comments, setComments] = useState({});

  const addComment = (newComment) => {
    // image名をキーとしてコメントを追加または更新
    setComments((prevComments) => ({
      ...prevComments,
      [image]: [newComment, ...(prevComments[image] || [])],
    }));
  };

  return (
    <div>
      <Box borderWidth='1px' borderRadius='lg' overflow='hidden' className="aboutpic">
        <img src={image} alt="slides" className="slides"></img>
        <div className="detail">
          <h1 className="title">{title}</h1>
          <p
            className="text"
            dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, "<br>") }}
          ></p>
        </div>
      </Box>
      <div className="comment-container">
        <CommentForm addComment={addComment} />
        <div className="comment-list">
          {comments[image] &&
            comments[image].map((comment, index) => (
              <Comment key={index} {...comment} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPic;

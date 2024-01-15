import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Button,
  Textarea,
  VStack,
} from "@chakra-ui/react";

const CommentForm = ({ addComment }) => {
  const [commentText, setCommentText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      text: commentText,
      date: new Date().toLocaleString(),
    };
    addComment(newComment);
    setCommentText("");
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <VStack spacing={3}>
        <FormControl>
          <FormLabel>コメント投稿</FormLabel>
          <Textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="コメントを入力してください（50字以下）"
            required
            maxLength={50}
          />
        </FormControl>
        <Button type="submit" colorScheme="teal" >
          コメントする
        </Button>
      </VStack>
    </form>
  );
};

export default CommentForm;
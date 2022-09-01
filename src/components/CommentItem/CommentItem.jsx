import React, { useState, useContext } from "react";
import { Avatar, Flex, Text, Input, Box, Button } from "@chakra-ui/react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { UserContext } from "contexts/user.context";
import { db } from "utils/firebase/firebase.utils";

const CommentItem = ({ profileImage, username, postId, comments }) => {
  const [comment, setComment] = useState("");
  const userData = useContext(UserContext);
  console.log(userData)
  const submitComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", postId, "comments"), {
      comment: commentToSend,
      username: userData.currentUser.displayName,
      userImage: userData.currentUser.photoURL,
      timestamp: serverTimestamp(),
    });
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <>
      <Flex my="20px">
        <Avatar
          src={userData.currentUser.photoURL}
          name={userData.currentUser.displayName}
          size="sm"
        />
        <Box position="relative" w="92%" >
          <Input
            onChange={handleCommentChange}
            value={comment}
            placeholder="Write your comment here"
            size="sm"
            borderRadius="5px"
            ml="10px"
          />
          <Button
            onClick={submitComment}
            background="transparent"
            color="#f1592a"
            fontWeight={600}
            size="xs"
            position="absolute"
            top="4px"
            right={0}
            zIndex={2}
          >
            Post
          </Button>
        </Box>
      </Flex>
      {comments.map((commnetItem, index) => {
        const { userImage, username, comment } =
          commnetItem._document.data.value.mapValue.fields;
        return (
          <Flex key={index} mt="7px">
            <Avatar
              src={userImage.stringValue}
              name={username.stringValue}
              size="sm"
            />
            <Flex
              flexDir="column"
              ml="10px"
              bg="#edf2f6"
              borderRadius="10px"
              p="7px"
            >
              <Text fontSize="12px" fontWeight={600}>
                {username.stringValue}
              </Text>
              <Text fontSize="12px" color="#6c757d">
                {comment.stringValue}
              </Text>
            </Flex>
          </Flex>
        );
      })}
    </>
  );
};

export default CommentItem;

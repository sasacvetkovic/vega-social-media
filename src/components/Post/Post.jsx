import React, { useState, useContext, useEffect } from "react";
import CommentItem from "components/CommentItem";
import { UserContext } from "contexts/user.context";
import {
  Avatar,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
} from "@chakra-ui/react";
import likeIcon from "assets/like.png";
import likeFilledIcon from "assets/likeFilled.png";
import commentIcon from "assets/comment.png";
import {
  deleteDoc,
  doc,
  setDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "utils/firebase/firebase.utils";

const Post = ({ postData }) => {
  const { caption, image, profileImage, timestamp, username } =
    postData._document.data.value.mapValue.fields;
  const postId = postData._document.key.path.segments[6];
  const userData = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [hasLikes, setHasLikes] = useState(false);
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    if (!postId) return;
    onSnapshot(collection(db, "posts", postId, "likes"), (snapshot) => {
      setLikes(snapshot.docs);
    });
  }, [db, postId]);

  useEffect(() => {
    if (!postId) return;
    onSnapshot(
      query(
        collection(db, "posts", postId, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => setComments(snapshot.docs)
    );
  }, [db, postId]);

  useEffect(() => {
    setHasLikes(
      likes.findIndex((like) => like.id === userData.currentUser.uid) !== -1
    );
  }, [likes]);

  const likePost = async () => {
    if (hasLikes) {
      await deleteDoc(
        doc(db, "posts", postId, "likes", userData.currentUser.uid)
      );
    } else {
      await setDoc(
        doc(db, "posts", postId, "likes", userData.currentUser.uid),
        {
          username: userData.currentUser.displayName,
        }
      );
    }
  };

  return (
    <Grid
      templateColumns="repeat(10, 1fr)"
      my="25px"
      bg="#fff"
      p="16px"
      borderRadius="10px"
      border="1px solid #e8e8e8"
      gap="15px"
    >
      <GridItem colSpan={1} w="100%">
        <Avatar src={profileImage.stringValue} name={username.stringValue} />
      </GridItem>
      <GridItem colSpan={9} w="100%">
        <Text fontSize="md" mt="5px" fontWeight={600}>
          {username.stringValue}
        </Text>
        <Text fontSize="12px" fontWeight={300} color="#6c757d" mb="15px">
          {`${new Date(
            timestamp.timestampValue
          ).toLocaleDateString()} ${new Date(
            timestamp.timestampValue
          ).toLocaleTimeString()}`}
        </Text>
        <Text color="#6c757d" lineHeight="1.4" mt="5px" mb="20px">
          {caption.stringValue}
        </Text>
        {image && <Image src={image.stringValue} borderRadius="5px" />}
        <Flex my="16px">
          <Flex mr="70px">
            <Image
              onClick={likePost}
              w="20px"
              src={hasLikes ? likeFilledIcon : likeIcon}
              cursor="pointer"
            />
            <Text size="13px" color="#6c757d" ml="5px">
              {likes.length}
            </Text>
          </Flex>
          <Flex>
            <Image w="20px" src={commentIcon} />
            <Text size="13px" color="#6c757d" ml="5px">
              {comments.length}
            </Text>
          </Flex>
        </Flex>
        <CommentItem
          profileImage={profileImage}
          username={username}
          postId={postId}
          comments={comments}
        />
      </GridItem>
    </Grid>
  );
};

export default Post;

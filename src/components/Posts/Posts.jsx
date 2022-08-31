import React, { useEffect, useState } from "react";
import { Container } from "@chakra-ui/react";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { db } from "utils/firebase/firebase.utils";
import Post from "components/Post/Post";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(snapshot.docs);
        console.log(snapshot.docs[0]._document.data.value.mapValue);
      }
    );
  
  }, []);

  return (
    <Container maxW='container.sm'>
      <Post/>
    </Container>
  );
};

export default Posts;

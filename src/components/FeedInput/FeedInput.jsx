import React, { useContext, useRef, useState } from "react";
import {
  Container,
  Avatar,
  Textarea,
  Flex,
  Box,
  Button,
  Image,
} from "@chakra-ui/react";

import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadString } from "firebase/storage";
import { db, storage } from "utils/firebase/firebase.utils";

import { UserContext } from "contexts/user.context";
import cameraIcon from "assets/camera.svg";

const FeedInput = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useContext(UserContext);
  const inputImageFile = useRef(null);
  const postTextRef = useRef(null);

  const uploadPost = async () => {
    if (isLoading) return;
    console.log('enter');

    setIsLoading(true);

    // create a post add to firestore
    // get the host id
    // upload the image to firebase storage
    // get a download URL from fb storage with the post ID
    // get a downloaded URL from fb storage and update the original post with image

    const docRef = await addDoc(collection(db, "posts"), {
      username: currentUser.displayName,
      caption: postTextRef.current.value,
      profileImage: currentUser.photoURL,
      timestamp: serverTimestamp(),
    });
    console.log(selectedFile);
    console.log(docRef.id);

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    // await uploadString(imageRef, selectedFile, "data_url").then(
    //   async (snapshot) => {
    //     const downloadUrl = await getDownloadURL(imageRef);
    //     await updateDoc(doc(db, "posts", docRef.id), {
    //       image: downloadUrl,
    //     });
    // console.log(downloadUrl);

    //   }
    // );
    setIsLoading(false);
    setSelectedFile(null);
  };

  const onButtonClick = () => {
    inputImageFile.current.click();
  };

  return (
    <Container maxw="1800px">
      <Flex
        bg="#ffffff"
        borderRadius="lg"
        flexDir="column"
        mt="25px"
        border="1px solid #e8e8e8"
      >
        <Flex p="20px" borderBottom="1px solid #e8e8e8">
          <Avatar
            name={currentUser.displayName}
            src={currentUser.photoURL}
            h="38px"
            w="38px"
          />
          <Textarea
            placeholder="Write something about you"
            border="transparent"
            resize="none"
            outline="none"
            boxShadow="none"
            _focus={{ boxShadow: "none !important" }}
            ref={postTextRef}
          />
        </Flex>
        <Flex py="10px" px="10px" justifyContent="space-between">
          <Box>
            <Button onClick={onButtonClick} variant="secondary">
              <Image src={cameraIcon} w="20px" mr="5px"></Image>
              Media
            </Button>
          </Box>
          <Box>
            <Button onClick={uploadPost} variant="publish">
              Publish
            </Button>
          </Box>
        </Flex>
      </Flex>
      <input
        onChange={(e) => setSelectedFile(e.target.files[0])}
        type="file"
        id="file"
        ref={inputImageFile}
        style={{ display: "none" }}
      />
    </Container>
  );
};

export default FeedInput;

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
import closeIcon from "assets/closeButton.png";

const FeedInput = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useContext(UserContext);
  const inputImageFile = useRef(null);
  const postTextRef = useRef(null);

  const uploadPost = async () => {
    if (isLoading) return;
    setIsLoading(true);

    const docRef = await addDoc(collection(db, "posts"), {
      username: currentUser.displayName,
      caption: postTextRef.current.value,
      profileImage: currentUser.photoURL,
      timestamp: serverTimestamp(),
    });
    
    if (selectedFile) {
      const imageRef = ref(storage, `posts/${docRef.id}/image`);

      await uploadString(imageRef, selectedFile, "data_url").then(
        async (snapshot) => {
          const downloadUrl = await getDownloadURL(imageRef);
          await updateDoc(doc(db, "posts", docRef.id), {
            image: downloadUrl,
          });
        }
      );
    }

    setIsLoading(false);
    setSelectedFile(null);
    setPreviewImage(null);
    postTextRef.current.value = "";
  };

  const onButtonClick = () => {
    inputImageFile.current.click();
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    };
  };

  return (
    <Container maxW="container.sm">
      <Flex
        bg="#ffffff"
        borderRadius="10px"
        flexDir="column"
        mt="25px"
        border="1px solid #e8e8e8"
      >
        <Flex p="20px" pb="5px">
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
        {previewImage && (
          <Box w="100%" position="relative">
            <Image
              src={previewImage}
              h="100px"
              w="100px"
              objectFit="cover"
              borderRadius="10px"
              ml="20px"
              mb="20px"
            ></Image>

            <Image
              onClick={() => {
                setSelectedFile(null);
                setPreviewImage(null);
              }}
              src={closeIcon}
              h="25px"
              w="25px"
              objectFit="cover"
              borderRadius="10px"
              top={-3}
              left={105}
              zIndex={3}
              position="absolute"
              cursor="pointer"
            ></Image>
          </Box>
        )}

        <Flex
          py="10px"
          px="10px"
          justifyContent="space-between"
          borderTop="1px solid #e8e8e8"
        >
          <Box>
            <Button onClick={onButtonClick} variant="secondary">
              <Image src={cameraIcon} w="20px" mr="5px"></Image>
              Media
            </Button>
          </Box>
          <Box>
            <Button onClick={uploadPost} variant="publish">
              {isLoading ? "Loading" : "Publish"}
            </Button>
          </Box>
        </Flex>
      </Flex>
      <input
        onChange={addImageToPost}
        type="file"
        id="file"
        ref={inputImageFile}
        style={{ display: "none" }}
      />
    </Container>
  );
};

export default FeedInput;

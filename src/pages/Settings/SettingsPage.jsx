import React, { useState, useContext, useRef } from "react";
import { UserContext } from "contexts/user.context";
import {
  updateDisplayName,
  updateEmailAddress,
  updatePhoneNumber,
  updateProfilePhoto,
} from "utils/firebase/firebase.utils";
import {
  Text,
  Container,
  Box,
  Avatar,
  Divider,
  Flex,
  Button,
} from "@chakra-ui/react";
import FormInput from "components/FormInput";

const SettingsPage = () => {
  const initFormValues = {
    username: "",
    email: "",
    phoneNumber: "",
    profileImage: null,
  };
  const { currentUser } = useContext(UserContext);
  const [formValues, setFormValues] = useState(initFormValues);
  const [previewImage, setPreviewImage] = useState(currentUser.photoURL);
  const inputImageFile = useRef(null);

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setFormValues({ ...formValues, profileImage: URL.createObjectURL(e.target.files[0]) });
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    };
  };

  const handleUploadButton = () => {
    inputImageFile.current.click();
  };

  const hanndleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const updateUserInfo = () => {
    if (formValues.username) {
      updateDisplayName(currentUser, formValues.username);
    }

    if(formValues.phoneNumber){
      updatePhoneNumber(currentUser, formValues.phoneNumber);
    }

    if(formValues.email){
      updateEmailAddress(currentUser, formValues.email);
    }

    if(formValues.profileImage){
      console.log(previewImage)
      console.log(formValues.profileImage)
      updateProfilePhoto(currentUser, previewImage);
    }

  };

  return (
    <>
      {console.log(formValues)}
      <Box background="#f4f4f4" height="100vh" pt="20px">
        <Container>
          <Box background="#fff" borderRadius="10px" padding="20px">
            <Text color="#6c757d" fontSize="xl" fontWeight={600} mb="20px">
              Edit profile
            </Text>
            <Flex alignItems="center">
              <Avatar
                name={currentUser.displayName}
                src={previewImage}
                size="lg"
              ></Avatar>
              <Button onClick={handleUploadButton} variant="setting" size="sm">
                Upload
              </Button>
              <Button variant="setting" color="#858585" size="sm">
                Remove
              </Button>
            </Flex>

            <Divider my="20px" />
            <Text fontSize="12px" fontWeight="bold" color="#6c757d" mb="3px">
              Name
            </Text>
            <FormInput
              onChange={hanndleInputChange}
              value={formValues.username}
              name="username"
              placeholder={currentUser.displayName}
              size="sm"
              borderRadius="5px"
            ></FormInput>
            <Text fontSize="12px" fontWeight="bold" color="#6c757d" mb="3px">
              Email
            </Text>
            <FormInput
              onChange={hanndleInputChange}
              value={formValues.email}
              name="email"
              placeholder={currentUser.email}
              size="sm"
              borderRadius="5px"
            ></FormInput>
            <Text fontSize="12px" fontWeight="bold" color="#6c757d" mb="3px">
              Phone Number
            </Text>
            <FormInput
              onChange={hanndleInputChange}
              value={formValues.phoneNumber}
              name="phoneNumber"
              placeholder={currentUser.phoneNumber}
              size="sm"
              borderRadius="5px"
            ></FormInput>
            <Button
              onClick={updateUserInfo}
              variant="setting"
              background="#f1592a"
              color="#fff"
              ml="0"
              size="sm"
            >
              Save changes
            </Button>
          </Box>
        </Container>
      </Box>
      <input
        onChange={addImageToPost}
        type="file"
        id="file"
        ref={inputImageFile}
        style={{ display: "none" }}
      />
    </>
  );
};

export default SettingsPage;

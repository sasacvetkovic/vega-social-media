import React, { useContext } from "react";
import { UserContext } from "contexts/user.context";
import { updateDisplayName } from "utils/firebase/firebase.utils";
import {
  Text,
  Container,
  Box,
  Center,
  Avatar,
  Divider,
  Flex,
  Button,
} from "@chakra-ui/react";
import FormInput from "components/FormInput";
const SettingsPage = () => {
  const { currentUser } = useContext(UserContext);
  console.log(currentUser);

  return (
    <>
      <Box background="#f4f4f4" height="100vh" pt="20px">
        <Container>
          <Box background="#fff" borderRadius="10px" padding="20px">
            <Text color="#6c757d" fontSize="xl" fontWeight={600} mb="20px">
              Edit profile
            </Text>
            <Flex alignItems="center">
              <Avatar
                name={currentUser.displayName}
                src={currentUser.photoURL}
                size="lg"
              ></Avatar>
              <Button variant="setting" size="sm">
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
              placeholder={currentUser.displayName}
              size="sm"
              borderRadius="5px"
            ></FormInput>
            <Text fontSize="12px" fontWeight="bold" color="#6c757d" mb="3px">
              Email
            </Text>
            <FormInput
              placeholder={currentUser.email}
              size="sm"
              borderRadius="5px"
            ></FormInput>
            <Text fontSize="12px" fontWeight="bold" color="#6c757d" mb="3px">
              Phone Number
            </Text>
            <FormInput
              placeholder={currentUser.phoneNumber}
              size="sm"
              borderRadius="5px"
            ></FormInput>
            <Button variant="setting" background='#f1592a' color="#fff" ml='0' size="sm">
              Save changes
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default SettingsPage;

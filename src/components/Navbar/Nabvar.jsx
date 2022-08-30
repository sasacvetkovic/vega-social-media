import React, { useContext } from "react";
import {
  Image,
  Flex,
  Avatar,
  AvatarBadge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import logoImage from "assets/logo.png";
import { UserContext } from "contexts/user.context";
import { signOutUser } from "utils/firebase/firebase.utils";
const Nabvar = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      px="20px"
      py="5px"
      boxShadow="xs"
      rounded="md"
      bg="white"
    >
      <Image src={logoImage} h="50px" w="50px" />
      <Menu>
        <MenuButton
          as={Avatar}
          name={currentUser.displayName}
          src={currentUser.photoURL}
          h="38px"
          w="38px"
        >
          <AvatarBadge boxSize="15px" bg="#41d6c3" />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={signOutUser}>Log Out</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default Nabvar;

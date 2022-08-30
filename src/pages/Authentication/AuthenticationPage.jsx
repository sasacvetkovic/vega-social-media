import React, { useState, useEffect, useContext } from "react";
import { Grid, GridItem, Image, Box, Center } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "contexts/user.context";
import SignInForm from "components/SignInForm/";
import SignUpForm from "components/SignUpForm/";
import peoplePhoto from "assets/people.jpg";

const Authentication = () => {
  const [isSignup, setIsSignUp] = useState(false);
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      h="100vh"
      background="#F6F8FA"
    >
      <Box w="70vw" background="#ffffff" borderRadius="10px">
        <Grid
          templateColumns="repeat(4, 1fr)"
          gap={6}
          alignItems="center"
          justifyContent="center"
          height="600px"
        >
          <GridItem w="100%" colSpan={2} alignSelf="center">
            <Center>
              {isSignup ? (
                <SignUpForm setIsSignUp={setIsSignUp} />
              ) : (
                <SignInForm setIsSignUp={setIsSignUp} />
              )}
            </Center>
          </GridItem>
          <GridItem colSpan={2} h="100%" overflow="hidden">
            <Image
              h="100%"
              w="100%"
              src={peoplePhoto}
              alt="people"
              borderRightRadius="10px"
              objectFit="cover"
            />
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
};

export default Authentication;

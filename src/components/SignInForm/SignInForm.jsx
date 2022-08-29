import React from "react";
import { Grid, Box, Text, Button, Link, Center } from "@chakra-ui/react";
import FormInput from "components/FormInput";
const SignInForm = ({ setIsSignUp }) => {
  return (
    <Box display="flex" flexDirection="column">
      <Text fontSize={32} textAlign="center" mb="30px">
        Sign In
      </Text>
      <Box display="flex" flexDirection="column">
        <FormInput type="text" placeholder="Email" name="username" />
        <FormInput type="password" placeholder="Password" name="password" />
        <Grid w="100%" templateColumns="repeat(2, 1fr)" gap="10px">
          <Button w="100%" variant="primary" type="submit">
            Login
          </Button>
          <Button w="100%" variant="primary">
            Sign in with Google
          </Button>
        </Grid>
      </Box>
      <Center>
        <Text fontSize="18px" mr="5px">
          Not registered?
        </Text>
        <Link onClick={() => setIsSignUp(true)} fontSize="18px" color="#f1592a">
          Create an account
        </Link>
      </Center>
    </Box>
  );
};

export default SignInForm;

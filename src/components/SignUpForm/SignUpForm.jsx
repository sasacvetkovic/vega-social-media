import React from "react";
import FormInput from "components/FormInput";
import { Grid, Box, Text, Button, Link, Center } from "@chakra-ui/react";

function SignUpForm({ setIsSignUp }) {
  return (
    <form>
      <Box>
        <Box display="flex" flexDirection="column">
          <Text fontSize={32} textAlign="center" mb="30px">
            Sign Up
          </Text>
          <Text fontSize={16} textAlign="center" mb="30px">
            Please fill in this form to create an account.
          </Text>
          <FormInput type="text" placeholder="Enter username" name="username" />

          <FormInput type="text" placeholder="Enter Email" name="email" />

          <FormInput type="password" placeholder="Enter Password" name="psw" />

          <FormInput
            type="password"
            placeholder="Repeat Password"
            name="psw-repeat"
          />
          <Button type="submit">Sign Up</Button>
        </Box>
        <Center>
          <Text fontSize="18px" mr="5px">
            Already have an account?
          </Text>
          <Link
            onClick={() => setIsSignUp(false)}
            fontSize="18px"
            color="#f1592a"
          >
            Log In
          </Link>
        </Center>
      </Box>
    </form>
  );
}

export default SignUpForm;

import React, { useState } from "react";
import { Grid, Box, Text, Button, Link, Center } from "@chakra-ui/react";
import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "utils/firebase/firebase.utils";
import FormInput from "components/FormInput";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = ({ setIsSignUp }) => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
    } catch (error) {
      console.log("user sign in failed", error);
    }
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <Box display="flex" flexDirection="column">
      <Text fontSize={32} textAlign="center" mb="30px">
        Sign In
      </Text>
      <Box display="flex" flexDirection="column">
        <FormInput
          type="text"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          value={email}
        />
        <FormInput
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={password}
        />
        <Grid w="100%" templateColumns="repeat(2, 1fr)" gap="10px">
          <Button
            onClick={handleSubmit}
            w="100%"
            variant="primary"
            type="submit"
          >
            Login
          </Button>
          <Button onClick={signInWithGoogle} w="100%" variant="primary">
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

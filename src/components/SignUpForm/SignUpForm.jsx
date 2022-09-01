import React, { useState } from "react";
import FormInput from "components/FormInput";
import { Box, Text, Button, Link, Center } from "@chakra-ui/react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "utils/firebase/firebase.utils";

import { updateProfile } from "firebase/auth";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function SignUpForm({ setIsSignUp }) {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [errorMessage, setErrorMessage] = useState("");
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isValidEmail(email)) {
      setErrorMessage("invalid email");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("passwords do not match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await updateProfile(user, {
        displayName: displayName,
      });

      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.code);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };
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
          <FormInput
            onChange={handleChange}
            type="text"
            placeholder="Enter username"
            name="displayName"
            value={displayName}
            mb="0"
            mt="15px"
          />

          <FormInput
            onChange={handleChange}
            type="text"
            placeholder="Enter Email"
            name="email"
            value={email}
            mb="0"
            mt="15px"
          />
          {errorMessage === "invalid email" && (
            <Text fontSize="14px" color="#ed0202" ml="2px">
              Invalid email
            </Text>
          )}
          {errorMessage === "auth/email-already-in-use" && (
            <Text fontSize="14px" color="#ed0202" ml="2px">
              Email is already in use
            </Text>
          )}
          <FormInput
            onChange={handleChange}
            type="password"
            placeholder="Enter Password"
            name="password"
            value={password}
            mb="0"
            mt="15px"
          />

          <FormInput
            onChange={handleChange}
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            mb="0"
            mt="15px"
          />
          {errorMessage === "passwords do not match" && (
            <Text fontSize="14px" color="#ed0202" ml="2px">
              Passwords do not match
            </Text>
          )}
          {errorMessage === "auth/weak-password" && (
            <Text fontSize="14px" color="#ed0202" ml="2px">
              Password must be at least 6 characters
            </Text>
          )}
          <Button onClick={handleSubmit} type="submit" mt="15px">
            Sign Up
          </Button>
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

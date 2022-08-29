import React, { useState } from "react";
import FormInput from "components/FormInput";
import { Box, Text, Button, Link, Center } from "@chakra-ui/react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "utils/firebase/firebase.utils";
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function SignUpForm({ setIsSignUp }) {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.log("user creation encountered an error", error);
      }
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
          />

          <FormInput
            onChange={handleChange}
            type="text"
            placeholder="Enter Email"
            name="email"
            value={email}
          />

          <FormInput
            onChange={handleChange}
            type="password"
            placeholder="Enter Password"
            name="password"
            value={password}
          />

          <FormInput
            onChange={handleChange}
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
          />
          <Button onClick={handleSubmit} type="submit">
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

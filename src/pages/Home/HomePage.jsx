import React from "react";
import Navbar from "components/Navbar";
import Posts from "components/Posts";
import FeedInput from "components/FeedInput";
import { Box } from "@chakra-ui/react";

const Home = () => {
  return (
    <>
      <Box background="#f4f4f4" h="100vh">
        <Navbar />
        <FeedInput />
        <Posts />
      </Box>
    </>
  );
};

export default Home;

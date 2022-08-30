import React from "react";
import Navbar from "components/Navbar";
import Feed from "components/Feed";
import FeedInput from "components/FeedInput";
import { Box } from "@chakra-ui/react";

const Home = () => {
  return (
    <>
      <Box background="#f4f4f4" h="100vh">
        <Navbar />
        <FeedInput />
      </Box>
      {/* <Feed /> */}
    </>
  );
};

export default Home;

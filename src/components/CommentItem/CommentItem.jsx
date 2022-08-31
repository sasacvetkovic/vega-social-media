import React from "react";
import {
  Avatar,
  Flex,
  Text,
  Input,
  Box,
  Button,
} from "@chakra-ui/react";

const CommentItem = () => {
  return (
    <>
      <Flex>
        <Avatar
          src={profileImage.stringValue}
          name={username.stringValue}
          size="sm"
        />
        <Box position="relative" w="92%">
          <Input
            onChange={handleCommentChange}
            value={comment}
            placeholder="Write your comment here"
            size="sm"
            borderRadius="5px"
            ml="10px"
          />
          <Button
            onClick={submitComment}
            background="transparent"
            color="#f1592a"
            fontWeight={600}
            size="xs"
            position="absolute"
            top="4px"
            right={0}
            zIndex={2}
          >
            Post
          </Button>
        </Box>
      </Flex>

      <Flex mt="20px">
        <Avatar name="Coment" size="sm" />
        <Flex
          flexDir="column"
          ml="10px"
          bg="#edf2f6"
          borderRadius="10px"
          p="7px"
        >
          <Text fontSize="12px" fontWeight={600}>
            Sasa Cvetkovic
          </Text>
          <Text fontSize="12px" color="#6c757d">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia,
            deleniti? assaf gsag asg as a
          </Text>
        </Flex>
      </Flex>
      {/* Comments Section End */}
    </>
  );
};

export default CommentItem;

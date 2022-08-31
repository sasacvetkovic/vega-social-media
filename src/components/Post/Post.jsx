import React from "react";
import {
  Avatar,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
  Input,
} from "@chakra-ui/react";
import likeIcon from "assets/like.png";
import commentIcon from "assets/comment.png";

const Post = () => {
  return (
    <Grid
      templateColumns="repeat(10, 1fr)"
      my="25px"
      bg="#fff"
      p="16px"
      borderRadius="10px"
      border="1px solid #e8e8e8"
      gap="15px"
    >
      <GridItem colSpan={1} w="100%">
        <Avatar src="https://bit.ly/dan-abramov" name="Dan Abrahmov" />
      </GridItem>
      <GridItem colSpan={9} w="100%">
        <Text fontSize="md" mt="5px" fontWeight={600}>
          Sasa Cvetkovic
        </Text>
        <Text color="#6c757d" lineHeight="1.4" mt="5px" mb="20px">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem expedita
          corrupti aut repellat quo aliquam unde alias velit cumque obcaecati?
        </Text>
        <Image
          src="https://images.pexels.com/photos/1757363/pexels-photo-1757363.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          borderRadius="5px"
        />
        <Flex my="16px">
          <Flex mr="70px">
            <Image w="20px" src={likeIcon} />
            <Text size="13px" color="#6c757d" ml="5px">
              25
            </Text>
          </Flex>
          <Flex>
            <Image w="20px" src={commentIcon} />
            <Text size="13px" color="#6c757d" ml="5px">
              53
            </Text>
          </Flex>
        </Flex>
        {/* Comments Section */}
        <Flex>
          <Avatar name="Test" size="sm" />
          <Input
            placeholder="Write your comment here"
            size="sm"
            borderRadius="5px"
            ml="10px"
          />
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
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Mollitia, deleniti?
            </Text>
          </Flex>
        </Flex>
        {/* Comments Section End */}
      </GridItem>
    </Grid>
  );
};

export default Post;

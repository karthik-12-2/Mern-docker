import { Button, Container, Flex, HStack, useColorMode } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { Text } from "@chakra-ui/react";
import { LuSun } from "react-icons/lu";
import { IoMoon } from "react-icons/io5";


const Navbar = () => {
      const { colorMode, toggleColorMode } = useColorMode();
  return (

    <Container maxW={"1140px"} px={4} >
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontSize={{base: "22", sm: "28"}}
          fontWeight="bold"
          textTransform="uppercase"
          textAlign={"center"}
        >
            <Link to={"/"}>Product Store </Link>
        </Text>

        <HStack spacing={2} alignItems={"center"}>
            <Link to={"/create"}>
              <Button colorScheme={"purple"}><PlusSquareIcon fontSize={20}/></Button>
            </Link>
              <Button onClick={toggleColorMode}>{colorMode === "light" ? <IoMoon/> : <LuSun fontSize={20}/>}</Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;

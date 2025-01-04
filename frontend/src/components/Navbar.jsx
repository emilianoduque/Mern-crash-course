import { Container, Flex, HStack, Text, Button} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import { CiSquarePlus } from "react-icons/ci";
import { useColorMode, useColorModeValue } from "./ui/color-mode";

const Navbar = () => {
    const {colorMode, toggleColorMode} = useColorMode();
  return (
    <Container maxW={"1140px"} px={4} bg={useColorModeValue("gray.100", "gray.900")}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"} flexDir={{
            base:"column",
            sm:"row"
        }}>
            <Text>
                <Link to={"/"}>Product Store</Link>
            </Text>

            <HStack wordSpacing={2} alignItems={"center"}>
                <Link to={"/create"}>
                    <Button>
                        <CiSquarePlus fontSize={20}></CiSquarePlus>
                    </Button>
                </Link>

                <Button onClick={toggleColorMode}>
                    {colorMode === "light" ? "🌙" : "🌞" }
                </Button>
            </HStack>
        </Flex>
    </Container>
  )
}

export default Navbar
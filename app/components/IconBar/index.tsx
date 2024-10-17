import { Box, Flex, IconButton } from "@chakra-ui/react";
import { FaMedium, FaTelegram, FaTwitter } from "react-icons/fa";

const IconBar = () => {
  return (
    <Box
      bg="#0a0e0b"
      w="100%"

      mt="auto"
    >
      <Flex justify="center" gap={6} align="center" height="100px">
        <IconButton
          as="a"
          href="https://x.com"
          aria-label="X"
          icon={<FaTwitter size="35px" />}
          bg="transparent"
          color="white"
          _hover={{ bg: "whiteAlpha.200" }}
        />
        <IconButton
          as="a"
          href="https://telegram.com"
          aria-label="Telegram"
          icon={<FaTelegram size="35px" />}
          bg="transparent"
          color="white"
          _hover={{ bg: "whiteAlpha.200" }}
        />
        <IconButton
          as="a"
          href="https://medium.com"
          aria-label="Medium"
          icon={<FaMedium size="35px" />}
          bg="transparent"
          color="white"
          _hover={{ bg: "whiteAlpha.200" }}
        />
      </Flex>
    </Box>
  );
};

export default IconBar;

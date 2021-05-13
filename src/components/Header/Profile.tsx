import { Text, Avatar, Box, Flex } from "@chakra-ui/react";

export function Profile() {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>Everton Pereira</Text>
        <Text gray="gray.300" fontSize="small">
          evertonsouls@gmail.com
        </Text>
      </Box>
      <Avatar
        size="md"
        name="Everton Perira"
        src="https://github.com/evertonsouls.png"
      />
    </Flex>
  );
}
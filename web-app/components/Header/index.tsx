import { Container, Box, Text, Group, Avatar } from '@mantine/core';

const Header = () => {
  return (
    <Box w="100%" bg="#005bbb">
      <Box p={20}>
        <Group justify="space-between">
          <Text color="white">UB Food Vendor Tracking</Text>
          <Avatar color="white" />
        </Group>
      </Box>
    </Box>
  );
};

export default Header;

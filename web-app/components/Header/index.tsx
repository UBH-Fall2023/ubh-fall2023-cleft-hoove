import { Container, Box, Text, Group, Avatar, Flex } from '@mantine/core';

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <Box w="100%" bg="#005bbb">
      <Box p={20}>
        <Group justify="space-between">
          <Group>
            <Text c="white" size="lg" fw={700}>
              Buffalo Bites
            </Text>
            <Text c="white">|</Text>
            <Text c="white">{title}</Text>
          </Group>
          <Avatar color="white" />
        </Group>
      </Box>
    </Box>
  );
};

export default Header;

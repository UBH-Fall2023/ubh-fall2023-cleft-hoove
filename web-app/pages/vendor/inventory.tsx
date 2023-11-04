import Header from '@/components/Header';
import Inventory from '@/components/Inventory';
import { Flex, Group, Text, Stack } from '@mantine/core';
import { IconMapPin } from 'tabler-icons';

export default function InventoryPage() {
  return (
    <Stack>
      <Header />
      <Flex justify={'center'}>
        <Group>
          <IconMapPin />
          <Text>One World</Text>
        </Group>
      </Flex>
      <Inventory />
    </Stack>
  );
}

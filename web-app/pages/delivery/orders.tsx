import Header from '@/components/Header';
import Orders from '@/components/Orders';
import { Flex, Group, Text, Stack, Title, Space } from '@mantine/core';
import { IconMapPin } from 'tabler-icons';

export default function OrdersPage() {
  return (
    <Stack>
      <Header title="Food Delivery" />
      <Flex justify={'left'}>
        <Space w="lg" />
        <Group>
          <Title>Deliveries</Title>
        </Group>
      </Flex>
      <Orders />
    </Stack>
  );
}

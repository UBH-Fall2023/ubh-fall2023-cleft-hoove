import Header from '@/components/Header';
import { Stack, Text } from '@mantine/core';
import { IconCircleCheck } from 'tabler-icons';

export default function OrderCreatedPage() {
  return (
    <Stack>
      <Header title="Food Order"></Header>
      <Stack pt={50} align="center">
        <IconCircleCheck color="green" />
        <Text>Order Created</Text>
      </Stack>
    </Stack>
  );
}

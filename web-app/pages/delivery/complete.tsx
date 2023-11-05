import Header from '@/components/Header';
import { Flex, Group, Text, Stack, Space, Title } from '@mantine/core';
import { useRouter } from 'next/router';
import { IconCircleCheck } from 'tabler-icons';

export default function CompletePage() {
  const router = useRouter();

  return (
    <Stack>
      <Header title="Food Delivery" />

      <Flex justify={'left'}>
        <Space w="lg" />

        <Title order={3}>Delivery</Title>
      </Flex>
      <Stack pt={50} gap={'sm'} align={'center'}>
        <IconCircleCheck color="green" />
        <Text>Order Completed</Text>
      </Stack>
    </Stack>
  );
}

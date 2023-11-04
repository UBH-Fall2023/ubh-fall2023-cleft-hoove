import Header from '@/components/Header';
import Confirmation from '@/components/Confirmation';
import { Flex, Group, Text, Stack,Space,Title} from '@mantine/core';
import { IconMapPin } from 'tabler-icons';

export default function ConfirmationPage() {
  return (
    <Stack>
      <Header />
      
      <Flex justify={'left'}>
      <Space w="lg" />
        <Group>
          <Title>Delivery</Title>
        </Group>
      </Flex>
      <Confirmation />
    </Stack>
  );
}
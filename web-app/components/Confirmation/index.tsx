import {
  Button,
  Divider,
  Flex,
  Stack,
  Table,
  Text,
  Space,
  Title,
  Group,
  Image,
} from '@mantine/core';
import { IconTrash } from 'tabler-icons';
import NextImage from 'next/image';
import Map from './Map.png';

const Confirmation = () => {
  return (
    <Stack w="100%">
      <Space w="md" />
      <Group pl={40} pr={40} justify="space-between">
        <Flex direction={'column'}>
          <Text fz="lg">Order ID: BLANK</Text>
          <Text fz="lg">Dropoff: BLANK</Text>
        </Flex>

        <Button>Drop Off</Button>
      </Group>

      <Flex justify={'center'}>
        <Image h={500} w={830} component={NextImage} src={Map} alt="map" />
      </Flex>
    </Stack>
  );
};

export default Confirmation;

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
import { useEffect, useState } from 'react';
import { Host } from '@/config';
import { useRouter } from 'next/router';

interface Order {
  _id: string;
  createdAt: string;
  pickup: string;
  dropoff: string;
  price?: number;
}

const Confirmation = () => {
  const router = useRouter();
  const [order, setOrder] = useState<Order>();

  const fetchOrder = () => {
    fetch(`${Host}/api/v1/order/${router.query.order}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => setOrder(res));
  };

  const completeOrder = (order: string) => {
    fetch(`${Host}/api/v1/order/complete?id=${router.query.order}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <Stack w="100%">
      <Space w="md" />
      {order && (
        <Group pl={40} pr={40} justify="space-between">
          <Flex direction={'column'}>
            <Group>
              <Text c="dimmed" fz="lg">
                OrderID:
              </Text>
              <Text>{order._id}</Text>
            </Group>

            <Group>
              <Text c="dimmed" fz="lg">
                CreatedAt:
              </Text>
              <Text>{order.createdAt}</Text>
            </Group>
          </Flex>
          <Flex columnGap={'sm'} direction={'column'}>
            <Group>
              <Text c="dimmed" fz="lg">
                Pickup:
              </Text>
              <Text>{order.pickup}</Text>
            </Group>
            <Group>
              <Text c="dimmed" fz="lg">
                Dropoff:
              </Text>
              <Text>{order.dropoff}</Text>
            </Group>
            <Button onClick={() => completeOrder(order._id)}>Complete</Button>
          </Flex>
        </Group>
      )}

      <Flex justify={'center'}>
        <Image h={500} w={830} component={NextImage} src={Map} alt="map" />
      </Flex>
    </Stack>
  );
};

export default Confirmation;

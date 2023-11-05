import Header from '@/components/Header';
import { Host, UserId } from '@/config';
import { Badge, Box, Card, Flex, Group, Stack, Text, Title } from '@mantine/core';
import { useEffect, useState } from 'react';

const getStatus = (status: string) => {
  if (status.length == 0) {
    return <Badge>UNKNOWN</Badge>;
  }
  status = status.replace('Symbol(', '');
  status = status.replace(')', '');
  switch (status) {
    case 'created':
      return <Badge color="blue"> CREATED </Badge>;
    case 'ontheway':
      return <Badge color="yellow"> IN TRANSIT </Badge>;
    case 'completed':
      return <Badge color="green"> COMPLETED</Badge>;
  }
};

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    fetch(`${Host}/api/v1/order/user?userId=${UserId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => setOrders(res));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Stack>
      <Header title="Food Order"></Header>
      <Flex pl={20}>
        <Title>Orders</Title>
      </Flex>
      <Box pt={10}></Box>
      {orders &&
        orders.map((order: any) => {
          return (
            <>
              <Card shadow="sm">
                <Group justify="space-between">
                  <Flex direction={'column'}>
                    <Group>
                      <Text c="dimmed">OrderId:</Text>
                      <Text>{order._id}</Text>
                    </Group>
                    <Group>
                      <Text c="dimmed">Pickup:</Text>
                      <Text>{order.pickup}</Text>
                    </Group>
                    <Group>
                      <Text c="dimmed">Dropoff:</Text>
                      <Text>{order.dropoff}</Text>
                    </Group>
                  </Flex>
                  <Flex direction={'column'}>
                    <Group>
                      <Text c="dimmed">Status:</Text>
                      <Text>{getStatus(order.status)}</Text>
                    </Group>
                    <Group>
                      <Text c="dimmed">Amount:</Text>
                      <Text>${order.price || 10}</Text>
                    </Group>
                    <Group>
                      <Text c="dimmed">CreatedAt:</Text>
                      <Text>{order.createdAt}</Text>
                    </Group>
                  </Flex>
                </Group>
              </Card>
            </>
          );
        })}
    </Stack>
  );
}

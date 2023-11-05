import { DeliverId, Host } from '@/config';
import { Button, Divider, Flex, Modal, Stack, Table } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IconTrash } from 'tabler-icons';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [opened, setOpened] = useState(false);
  const [pickupOrders, setPickupOrders] = useState([]);

  const fetchOrders = () => {
    fetch(`${Host}/api/v1/order/deliver?deliverId=${DeliverId}`, {
      method: 'GET',
      headers: {
        ContentType: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setOrders(res);
      });
  };

  const fetchPickupOrders = (pickup: string) => {
    fetch(`${Host}/api/v1/order/pickup?pickup=${pickup}`, {
      method: 'GET',
      headers: {
        ContentType: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setPickupOrders(res);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const onClickLocation = (location: string) => {
    setOpened(true);
    fetchPickupOrders(location);
  };
  const router = useRouter();
  const onClickDeliver = (orderId: string) => {
    fetch(`${Host}/api/v1/order/pickup?id=${orderId}`, {
      method: 'PUT',
      headers: {
        ContentType: 'application/json',
      },
      body: JSON.stringify({
        id: orderId.toString(),
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        router.push('/delivery/confirmation?order=' + orderId);
      });
  };

  const rows = orders.map((e: any) => {
    return (
      <Table.Tr onClick={() => onClickLocation(e.location)} key={e.location}>
        <Table.Td>{e.location}</Table.Td>
        <Table.Td>{'21:00'}</Table.Td>
        <Table.Td>{e.count}</Table.Td>
      </Table.Tr>
    );
  });

  const pickOrders = pickupOrders.map((e: any) => {
    return (
      <Table.Tr key={e._id}>
        <Table.Td>{e._id}</Table.Td>
        <Table.Td>{e.dropoff}</Table.Td>
        <Table.Td>{e.createdAt}</Table.Td>
        <Table.Td>
          <Button onClick={() => onClickDeliver(e._id)}>Deliver</Button>
        </Table.Td>
      </Table.Tr>
    );
  });
  return (
    <Flex p={20} direction={'column'}>
      <Modal
        size={'xl'}
        withCloseButton={false}
        opened={opened}
        onClose={() => setOpened(false)}
        centered
      >
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Td>OrderId</Table.Td>
              <Table.Td>DropOff</Table.Td>
              <Table.Td>Created On</Table.Td>
              <Table.Td></Table.Td>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{pickOrders}</Table.Tbody>
        </Table>
      </Modal>
      <Table w={'100%'}>
        <Table.Thead>
          <Table.Tr>
            <Table.Td>Pickup Location</Table.Td>
            <Table.Td>Closing Time</Table.Td>
            <Table.Td>Open Orders</Table.Td>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Flex>
  );
};

export default Orders;

import { Button, Divider, Flex, Stack, Table } from '@mantine/core';
import { IconTrash } from 'tabler-icons';

const Orders = () => {
  const ele: any = [{ id: 1, location: 'One World Café', distance: 1.2, close: "22:00" ,open:50}];
  const rows = ele.map((e: any) => {
    return (
      <Table.Tr key={e.id}>
        <Table.Td>{e.location}</Table.Td>
        <Table.Td>{e.distance+" mi"}</Table.Td>
        <Table.Td>{e.close}</Table.Td>
        <Table.Td>{e.open}</Table.Td>
      </Table.Tr>
    );
  });
  return (
    <Flex p={20} direction={'column'}>
     
      <Table w={'100%'}>
        <Table.Thead>
          <Table.Tr>
            <Table.Td>Location</Table.Td>
            <Table.Td>Distance</Table.Td>
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

import { Button, Divider, Flex, Stack, Table } from '@mantine/core';
import { IconTrash } from 'tabler-icons';

const Inventory = () => {
  const ele: any = [{ id: 1, name: 'Chicken Rice', price: 100, inventory: 100 }];
  const rows = ele.map((e: any) => {
    return (
      <Table.Tr key={e.id}>
        <Table.Td>{e.name}</Table.Td>
        <Table.Td>{'$' + e.price}</Table.Td>
        <Table.Td>{e.inventory}</Table.Td>
        <Table.Td>
          <IconTrash />
        </Table.Td>
      </Table.Tr>
    );
  });
  return (
    <Flex p={20} direction={'column'}>
      <Flex justify={'end'}>
        <Button>Add Item</Button>
      </Flex>

      <Table w={'100%'}>
        <Table.Thead>
          <Table.Tr>
            <Table.Td>Item</Table.Td>
            <Table.Td>Price</Table.Td>
            <Table.Td>Inventory</Table.Td>
            <Table.Td></Table.Td>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Flex>
  );
};

export default Inventory;

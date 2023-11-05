import {
  Button,
  Divider,
  Flex,
  Group,
  Modal,
  NumberInput,
  Stack,
  Table,
  TextInput,
} from '@mantine/core';
import { IconTrash } from 'tabler-icons';
import { useEffect, useState } from 'react';
import { Host, VendorId } from '@/config';
import { useForm } from '@mantine/form';

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [opened, setOpened] = useState(false);

  const form = useForm({
    initialValues: {
      name: '',
      stock: 0,
      price: 0,
      vendorId: VendorId,
    },
  });
  const onSubmit = (values: any) => {
    fetch(`${Host}/api/v1/item`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then(() => fetchItems());
    setOpened(false);
    form.reset();
  };

  const fetchItems = () => {
    fetch(`${Host}/api/v1/item/vendor?vendorId=${VendorId}`, {
      method: 'GET',
      headers: {
        ContentType: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => setItems(res));
  };

  const deleteItem = (itemId: string) => {
    fetch(`${Host}/api/v1/item/${itemId}`, {
      method: 'DELETE',
      headers: {
        ContentType: 'application/json',
      },
    })
      .then((res) => res.json())
      .then(() => fetchItems());
  };
  useEffect(() => {
    fetchItems();
  }, []);

  const rows = items.map((e: any) => {
    return (
      <Table.Tr key={e._id}>
        <Table.Td>{e.name}</Table.Td>
        <Table.Td>{'$' + e.price}</Table.Td>
        <Table.Td>{e.stock}</Table.Td>
        <Table.Td>
          <IconTrash onClick={() => deleteItem(e._id)} />
        </Table.Td>
      </Table.Tr>
    );
  });
  return (
    <Flex p={20} h={'100%'} direction={'column'}>
      <Modal centered opened={opened} onClose={() => setOpened(false)} withCloseButton={false}>
        <form onSubmit={form.onSubmit(onSubmit)}>
          <Stack gap={'lg'}>
            <TextInput label="Name" {...form.getInputProps('name')} />
            <NumberInput label="Stock" {...form.getInputProps('stock')} />
            <NumberInput label="Price" {...form.getInputProps('price')} />
            <Group justify={'center'}>
              <Button type="submit">Submit</Button>
            </Group>
          </Stack>
        </form>
      </Modal>
      <Flex justify={'end'}>
        <Button onClick={() => setOpened(true)}>Add Item</Button>
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

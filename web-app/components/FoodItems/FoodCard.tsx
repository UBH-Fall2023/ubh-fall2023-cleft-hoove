import { useList } from '@/context/FoodCartContext';
import { Button, Card, Flex, Group, Stack, Text } from '@mantine/core';
import { IconMapPin } from 'tabler-icons';

export interface FoodCardProps {
  name: string;
  price: number;
  stock: number;
  _id: string;
  location: string;
}

export const FoodCard = (props: FoodCardProps) => {
  const { addItem } = useList();

  const onAddItem = () => {
    addItem(props);
  };

  return (
    <Card key={props._id} shadow="xs">
      <Stack>
        <Group justify="space-between">
          <Text>{props.name}</Text>
          <Text>${props.price}</Text>
        </Group>
        <Group justify="space-between">
          {/* <Group>
            <IconMapPin></IconMapPin>
            <Text>{props.location}</Text>
          </Group> */}
          <Group>
            <Text c="dimmed">Stock:</Text>
            <Text>{props.stock}</Text>
          </Group>
          <Flex justify={'end'}>
            <Button onClick={onAddItem}>Add Item</Button>
          </Flex>
        </Group>
      </Stack>
    </Card>
  );
};

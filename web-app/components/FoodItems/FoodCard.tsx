import { Host } from '@/config';
import { useList } from '@/context/FoodCartContext';
import { Button, Card, Flex, Group, Stack, Text } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconMapPin } from 'tabler-icons';

export interface FoodCardProps {
  name: string;
  price: number;
  stock: number;
  vendorId: string;
  _id: string;
  location: string;
}

export const FoodCard = (props: FoodCardProps) => {
  const { addItem } = useList();

  const onAddItem = async () => {
    const vendorLocation = await fetch(`${Host}/api/v1/vendor/${props.vendorId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => res.location);

    addItem({ ...props, pickup: vendorLocation });

    showNotification({ message: 'Added to cart!' });
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

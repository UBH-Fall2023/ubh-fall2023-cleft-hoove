import { Button, Card, Flex, Group, Stack, Text } from '@mantine/core';
import { IconMapPin } from 'tabler-icons';

export interface FoodCardProps {
  name: string;
  price: number;
  stock: number;
  id: string;
  location: string;
}

export const FoodCard = (props: FoodCardProps) => {
  return (
    <Card key={props.id} shadow="xs">
      <Stack>
        <Group justify="space-between">
          <Text>{props.name}</Text>
          <Text>${props.price}</Text>
        </Group>
        <Group justify="space-between">
          <Group>
            <IconMapPin></IconMapPin>
            <Text>{props.location}</Text>
          </Group>
          <Group>
            <Text c="dimmed">Stock:</Text>
            <Text>{props.stock}</Text>
          </Group>
        </Group>
        <Flex justify={'end'}>
          <Button>Add Item</Button>
        </Flex>
      </Stack>
    </Card>
  );
};

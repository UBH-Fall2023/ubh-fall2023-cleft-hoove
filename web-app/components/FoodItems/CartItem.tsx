import { useList } from '@/context/FoodCartContext';
import { Card, Stack, Group, Text } from '@mantine/core';
import { IconMapPin } from 'tabler-icons';

const CartItemList = () => {
  const { storageItems } = useList();
  return (
    <>
      <Stack p={30}>
        {storageItems.map((item: any) => {
          return <CartItem {...item} />;
        })}
      </Stack>
    </>
  );
};

interface CartItemProps {
  _id: string;
  name: string;
  price: number;
  location: string;
}

const CartItem = (props: CartItemProps) => {
  return (
    <Card key={props._id} shadow="xs">
      <Stack>
        <Group justify="space-between">
          <Text>{props.name}</Text>
          <Text>${props.price}</Text>
        </Group>
        {/* <Group justify="space-between">
          <Group>
            <IconMapPin></IconMapPin>
            <Text>{props.location}</Text>
          </Group>
        </Group> */}
      </Stack>
    </Card>
  );
};

export default CartItemList;

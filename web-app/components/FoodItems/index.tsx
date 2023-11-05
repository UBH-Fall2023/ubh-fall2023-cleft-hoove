import { Flex, Stack, Text } from '@mantine/core';
import { FoodCard, FoodCardProps } from './FoodCard';

const FoodItems = () => {
  const ele: FoodCardProps[] = [
    {
      name: 'Chicken Rice',
      id: '1',
      key: '1',
      price: 2,
      stock: 20,
      location: 'One World',
    },
    {
      name: 'Pizza',
      id: '2',
      key: '2',
      price: 10,
      stock: 100,
      location: 'One World',
    },
  ];
  return (
    <Stack p={30}>
      <Flex>
        <Text size="xl" fw={700}>
          Order
        </Text>
      </Flex>
      {ele.map((ele: FoodCardProps) => {
        return <FoodCard {...ele} />;
      })}
    </Stack>
  );
};

export default FoodItems;

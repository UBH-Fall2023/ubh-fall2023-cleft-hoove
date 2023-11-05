import { Flex, Stack, Text } from '@mantine/core';
import { FoodCard, FoodCardProps } from './FoodCard';
import { Host } from '@/config';
import { useEffect, useState } from 'react';

const FoodItems = () => {
  // const ele: FoodCardProps[] = [
  //   {
  //     name: 'Chicken Rice',
  //     id: '1',
  //     price: 2,
  //     stock: 20,
  //     location: 'One World',
  //   },
  //   {
  //     name: 'Pizza',
  //     id: '2',
  //     price: 10,
  //     stock: 100,
  //     location: 'One World',
  //   },
  // ];
  const [ele, setEle] = useState<FoodCardProps[]>([]);

  const fetchItems = () => {
    fetch(`${Host}/api/v1/item`, {
      method: 'GET',
      headers: {
        ContentType: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => setEle(res.rows));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <Stack p={30}>
      <Flex>
        <Text size="xl" fw={700}>
          Order
        </Text>
      </Flex>
      {ele.map((ele: FoodCardProps) => {
        return <FoodCard key={ele._id} {...ele} />;
      })}
    </Stack>
  );
};

export default FoodItems;

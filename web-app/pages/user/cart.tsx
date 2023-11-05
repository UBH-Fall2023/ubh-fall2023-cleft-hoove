import { Button, Flex, Stack, Text } from '@mantine/core';
import Header from '@/components/Header';
import { useList } from '@/context/FoodCartContext';
import CartItemList from '@/components/FoodItems/CartItem';
import { Host, UserId } from '@/config';
import { useRouter } from 'next/router';

export default function Cart() {
  const { storageItems, removeItems } = useList();
  const router = useRouter();
  const onPay = async () => {
    const dropOff = await fetch(`${Host}/api/v1/user/${UserId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => res.location);
    console.log('user dropoff location ', dropOff);

    const m = new Map();
    for (const item of storageItems) {
      if (m.has(item.pickup)) {
        m.get(item.pickup).push(item);
      } else {
        m.set(item.pickup, [item]);
      }
    }

    const createOrder = async (items: any, pickup: string) => {
      let totalAmount: number = 0;
      for (let item of items) {
        totalAmount += item.price;
      }

      const body = {
        userId: UserId?.toString(),
        pickup: pickup,
        dropoff: dropOff,
        items: items,
        price: totalAmount,
      };
      console.log('body ', body);
      return await fetch(`${Host}/api/v1/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log('order response ', res);
          return res._id;
        });
    };

    for (const pickup of m.keys()) {
      console.log(`order created `, await createOrder(m.get(pickup), pickup));
    }
    removeItems();

    router.push('/user/order');
  };

  return (
    <Stack>
      <Header title="Food Order" />
      <Flex pl={30}>
        <Text fw={700}>Cart</Text>
      </Flex>
      <CartItemList />
      <Flex justify={'center'}>
        <Button onClick={onPay}>Pay</Button>
      </Flex>
    </Stack>
  );
}

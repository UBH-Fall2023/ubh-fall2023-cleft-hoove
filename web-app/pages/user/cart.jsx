import { Button, Flex, Stack,Text } from "@mantine/core";
import Header from '@/components/Header';
import {useList} from '@/context/FoodCartContext';
import CartItemList from '@/components/FoodItems/CartItem';

export default function Cart() {
    const {storageItems} = useList();
    return <Stack>
        <Header />
        <Flex pl={30}>
            <Text fw={700}>Cart</Text>
        </Flex>
        <CartItemList />
        <Flex justify={"center"}>
            <Button>Pay</Button>
        </Flex>
    </Stack>
}

import {Affix, Stack} from '@mantine/core';
import Header from '@/components/Header';
import FoodItems from '@/components/FoodItems';
import {IconShoppingCart} from 'tabler-icons';

export default function UserHome() {
    return <Stack>
        <Header />
        <FoodItems />
        <Affix zIndex={20} position={{ bottom: 20, right: 40 }}>
            <IconShoppingCart size={30} color='#005bbb' />
        </Affix>
    </Stack>
}
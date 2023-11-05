import {ActionIcon, Box, Button, Affix, Indicator, Stack} from '@mantine/core';
import Header from '@/components/Header';
import FoodItems from '@/components/FoodItems';
import {IconShoppingCart} from 'tabler-icons';
import {useList} from '@/context/FoodCartContext';
import { useEffect , useState} from 'react';


export default function UserHome() {
    const {items} = useList();
    
    return <Stack>
        <Header />
        <FoodItems/>
        <Affix zIndex={20} position={{ bottom: 20, right: 40 }}>
            <ActionIcon component='a' href="/user/cart" size='md' style={
                {
                    backgroundColor: 'transparent',
                    // border: '1px solid #ccc', // Add a border for visibility
                    color: '#333', // Set the text color
                  }
            }>

             {/* <Indicator disabled={items.length == 0} label={items.length == 0? "": items.length}>  */}
            <IconShoppingCart  href={"/user/cart"} size={30} color='#005bbb' />
            {/* </Indicator> */}

            </ActionIcon>
        </Affix>
    </Stack>
}
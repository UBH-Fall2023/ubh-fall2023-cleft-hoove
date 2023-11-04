import { Button, Divider, Flex, Stack, Table,Text,Space,Title,Group,Image } from '@mantine/core';
import { IconTrash } from 'tabler-icons';
import NextImage from 'next/image';
import Map from './Map.png';

const Confirmation = () => {
    
  return (
    <Stack>
    <Group justify = "space-evenly">
    <Stack>
        <Space w="md"/>
      <Flex justify={'center'}p={20} direction={'column'}>
          <Title fz="lg">Order ID: BLANK</Title>
          <Title fz="lg">Dropoff: BLANK</Title>
      </Flex>
    </Stack>
    <Flex p={20} justify={"center"} direction={'column'}>
<Button>Drop Off</Button>

      </Flex>
    
    </Group>
    <Flex justify ={'center'}>
    <Image
    h={500}
    w={1300}
      component={NextImage} src={Map} alt="map"
    />
    </Flex>
    </Stack>
  );
};

export default Confirmation;

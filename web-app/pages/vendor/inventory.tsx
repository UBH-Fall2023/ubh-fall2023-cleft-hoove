import Header from '@/components/Header';
import Inventory from '@/components/Inventory';
import { Host, VendorId } from '@/config';
import { Flex, Group, Text, Stack } from '@mantine/core';
import { useEffect, useState } from 'react';
import { IconMapPin } from 'tabler-icons';

interface Vendor {
  name: string;
  location: string;
}

export default function InventoryPage() {
  const [vendor, setVendor] = useState<Vendor>();

  const fetchLoc = () => {
    fetch(`${Host}/api/v1/vendor/${VendorId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => setVendor(res));
  };
  useEffect(() => {
    fetchLoc();
  }, []);
  return (
    <Stack>
      <Header title="Food Vendor" />
      {vendor && (
        <Group pl={20} pr={20} justify={'space-between'}>
          <Text fw={700}>{vendor.name}</Text>
          <Group>
            <IconMapPin />
            {vendor && <Text>{vendor.location}</Text>}
          </Group>
        </Group>
      )}
      <Inventory />
    </Stack>
  );
}

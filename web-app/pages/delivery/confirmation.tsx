import Header from '@/components/Header';
import Confirmation from '@/components/Confirmation';
import { Flex, Group, Text, Stack, Space, Title } from '@mantine/core';
import { IconMapPin } from 'tabler-icons';
import { useRouter } from 'next/router';
import { Host } from '@/config';
import { useEffect, useState } from 'react';

export default function ConfirmationPage() {
  return (
    <Stack>
      <Header title="Food Delivery" />

      <Flex justify={'left'}>
        <Space w="lg" />

        <Title>Delivery</Title>
      </Flex>
      <Confirmation />
    </Stack>
  );
}

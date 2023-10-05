import { Box, Button, Container, Group, Text } from "@mantine/core";
import Link from "next/link";
import React from "react";
import Categories from "./Categories";

const Navbar = () => {
  return (
    <Box
      style={{
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Container size="lg">
        <Box component="nav" py={15}>
          <Group justify="space-between" align="center">
            <Text fs="2rem" fw="bold" tt="uppercase">
              <Link href="/">Next Pc Builder</Link>
            </Text>
            <Group align="center">
              <Categories />
              <Link href="/pc-builder">
                <Button>Pc Builder</Button>
              </Link>
            </Group>
          </Group>
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;

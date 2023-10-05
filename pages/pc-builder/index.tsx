import { appConfig } from "@/src/config";
import { ICategoryResponse } from "@/src/interface/category.interface";
import {
  Box,
  Button,
  Container,
  Grid,
  Group,
  Stack,
  Text,
} from "@mantine/core";
import React from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/src/redux/hook";
import { removeAll, removeItem } from "@/src/redux/pc-builder/pc-builder.slice";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/router";

const PCBuilderPage = ({ categories }: { categories: ICategoryResponse }) => {
  const cartItems = useAppSelector((state) => state.pcBuilder.cartItems);
  const dispatch = useAppDispatch();

  const router = useRouter();

  const items = cartItems?.length;
  const total = cartItems?.reduce((acc, item) => acc + item.price, 0);

  const getSelectedProductByCategory = (category: string) => {
    return cartItems?.find((item) => item.category === category);
  };

  const handleCompleteBuild = () => {
    notifications.show({
      title: "Build Completed",
      message: "Your build has been completed",
      color: "teal",
    });
    setTimeout(() => {
      dispatch(removeAll());
      router.push("/");
    }, 1000);
  };

  return (
    <Container size="lg" py="lg">
      <Box
        style={{
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
        py={20}
      >
        <Group
          justify="space-between"
          align="center"
          px={20}
          style={{
            borderBottom: "1px solid #ddd",
          }}
        >
          <Text>PC Builder - Build Your Own Computer</Text>
          <Stack gap={0} align="center" p={10} fz={14}>
            <Box component="span">{total}৳</Box>
            <Box component="span">{items} Items</Box>
          </Stack>
        </Group>
        <Grid>
          {categories?.data?.map((item) => (
            <Grid.Col
              span={4}
              key={item._id}
              style={{
                padding: 20,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRight: "1px solid #ddd",
                borderBottom: "1px solid #ddd",
              }}
            >
              {getSelectedProductByCategory(item.name) ? (
                <>
                  <Text fz={16} fw={500}>
                    {getSelectedProductByCategory(item.name)?.name}
                  </Text>
                  <Button
                    fz={12}
                    color="red"
                    onClick={() => {
                      const id = getSelectedProductByCategory(item.name)?._id;
                      dispatch(removeItem(id as string));
                    }}
                  >
                    Remove
                  </Button>
                </>
              ) : (
                <>
                  <Text fz={16} fw={500}>
                    {item?.name}
                  </Text>

                  <Button
                    style={{
                      fontSize: 12,
                    }}
                    component={Link}
                    href={`/pc-builder${item.route}`}
                  >
                    Choose
                  </Button>
                </>
              )}
            </Grid.Col>
          ))}
        </Grid>
        <Button
          disabled={cartItems.length < 5}
          style={{
            display: "block",
            margin: "0 auto",
            marginTop: 20,
          }}
          onClick={() => handleCompleteBuild()}
        >
          Complete Build
        </Button>
      </Box>
    </Container>
  );
};

export default PCBuilderPage;

export const getServerSideProps = async () => {
  const categoriesResponse = await fetch(`${appConfig.base_url}/categories`);
  const categories = await categoriesResponse.json();
  return {
    props: {
      categories,
    },
  };
};

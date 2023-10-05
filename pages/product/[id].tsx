import { appConfig } from "@/src/config";
import { IProduct, IProductResponse } from "@/src/interface/product.interface";
import { Box, Container, Grid, Group, Stack, Text } from "@mantine/core";
import React from "react";

import Image from "next/image";

const ProductDetails = ({ product }: { product: IProduct }) => {
  return (
    <Container size="lg" py="lg">
      <Grid mt={20} gutter={40}>
        <Grid.Col
          span={6}
          style={{
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Image
            src={product?.image}
            alt={product?.name}
            width={500}
            height={500}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <Stack justify="center" h="100%">
            <Text variant="h2" fw="bold" size="xl">
              {product?.name}
            </Text>
            <Group>
              <Text>
                <strong>Category: </strong> {product?.category}
              </Text>
              <Text>
                <strong>Avg Rating: </strong> {product?.avgRating}
              </Text>
              <Text>
                <strong>Individual Rating: </strong>{" "}
                {product?.individiualRating}
              </Text>
            </Group>
            <Text>
              <strong>Key Features: </strong> {product?.keyfeature}
            </Text>
            <Text>
              <strong>Price: </strong>
              {product?.price}TK
            </Text>
            <Text>
              <strong>Status: </strong>
              {product?.status}
            </Text>
          </Stack>
        </Grid.Col>
      </Grid>
      <Stack>
        <Text variant="h2" fw="bold" size="xl">
          Description
        </Text>
        <Text>{product?.description}</Text>
      </Stack>
      <Stack mt={40}>
        {/* reviews */}
        <Text variant="h2" fw="bold" size="xl">
          Reviews
        </Text>
        <Text>
          {product?.reviews?.map((item) => (
            <Box
              key={item._id}
              p={15}
              style={{
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Text>
                <strong>Name: </strong>
                {item.name}
              </Text>
              <Text>
                <strong>Comment: </strong>
                {item.review}
              </Text>
            </Box>
          ))}
        </Text>
      </Stack>
    </Container>
  );
};

export default ProductDetails;

export async function getStaticPaths() {
  const productsResponse = await fetch(`${appConfig.base_url}/products`);
  const products: IProductResponse = await productsResponse.json();

  const paths = products?.data?.map((item) => ({
    params: { id: item._id },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const productsResponse = await fetch(
    `${appConfig.base_url}/products/${params.id}`
  );
  const products = await productsResponse.json();

  return {
    props: {
      product: products?.data,
    },
  };
}

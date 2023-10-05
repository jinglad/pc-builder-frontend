import ProductCard from "@/src/component/ProductCard";
import { appConfig } from "@/src/config";
import { IProductResponse } from "@/src/interface/product.interface";
import { Container, Grid } from "@mantine/core";
import React from "react";

const CategoryComponent = ({ products }: { products: IProductResponse }) => {
  return (
    <Container size="lg" py="lg">
      <Grid>
        {products?.data?.map((item) => (
          <Grid.Col span={4} key={item._id}>
            <ProductCard product={item} showButton />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};

export default CategoryComponent;

export async function getServerSideProps({
  params,
}: {
  params: { category: string };
}) {
  const productsResponse = await fetch(
    `${appConfig.base_url}/products?categoryRoute=${params.category}`
  );
  const products = await productsResponse.json();
  return {
    props: {
      products,
    },
  };
}

import ProductCard from "@/src/component/ProductCard";
import { appConfig } from "@/src/config";
import { ICategoryResponse } from "@/src/interface/category.interface";
import { IProductResponse } from "@/src/interface/product.interface";
import { Container, Grid } from "@mantine/core";
import React from "react";

const CatgeoryPages = ({ products }: { products: IProductResponse }) => {
  return (
    <Container size="lg" py="lg">
      <Grid>
        {products?.data?.map((item) => (
          <Grid.Col span={4} key={item._id}>
            <ProductCard product={item} />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};

export default CatgeoryPages;

export async function getStaticPaths() {
  const categoriesResponse = await fetch(`${appConfig.base_url}/categories`);
  const categories: ICategoryResponse = await categoriesResponse.json();

  const paths = categories?.data?.map((item) => ({
    params: { slug: item.route },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const productsResponse = await fetch(
    `${appConfig.base_url}/products?categoryRoute=${params.slug}`
  );
  const products = await productsResponse.json();
  return {
    props: {
      products,
    },
  };
}

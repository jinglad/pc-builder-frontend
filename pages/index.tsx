import { Container, Grid, Group, Stack, Text } from "@mantine/core";
import { appConfig } from "@/src/config";
import { IProductResponse } from "@/src/interface/product.interface";
import ProductCard from "@/src/component/ProductCard";
import { ICategoryResponse } from "@/src/interface/category.interface";
import styles from "@/styles/Home.module.css";
import Link from "next/link";

export default function Home({
  products,
  categories,
}: {
  products: IProductResponse;
  categories: ICategoryResponse;
}) {
  return (
    <Container size="lg" py="lg">
      <Stack>
        <Text size="xl" fw={700} ta="center" my={10}>
          Featured Products
        </Text>
        <Grid>
          {products?.data?.map((item) => (
            <Grid.Col span={4} key={item._id}>
              <ProductCard product={item} />
            </Grid.Col>
          ))}
        </Grid>
      </Stack>
      <Stack mt={20}>
        <Text size="xl" fw={700} ta="center" my={10}>
          Featured Categories
        </Text>
        <Grid>
          {categories?.data?.map((item) => (
            <Grid.Col span={4} key={item._id}>
              <Text
                size="xl"
                fw={500}
                className={styles.category}
                component={Link}
                href={`/category${item.route}`}
              >
                {item?.name}
              </Text>
            </Grid.Col>
          ))}
        </Grid>
      </Stack>
    </Container>
  );
}

export async function getStaticProps() {
  const productsResponse = await fetch(`${appConfig.base_url}/products`);
  const products = await productsResponse.json();

  const categoriesResponse = await fetch(`${appConfig.base_url}/categories`);
  const categories = await categoriesResponse.json();

  return {
    props: {
      products,
      categories,
    },
  };
}

import React from "react";
import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Stack,
  Rating,
} from "@mantine/core";
import { IProduct } from "../interface/product.interface";
import Link from "next/link";
import { useAppDispatch } from "../redux/hook";
import { setCartItems } from "../redux/pc-builder/pc-builder.slice";
import { useRouter } from "next/router";

const ProductCard = ({
  product,
  showButton,
}: {
  product: IProduct;
  showButton?: boolean;
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      // component={Link}
      // href={`/product/${product?._id}`}
    >
      <Card.Section component={Link} href={`/product/${product?._id}`}>
        <Image src={product?.image} height={160} alt={product?.name} />
      </Card.Section>

      <Stack mt="md" mb="xs" gap={5}>
        <Text
          fw={500}
          fz={14}
          m={0}
          component={Link}
          href={`/product/${product?._id}`}
        >
          {product?.name}
        </Text>
        <Group justify="space-between" mb="lg">
          <Text
            fz={12}
            m={0}
            bg="lightgray"
            px={5}
            py={2}
            style={{ borderRadius: "5px" }}
          >
            {product?.category}
          </Text>
          <Text fw={600}>{product?.price}TK</Text>
        </Group>
        <Group justify="space-between">
          <Badge color="pink" variant="light">
            {product?.status}
          </Badge>
          <Rating defaultValue={product?.avgRating} />
        </Group>
        <Button
          mt={10}
          style={{
            display: showButton ? "block" : "none",
          }}
          onClick={() => {
            dispatch(setCartItems(product));
            router.push("/pc-builder");
          }}
        >
          Add To Builder
        </Button>
      </Stack>
    </Card>
  );
};

export default ProductCard;

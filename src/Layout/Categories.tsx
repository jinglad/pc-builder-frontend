import { Select } from "@mantine/core";
import { useEffect, useState } from "react";
import { appConfig } from "../config";
import { useRouter } from "next/router";

interface ICategory {
  name: string;
  route: string;
}

const Categories = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  const router = useRouter();

  useEffect(() => {
    fetch(`${appConfig.base_url}/categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Select
      placeholder="Select Category"
      data={categories?.map((item) => ({
        value: item.route,
        label: item.name,
      }))}
      onChange={(value) => {
        router.push(`/category${value}`);
      }}
    />
  );
};

export default Categories;

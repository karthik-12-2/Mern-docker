import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
      const {fetchProducts, products} = useProductStore();
      React.useEffect(() => {
            fetchProducts()
      }, [fetchProducts])

      // console.log(products)

  return (
    <Container maxW={"container.lg"} py={12}>
      <VStack spacing={8}>
        <Text
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontSize={30}
          fontWeight="bold"
          textTransform="uppercase"
          textAlign={"center"}
        >
          Current products
        </Text>

        <SimpleGrid 
            columns={{
                  base: 1,md:2, lg:3
            }}
            spacing={10}
            w={"full"}
        >
            {products.map((product) => <ProductCard key={product._id} product={product}/>)}
        </SimpleGrid>

        {products.length === 0 && (
            <Text
            textAlign={"center"}
            fontSize="xl"
            fontWeight="bold"
            color={"gray.500"}
          >
            No products found {" "}
            <Link to={"/create"}>
              <Text as={'span'} color={'blue.500'} _hover={{textDecoration: "underline"}}>
                    Create a product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;

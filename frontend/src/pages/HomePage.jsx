import {Container, VStack, Text, Span, SimpleGrid} from "@chakra-ui/react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useProductStore } from "../store/product"
import ProductCard from "../components/ProductCard"

const HomePage = () => {
  const {fetchProducts, products} = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts])

  return (
    <Container maxW="container.xl" py={12}>
      <VStack wordSpacing={8}>
        <Text
        fontSize={"30"} fontWeight={"bold"} bgGradient={"linear(to-r, cyan.400, blue.500"}
        bgClip={"text"} textAlign={"center"}
        >
          Current Products
        </Text>

        <SimpleGrid columns={{
          base: 1,
          md: 2,
          lg: 3,
        }} 
          wordSpacing={10}
          w={"full"}
        >
          {products.map((product) => (
          <ProductCard key={product._id} product={product}/>
          ))}
        </SimpleGrid>

      { products.length === 0 && (
          <Text
          fontSize={"xl"} fontWeight={"bold"} bgGradient={"linear(to-r, cyan.400, blue.500"}
          bgClip={"text"} textAlign={"center"}
          >
            No products found { " "}
            <Link to={"/create"}><Span _hover={{textDecoration: "underline"}} textAlign={"center"}>Create a product</Span></Link>
          </Text>
      )}
    

      </VStack>
    </Container>
  )
}

export default HomePage
import { Card, Text, Image, Button } from "@chakra-ui/react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { useColorModeValue } from "./ui/color-mode";
import { useProductStore } from "../store/product";
import { toaster } from "../components/ui/toaster";
import { useState } from "react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogActionTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  Portal,
  Stack, 
  Field,
  Input,
  VStack
} from "@chakra-ui/react";

const ProductCard = ({product}) => {
  const textColor = useColorModeValue("gray.600", "gray.200")
  const bg = useColorModeValue("white", "gray.800");

  const [updatedProduct, setUpdatedProduct] = useState(product);

  const {deleteProduct, updateProduct}  = useProductStore();
  const handleDeleteProduct = async (pId) => {
    const {success, message} = await deleteProduct(pId);
    if(!success){
      toaster.create({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000
      })
    } else {
      toaster.create({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000
      })
    }
  };

  const handleUpdateProduct = async(pId, updatedProduct) => {
    const {success, message } = await updateProduct(pId, updatedProduct);
    if(!success){
      toaster.create({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000
    })
    } else {
      toaster.create({
        title: "Success",
        description: "Product Updated Successfully",
        status: "success",
        duration: 3000
      })
    }
  }
  return (
  <>
    <Card.Root maxW="sm" overflow="hidden" key={product._id} bg={bg} _hover={{transform: "translateY(-10px)", boxShadow: "lg"}} transition={"transform 0.3s ease"} mt={8}>
      <Image
        src={product.image}
        alt={product.name + "image"}
        h={230}
      />
      <Card.Body gap="2">
        <Card.Title>{product.name}</Card.Title>
        <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2" color={textColor}>
          ${product.price}
        </Text>
      </Card.Body>
      <Card.Footer gap="2">
      <DialogRoot>
        <DialogTrigger asChild>
          <Button variant="solid" onClick={() => setUpdatedProduct(product)}><FaRegEdit/></Button>
        </DialogTrigger>
          <Portal>
            <DialogContent position={"fixed"}  
            top="35%"
            left="50%"
            transform="translate(-50%, -50%)"
            rounded="md">
              <DialogHeader>
                <DialogTitle>Product Features</DialogTitle>
              </DialogHeader>
              <DialogBody pb="4">
                 <VStack wordSpacing={4}>
                    <Input placeholder="Product Name" name="name" value={updatedProduct.name} onChange={(e) => setUpdatedProduct({...updatedProduct, name: e.target.value}) }/>
                  
                    <Input placeholder="Product Price" name="price" type="number" value={updatedProduct.price}
                    onChange={(e) => setUpdatedProduct({...updatedProduct, price: e.target.value})}
                    />
                  
                    <Input placeholder="Product Image" name="image" value={updatedProduct.image}
                    onChange={(e) => setUpdatedProduct({...updatedProduct, image: e.target.value})}
                    />
                  </VStack>
              </DialogBody>
              <DialogFooter>
                <DialogActionTrigger asChild>
                <Button onClick={() => handleUpdateProduct(product._id, updatedProduct)}>Update</Button>
                </DialogActionTrigger>
                <DialogActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogActionTrigger>
              </DialogFooter>
            </DialogContent>
          </Portal>
      </DialogRoot>
      
        <Button variant="solid" onClick={() => handleDeleteProduct(product._id)}><FaRegTrashAlt/></Button>
      </Card.Footer>
      </Card.Root>
  </>
  )
}

export default ProductCard;
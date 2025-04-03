import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, HStack, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast, VStack } from "@chakra-ui/react";
import React from "react";
import { useProductStore } from "../store/product";

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = React.useState(product)
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const {deleteProducts, updateProduct} = useProductStore()
  const {isOpen, onOpen, onClose} = useDisclosure();
  const toast = useToast()
  const handleDelete = async (productId) => {
    const {success, message} = await deleteProducts(productId)
    console.log(success, message)
    if(!success){
      toast({
        title: "Error",
        description: message,
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }else {
      toast({
        title: "Success",
        description: message,
        status: 'success',
        duration: 3000,
        isClosable: true
      })
    }
  }
  const handleUpdateProduct = async (productId, Product) => {
    const {success, message} = await updateProduct(productId, Product);
    onClose();
    if(!success){
      toast({
        title: "Error",
        description: message,
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }else {
      toast({
        title: "Success",
        description: "Product Updated Successfully",
        status: 'success',
        duration: 3000,
        isClosable: true
      })
    }
  }

  const handleUpdate = (event) => {
    const {name, value} = event.target;
    setUpdatedProduct(previous => ({...previous, [name]: value}))
  }

  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px", shadow: "xl" }}
      bg={bg}
    >
       <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
      />

      <Box p={4}>
        <Heading as='h3' size='md' md={2}>
            {product.name}
        </Heading>

        <Text fontWeight={'bold'} fontSize={'xl'} color={textColor} mb={4}>
          ${product.price}
        </Text>

        <HStack spacing={2}>
          <IconButton icon={<EditIcon/>} onClick={onOpen} colorScheme="blue"/>
          <IconButton icon={<DeleteIcon/>} onClick={() => handleDelete(product._id)} colorScheme="red"/>

        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>

        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            <VStack spacing={4}>
              <Input name="name" placeholder="Product Name" value={updatedProduct.name} onChange={() => handleUpdate(event)}/>
              <Input name="price" placeholder="Price" type="number" value={updatedProduct.price} onChange={() => handleUpdate(event)}/>
              <Input name="image" placeholder="Image URL" value={updatedProduct.image} onChange={() => handleUpdate(event)}/>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => handleUpdateProduct(product._id, updatedProduct)}>Update</Button>
            <Button variant={'ghost'} onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>

      </Modal>
    </Box>
  );
};

export default ProductCard;

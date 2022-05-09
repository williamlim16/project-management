import {
  Box,
  Badge,
  Button,
  Flex,
  Spacer,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
} from '@chakra-ui/react';
import { DeleteIcon, ViewIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import { deleteTodo } from '../features/todos';
const Card = ({ data }) => {
  const dispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const deleteTodoHandler = () => {
    // console.log(data.id);
    dispatch(deleteTodo({ id: data.id }));
  };
  return (
    <>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        width="100%"
        bg="white"
        mt={2}
      >
        <Box p="6">
          <Flex>
            <Box>
              <Box display="flex" alignItems="baseline">
                <Box
                  my="1"
                  fontWeight="semibold"
                  as="h4"
                  lineHeight="tight"
                  isTruncated
                >
                  {data.title}
                </Box>
              </Box>
              <Badge
                borderRadius="full"
                px="2"
                colorScheme={
                  data.priority === 'low'
                    ? 'teal'
                    : data.priority === 'medium'
                    ? 'orange'
                    : 'red'
                }
              >
                {data.priority}
              </Badge>
            </Box>
            <Spacer />
            <Button mt={5} onClick={onOpen}>
              <ViewIcon />
            </Button>
            <Button ml={2} mt={5} colorScheme="red" onClick={deleteTodoHandler}>
              <DeleteIcon />
            </Button>
          </Flex>
        </Box>
      </Box>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>{data.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Descrition</Text>
            <Text>{data.desc}</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Card;

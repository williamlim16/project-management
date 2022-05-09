import {
  Button,
  Text,
  Grid,
  GridItem,
  Center,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Box,
  RadioGroup,
  HStack,
  Radio,
  Badge,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  useDisclosure,
  Spacer,
  Flex,
} from '@chakra-ui/react';
import Card from './components/Card';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useCallback } from 'react';
import { addTodo } from './features/todos';
import { v4 as uuidv4 } from 'uuid';
import { AddIcon } from '@chakra-ui/icons';

const ProjectApp = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const todos = useSelector(state => state.todo);
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    title: '',
    desc: '',
    priority: 'low',
    status: '',
  });

  const formChangeHandler = name => e => {
    if (name === 'priority') {
      setValues({ ...values, [name]: e });
    } else {
      setValues({ ...values, [name]: e.target.value });
    }
  };

  const formSubmitHanlder = e => {
    e.preventDefault();
    dispatch(
      addTodo({
        id: uuidv4(),
        title: values.title,
        desc: values.desc,
        priority: values.priority,
        status: values.status,
      })
    );

    setValues({
      title: '',
      desc: '',
      priority: 'low',
      status: '',
    });
    onClose();
  };

  const renderCards = useCallback(
    typeCard => {
      if (todos.length > 0) {
        return todos
          .filter(e => e.status === typeCard)
          .map(el => {
            return <Card data={el} key={el.id} />;
          });
      } else {
        return;
      }
    },
    [todos]
  );

  // let renderCards = test => {
  //   if (todos) {
  //     return <Card data={todos[0]} />;
  //   } else {
  //     return;
  //   }
  // };

  return (
    <>
      <Flex>
        <Spacer />
        <Button onClick={onOpen} mb={5}>
          <AddIcon />
        </Button>
      </Flex>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <GridItem w="100%" p={5} borderRadius="xl" borderWidth="1px">
          <Center>
            <Text fontSize="3xl">Todo</Text>
          </Center>
          {renderCards('todo')}
        </GridItem>
        <GridItem w="100%" p={5} borderRadius="xl" borderWidth="1px">
          <Center>
            <Text fontSize="3xl">On going</Text>
          </Center>
          {renderCards('ongoing')}
        </GridItem>
        <GridItem w="100%" p={5} borderRadius="xl" borderWidth="1px">
          <Center>
            <Text fontSize="3xl">Done</Text>
          </Center>
          {renderCards('done')}
        </GridItem>
      </Grid>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Add todo</ModalHeader>
          <ModalCloseButton />
          <Box maxWidth="100%" p={5}>
            <form onSubmit={formSubmitHanlder}>
              <FormControl>
                <FormLabel htmlFor="title">Title</FormLabel>
                <Input
                  id="title"
                  type="text"
                  value={values.title}
                  onChange={formChangeHandler('title')}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="desc">Description</FormLabel>
                <Textarea
                  value={values.desc}
                  onChange={formChangeHandler('desc')}
                />
              </FormControl>
              <FormControl as="fieldset">
                <FormLabel as="legend">Priority</FormLabel>
                <RadioGroup
                  onChange={formChangeHandler('priority')}
                  value={values.priority}
                >
                  <HStack spacing="24px">
                    <Radio value="low">
                      <Badge borderRadius="full" px="2" colorScheme="teal">
                        Low
                      </Badge>
                    </Radio>
                    <Radio value="medium">
                      <Badge borderRadius="full" px="2" colorScheme="orange">
                        Medium
                      </Badge>
                    </Radio>
                    <Radio value="high">
                      <Badge borderRadius="full" px="2" colorScheme="red">
                        High
                      </Badge>
                    </Radio>
                  </HStack>
                </RadioGroup>
              </FormControl>
              <FormControl>
                <Select
                  placeholder="Select status"
                  onChange={formChangeHandler('status')}
                  mt={2}
                >
                  <option value="todo">Todo</option>
                  <option value="ongoing">On going</option>
                  <option value="done">Done</option>
                </Select>
              </FormControl>
              <Flex>
                <Spacer />
                <Button type="submit" mt={2} colorScheme="teal">
                  Submit
                </Button>
              </Flex>
            </form>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProjectApp;

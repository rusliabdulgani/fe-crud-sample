import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
} from "@chakra-ui/react";

const AddUser = ({
  isOpenModalCreateUser,
  onCloseModalCreateUser,
  isLoadingAddUser,
  state,
  setState,
  addingUser,
}) => {
  const onChange = (e) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };

  return (
    <Modal isOpen={isOpenModalCreateUser} onClose={onCloseModalCreateUser}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Tambah User</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input type="text" onChange={onChange} id="userName" />
            <FormLabel mt={"2em"}>First name</FormLabel>
            <Input type="text" onChange={onChange} id="firstName" />
            <FormLabel mt={"2em"}>Last name</FormLabel>
            <Input type="text" onChange={onChange} id="lastName" />
            <FormLabel mt={"2em"}>Email</FormLabel>
            <Input type="email" onChange={onChange} id="email" />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            size={"sm"}
            colorScheme="gray"
            mr={3}
            onClick={onCloseModalCreateUser}
          >
            cancel
          </Button>
          <Button
            isLoading={isLoadingAddUser}
            loadingText="menambahkan"
            size={"sm"}
            colorScheme="green"
            onClick={addingUser}
          >
            tambah
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddUser;

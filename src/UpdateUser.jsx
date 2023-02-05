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

const UpdateUser = ({
  isOpenModalUpdateUser,
  onCloseModalUpdateUser,
  state,
  setState,
  isLoadingUpdateUser,
  updateUser,
}) => {
  const onChange = (e) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };

  return (
    <Modal isOpen={isOpenModalUpdateUser} onClose={onCloseModalUpdateUser}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Ubah Data User</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              onChange={onChange}
              id="userName"
              value={state.userName}
            />
            <FormLabel mt={"2em"}>First name</FormLabel>
            <Input
              type="text"
              onChange={onChange}
              id="firstName"
              value={state.firstName}
            />
            <FormLabel mt={"2em"}>Last name</FormLabel>
            <Input
              type="text"
              onChange={onChange}
              id="lastName"
              value={state.lastName}
            />
            <FormLabel mt={"2em"}>Email</FormLabel>
            <Input
              type="email"
              onChange={onChange}
              id="email"
              value={state.email}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            size={"sm"}
            colorScheme="gray"
            mr={3}
            onClick={onCloseModalUpdateUser}
          >
            cancel
          </Button>
          <Button
            isLoading={isLoadingUpdateUser}
            loadingText="mengubah"
            size={"sm"}
            colorScheme="green"
            onClick={updateUser}
          >
            ubah
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateUser;

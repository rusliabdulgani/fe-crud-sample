import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Container,
  Center,
  Image,
  Text,
  Spinner,
  useToast,
} from "@chakra-ui/react";

import AlertDialogHapus from "./AlertDialog";
import CardUserList from "./CardUserList";
import EmptyData from "./EmptyData";
import AddUser from "./AddUser";
import UpdateUser from "./UpdateUser";

const instance = axios.create({
  baseURL: "http://localhost:3005",
});

function App() {
  let [users, setUsers] = useState([]);
  let [isLoading, setIsLoading] = useState(false);
  let [idUser, setIdUser] = useState(0);
  let [firstName, setFirstName] = useState("");
  let [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  let [isLoadingDelete, setIsLoadingDelete] = useState(false);
  let [isOpenModalCreateUser, setIsOpenModalCreateUser] = useState(false);
  let [isOpenModalUpdateUser, setIsOpenModalUpdateUser] = useState(false);
  let [isLoadingAddUser, setIsLoadingAddUser] = useState(false);
  let [isLoadingUpdateUser, setIsLoadingUpdateUser] = useState(false);
  let [state, setState] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const cancelRef = useRef();
  const toast = useToast();

  useEffect(() => {
    getDataAllUser();
  }, []);

  const getDataAllUser = async () => {
    try {
      setIsLoading(true);
      let user = await instance({
        method: "GET",
        url: "/user",
      });
      setIsLoading(false);
      setUsers(user.data);
    } catch (e) {
      setIsLoading(false);
      alert(e);
    }
  };

  const warningDeleteUser = (id, first_name) => {
    setIdUser(id);
    setIsDeleteDialogOpen(true);
    setFirstName(first_name);
  };

  const cancelDelete = () => {
    setIdUser(0);
    setIsDeleteDialogOpen(false);
  };

  const addingUser = async () => {
    try {
      setState({
        userName: "",
        firstName: "",
        lastName: "",
        email: "",
      });
      setIsLoadingAddUser(true);
      let data = await instance({
        method: "POST",
        url: "/user",
        data: {
          user_name: state.userName,
          first_name: state.firstName,
          last_name: state.lastName,
          email: state.email,
        },
      });
      setUsers([...users, data.data]);
      toast({
        position: "top",
        title: `Berhasil`,
        description: `Data user berhasil ditambahkan`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setIsLoadingAddUser(false);
      openCloseModalCreateUser(false);
    } catch (e) {
      console.log("error add user", e);
      setIsLoadingAddUser(false);
      openCloseModalCreateUser(false);
    }
  };

  const updateUser = async () => {
    let dataNew = {
      user_name: state.userName,
      first_name: state.firstName,
      last_name: state.lastName,
      email: state.email,
    };
    try {
      setIsLoadingUpdateUser(true);
      await instance({
        method: "PUT",
        url: "/user/" + idUser,
        data: dataNew,
      });
      let userNew = users.map((item) => {
        if (item.id === idUser) {
          return { ...dataNew, id: idUser };
        }
        return item;
      });
      setUsers(userNew);
      toast({
        position: "top",
        title: `Berhasil`,
        description: `user dengan id ${idUser} berhasil diubah`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setIsLoadingUpdateUser(false);
      openCloseModalUpdateUser(false);
    } catch (e) {
      setIsLoadingUpdateUser(false);
      openCloseModalUpdateUser(false);
    }
  };

  const deleteUser = async (id) => {
    try {
      setIsLoadingDelete(true);
      let user = await instance({
        method: "DELETE",
        url: "/user/" + id,
      });
      if (user.data.success) {
        toast({
          position: "top",
          title: `Berhasil`,
          description: `Data user ${firstName} dengan id ${idUser} berhasil dihapus`,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setIsLoadingDelete(false);
        setIsDeleteDialogOpen(false);
        setIdUser(id);
        setState({ userName: "", firstName: "", lastName: "", email: "" });
        setUsers(users.filter((item) => item.id !== idUser));
      }
    } catch (e) {
      console.log("error", e);
      setIsLoadingDelete(false);
      alert(e);
    }
  };

  const openCloseModalCreateUser = (isOpen) => {
    setIsOpenModalCreateUser(isOpen);
  };

  const openCloseModalUpdateUser = (isOpen, idUser) => {
    if (idUser) {
      let selectedUser = users.filter((item) => item.id === idUser)[0];
      setIdUser(idUser);
      setState({
        userName: selectedUser.user_name,
        firstName: selectedUser.first_name,
        lastName: selectedUser.last_name,
        email: selectedUser.email,
      });
    }
    setIsOpenModalUpdateUser(isOpen);
  };

  return (
    <Container centerContent h="100vh" pt={"5em"}>
      <AddUser
        isOpenModalCreateUser={isOpenModalCreateUser}
        onCloseModalCreateUser={() => openCloseModalCreateUser(false)}
        state={state}
        setState={setState}
        addingUser={addingUser}
        isLoadingAddUser={isLoadingAddUser}
      />
      <UpdateUser
        isOpenModalUpdateUser={isOpenModalUpdateUser}
        onCloseModalUpdateUser={openCloseModalUpdateUser}
        state={state}
        setState={setState}
        isLoadingUpdateUser={isLoadingUpdateUser}
        updateUser={updateUser}
      />
      <AlertDialogHapus
        isDeleteDialogOpen={isDeleteDialogOpen}
        cancelRef={cancelRef}
        firstName={firstName}
        cancelDelete={cancelDelete}
        isLoadingDelete={isLoadingDelete}
        deleteUser={deleteUser}
        idUser={idUser}
      />
      {users.length !== 0 ? (
        <CardUserList
          users={users}
          warningDeleteUser={warningDeleteUser}
          openCloseModalCreateUser={openCloseModalCreateUser}
          openCloseModalUpdateUser={openCloseModalUpdateUser}
        />
      ) : isLoading ? (
        <Center>
          <Spinner />
        </Center>
      ) : (
        <EmptyData openCloseModalCreateUser={openCloseModalCreateUser} />
      )}
    </Container>
  );
}

export default App;

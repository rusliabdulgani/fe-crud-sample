import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  CardFooter,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

const CardUserList = ({
  users,
  warningDeleteUser,
  openCloseModalCreateUser,
  openCloseModalUpdateUser,
}) => {
  return (
    <Card>
      <CardHeader>
        <Heading size="md">User List</Heading>
      </CardHeader>
      <CardBody justifyContent={"flex-end"}>
        <TableContainer>
          <Table size="sm" variant="simple">
            <Thead>
              <Tr>
                <Th>Username</Th>
                <Th>First name</Th>
                <Th>Last name</Th>
                <Th>Email</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((item, index) => {
                return (
                  <Tr key={item.id}>
                    <Td>{item.user_name}</Td>
                    <Td>{item.first_name}</Td>
                    <Td>{item.last_name}</Td>
                    <Td>{item.email}</Td>
                    <Td>
                      <Button
                        colorScheme="red"
                        size={"xs"}
                        onClick={() =>
                          warningDeleteUser(item.id, item.first_name)
                        }
                      >
                        hapus
                      </Button>
                      <Button
                        colorScheme="blue"
                        size={"xs"}
                        ml={"1em"}
                        onClick={() => openCloseModalUpdateUser(true, item.id)}
                      >
                        ubah
                      </Button>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </CardBody>
      <CardFooter flexDirection={"row"} justifyContent="flex-end">
        <Button
          colorScheme={"green"}
          size={"sm"}
          onClick={openCloseModalCreateUser}
        >
          tambah user
          <AddIcon ml={"0.5em"} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardUserList;

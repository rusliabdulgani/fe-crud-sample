import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

const AlertDialogHapus = (props) => {
  let {
    isDeleteDialogOpen,
    cancelRef,
    firstName,
    cancelDelete,
    isLoadingDelete,
    deleteUser,
    idUser,
  } = props;
  return (
    <AlertDialog isOpen={isDeleteDialogOpen} leastDestructiveRef={cancelRef}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Hapus User
          </AlertDialogHeader>

          <AlertDialogBody>
            Apakah anda yakin akan menghapus data {firstName} ?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button size={"sm"} ref={cancelRef} onClick={cancelDelete}>
              Cancel
            </Button>
            <Button
              size={"sm"}
              isLoading={isLoadingDelete}
              loadingText="deleting"
              colorScheme="red"
              onClick={() => deleteUser(idUser)}
              ml={3}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default AlertDialogHapus;

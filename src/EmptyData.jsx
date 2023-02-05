import { Image, Text, Center } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

const EmptyData = ({ openCloseModalCreateUser }) => {
  return (
    <Center flexDirection={"column"}>
      <Image
        src="https://stories.freepiklabs.com/storage/24403/no-data-cuate-3449.png"
        alt="no data image"
        h={"10em"}
        objectFit={true}
      />
      <Text fontSize="md" color="tomato">
        tidak ada data
      </Text>
      <Button
        colorScheme={"green"}
        size={"sm"}
        mt={"3em"}
        onClick={openCloseModalCreateUser}
      >
        buat user
        <AddIcon ml={"0.5em"} />
      </Button>
    </Center>
  );
};

export default EmptyData;

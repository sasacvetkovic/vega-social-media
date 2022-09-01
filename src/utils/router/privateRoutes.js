import { useContext } from "react";

import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "contexts/user.context";
import { CircularProgress, Center } from "@chakra-ui/react";

const PrivateRoutes = () => {
  const { currentUser, isCurrentUserLoaded } = useContext(UserContext);

  if (!isCurrentUserLoaded) {
    return (
      <Center pos="fixed" w="100vw" h="100vh" zIndex={10}>
        <CircularProgress isIndeterminate color="#f1592a" />
      </Center>
    );
  }
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;

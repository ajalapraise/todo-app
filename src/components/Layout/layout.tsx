import React from "react";
import { Box, Stack } from "@chakra-ui/react";
import { Sidebar } from "../sidebar";
import { useQueryState } from "nuqs";
import { ListForm } from "../calender/ListForm";
export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isFormOpen, setIsFormOpen] = useQueryState("formState", {});
  const closeForm = () => setIsFormOpen(null);
  const isFormOpenBoolean = isFormOpen === "open";
  return (
    <>
      <Stack
        width={"100vw"}
        height={"100vh"}
        direction={{ base: "column", xl: "row" }}
        justifyContent={"start"}
        overflow={{ base: "auto", xl: "hidden" }}
        alignItems={"start"}
        maxWidth={"1440px"}
        marginX={"auto"}
        shadow={"md"}
        dropShadow={"md"}
        backgroundColor={"white"}
        minHeight={"100vh"}
        display={isFormOpenBoolean ? { base: "none", xl: "flex" } : "flex"}
        opacity={{ base: "", xl: isFormOpenBoolean ? "0.2" : "1" }}
        position={{ xl: "relative" }}
      >
        <Sidebar />
        <Box width={{ base: "100%", xl: "80%" }} height="100%">
          {children}
        </Box>
      </Stack>

      <Box
        width={"100vw"}
        marginX="auto"
        position={{ xl: "fixed" }}
        top={{ xl: "50%" }}
        left={{ xl: "50%" }}
        transform={{ xl: "translate(-50%, -50%)" }}
        zIndex={{ xl: isFormOpenBoolean ? "1" : "-1" }}
        display={"flex"}
        justifyContent={{ base: "start", xl: "center" }}
        alignItems={"center"}
      >
        <ListForm isOpen={isFormOpenBoolean} onClose={closeForm} />
      </Box>
    </>
  );
};

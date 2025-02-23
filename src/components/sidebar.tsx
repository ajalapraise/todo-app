import {
  Box,
  Link,
  Text,
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerRoot,
  DrawerTrigger,
  Button,
  HStack,
} from "@chakra-ui/react";
import React from "react";
import { ReactSVG } from "react-svg";
import { Icon } from "./icon";
import { useRouter } from "next/router";
import { Menu, X } from "lucide-react";

const SIDE_BAR_ITEMS = [
  {
    id: crypto.randomUUID(),
    icon: "/CalendarIcon",
    name: "CALLENDAR",
    path: "/",
  },
  {
    id: crypto.randomUUID(),
    icon: "/InboxIcon",
    name: "INBOX",
    path: "#",
  },
  {
    id: crypto.randomUUID(),
    icon: "/NotesIcon",
    name: "NOTES",
    path: "#",
  },
  {
    id: crypto.randomUUID(),
    icon: "/TodoListIcon",
    name: "TODO LIST",
    path: "#",
  },
  {
    id: crypto.randomUUID(),
    icon: "/SettingsIcon",
    name: "SETTINGS",
    path: "#",
  },
];

export const Sidebar = () => {
  const router = useRouter();
  const pathName = router.pathname;
  return (
    <>
      <Box
        width={"20%"}
        height={"100%"}
        display={{ base: "none", xl: "flex" }}
        flexDirection={"column"}
        justifyContent={"start"}
        alignItems={"center"}
        paddingY={"20px "}
      >
        <Box
          width={"65%"}
          height={"120px"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box
            width={"100%"}
            height={"44px"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Link href="/">
              <ReactSVG src={`/logo.svg`} height={"100%"} />
            </Link>
          </Box>
        </Box>

        {SIDE_BAR_ITEMS.map((item, idx) => (
          <Box
            key={idx}
            display={{ base: "none", xl: "flex" }}
            justifyContent={"start"}
            alignItems={"center"}
            width={"100%"}
            height={"76px"}
            cursor={"pointer"}
            paddingLeft={"20px"}
            gapX={"20px"}
            _hover={{
              bgColor: "#F5F3F4",
              color: "#4F35F3",
              transition: "background-color 0.3s ease, color 0.3s ease",
            }}
            color={pathName === item.path ? "#4F35F3" : "#65676D"}
            backgroundColor={pathName === item.path ? "#F5F3FF" : ""}
            borderRight={pathName === item.path ? "6px solid #4F35F3" : ""}
          >
            <Icon name={item.icon} />
            <Text fontWeight={"bold"} fontSize={"18px"} lineHeight={"21.48px"}>
              {item.name}
            </Text>
          </Box>
        ))}
      </Box>
      <Box width={{ base: "100%", xl: "0%" }}>
        <DrawerRoot size="full">
          <DrawerBackdrop />
          <DrawerTrigger
            asChild
            display={{
              base: "flex",
              sm: "flex",
              md: "flex",
              lg: "none",
              xl: "none",
            }}
            width="100%"
            justifyContent={"start"}
          >
            <Button variant="plain" top="20px" left="10px">
              <Menu />
            </Button>
          </DrawerTrigger>
          <DrawerContent
            offset="4"
            rounded="md"
            position="absolute"
            width="100%"
            height="100vh"
            top="0px"
            left="0px"
          >
            <DrawerActionTrigger
              asChild
              backgroundColor="#FCF7F1"
              marginBottom="10px"
              height={"50px"}
            >
              <HStack gap=".2em" justifyContent="end">
                <Text
                  py="4px"
                  px="27px"
                  color="black"
                  fontWeight="600"
                  fontSize="30px"
                >
                  <X />
                </Text>
              </HStack>
            </DrawerActionTrigger>{" "}
            <DrawerBody
              display={{ base: "flex", xl: "none" }}
              flexDirection="column"
              width="100%"
              gap="30px"
              justifyContent="center"
            >
              <DrawerCloseTrigger asChild>
                <Box
                  width={"100%"}
                  height={"60px"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Box
                    width={"100%"}
                    height={"44px"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    marginX={"auto"}
                  >
                    <Link href="/">
                      <ReactSVG
                        src={`/logo.svg`}
                        width={"100%"}
                        height={"100%"}
                      />
                    </Link>
                  </Box>
                </Box>
              </DrawerCloseTrigger>

              {SIDE_BAR_ITEMS.map((item, idx) => (
                <DrawerCloseTrigger asChild key={idx}>
                  <Box
                    display={"flex"}
                    justifyContent={"start"}
                    alignItems={"center"}
                    width={"100%"}
                    height={"76px"}
                    cursor={"pointer"}
                    paddingLeft={"20px"}
                    gapX={"20px"}
                    _hover={{
                      bgColor: "#F5F3F4",
                      color: "#4F35F3",
                      transition: "background-color 0.3s ease, color 0.3s ease",
                    }}
                    color={pathName === item.path ? "#4F35F3" : "#65676D"}
                    backgroundColor={pathName === item.path ? "#F5F3FF" : ""}
                    borderRight={
                      pathName === item.path ? "6px solid #4F35F3" : ""
                    }
                  >
                    <Icon name={item.icon} />
                    <Text
                      fontWeight={"bold"}
                      fontSize={"18px"}
                      lineHeight={"21.48px"}
                    >
                      {item.name}
                    </Text>
                  </Box>
                </DrawerCloseTrigger>
              ))}
            </DrawerBody>
          </DrawerContent>
        </DrawerRoot>
      </Box>
    </>
  );
};

import { Box, Link, Text } from "@chakra-ui/react";
import React from "react";
import { ReactSVG } from "react-svg";
import { Icon } from "./icon";
import { useRouter } from "next/router";

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
    <Box
      width={"20%"}
      height={"100%"}
      display={"flex"}
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
          borderRight={pathName === item.path ? "6px solid #4F35F3" : ""}
        >
          <Icon name={item.icon} />
          <Text fontWeight={"bold"} fontSize={"18px"} lineHeight={"21.48px"}>
            {item.name}
          </Text>
        </Box>
      ))}
    </Box>
  );
};

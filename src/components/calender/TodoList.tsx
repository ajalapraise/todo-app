import { Box, HStack, Text, VStack, Image, Button } from "@chakra-ui/react";
import React, { useRef } from "react";
import { Plus, Ellipsis } from "lucide-react";
import { DataType, ItemStatus } from "@/pages/data/data";
import Flag from "../../../public/icons/Flag";
import { formatDate } from "./Calendar";
import { useQueryState } from "nuqs";
import { useDrag, useDrop } from "react-dnd";

interface TodoListProps {
  title: string;
  itemNumber: number;
  children: React.ReactNode;
  onDropTask: (id: string, newStatus: ItemStatus) => void;
}

export const TodoListGroup = ({
  title,
  itemNumber,
  children,
  onDropTask,
}: TodoListProps) => {
  let newStatus: ItemStatus = "Pending";
  if (title === "In Progress") newStatus = "Progress";
  else if (title === "Completed") newStatus = "Completed";

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TASK",
    drop: (item: { id: string }) => {
      onDropTask(item.id, newStatus);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isFormOpen, setIsFormOpen] = useQueryState("formState", {});

  const openForm = () => setIsFormOpen("open");
  return (
    <Box
      ref={drop}
      width={"33%"}
      height={"100%"}
      bgColor={isOver ? "#E2E8F0" : "#F5F7F9"}
      borderRadius={"8px"}
      padding="10px"
    >
      <HStack width={"100%"} height={"24px"} justifyContent={"space-between"}>
        <HStack gap={"8px"}>
          <Text
            fontSize={"16px"}
            fontWeight={"semibold"}
            lineHeight={"24px"}
            color="#6F6F6F"
          >
            {title}
          </Text>
          <Text
            width="22px"
            height="100%"
            px="6px"
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            borderRadius={"4px"}
            backgroundColor={"#DDDDDD"}
            fontSize={"14px"}
            fontWeight={"semibold"}
            lineHeight={"24px"}
            color="#6F6F6F"
          >
            {itemNumber}
          </Text>
        </HStack>
        <Text
          width="24px"
          height="100%"
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          onClick={openForm}
          cursor={"pointer"}
        >
          <Plus width={16} height={16} color="#6F6F6F" />
        </Text>
      </HStack>
      <Box>{children}</Box>
    </Box>
  );
};

export const TodoListItem = ({
  id,
  priority,
  deadline,
  status,
  time,
  taskName,
  coverImage,
  description,
  handleDelete,
  handleEdit,
}: Partial<DataType> & {
  handleDelete: (taskId: number) => void;
  handleEdit: () => void;
}) => {
  const [openMenu, setOpenMenu] = React.useState(false);

  const onDelete = () => {
    if (id !== undefined) {
      handleDelete(id);
    } else {
      console.warn("Task ID is undefined, cannot delete.");
    }
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  const ref = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      drag(ref.current);
    }
  }, [drag]);

  return (
    <VStack
      ref={ref}
      opacity={isDragging ? 0.5 : 1}
      width="100%"
      marginTop={"10px"}
      maxHeight={"370px"}
      gap="16px"
      borderRadius={"6px"}
      padding={"16px"}
      backgroundColor={"#FFFFFF"}
      alignItems={"start"}
      cursor={"pointer"}
    >
      <Text
        px="8px"
        py="4px"
        borderRadius={"4px"}
        color={
          priority?.includes("High")
            ? "#4F9C20"
            : priority?.includes("Medium")
              ? "#3069FE"
              : "#EC5962"
        }
        backgroundColor={
          priority?.includes("High")
            ? "#EBFAE2"
            : priority?.includes("Medium")
              ? "#EEF3FF"
              : "#FDF2F2"
        }
        fontWeight={"semibold"}
        fontSize={"12px"}
        lineHeight={"24px"}
      >
        {priority?.toString().toUpperCase()}
      </Text>
      <HStack
        justifyContent={"space-between"}
        width="100%"
        height="24px"
        alignItems="start"
        position="relative"
      >
        <Text
          color="#1A1919"
          fontWeight={"semibold"}
          fontSize={"16px"}
          lineHeight={"24px"}
        >
          {" "}
          {taskName}
        </Text>
        <VStack gap="8px" width={"65px"} alignItems={"end"}>
          <Button
            width="24px"
            height="24px"
            padding="4px"
            border="1px solid #DDDDDD"
            borderRadius="6px"
            shadow="sm"
            onClick={() => setOpenMenu(!openMenu)}
          >
            <Ellipsis width={24} height={24} />
          </Button>
          {openMenu && (
            <Box
              position={"absolute"}
              top={"30px"}
              width="61px"
              height="54px"
              backgroundColor="#FFFFFF"
              borderRadius="6px"
              border="1px solid #DDDDDD"
              shadow="md"
              padding="8px 12px"
              display="flex"
              flexDirection="column"
              justifyContent={"space-between"}
              alignItems={"start"}
              zIndex={1}
            >
              <Button
                color="#252C32"
                fontWeight={"normal"}
                fontSize={"12px"}
                width="100%"
                height="15px"
                justifyContent={"start"}
                lineHeight={"14.52px"}
                onClick={() => {
                  setOpenMenu(false);
                  handleEdit();
                }}
              >
                Edit
              </Button>
              <Button
                color="#E60C02"
                fontWeight={"normal"}
                fontSize={"12px"}
                width="100%"
                height="15px"
                justifyContent={"start"}
                lineHeight={"14.52px"}
                onClick={() => {
                  setOpenMenu(false);
                  onDelete();
                }}
              >
                Delete
              </Button>
            </Box>
          )}
        </VStack>
      </HStack>
      {coverImage && (
        <Image
          src={coverImage}
          alt={`${taskName} cover image`}
          height={"119px"}
          width={"304px"}
          borderRadius={"4px"}
          objectFit={"objectFit"}
        />
      )}
      {description && (
        <Text
          color="#252C32"
          fontWeight={"normal"}
          fontSize={"14px"}
          lineHeight={"19.6px"}
        >
          {description}
        </Text>
      )}
      <HStack
        justifyContent={"space-between"}
        width={"100%"}
        height={"25px"}
        alignItems={"center"}
      >
        <HStack gap="8px">
          <Flag
            color={
              status?.includes("Completed")
                ? "#4F9C20"
                : status?.includes("Due")
                  ? "#F76659"
                  : "#6E7C87"
            }
          />
          <Text
            color="#6E7C87"
            fontWeight={"semibold"}
            fontSize={"12px"}
            lineHeight={"20px"}
          >
            {deadline ? formatDate(deadline) : "Nil"}
          </Text>
        </HStack>
        <Text
          color="#6F6F6F"
          fontWeight={"semibold"}
          fontSize={"12px"}
          lineHeight={"24px"}
        >
          {time}
        </Text>
      </HStack>
    </VStack>
  );
};

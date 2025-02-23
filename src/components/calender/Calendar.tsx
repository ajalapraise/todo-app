"use client";
import { DataType, ItemStatus } from "@/data/data";
import {
  VStack,
  Box,
  Button,
  Text,
  HStack,
  Input,
  Stack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import { TodoListGroup, TodoListItem } from "./TodoList";
import { groupTasksByDateAndStatus } from "../utils";
import { useQueryState } from "nuqs";

export const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const Calendar = () => {
  const [tasks, setTasks] = useState<Record<string, DataType[]>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());

  const [hasPrevious, setHasPrevious] = useState(false);
  const [hasNext, setHasNext] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isFormOpen, setIsFormOpen] = useQueryState("formState", {});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [taskId, setTaskId] = useQueryState("taskId", {});

  const groupedData = groupTasksByDateAndStatus(Object.values(tasks).flat());
  const formattedDate = currentDate.toISOString().split("T")[0];

  if (!groupedData[formattedDate]) {
    groupedData[formattedDate] = {
      Pending: [],
      Completed: [],
      Due: [],
      Progress: [],
    };
  }

  const handlePrevious = () => {
    const previousDates = Object.values(tasks)
      .flat()
      .map((task: DataType) => task.deadline)
      .filter((date) => date && new Date(date) < currentDate)
      .map((date) => new Date(date).getTime());

    if (previousDates.length > 0) {
      const prevDate = new Date(Math.max(...previousDates));
      setCurrentDate(prevDate);
    }
  };

  const handleNext = () => {
    const futureDates = Object.values(tasks)
      .flat()
      .map((task: DataType) => task.deadline)
      .filter((date) => date && new Date(date) > currentDate)
      .map((date) => new Date(date).getTime());

    if (futureDates.length > 0) {
      const nextDate = new Date(Math.min(...futureDates));
      setCurrentDate(nextDate);
    }
  };

  const filteredTasks = Object.keys(groupedData).length
    ? {
        Pending: [
          ...(groupedData[formattedDate]?.Pending || []),
          ...(groupedData[formattedDate]?.Due || []),
        ].filter(
          (task) =>
            task.taskName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (task.description &&
              task.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase()))
        ),
        Completed: (groupedData[formattedDate]?.Completed || []).filter(
          (task: DataType) =>
            task.taskName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (task.description &&
              task.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase()))
        ),
        Progress: (groupedData[formattedDate]?.Progress || []).filter(
          (task: DataType) =>
            task.taskName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (task.description &&
              task.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase()))
        ),
      }
    : { Pending: [], Completed: [], Progress: [] };

  const handleDrop = (id: string, newStatus: ItemStatus) => {
    if (!id) {
      console.error("Error: Task ID is undefined!");
      return;
    }

    const storedData = localStorage.getItem("CalendarData");
    let parsedTasks: DataType[] = [];

    try {
      parsedTasks = storedData ? JSON.parse(storedData) : [];
      if (!Array.isArray(parsedTasks)) {
        parsedTasks = [];
      }
    } catch (error) {
      console.error("Error parsing CalendarData from localStorage:", error);
      parsedTasks = [];
    }

    let isUpdated = false;
    const updatedTasks = parsedTasks.map((task) => {
      if (task.id.toString() === id.toString()) {
        isUpdated = true;
        return { ...task, status: newStatus };
      }
      return task;
    });

    if (!isUpdated) {
      console.warn("No task was updated. Check the ID match.");
      return;
    }

    localStorage.setItem("CalendarData", JSON.stringify(updatedTasks));

    const tasksByDate: Record<string, DataType[]> = updatedTasks.reduce(
      (acc, task) => {
        const date = task.deadline || "No Deadline";
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(task);
        return acc;
      },
      {} as Record<string, DataType[]>
    );

    setTasks(tasksByDate);
  };

  useEffect(() => {
    if (Object.keys(tasks).length === 0) return;

    const taskDeadlines = Object.values(tasks)
      .flat()
      .map((task: DataType) => task.deadline)
      .filter((date) => date && !isNaN(new Date(date).getTime()))
      .map((date) => new Date(date).getTime());

    if (taskDeadlines.length > 0) {
      const minDate = Math.min(...taskDeadlines);
      const maxDate = Math.max(...taskDeadlines);

      setHasPrevious(new Date(currentDate).getTime() > minDate);
      setHasNext(new Date(currentDate).getTime() < maxDate);
    }
  }, [tasks, currentDate]);

  useEffect(() => {
    const storedData = localStorage.getItem("CalendarData");
    let parsedTasks: DataType[] = [];

    try {
      parsedTasks = storedData ? JSON.parse(storedData) : [];
      if (!Array.isArray(parsedTasks)) {
        parsedTasks = [];
      }
    } catch (error) {
      console.error("Error parsing CalendarData from localStorage:", error);
      parsedTasks = [];
    }

    const tasksByDate: Record<string, DataType[]> = parsedTasks.reduce(
      (acc, task) => {
        const date = task.deadline || "No Deadline";
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(task);
        return acc;
      },
      {} as Record<string, DataType[]>
    );

    setTasks(tasksByDate);

    const taskDeadlines = parsedTasks
      .map((task) => task.deadline)
      .filter((date) => date && !isNaN(new Date(date).getTime()));

    if (taskDeadlines.length > 0) {
      const latestDeadline = new Date(
        Math.min(...taskDeadlines.map((date) => new Date(date).getTime()))
      );
      setCurrentDate(latestDeadline);
    } else {
      setCurrentDate(new Date());
    }
  }, []);

  const handleDelete = (id: number) => {
    setTasks((prevTasks) => {
      const updatedTasks = JSON.parse(JSON.stringify(prevTasks));

      Object.keys(updatedTasks).forEach((date) => {
        updatedTasks[date] = updatedTasks[date].filter(
          (task: DataType) => task.id.toString() !== id.toString()
        );

        // Remove empty date keys
        if (updatedTasks[date].length === 0) {
          delete updatedTasks[date];
        }
      });

      localStorage.setItem("CalendarData", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  const handleEdit = (id: string) => {
    setIsFormOpen(`open`);
    setTaskId(id ?? null);
  };

  return (
    <VStack
      width={"100%"}
      padding={"50px 20px 0px"}
      justifyContent={"start"}
      alignItems={"start"}
    >
      <Stack
        justifyContent={"space-between"}
        width={"100%"}
        direction={{ base: "column", md: "row" }}
      >
        {" "}
        <HStack gap="10px">
          <Text fontSize={"30px"} fontWeight={"bold"}>
            {currentDate ? currentDate.toDateString() : "No tasks available"}
          </Text>
          <Button
            width="40px"
            height="40px"
            borderRadius={"30px"}
            padding={"10px"}
            border={"1px solid #DCDCDC"}
            onClick={handlePrevious}
            disabled={!hasPrevious}
          >
            <ArrowLeft />
          </Button>
          <Button
            width="40px"
            height="40px"
            borderRadius={"30px"}
            padding={"10px"}
            border={"1px solid #DCDCDC"}
            onClick={handleNext}
            disabled={!hasNext}
          >
            <ArrowRight />
          </Button>
        </HStack>
        <HStack
          width="236px"
          height="40px"
          borderRadius={"6px"}
          py="8px"
          px="7px"
          alignItems={"center"}
          border="1px solid #DDE2E4"
        >
          <Search width={24} height={"100%"} color="#B0BABF" />
          <Input
            placeholder="Search"
            value={searchQuery}
            width={"190px"}
            height={"100%"}
            _focus={{
              borderWidth: "0px",
              outlineWidth: "0px",
            }}
            onChange={(e) => setSearchQuery(e.target.value)}
          />{" "}
        </HStack>
      </Stack>

      <Stack
        justifyContent={"space-between"}
        alignItems={"start"}
        width={"100%"}
        mt={"20px"}
        direction={{ base: "column", md: "row" }}
      >
        <TodoListGroup
          onDropTask={handleDrop}
          title="To do"
          itemNumber={filteredTasks?.Pending.length ?? 0}
        >
          {filteredTasks.Pending.map((task) => (
            <Box key={task.id}>
              <TodoListItem
                id={task?.id}
                taskName={task.taskName}
                description={task?.description}
                priority={task.priority}
                deadline={task.deadline}
                time={task.time}
                status={task.status}
                coverImage={task?.coverImage}
                handleDelete={handleDelete}
                handleEdit={() => handleEdit(task.id.toString())}
              />
            </Box>
          ))}
        </TodoListGroup>
        <TodoListGroup
          onDropTask={handleDrop}
          title="In Progress"
          itemNumber={filteredTasks?.Progress.length ?? 0}
        >
          {filteredTasks.Progress.map((task) => (
            <Box key={task.id}>
              <TodoListItem
                id={task?.id}
                taskName={task.taskName}
                description={task?.description}
                priority={task.priority}
                deadline={task.deadline}
                time={task.time}
                status={task.status}
                coverImage={task?.coverImage}
                handleDelete={handleDelete}
                handleEdit={() => handleEdit(task.id.toString())}
              />
            </Box>
          ))}
        </TodoListGroup>
        <TodoListGroup
          onDropTask={handleDrop}
          title="Completed"
          itemNumber={filteredTasks?.Completed.length ?? 0}
        >
          {filteredTasks.Completed.map((task) => (
            <Box key={task.id}>
              <TodoListItem
                id={task?.id}
                taskName={task.taskName}
                description={task?.description}
                priority={task.priority}
                deadline={task.deadline}
                time={task.time}
                status={task.status}
                coverImage={task?.coverImage}
                handleDelete={handleDelete}
                handleEdit={() => handleEdit(task.id.toString())}
              />
            </Box>
          ))}
        </TodoListGroup>
      </Stack>
    </VStack>
  );
};

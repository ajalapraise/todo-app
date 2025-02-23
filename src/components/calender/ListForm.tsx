import React, { useState } from "react";
import {
  Box,
  Text,
  Input,
  Button,
  Textarea,
  NativeSelectRoot,
  NativeSelectField,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { X } from "lucide-react";
import {
  getCurrentTime,
  getTasksFromLocalStorage,
  isToday,
  validationSchema,
} from "../utils";
import saveTaskToLocalStorage, { Priority } from "@/pages/data/data";
import { ReactSVG } from "react-svg";
import {
  FileUploadList,
  FileUploadRoot,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import { useQueryState } from "nuqs";
import { useReload } from "../hooks/useReload";

interface FormProps {
  isOpen: boolean;
  onClose: () => void;
  id?: string;
}

const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const ListForm = ({ isOpen, onClose }: FormProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isReload, setIsReload] = useQueryState("reload", {});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isFormOpen, setIsFormOpen] = useQueryState("formState", {});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [taskId, setTaskId] = useQueryState("taskId", {});

  const tasks = getTasksFromLocalStorage();
  const taskToEdit = taskId
    ? tasks.find((task) => task.id.toString() === taskId.toString())
    : null;

  const initialValues = {
    taskName: taskToEdit?.taskName || "",
    description: taskToEdit?.description || "",
    deadline: taskToEdit?.deadline || "",
    priority: taskToEdit?.priority || "",
    status: taskToEdit?.status || "Pending",
    time: taskToEdit?.time || "",
  };
  const [submitting, setSubmitting] = useState(false);
  const [coverImageName, setCoverImageName] = useState<string | null>(null);

  const reload = useReload();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (values: any, { resetForm }: any) => {
    setSubmitting(true);
    try {
      const updatedValues = { ...values, coverImage: coverImageName || "" };

      if (taskId) {
        console.log(updatedValues);
        saveTaskToLocalStorage({ ...updatedValues, id: taskId });
      } else {
        saveTaskToLocalStorage({
          ...updatedValues,
        });
      }
      resetForm();
      onClose();
      reload();
    } catch (error) {
      console.error("Failed to save task:", error);
    } finally {
      setSubmitting(false);
      setIsFormOpen(null);
      setCoverImageName(null);
      setTaskId(null);
    }
  };

  if (!isOpen) return null;
  return (
    <Box
      width="100%"
      height="100%"
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, setValues, isValid }) => (
          <Box
            width={{ base: "100%", xl: "517px" }}
            height={{ base: "100%", xl: "844px" }}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={{ base: "", xl: "start" }}
            alignItems={{ base: "", xl: "start" }}
            paddingX={{ base: "0px", xl: "32px" }}
            paddingY={{ base: "10px", xl: "48px" }}
            gap={{ base: "10px", xl: "32px" }}
            shadow={"md"}
            bgColor={"#FFFFFF"}
            border="1px solid #CAD0DB"
          >
            <Box
              width={"100%"}
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              height={{ xl: "24px" }}
            >
              <Text fontSize={{ base: "", xl: "24px" }} fontWeight={"600"}>
                {taskId ? "Edit Task" : "Add Task"}{" "}
              </Text>
              <X
                size={32}
                onClick={() => {
                  onClose();
                  setIsReload(null);
                  setTaskId(null);
                  setValues(initialValues);
                }}
                cursor="pointer"
              />
            </Box>
            <Form
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                rowGap: "20px",
              }}
            >
              <VStack
                width="100%"
                height="74px"
                gap="6px"
                alignItems={"start"}
                justifyContent={"start"}
              >
                <Text
                  fontWeight={"semibold"}
                  fontSize={"14px"}
                  lineHeight={"20px"}
                >
                  Task Name
                </Text>
                <Input
                  placeholder={"Enter task name"}
                  borderRadius={"10px"}
                  height={"48px"}
                  width="100%"
                  variant={"subtle"}
                  color={"#878484"}
                  padding="10px 14px"
                  fontSize={"14px"}
                  border="1px solid #D0D5DD"
                  backgroundColor={"#FFFFFF"}
                  _placeholder={{
                    color: "#878484",
                    fontWeight: "400",
                  }}
                  _focus={{
                    borderWidth: "0px",
                    outlineWidth: "1px",
                    outlineColor: "#D0D5DD",
                  }}
                  name="taskName"
                  onChange={handleChange}
                  value={values.taskName}
                  type="text"
                />
              </VStack>
              <VStack
                width="100%"
                height="122px"
                gap="6px"
                alignItems={"start"}
                justifyContent={"start"}
              >
                <Text
                  fontWeight={"semibold"}
                  fontSize={"14px"}
                  lineHeight={"20px"}
                >
                  Description{" "}
                  <Text as="span" color={"#848585"} fontWeight={"400"}>
                    (optional)
                  </Text>
                </Text>
                <Textarea
                  placeholder={"Write more on the task...."}
                  borderRadius={"10px"}
                  height={"96px"}
                  width="100%"
                  variant={"subtle"}
                  color={"#878484"}
                  padding="16px 14px"
                  fontSize={"14px"}
                  border="1px solid #D0D5DD"
                  backgroundColor={"#FFFFFF"}
                  _placeholder={{
                    color: "#878484",
                    fontWeight: "400",
                  }}
                  _focus={{
                    borderWidth: "0px",
                    outlineWidth: "1px",
                    outlineColor: "#D0D5DD",
                  }}
                  name="description"
                  onChange={handleChange}
                  value={values.description}
                />
              </VStack>
              <VStack
                width="100%"
                height="74px"
                gap="6px"
                alignItems={"start"}
                justifyContent={"start"}
              >
                <Text
                  fontWeight={"semibold"}
                  fontSize={"14px"}
                  lineHeight={"20px"}
                >
                  Priority
                </Text>{" "}
                <NativeSelectRoot
                  variant={"subtle"}
                  width={{ base: "100%" }}
                  display={"flex"}
                  height={"48px"}
                  alignItems={"center"}
                >
                  <NativeSelectField
                    color={"#878484"}
                    backgroundColor={"#FFFFFF"}
                    _placeholder={{
                      color: "#878484",
                      fontWeight: "500",
                    }}
                    padding="10px"
                    _focus={{
                      borderWidth: "0px",
                      outlineWidth: "1px",
                      outlineColor: "#D0D5DD",
                    }}
                    border="1px solid #D0D5DD"
                    placeholder={"Select the priority of the task"}
                    borderRadius={"12px"}
                    height={"100%"}
                    value={values.priority}
                    width="100%"
                    onChange={handleChange}
                    name="priority"
                  >
                    {Priority.map((item) => (
                      <option key={item.toString()} value={item.toString()}>
                        {item}
                      </option>
                    ))}
                  </NativeSelectField>
                </NativeSelectRoot>
              </VStack>
              <VStack
                width="100%"
                height="fit-content"
                gap="2px"
                alignItems={"start"}
                justifyContent={"start"}
              >
                <Text
                  fontWeight={"semibold"}
                  fontSize={"14px"}
                  lineHeight={"20px"}
                >
                  Upload cover{" "}
                  <Text as="span" color={"#848585"} fontWeight={"400"}>
                    (optional)
                  </Text>
                </Text>
                <VStack
                  width="100%"
                  height={"200px"}
                  border="1px solid #D0D5DD"
                  borderRadius={"8px"}
                  padding="16px 24px"
                  overflowY={"auto"}
                >
                  <ReactSVG
                    src={`/icons/UploadIcon.svg`}
                    width={40}
                    height={40}
                  />
                  <FileUploadRoot
                    width={"100%"}
                    height={"80%"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    maxFiles={1}
                    accept={["image/png", "image/jpg", "image/jpeg"]}
                    onFileChange={(file) => {
                      if (file) {
                        setCoverImageName(
                          file.acceptedFiles.map((f) => f.name).join(", ")
                        );
                      } else {
                        setCoverImageName(null);
                      }
                    }}
                  >
                    {" "}
                    <FileUploadTrigger
                      width={"100%"}
                      height={"40px"}
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <Button
                        width="100%"
                        height="40px"
                        borderRadius="10px"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Text
                          fontWeight={"semibold"}
                          fontSize={"14px"}
                          lineHeight={"20px"}
                          display={"flex"}
                          justifyContent={"center"}
                          height="full"
                          color="#6941C6"
                        >
                          Click to upload{" "}
                          <Text as="span" color="#667085" fontWeight={"normal"}>
                            {"  "}
                            or drag and drop
                          </Text>
                        </Text>
                        <Text
                          fontWeight={"normal"}
                          fontSize={"12px"}
                          lineHeight={"18px"}
                          color="#667085"
                          display={"flex"}
                          justifyContent={"center"}
                          height="full"
                        >
                          PNG or JPG
                        </Text>{" "}
                      </Button>
                    </FileUploadTrigger>
                    <FileUploadList showSize clearable />{" "}
                  </FileUploadRoot>
                  {coverImageName && (
                    <Text fontSize="14px" color="green.500">
                      Uploaded: {coverImageName}
                    </Text>
                  )}
                </VStack>
              </VStack>
              <HStack>
                <VStack
                  width="100%"
                  height="74px"
                  gap="6px"
                  alignItems={"start"}
                  justifyContent={"start"}
                >
                  <Text
                    fontWeight={"semibold"}
                    fontSize={"14px"}
                    lineHeight={"20px"}
                  >
                    Deadline
                  </Text>{" "}
                  <Input
                    type={"date"}
                    height={{ base: "46px", xl: "46px" }}
                    backgroundColor={"#FFFFFF"}
                    _placeholder={{ color: "#878484", fontWeight: "500" }}
                    padding="10px"
                    _focus={{
                      borderWidth: "0px",
                      outlineWidth: "1px",
                      outlineColor: "#D0D5DD",
                    }}
                    border="1px solid #D0D5DD"
                    variant={"subtle"}
                    borderRadius={"10px"}
                    width={{ base: "full", xl: "100%" }}
                    color={"#878484"}
                    onChange={handleChange}
                    value={values.deadline}
                    placeholder="Due date"
                    name="deadline"
                    min={getTodayDate()}
                  />
                </VStack>
                <VStack
                  width="100%"
                  height="74px"
                  gap="6px"
                  alignItems={"start"}
                  justifyContent={"start"}
                >
                  <Text
                    fontWeight={"semibold"}
                    fontSize={"14px"}
                    lineHeight={"20px"}
                  >
                    Time
                  </Text>{" "}
                  <Input
                    type={"time"}
                    height={{ base: "46px", xl: "46px" }}
                    backgroundColor={"#FFFFFF"}
                    _placeholder={{ color: "#878484", fontWeight: "500" }}
                    padding="10px"
                    _focus={{
                      borderWidth: "0px",
                      outlineWidth: "1px",
                      outlineColor: "#D0D5DD",
                    }}
                    border="1px solid #D0D5DD"
                    variant={"subtle"}
                    borderRadius={"10px"}
                    width={{ base: "full", xl: "100%" }}
                    color={"#878484"}
                    onChange={handleChange}
                    value={
                      isToday(values.deadline) ? getCurrentTime() : values.time
                    }
                    placeholder="Time"
                    name="time"
                  />
                </VStack>
              </HStack>

              <Button
                width={"100%"}
                type="submit"
                loading={submitting}
                loadingText="Updating"
                bgColor={"#4F35F3"}
                padding="8px 16px"
                borderRadius={"12px"}
                color="white"
                fontWeight={"semibold"}
                fontSize="16px"
                disabled={submitting || !isValid}
              >
                {taskId ? "Save" : "Add"}
              </Button>
            </Form>
          </Box>
        )}
      </Formik>
    </Box>
  );
};

import { DataType, ItemStatus } from "@/pages/data/data";
import * as Yup from "yup";

export const validationSchema = Yup.object({
    taskName: Yup.string()
        .trim()
        .min(3, "Task name must be at least 3 characters")
        .max(100, "Task name cannot exceed 100 characters")
        .required("Task name is required"),

    description: Yup.string()
        .trim()
        .max(500, "Description cannot exceed 500 characters")
        .optional(),

    deadline: Yup.date()
        .min(
            new Date(new Date().setHours(0, 0, 0, 0)),
            "Deadline must be a future date"
        )
        .required("Deadline is required"),

    time: Yup.string()
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:MM)")
        .required("Time is required"),

    priority: Yup.string()
        .oneOf(["High", "Medium", "Low"], "Invalid priority")
        .required("Priority is required"),

    status: Yup.string()
        .oneOf(["Pending", "Completed", "Due", "Progress"], "Invalid status")
        .required("Status is required"),


    coverImage: Yup.string()
        .url("Cover image must be a valid URL")
        .optional(),
});

export const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
};

export const isToday = (selectedDate: string) => {
    const today = new Date().toISOString().split("T")[0];
    return selectedDate === today;
};


export const groupTasksByDateAndStatus = (tasks: DataType[]) => {
    if (!Array.isArray(tasks)) {
        console.error("Expected an array but got:", tasks);
        return {};
    }

    return tasks.reduce(
        (acc, task) => {
            if (!task.deadline) return acc;

            if (!acc[task.deadline]) {
                acc[task.deadline] = {
                    Pending: [],
                    Completed: [],
                    Due: [],
                    Progress: [],
                };
            }

            if (
                typeof task.status === "string" &&
                acc[task.deadline][task.status as ItemStatus]
            ) {
                (acc[task.deadline][task.status as ItemStatus] as DataType[]).push(
                    task
                );
            } else if (Array.isArray(task.status)) {
                task.status.forEach((status: ItemStatus) => {
                    if (acc[task.deadline][status]) {
                        (acc[task.deadline][status] as DataType[]).push(task);
                    }
                });
            }

            return acc;
        },
        {} as Record<string, Record<ItemStatus, DataType[]>>
    );
};

export   const getTasksFromLocalStorage = (): DataType[] => {
    try {
      const storedData = localStorage.getItem("CalendarData");
      if (!storedData) return [];
      const parsedData = JSON.parse(storedData);
      return Array.isArray(parsedData) ? parsedData : [];
    } catch (error) {
      console.error("Error parsing CalendarData from localStorage:", error);
      return [];
    }
  };
  



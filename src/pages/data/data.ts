export type PriorityType = "High" | "Medium" | "Low";
export type ItemStatus = "Pending" | "Completed" | "Due" | "Progress";


export interface DataType {
    taskName: string
    description?: string
    priority: string
    coverImage?: string
    deadline: string
    time: string
    id: number
    status: string
}

export const Priority: PriorityType[] = ["High", "Medium", "Low"];

const saveTaskToLocalStorage = (task: DataType): DataType[] => {
    let existingTasks: DataType[] = [];

    try {
        const storedData = localStorage.getItem("CalendarData");
        existingTasks = storedData ? JSON.parse(storedData) : [];
        if (!Array.isArray(existingTasks)) {
            existingTasks = [];
        }
    } catch (error) {
        console.error("Error parsing CalendarData from localStorage:", error);
        existingTasks = [];
    }

    const getLastTaskId = (): number => {
        if (!existingTasks.length) return 100;
        const lastTask = existingTasks[existingTasks.length - 1];
        return lastTask?.id ? lastTask.id + 1 : 100;
    };

    const filteredTasks = existingTasks.filter(existingTask => existingTask.id !== task.id);

    localStorage.setItem("CalendarData", JSON.stringify(filteredTasks));

    const newTask: DataType = {
        id: task.id ?? getLastTaskId(),
        taskName: task.taskName,
        description: task.description || "",
        priority: task.priority || "Low",
        coverImage: task.coverImage || "",
        deadline: task.deadline,
        time: task.time,
        status: task.status || "Pending",
    };

    const updatedTasks = [...filteredTasks, newTask];

    localStorage.setItem("CalendarData", JSON.stringify(updatedTasks));

    return updatedTasks;
};


export default saveTaskToLocalStorage;

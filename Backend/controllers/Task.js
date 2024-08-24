import Users from "../models/Loginmodel.js";
import Task from "../models/Taskmodel.js";


export const createTask = async (req, res) => {
  const { title, description, status, priority, assignedTo } = req.body;

  try {
    const assignedUser = await Users.findOne({ email: assignedTo });
    if (!assignedUser) {
      return res.status(404).json({ message: "Assigned user not found" });
    }
    const task = new Task({
      title,
      description,
      status,
      priority,
      assignedTo,
      assignedTo:assignedUser._id,
      createdBy:req.user.id,
    });
    await task.save();
    res.json(task);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getTasks = async (req, res) => {
  const { priority, status, assignedTo } = req.query;

  try {
    let query = {};
    if (priority) query.priority = priority;
    if (status) query.status = status;
    if (assignedTo) query.assignedTo = assignedTo;
    const tasks = await Task.find(query).populate("assignedTo", "name email")
    .populate("createdBy", "name email");
    res.json(tasks);
  } catch (err) {
    console.log("err in geting all tasks",err)
    res.status(500).json({ message: "Server error" });
  }
};
export const getTaskById = async (req, res) => {
    try {
      const task = await Task.findById(req.params.id)
        .populate("assignedTo", "name email")
        .populate("createdBy", "name email");
  
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      res.json(task);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

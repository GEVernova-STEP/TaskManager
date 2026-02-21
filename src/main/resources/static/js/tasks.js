// create task page logic - loads dropdowns and handles task creation

// load dropdown data when page opens
async function loadTaskFormData() {
  try {
    var results = await Promise.all([
      fetchUsers(),
      fetchCategories(),
      fetchPriorities()
    ]);
    var users = results[0] || [];
    var categories = results[1] || [];
    var priorities = results[2] || [];

    // populate all three select dropdowns
    fillSelect(document.getElementById("taskUserId"), users, function (u) {
      return u.name;
    });
    fillSelect(document.getElementById("taskCategoryId"), categories, function (c) {
      return c.name;
    });
    fillSelect(document.getElementById("taskPriorityId"), priorities, function (p) {
      return p.name;
    });
  } catch (err) {
    showToast(err.message, "error");
  }
}

// handle task form submit
document.getElementById("taskForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  var title = document.getElementById("taskTitle").value.trim();
  var description = document.getElementById("taskDescription").value.trim();
  var dueDate = document.getElementById("taskDueDate").value || null;
  var userId = Number(document.getElementById("taskUserId").value);
  var categoryId = Number(document.getElementById("taskCategoryId").value);
  var priorityId = Number(document.getElementById("taskPriorityId").value);

  if (!title) return;

  try {
    await createTask({
      title: title,
      description: description,
      dueDate: dueDate,
      userId: userId,
      categoryId: categoryId,
      priorityId: priorityId
    });
    showToast("Task created - view it on Dashboard", "success");
    e.target.reset();
  } catch (err) {
    showToast(err.message, "error");
  }
});

// load form data on page ready
loadTaskFormData();

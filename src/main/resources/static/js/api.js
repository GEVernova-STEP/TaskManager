// shared api helper

// base api call function
async function apiRequest(path, options) {
  var response = await fetch(path, options);
  if (!response.ok) {
    var details = "";
    try {
      var data = await response.json();
      details = data.message ? " - " + data.message : "";
    } catch (e) {
      details = "";
    }
    throw new Error("Request failed (" + response.status + ")" + details);
  }
  // handle 204 no content
  if (response.status === 204) {
    return null;
  }
  return response.json();
}

// show a toast notification at top right
function showToast(message, type) {
  var toast = document.getElementById("toast");
  if (!toast) return;
  // clear previous classes
  toast.className = "toast";
  toast.textContent = message;
  // add type class like info, error, success
  toast.classList.add(type || "info");
  toast.classList.add("show");
  // auto hide after 3 seconds
  clearTimeout(toast._timer);
  toast._timer = setTimeout(function () {
    toast.classList.remove("show");
  }, 3000);
}

// fetch all users from api
function fetchUsers() {
  return apiRequest("/api/users");
}

// fetch all categories from api
function fetchCategories() {
  return apiRequest("/api/categories");
}

// fetch all priorities from api
function fetchPriorities() {
  return apiRequest("/api/priorities");
}

// fetch all tasks from api
function fetchTasks() {
  return apiRequest("/api/tasks");
}

// create a new user
function createUser(payload) {
  return apiRequest("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
}

// create a new category
function createCategory(payload) {
  return apiRequest("/api/categories", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
}

// create a new priority
function createPriority(payload) {
  return apiRequest("/api/priorities", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
}

// create a new task
function createTask(payload) {
  return apiRequest("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
}

// update task status
function updateTaskStatus(taskId, status) {
  return apiRequest("/api/tasks/" + taskId + "/status", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: status })
  });
}

// delete a user by id
function deleteUser(id) {
  return apiRequest("/api/users/" + id, { method: "DELETE" });
}

// delete a category by id
function deleteCategory(id) {
  return apiRequest("/api/categories/" + id, { method: "DELETE" });
}

// delete a priority by id
function deletePriority(id) {
  return apiRequest("/api/priorities/" + id, { method: "DELETE" });
}

// delete a task by id
function deleteTask(id) {
  return apiRequest("/api/tasks/" + id, { method: "DELETE" });
}

// helper to get the right css class for a status badge
function getStatusBadgeClass(status) {
  if (status === "PENDING") return "badge badge-pending";
  if (status === "IN_PROGRESS") return "badge badge-in-progress";
  if (status === "DONE") return "badge badge-done";
  return "badge";
}

// helper to populate a select dropdown from an array
function fillSelect(selectElement, items, labelFn) {
  selectElement.innerHTML = "";
  if (!items.length) {
    var opt = document.createElement("option");
    opt.value = "";
    opt.textContent = "-- none available --";
    selectElement.appendChild(opt);
    return;
  }
  items.forEach(function (item) {
    var opt = document.createElement("option");
    opt.value = item.id;
    opt.textContent = labelFn(item);
    selectElement.appendChild(opt);
  });
}


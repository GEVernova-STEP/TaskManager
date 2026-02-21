// dashboard page logic - loads tasks and shows them as cards

var tasks = [];

// load tasks from api and render everything
async function loadDashboard() {
  try {
    tasks = await fetchTasks() || [];
    renderStats();
    renderTaskCards();
  } catch (err) {
    showToast(err.message, "error");
  }
}

// render the stats cards at the top
function renderStats() {
  var total = tasks.length;
  var pending = tasks.filter(function (t) { return t.status === "PENDING"; }).length;
  var inProgress = tasks.filter(function (t) { return t.status === "IN_PROGRESS"; }).length;
  var done = tasks.filter(function (t) { return t.status === "DONE"; }).length;

  document.getElementById("statTotal").textContent = total;
  document.getElementById("statPending").textContent = pending;
  document.getElementById("statProgress").textContent = inProgress;
  document.getElementById("statDone").textContent = done;
}

// render all task cards into the grid
function renderTaskCards() {
  var container = document.getElementById("tasksGrid");
  container.innerHTML = "";

  if (!tasks.length) {
    container.innerHTML = '<div class="empty-state"><p>No tasks found. Go to Manage page to create one.</p></div>';
    return;
  }

  tasks.forEach(function (task) {
    var card = document.createElement("div");
    card.className = "task-card";

    // title row with badge
    var titleRow = document.createElement("div");
    titleRow.style.display = "flex";
    titleRow.style.justifyContent = "space-between";
    titleRow.style.alignItems = "center";

    var title = document.createElement("div");
    title.className = "task-title";
    title.textContent = task.title;

    var badge = document.createElement("span");
    badge.className = getStatusBadgeClass(task.status);
    badge.textContent = task.status.replace("_", " ");

    titleRow.appendChild(title);
    titleRow.appendChild(badge);
    card.appendChild(titleRow);

    // description
    if (task.description) {
      var desc = document.createElement("div");
      desc.className = "task-desc";
      desc.textContent = task.description;
      card.appendChild(desc);
    }

    // meta info row
    var meta = document.createElement("div");
    meta.className = "task-meta";

    var userName = task.user ? task.user.name : "-";
    var catName = task.category ? task.category.name : "-";
    var priName = task.priority ? task.priority.name : "-";
    var dueDate = task.dueDate || "No due date";

    meta.innerHTML =
      "<span>User: " + userName + "</span>" +
      "<span>Category: " + catName + "</span>" +
      "<span>Priority: " + priName + "</span>" +
      "<span>Due: " + dueDate + "</span>";

    card.appendChild(meta);

    // action buttons row
    var actions = document.createElement("div");
    actions.className = "task-actions";

    // status change buttons based on current status
    if (task.status !== "IN_PROGRESS") {
      var progressBtn = document.createElement("button");
      progressBtn.className = "btn-warning btn-sm";
      progressBtn.textContent = "In Progress";
      progressBtn.addEventListener("click", function () {
        changeStatus(task.id, "IN_PROGRESS");
      });
      actions.appendChild(progressBtn);
    }

    if (task.status !== "DONE") {
      var doneBtn = document.createElement("button");
      doneBtn.className = "btn-success btn-sm";
      doneBtn.textContent = "Done";
      doneBtn.addEventListener("click", function () {
        changeStatus(task.id, "DONE");
      });
      actions.appendChild(doneBtn);
    }

    if (task.status !== "PENDING") {
      var pendingBtn = document.createElement("button");
      pendingBtn.className = "btn-outline btn-sm";
      pendingBtn.textContent = "Pending";
      pendingBtn.addEventListener("click", function () {
        changeStatus(task.id, "PENDING");
      });
      actions.appendChild(pendingBtn);
    }

    // delete button
    var delBtn = document.createElement("button");
    delBtn.className = "btn-danger btn-sm";
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", function () {
      openDeleteModal(task.id, task.title);
    });
    actions.appendChild(delBtn);

    card.appendChild(actions);
    container.appendChild(card);
  });
}

// change task status and reload
async function changeStatus(taskId, newStatus) {
  try {
    await updateTaskStatus(taskId, newStatus);
    showToast("Status updated", "success");
    await loadDashboard();
  } catch (err) {
    showToast(err.message, "error");
  }
}

// open confirm delete modal
function openDeleteModal(taskId, taskTitle) {
  document.getElementById("deleteTaskName").textContent = taskTitle;
  var overlay = document.getElementById("deleteModal");
  overlay.classList.add("show");

  // set up confirm button
  var confirmBtn = document.getElementById("confirmDeleteBtn");
  // remove old listener by replacing node
  var newBtn = confirmBtn.cloneNode(true);
  confirmBtn.parentNode.replaceChild(newBtn, confirmBtn);
  newBtn.addEventListener("click", async function () {
    try {
      await deleteTask(taskId);
      showToast("Task deleted", "success");
      closeDeleteModal();
      await loadDashboard();
    } catch (err) {
      showToast(err.message, "error");
    }
  });
}

// close the delete modal
function closeDeleteModal() {
  document.getElementById("deleteModal").classList.remove("show");
}

// filter tasks by status
function filterTasks(status) {
  // update active button styling
  var btns = document.querySelectorAll(".filter-btn");
  btns.forEach(function (b) {
    b.classList.remove("active");
    // match button text to selected status
    var btnStatus = b.textContent.trim().toUpperCase().replace(" ", "_");
    if (btnStatus === status || (status === "ALL" && b.textContent.trim() === "All")) {
      b.classList.add("active");
    }
  });

  var container = document.getElementById("tasksGrid");
  container.innerHTML = "";

  var filtered = status === "ALL" ? tasks : tasks.filter(function (t) { return t.status === status; });

  if (!filtered.length) {
    container.innerHTML = '<div class="empty-state"><p>No tasks with this status.</p></div>';
    return;
  }

  // temporarily swap tasks array to render filtered results
  var backup = tasks;
  tasks = filtered;
  renderTaskCards();
  tasks = backup;
}

// load dashboard on page ready
loadDashboard();



// priorities page logic - create and delete priorities

var priorities = [];

// load all priorities from api
async function loadPriorities() {
  try {
    priorities = await fetchPriorities() || [];
    renderPrioritiesList();
  } catch (err) {
    showToast(err.message, "error");
  }
}

// render priorities into the list
function renderPrioritiesList() {
  var container = document.getElementById("prioritiesList");
  container.innerHTML = "";

  if (!priorities.length) {
    container.innerHTML = '<div class="empty-state"><p>No priorities yet. Add one above.</p></div>';
    return;
  }

  priorities.forEach(function (pri) {
    var row = document.createElement("div");
    row.className = "item-row";

    var info = document.createElement("div");
    info.className = "item-info";
    info.innerHTML =
      '<span class="item-name">' + pri.name + '</span>' +
      '<span class="item-detail">Level: ' + pri.level + '</span>';

    var btn = document.createElement("button");
    btn.className = "btn-danger btn-sm";
    btn.textContent = "Delete";
    btn.addEventListener("click", function () {
      handleDeletePriority(pri.id);
    });

    row.appendChild(info);
    row.appendChild(btn);
    container.appendChild(row);
  });
}

// handle priority form submit
document.getElementById("priorityForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  var name = document.getElementById("priorityName").value.trim();
  var level = Number(document.getElementById("priorityLevel").value);
  if (!name || !level) return;
  try {
    await createPriority({ name: name, level: level });
    showToast("Priority created successfully", "success");
    e.target.reset();
    await loadPriorities();
  } catch (err) {
    showToast(err.message, "error");
  }
});

// handle priority delete with confirmation
async function handleDeletePriority(id) {
  if (!confirm("Are you sure you want to delete this priority?")) return;
  try {
    await deletePriority(id);
    showToast("Priority deleted", "success");
    await loadPriorities();
  } catch (err) {
    showToast(err.message, "error");
  }
}

// load priorities on page ready
loadPriorities();


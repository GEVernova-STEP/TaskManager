// users page logic - create and delete users

var users = [];

// load all users from api
async function loadUsers() {
  try {
    users = await fetchUsers() || [];
    renderUsersList();
  } catch (err) {
    showToast(err.message, "error");
  }
}

// render users into the list
function renderUsersList() {
  var container = document.getElementById("usersList");
  container.innerHTML = "";

  if (!users.length) {
    container.innerHTML = '<div class="empty-state"><p>No users yet. Add one above.</p></div>';
    return;
  }

  users.forEach(function (user) {
    var row = document.createElement("div");
    row.className = "item-row";

    var info = document.createElement("div");
    info.className = "item-info";
    info.innerHTML =
      '<span class="item-name">' + user.name + '</span>' +
      '<span class="item-detail">' + user.email + '</span>';

    var btn = document.createElement("button");
    btn.className = "btn-danger btn-sm";
    btn.textContent = "Delete";
    btn.addEventListener("click", function () {
      handleDeleteUser(user.id);
    });

    row.appendChild(info);
    row.appendChild(btn);
    container.appendChild(row);
  });
}

// handle user form submit
document.getElementById("userForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  var name = document.getElementById("userName").value.trim();
  var email = document.getElementById("userEmail").value.trim();
  if (!name || !email) return;
  try {
    await createUser({ name: name, email: email });
    showToast("User created successfully", "success");
    e.target.reset();
    await loadUsers();
  } catch (err) {
    showToast(err.message, "error");
  }
});

// handle user delete with confirmation
async function handleDeleteUser(id) {
  if (!confirm("Are you sure you want to delete this user?")) return;
  try {
    await deleteUser(id);
    showToast("User deleted", "success");
    await loadUsers();
  } catch (err) {
    showToast(err.message, "error");
  }
}

// load users on page ready
loadUsers();


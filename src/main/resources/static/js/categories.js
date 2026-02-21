// categories page logic - create and delete categories

var categories = [];

// load all categories from api
async function loadCategories() {
  try {
    categories = await fetchCategories() || [];
    renderCategoriesList();
  } catch (err) {
    showToast(err.message, "error");
  }
}

// render categories into the list
function renderCategoriesList() {
  var container = document.getElementById("categoriesList");
  container.innerHTML = "";

  if (!categories.length) {
    container.innerHTML = '<div class="empty-state"><p>No categories yet. Add one above.</p></div>';
    return;
  }

  categories.forEach(function (cat) {
    var row = document.createElement("div");
    row.className = "item-row";

    var info = document.createElement("div");
    info.className = "item-info";
    var detail = cat.description || "No description";
    info.innerHTML =
      '<span class="item-name">' + cat.name + '</span>' +
      '<span class="item-detail">' + detail + '</span>';

    var btn = document.createElement("button");
    btn.className = "btn-danger btn-sm";
    btn.textContent = "Delete";
    btn.addEventListener("click", function () {
      handleDeleteCategory(cat.id);
    });

    row.appendChild(info);
    row.appendChild(btn);
    container.appendChild(row);
  });
}

// handle category form submit
document.getElementById("categoryForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  var name = document.getElementById("categoryName").value.trim();
  var description = document.getElementById("categoryDescription").value.trim();
  if (!name) return;
  try {
    await createCategory({ name: name, description: description });
    showToast("Category created successfully", "success");
    e.target.reset();
    await loadCategories();
  } catch (err) {
    showToast(err.message, "error");
  }
});

// handle category delete with confirmation
async function handleDeleteCategory(id) {
  if (!confirm("Are you sure you want to delete this category?")) return;
  try {
    await deleteCategory(id);
    showToast("Category deleted", "success");
    await loadCategories();
  } catch (err) {
    showToast(err.message, "error");
  }
}

// load categories on page ready
loadCategories();


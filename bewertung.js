document.addEventListener("DOMContentLoaded", () => {

  // ---------- 1️⃣ Set hidden date ----------
  const dateInput = document.getElementById("date");
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  dateInput.value = `${yyyy}-${mm}-${dd}`;

  // ---------- 2️⃣ Dynamic Meal Options ----------
  const mealOptions = {
    "FleischhaltigesGericht": ["Steak", "Chicken", "Pork"],
    "Vegetarisches Gericht": ["Veggie Burger", "Pasta", "Curry"],
    "Saladbar": ["Greek Salad", "Caesar Salad", "Coleslaw"],
    "Desert": ["Cake", "Ice Cream", "Fruit"]
  };

  const typeSelect = document.getElementById("type");
  const mealSelect = document.getElementById("meal");

  typeSelect.addEventListener("change", () => {
    const selectedType = typeSelect.value;

    // Clear previous options
    mealSelect.innerHTML = '<option value="" disabled selected>Choose a meal</option>';

    // Populate new meals
    if (mealOptions[selectedType]) {
      mealOptions[selectedType].forEach(meal => {
        const option = document.createElement("option");
        option.value = meal;
        option.textContent = meal;
        mealSelect.appendChild(option);
      });
    }
  });

  // ---------- 3️⃣ Form Submission ----------
  const form = document.getElementById("ratingForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
      date: dateInput.value,
      type: typeSelect.value,
      meal: mealSelect.value,
      rating: document.getElementById("rating").value,
      description: document.getElementById("description").value
    };

    // Simple frontend validation
    if (!data.type || !data.meal || !data.rating) {
      alert("Bitte füllen Sie alle Pflichtfelder aus (Typ, Meal, Rating)");
      return;
    }

    console.log("Submitting rating:", data);

    // TODO: Replace with your backend API call
    // Example using fetch:
    /*
    fetch('/api/saveRating', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(response => alert("Rating saved!"))
    .catch(err => console.error(err));
    */

    alert("Rating saved successfully! (check console)");
    form.reset();

    // Reset meal options placeholder
    mealSelect.innerHTML = '<option value="" disabled selected>Choose a meal</option>';

    // Reset hidden date to today again
    dateInput.value = `${yyyy}-${mm}-${dd}`;
  });

});

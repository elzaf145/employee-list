/* I created an array of 10 employees that show in the list with their job tittles. You can press 
on button details and see also an email and start date for each person. you can search an employee by
their name and also the list is alphabetically sorted so it is easier to navigate. for functionality 
it would be great to have a feature "add employees" so that HR manager can add anyone easily, but as 
the task specified not to have much backend code, I did not finish this idea. In this context it would be 
easier to have a file with all people data, but this setup was easier for me and for such little content.
For great visual I added a Bootstrap modal to clean the result up and make it pretty. It creates a style
for each element in the list and their details. */ 


// array of employees
const employees = [
    { id: 1, name: "Oļegs Burovs", title: "Marketing Assistant", email: "burovs@example.com", startDate: "2024-02-01" },
    { id: 2, name: "Regīna Ločmele", title: "Software Engineer", email: "locmele@example.com", startDate: "2023-06-10" },
    { id: 3, name: "Rūdolfs Sauja", title: "UX Designer", email: "sauja@example.com", startDate: "2022-09-18" },
    { id: 4, name: "Vilnis Ķirsis", title: "Sales Lead", email: "kirsis@example.com", startDate: "2021-12-05" },
    { id: 5, name: "Silvestrs Rubins", title: "HR Manager", email: "rubins@example.com", startDate: "2020-04-23" },
    { id: 6, name: "Viesturs Kleinbergs	", title: "Data Analyst", email: "kleinbergs@example.com", startDate: "2024-03-14" },
    { id: 7, name: "Vita Robalte", title: "Operations Manager", email: "robalte@example.com", startDate: "2019-07-01" },
    { id: 8, name: "Edvards Ratnieks", title: "DevOps Engineer", email: "ratnieks@example.com", startDate: "2023-11-02" },
    { id: 9, name: "Māris Sprindžuks", title: "Customer Success", email: "sprindzuks@example.com", startDate: "2023-01-12" },
    { id: 10, name: "Aleksejs Rosļikovs", title: "Product Manager", email: "roslikovs@example.com", startDate: "2022-08-30" },
  ];
  
  const searchBox = document.getElementById("searchBox");
  const employeeList = document.getElementById("employeeList");
  
  // Bootstrap modal setup
  const employeeModal = new bootstrap.Modal(document.getElementById("employeeModal"));
  const modalTitle = document.getElementById("employeeModalTitle");
  const modalBody = document.getElementById("employeeModalBody");
  
  // Sort alphabetically by name by default
  const sortedEmployees = [...employees].sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  );

  //function displays employees on the screen
//  "filter" –  acepts only the name the user types in the search
  function renderList(filter = "") {
    const filtered = sortedEmployees.filter(emp =>
      emp.name.toLowerCase().includes(filter.toLowerCase())
    );
  
    employeeList.innerHTML = "";
  
    //update each element 'li' to look better like app
    filtered.forEach(emp => {
      const li = document.createElement("li");
      li.className = "list-group-item list-group-item-action d-flex justify-content-between align-items-center"; //combining bootstrap styles
      li.innerHTML = `
        <div>
          <strong>${emp.name}</strong><br/>
          <small class="text-muted">${emp.title}</small>
        </div>
        <button class="btn btn-sm btn-outline-primary">Details</button>
      `;
  
      // When the "Details" button is clicked, show a popup with more info
      li.querySelector("button").addEventListener("click", () => {
        modalTitle.textContent = emp.name;
        modalBody.innerHTML = `
          <p><strong>Title:</strong> ${emp.title}</p>
          <p><strong>Email:</strong> <a href="mailto:${emp.email}">${emp.email}</a></p>
          <p><strong>Start Date:</strong> ${emp.startDate}</p>
        `;
        employeeModal.show(); // show the bootstrap 
      });
  
      employeeList.appendChild(li);
    });
  }

  // Show list the first time the page loads
  renderList();
  
  // Filter employees live
  searchBox.addEventListener("input", () => {
    renderList(searchBox.value);
  });
  
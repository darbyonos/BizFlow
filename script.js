// ==========================================
// SAMPLE DATA
// ==========================================

let customers =
    JSON.parse(localStorage.getItem("customers")) || [

        {
            id: 1,
            name: "Sarah Johnson",
            email: "sarah@example.com"
        },

        {
            id: 2,
            name: "Daniel Smith",
            email: "daniel@example.com"
        },

        {
            id: 3,
            name: "Grace Williams",
            email: "grace@example.com"
        }

    ];


// ==========================================
// TRANSACTION DATA
// ==========================================

const transactions = [

    {
        customer: "Sarah Johnson",
        amount: 85000,
        status: "completed",
        date: "2026-09-01"
    },

    {
        customer: "Daniel Smith",
        amount: 120000,
        status: "completed",
        date: "2026-09-02"
    },

    {
        customer: "Grace Williams",
        amount: 65000,
        status: "pending",
        date: "2026-09-02"
    },

    {
        customer: "Michael Brown",
        amount: 150000,
        status: "completed",
        date: "2026-09-03"
    },

    {
        customer: "Emily Davis",
        amount: 95000,
        status: "pending",
        date: "2026-09-03"
    }

];


// ==========================================
// DOM ELEMENTS
// ==========================================

const sidebar =
    document.querySelector("#sidebar");

const closeBtn = 
document.getElementById('closeBtn')

const menuBtn =
    document.querySelector("#menuBtn");

const totalRevenue =
    document.querySelector("#totalRevenue");

const totalCustomers =
    document.querySelector("#totalCustomers");

const totalTransactions =
    document.querySelector("#totalTransactions");

const completedPayments =
    document.querySelector("#completedPayments");

const customerList =
    document.querySelector("#customerList");

const customerForm =
    document.querySelector("#customerForm");

const addCustomerBtn =
    document.querySelector("#addCustomerBtn");

const customerName =
    document.querySelector("#customerName");

const customerEmail =
    document.querySelector("#customerEmail");

const transactionList =
    document.querySelector("#transactionList");

const searchInput =
    document.querySelector("#searchInput");

const statusFilter =
    document.querySelector("#statusFilter");


// ==========================================
// MOBILE MENU
// ==========================================

menuBtn.addEventListener("click", () => {

    sidebar.classList.toggle("active");

});
closeBtn.addEventListener('click' ,() =>{
          sidebar.classList.remove('active');
        });

// ========================================
// CLOSE MOBILE MENU AFTER CLICKING A LINK
// ========================================

const navLinks =
    document.querySelectorAll("#navMenu a");


navLinks.forEach(function(link) {

    link.addEventListener("click", function() {

        sidebar.classList.remove("active");
        

    });

});

// Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
           if (target) {
                window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
                });
                }
            });
        });

// ==========================================
// DISPLAY CUSTOMERS
// ==========================================

function displayCustomers() {

    customerList.innerHTML = "";


    customers.forEach((customer) => {

        const customerCard =
            document.createElement("div");

        customerCard.classList.add(
            "customer-card"
        );


        customerCard.innerHTML = `

            <h3>${customer.name}</h3>

            <p>${customer.email}</p>

            <button
                class="delete-btn"
                onclick="deleteCustomer(${customer.id})"
            >
                Delete
            </button>

        `;


        customerList.appendChild(
            customerCard
        );

    });


    totalCustomers.textContent =
        customers.length;
}


// ==========================================
// ADD CUSTOMER
// ==========================================

addCustomerBtn.addEventListener("click", () => {

    customerForm.classList.toggle("active");

});


// ==========================================
// CUSTOMER FORM SUBMISSION
// ==========================================

customerForm.addEventListener("submit", (event) => {

    // Stop the page from refreshing
    event.preventDefault();


    const name =
        customerName.value.trim();

    const email =
        customerEmail.value.trim();


    // Check if fields are empty
    if (name === "" || email === "") {

        alert("Please fill in all fields.");

        return;
    }


    // Create a new customer object
    const newCustomer = {

        id: Date.now(),

        name: name,

        email: email

    };


    // Add customer to array
    customers.push(newCustomer);


    // Save customers
    saveCustomers();


    // Update the screen
    displayCustomers();


    // Clear form
    customerForm.reset();

});


// ==========================================
// DELETE CUSTOMER
// ==========================================

function deleteCustomer(customerId) {

    customers =
        customers.filter((customer) => {

            return customer.id !== customerId;

        });


    saveCustomers();

    displayCustomers();

}


// ==========================================
// SAVE CUSTOMERS TO LOCAL STORAGE
// ==========================================

function saveCustomers() {

    localStorage.setItem(
        "customers",
        JSON.stringify(customers)
    );

}


// ==========================================
// CALCULATE TOTAL REVENUE
// ==========================================

function calculateRevenue() {

    let revenue = 0;


    transactions.forEach((transaction) => {

        if (transaction.status === "completed") {

            revenue += transaction.amount;

        }

    });


    totalRevenue.textContent =
        `₦${revenue.toLocaleString()}`;

}


// ==========================================
// DISPLAY TRANSACTIONS
// ==========================================

function displayTransactions(data) {

    transactionList.innerHTML = "";


    data.forEach((transaction) => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${transaction.customer}
            </td>

            <td>
                ₦${transaction.amount.toLocaleString()}
            </td>

            <td>

                <span
                    class="status ${transaction.status}"
                >
                    ${transaction.status}
                </span>

            </td>

            <td>
                ${transaction.date}
            </td>

        `;


        transactionList.appendChild(row);

    });

}


// ==========================================
// SEARCH TRANSACTIONS
// ==========================================

searchInput.addEventListener("input", () => {

    const searchText =
        searchInput.value.toLowerCase();


    const filteredTransactions =
        transactions.filter((transaction) => {

            return transaction.customer
                .toLowerCase()
                .includes(searchText);

        });


    displayTransactions(
        filteredTransactions
    );

});


// ==========================================
// FILTER BY STATUS
// ==========================================

statusFilter.addEventListener("change", () => {

    const selectedStatus =
        statusFilter.value;


    if (selectedStatus === "all") {

        displayTransactions(transactions);

        return;
    }


    const filteredTransactions =
        transactions.filter((transaction) => {

            return transaction.status ===
                selectedStatus;

        });


    displayTransactions(
        filteredTransactions
    );

});


// ==========================================
// COUNT TRANSACTIONS
// ==========================================

function calculateTransactionStats() {

    totalTransactions.textContent =
        transactions.length;


    const completed =
        transactions.filter((transaction) => {

            return transaction.status ===
                "completed";

        });


    completedPayments.textContent =
        completed.length;

}


// ==========================================
// START APPLICATION
// ==========================================

displayCustomers();

displayTransactions(transactions);

calculateRevenue();

calculateTransactionStats();
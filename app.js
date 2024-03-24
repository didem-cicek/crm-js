const form = document.getElementById("create-lead");
const nameSurnameElement = document.getElementById("namesurname");
const emailElement = document.getElementById("email");
const phoneElement = document.getElementById("phone");
const companyElement = document.getElementById("company");
const jobElement = document.getElementById("job");
const cityElement = document.getElementById("city");
const noteElement = document.getElementById("note");
const cardBody = document.querySelector('.card-body')[1];
const list = document.getElementById('leads-list');
const clear = document.getElementById("clear-leads");
const detailPage = document.getElementById("detail");
const createButton = document.getElementById('createButton');
const updateButton = document.getElementById('saveButton');

const ui = new UI();
const storage = new Storage();

eventListener();

function eventListener() {
    createButton.addEventListener('click', addLead);
    updateButton.addEventListener('click', editLeads);
    document.addEventListener('DOMContentLoaded', () => {
        let leads = storage.getLeadsFromStorage();
        ui.loadAllLeads(leads);
    });
    list.addEventListener('click', deleteLeads);
    clear.addEventListener('click', clearAllLeads);
    document.getElementById('searchInput').addEventListener('input', function () {
        const searchText = this.value.toLowerCase();
        const rows = document.querySelectorAll('#leads-list tr');

        rows.forEach(function (row) {
            const cells = row.querySelectorAll('td');
            let found = false;

            cells.forEach(function (cell) {
                const text = cell.textContent.toLowerCase();
                if (text.includes(searchText)) {
                    found = true;
                }
            });

            if (found) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
}

function addLead(e) {
    e.preventDefault();
    const nameSurname = nameSurnameElement.value;
    const email = emailElement.value;
    const phone = phoneElement.value;
    const company = companyElement.value;
    const job = jobElement.value;
    const city = cityElement.value;
    const note = noteElement.value;

    if (nameSurname === "" || email === "" || phone === "" || company === "" || job === "" || city === "") {
        ui.displayMessage("You must ensure that you fill out all fields in the form.!", "danger");
    }
    else if (note !== "" && note.length > 512) {
        ui.displayMessage("You can add 512 characters to a lead note!", "danger");
    }
    else {
        const newLead = new Leads(nameSurname, email, phone, company, job, city, note);
        ui.addLeadsToUI(newLead);
        storage.addLeadsFromStorage(newLead);
        ui.displayMessage('Successfully added lead.', "success");
    }
}

function deleteLeads(e) {
    e.preventDefault();
    if (e.target.className === "btn btn-danger btn-sm") {
        ui.deleteLeadsFromUI(e.target.parentElement.parentElement);
        storage.deleteLeadsStorage(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent);
    }
    else if (e.target.className === "btn btn-warning btn-sm") {
        editLeads(e)
    }
    else {
        detailPages(e);
    }
}

function clearAllLeads(e) {
    e.preventDefault();
    if (confirm("Are you sure?")) {
        ui.clearAllLeadsFromUI();
        storage.clearAllLeadsFormStorage();
    }
}

function detailPages(e) {
    e.preventDefault();
    if (e.target.className === "btn btn-success btn-sm") {
        let value = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
        window.location.href = `detail.html?id=${value}`;
    }
}

function editLeads(e) {
    e.preventDefault();
    const createButton = document.getElementById('createButton');
    createButton.style.display = 'none';
    const saveButton = document.getElementById('saveButton');
    saveButton.style.display = 'inline';

    const [data] = storage.getLeadDetailsByName(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent);

    if (data) {
        nameSurnameElement.value = data.NameSurname;
        emailElement.value = data.Email;
        phoneElement.value = data.Phone;
        companyElement.value = data.Company;
        jobElement.value = data.Job;
        cityElement.value = data.City;
        noteElement.value = data.Note;
    }

    const nameSurname = nameSurnameElement.value;
    const email = emailElement.value;
    const phone = phoneElement.value;
    const company = companyElement.value;
    const job = jobElement.value;
    const city = cityElement.value;
    const note = noteElement.value;

    if (nameSurname === "" || email === "" || phone === "" || company === "" || job === "" || city === "") {
        ui.displayMessage("You must ensure that you fill out all fields in the form.!", "danger");
    } else if (note !== "" && note.length > 512) {
        ui.displayMessage("You can add 512 characters to a lead note!", "danger");
    } else {
        const newLead = new Leads(nameSurname, email, phone, company, job, city, note);
        ui.addLeadsToUI(newLead);
        storage.updateLeadInStorage(newLead);
        ui.displayMessage('Successfully uptaded lead.', "success");
        createButton.style.display = 'inline';
        saveButton.style.display = 'none';
    }
    
}



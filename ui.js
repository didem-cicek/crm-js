function UI() {

}

UI.prototype.addLeadsToUI = (newLead) => {
    const leadList = document.getElementById("leads-list");
    leadList.innerHTML +=
        `<tr>
     <td>${newLead.NameSurname}</td>
     <td>${newLead.Email}</td>
     <td>${newLead.Phone}</td>
     <td>${newLead.Company}</td>
     <td>${newLead.Job}</td>
     <td>${newLead.City}</td>
     <td id="detail"><a href="#" class="btn btn-success btn-sm" >Details</a></td>
     <td id="delete"><a href="#" class="btn btn-danger btn-sm" id="delete">Delete</a></td>
      <td id="edit"><a href="#" class="btn btn-warning btn-sm">Edit</a></td>
     </tr>`;
}

UI.prototype.clearInputs = () => {
    for (let i = 0; i < arguments.length; i++) {
        arguments[i].value = "";
    }
}

UI.prototype.displayMessage = (message, type) => {
    const cardBody = document.querySelector(".card-body");
    const div = document.createElement("div");
    div.className = `alert alert-${type}`
    div.textContent = message;
    cardBody.appendChild(div);
    setTimeout(function () {
        div.remove();
    }, 5000);
}

UI.prototype.loadAllLeads = (leads) => {
    const leadList = document.getElementById("leads-list");
    leads.forEach(function (e) {
        leadList.innerHTML +=
            `<tr>
             <td>${e.NameSurname}</td>
             <td>${e.Email}</td>
             <td>${e.Phone}</td>
            <td>${e.Company}</td>
            <td>${e.Job}</td>
            <td>${e.City}</td>
            <td id="detail"><a href="#" class="btn btn-success btn-sm" >Details</a></td>
            <td id="delete"><a href="#" class="btn btn-danger btn-sm" id="delete">Delete</a></td>
            <td id="edit"><a href="#" class="btn btn-warning btn-sm">Edit</a></td>
            </tr>`;

    });
}

UI.prototype.deleteLeadsFromUI = (element) =>{
    element.remove();
}

UI.prototype.clearAllLeadsFromUI = () =>{
    const leads = document.getElementById("leads-list");
    leads.innerHTML = "";
}

UI.prototype.loadDetailPage = (leads) => {
    const leadList = document.getElementById("leads-details");
    console.log(leads)
    leadList.innerHTML = "";
    leads.forEach(function (lead) {
        leadList.innerHTML +=
            `<tr>
             <td>${lead.NameSurname}</td>
             <td>${lead.Email}</td>
             <td>${lead.Phone}</td>
             <td>${lead.Company}</td>
             <td>${lead.Job}</td>
             <td>${lead.City}</td>
             <td>${lead.Note}</td>
            </tr>`;
    });
}
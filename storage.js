const key = "leads";

function Storage(){

}

Storage.prototype.addLeadsFromStorage = (newLead) => {
    let leads = Storage.prototype.getLeadsFromStorage();
    leads.push(newLead);
    localStorage.setItem(key, JSON.stringify(leads));
}

Storage.prototype.getLeadsFromStorage =()=>{
    let leads;
    if(localStorage.getItem(key)===null)
        leads = [];
    else
        leads = JSON.parse(localStorage.getItem(key));
    return leads;
}

Storage.prototype.deleteLeadsStorage = (leadName) =>{
    let leads = Storage.prototype.getLeadsFromStorage();
    leads.forEach(function (e, index) {
        if (e.NameSurname === leadName) {
            leads.splice(index, 1);
        }
    });
    localStorage.setItem(key, JSON.stringify(leads));
}

Storage.prototype.clearAllLeadsFormStorage = () =>{
    localStorage.removeItem(key)
}

Storage.prototype.getLeadsDetailsFromStorage =(e)=>{
    let leads = Storage.prototype.getLeadsFromStorage();
    leads.forEach(function(lead) {
        if (lead.NameSurname === e) {
            ui.loadDetailPage([lead]);
        }
    });
}

Storage.prototype.getLeadDetailsByName = (nameSurname) => {
    let leads = Storage.prototype.getLeadsFromStorage();
    let foundLeads = leads.filter(lead => lead.NameSurname === nameSurname);
    return foundLeads;
}

Storage.prototype.updateLeadInStorage = (updatedLead) => {
    let leads = Storage.prototype.getLeadsFromStorage();
    leads.forEach((lead, index) => {
        if (lead.id === updatedLead.id) {
            leads[index] = updatedLead;
        }
    });
    localStorage.setItem(key, JSON.stringify(leads));
}

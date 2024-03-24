const detailList = document.getElementById('leads-details');
const urlParams = new URLSearchParams(window.location.search);
const dataString = urlParams.get('id');

const ui = new UI();
const storage = new Storage();

window.onload = function() {
    if (dataString !== null) {
        let formattedName = dataString.replace(/%20/g, " ");
        storage.getLeadsDetailsFromStorage(formattedName);
    }
}




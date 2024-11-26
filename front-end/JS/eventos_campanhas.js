// document.addEventListener("DOMContentLoaded", () => {
    // const apiBaseUrl = "http://localhost:5501/app";

// const apiBaseUrl = "http://localhost:8080/app";
const apiBaseUrl = "/app";

const eventContainer = document.getElementById("event-cards-container");
const campaignContainer = document.getElementById("campaign-cards-container");
const modal = document.getElementById("modal-form");
const modalTitle = document.getElementById("modal-title");
const itemName = document.getElementById("item-name");
const itemDescription = document.getElementById("item-description");
const saveButton = document.getElementById("modal-save-btn");
const cancelButton = document.getElementById("modal-cancel-btn");

let isEditingEvent = false;
let editId = null;
localStorage.setItem("userToken", "xlmeefuexb")
// Fetch e renderiza itens
const fetchData = async (endpoint, container) => {
    try {
        const token = localStorage.getItem("userToken");
        const response = await fetch(`${apiBaseUrl}/${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userToken: token }),
        });
        const data = await response.json();
        renderItems(data, container, endpoint === "getEvents");
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

const renderItems = (items, container, isEvent) => {
    container.innerHTML = "";
    items.forEach((item) => {
        const card = document.createElement("div");
        card.classList.add("item");
        card.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            ${isEvent ? `<p><strong>Data:</strong> ${item.date}</p>` : ""}
            <button onclick="subscribe('${item.id}', ${isEvent})">${
            item.isSubscribed ? "Cancelar Inscrição" : "Inscrever-se"
        }</button>
        `;
        container.appendChild(card);
    });
};

// Adapta o modal
const openModal = (id = null, isEventModal = true) => {
    modal.classList.remove("hidden");
    modalTitle.textContent = id ? "Editar Item" : "Adicionar Item";
    isEditingEvent = isEventModal;
    editId = id;

    if (id) {
        const item = document.getElementById(id);
        itemName.value = item.querySelector("h3").textContent;
        itemDescription.value = item.querySelector("p").textContent;
    } else {
        itemName.value = "";
        itemDescription.value = "";
    }
};

const closeModal = () => {
    modal.classList.add("hidden");
    itemName.value = "";
    itemDescription.value = "";
    editId = null;
};

saveButton.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem("userToken");
        const endpoint = isEditingEvent ? "CreateEvents" : "CreateCampaigns";
        await fetch(`${apiBaseUrl}/${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userToken: token,
                name: itemName.value,
                description: itemDescription.value,
            }),
        });
        closeModal();
        fetchData(isEditingEvent ? "getEvents" : "getCampaings", isEditingEvent ? eventContainer : campaignContainer);
    } catch (error) {
        console.error("Error saving data:", error);
    }
});

cancelButton.addEventListener("click", closeModal);

// Fetch Eventos e Campanhas ao carregar a pag
fetchData("getEvents", eventContainer);
fetchData("getCampaings", campaignContainer);

// Inscrição
async function subscribe(id, isEvent) {
    const endpoint = isEvent ? "ApplyEvent" : "SubscribeCampaign";
    const token = localStorage.getItem("userToken");
    try {
        await fetch(`${apiBaseUrl}/${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userToken: token, Id: id }),
        });
        location.reload();
    } catch (error) {
        console.error("Error subscribing:", error);
    }
}

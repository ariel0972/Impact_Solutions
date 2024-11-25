document.addEventListener('DOMContentLoaded', function () {
    let userToken = '';
    let userType = '';

    // Autenticação e diferenciação de usuários
    function authenticateUser() {
        fetch('/api/Authenticate', {
            method: 'GET',
            headers: { Authorization: `Bearer ${userToken}` },
        })
            .then((response) => response.json())
            .then((data) => {
                userType = data.userType;
                userToken = data.token;

                if (userType === 'ONG') {
                    document.getElementById('link-voluntarios').classList.add('hidden');
                } else {
                    document.getElementById('link-ongs').classList.add('hidden');
                }

                loadData();
            })
            .catch((error) => console.error('Erro ao autenticar:', error));
    }

    // Carregar dados
    function loadData() {
        if (userType === 'ONG') {
            loadOwnCampaignsAndEvents();
        } else {
            loadAllCampaignsAndEvents();
        }
    }

    // Modal para criação e edição (ONGs)
    function openModal(item = null, isEvent = false) {
        const modal = document.getElementById('modal-form');
        const title = document.getElementById('modal-title');
        const nameInput = document.getElementById('item-name');
        const descInput = document.getElementById('item-description');

        if (item) {
            title.textContent = 'Editar Item';
            nameInput.value = item.name;
            descInput.value = item.description;
        } else {
            title.textContent = 'Adicionar Item';
            nameInput.value = '';
            descInput.value = '';
        }

        modal.classList.remove('hidden');
        document.getElementById('modal-save-btn').onclick = function () {
            saveItem(nameInput.value, descInput.value, isEvent);
        };
        document.getElementById('modal-cancel-btn').onclick = function () {
            modal.classList.add('hidden');
        };
    }

    // Salvar novo ou editar existente
    function saveItem(name, description, isEvent) {
        const endpoint = isEvent ? '/api/saveEvent' : '/api/saveCampaign';
        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify({ name, description }),
        })
            .then((response) => response.json())
            .then(() => {
                alert(`${isEvent ? 'Evento' : 'Campanha'} salvo com sucesso!`);
                document.getElementById('modal-form').classList.add('hidden');
                loadData();
            })
            .catch((error) => console.error('Erro ao salvar item:', error));
    }

    authenticateUser();
});

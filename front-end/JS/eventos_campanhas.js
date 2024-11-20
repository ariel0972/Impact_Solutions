document.addEventListener('DOMContentLoaded', function() {
    let userToken = ''; // A variável que irá armazenar o token do usuário
    let userType = '';  // O tipo de usuário (voluntário, ONG, etc.)

    // Função para login
    function login(username, password) {
        fetch('/api/Login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user: username, password: password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                userToken = data.token;
                userType = data.userType;
                loadData();  // Carregar dados após login
            } else {
                alert('Login falhou!');
            }
        })
        .catch(error => console.error('Erro ao fazer login:', error));
    }

    // Função para carregar campanhas e eventos
    function loadData() {
        // Carregar campanhas
        fetch(`/api/getCampaings?userToken=${userToken}`)
            .then(response => response.json())
            .then(campaigns => {
                const campaignContainer = document.getElementById('campaign-cards-container');
                campaignContainer.innerHTML = ''; // Limpar contêiner antes de adicionar novas campanhas

                campaigns.forEach(campaign => {
                    const campaignCard = document.createElement('div');
                    campaignCard.classList.add('item');
                    campaignCard.innerHTML = `
                        <h3>${campaign.name}</h3>
                        <p>Descrição: ${campaign.description}</p>
                        <button class="support-btn" data-id="${campaign.id}" ${campaign.isSubscribed ? 'disabled' : ''}>
                            ${campaign.isSubscribed ? 'Você apoia essa causa!' : 'Eu apoio essa causa!'}
                        </button>
                        <button class="donate-btn" data-id="${campaign.id}">Doações</button>
                    `;
                    campaignContainer.appendChild(campaignCard);
                });

                // Adicionar interatividade para os botões de "Eu apoio essa causa!"
                document.querySelectorAll('.support-btn').forEach(button => {
                    button.addEventListener('click', function() {
                        const campaignId = this.dataset.id;
                        if (!this.disabled) {
                            fetch(`/api/SubscribeCampaign?userToken=${userToken}&campaignId=${campaignId}`)
                                .then(response => response.json())
                                .then(data => {
                                    alert('Você apoiou essa causa!');
                                    loadData();  // Atualiza os dados após apoio
                                })
                                .catch(error => console.error('Erro ao apoiar campanha:', error));
                        }
                    });
                });

                // Adicionar interatividade para os botões de "Doações"
                document.querySelectorAll('.donate-btn').forEach(button => {
                    button.addEventListener('click', function() {
                        const campaignId = this.dataset.id;
                        const donationAmount = prompt("Digite o valor da doação:");
                        if (donationAmount) {
                            fetch(`/api/doarCampanha/${campaignId}`, {
                                method: 'POST',
                                body: JSON.stringify({ amount: donationAmount }),
                                headers: { 'Content-Type': 'application/json' }
                            })
                            .then(response => response.json())
                            .then(data => {
                                alert(`Você doou R$ ${donationAmount} para a causa!`);
                            })
                            .catch(error => console.error('Erro ao fazer a doação:', error));
                        }
                    });
                });
            })
            .catch(error => console.error('Erro ao carregar as campanhas:', error));

        // Carregar eventos
        fetch(`/api/getEvents?userToken=${userToken}`)
            .then(response => response.json())
            .then(events => {
                const eventContainer = document.getElementById('event-cards-container');
                eventContainer.innerHTML = ''; // Limpar contêiner antes de adicionar novos eventos

                events.forEach(event => {
                    const eventCard = document.createElement('div');
                    eventCard.classList.add('item');
                    eventCard.innerHTML = `
                        <h3>${event.name}</h3>
                        <p>Data: ${event.date}</p>
                        <p>Local: ${event.local}</p>
                        <p>Descrição: ${event.description}</p>
                        <button class="apply-btn" data-id="${event.id}" ${event.isApplied ? 'disabled' : ''}>
                            ${event.isApplied ? 'Você está inscrito!' : 'Eu vou!'}
                        </button>
                    `;
                    eventContainer.appendChild(eventCard);
                });

                // Adicionar interatividade para os botões de "Eu vou!"
                document.querySelectorAll('.apply-btn').forEach(button => {
                    button.addEventListener('click', function() {
                        const eventId = this.dataset.id;
                        if (!this.disabled) {
                            fetch(`/api/ApplyEvent?userToken=${userToken}&EventId=${eventId}`)
                                .then(response => response.json())
                                .then(data => {
                                    alert('Você se inscreveu para o evento!');
                                    loadData();  // Atualiza os dados após inscrição
                                })
                                .catch(error => console.error('Erro ao se inscrever no evento:', error));
                        }
                    });
                });
            })
            .catch(error => console.error('Erro ao carregar os eventos:', error));
    }

    // Exemplo de como realizar o login ao chamar a função login
    login('usuario@example.com', 'senha123'); // Substituir pelos dados reais

});

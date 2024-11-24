document.addEventListener('DOMContentLoaded', function() {
    // Função para buscar os dados do voluntário
    async function carregarPerfil() {
        try {
            // Supomos que o id do voluntário é passado por URL ou existe em um cookie/session
            const idVoluntario = 1; // Exemplo: ID do voluntário, aqui pode vir de um cookie ou outra forma.

            // Requisição GET para o backend, buscando os dados do voluntário
            const response = await fetch(`/api/voluntario/${idVoluntario}`);

            // Verificar se a resposta foi bem-sucedida (status 200)
            if (response.ok) {
                const dadosVoluntario = await response.json();

                // Preencher os dados no HTML
                document.querySelector('h2').textContent = `Bem-vindo, ${dadosVoluntario.nome}`;
                document.querySelector('p strong + text').textContent = dadosVoluntario.email;
                document.querySelectorAll('p')[1].innerHTML = `<strong>Data de Nascimento:</strong> ${dadosVoluntario.data_nascimento}`;
                document.querySelectorAll('p')[2].innerHTML = `<strong>Interesses:</strong> ${dadosVoluntario.interesses}`;
            } else {
                console.error('Erro ao carregar os dados do perfil');
            }
        } catch (error) {
            console.error('Erro ao fazer a requisição:', error);
        }
        
    }

    

    // Carregar o perfil assim que a página for carregada
    carregarPerfil();
});
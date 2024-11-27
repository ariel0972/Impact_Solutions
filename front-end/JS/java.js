// const header = document.querySelector("header");

// window.addEventListener("scroll", function(){
//     header.classList.toggle("sticky", this.window.scrollY > 0);
// })

// let menu = document.querySelector('#menu-icon');
// let navmenu = document.querySelector('.navmenu');

// menu.onclick = () => {
//     menu.classList.toggle('bx-x');
//     navmenu.classList.toggle('open');
// }

// animação de scroll 
document.addEventListener("DOMContentLoaded", function() {
    const elements = document.querySelectorAll('.animate'); // Seleciona todos os elementos com a classe "animate"

    // Função para verificar se o elemento está visível na tela
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return rect.top <= window.innerHeight && rect.bottom >= 0; // Verifica se o elemento está visível
    }

    // Função para animar os elementos quando eles estiverem visíveis
    function handleScroll() {
        elements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('animate-visible'); // Adiciona a animação quando o elemento está visível
            }
        });
    }

    // Verifica a visibilidade do elemento ao carregar a página
    handleScroll();

    // Adiciona um ouvinte de evento de scroll para animar os elementos quando o usuário rolar a página
    window.addEventListener('scroll', handleScroll);
});

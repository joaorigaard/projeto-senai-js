// Espera o HTML carregar
document.addEventListener("DOMContentLoaded", function(){

    // Seleciona todos os slides
    const slides = document.querySelectorAll(".slide");

    let slideAtual = 0;

    // Função que mostra um slide
    function mostrarSlide(index){

        slides.forEach(function(slide){
            slide.classList.remove("active");
        });

        slides[index].classList.add("active");
    }

    // Função global para clicar nos botões
    window.irParaSlide = function(index){

        slideAtual = index;

        mostrarSlide(slideAtual);
    }

    // Próximo slide automático
    function proximoSlide(){

        slideAtual++;

        if(slideAtual >= slides.length){
            slideAtual = 0;
        }

        mostrarSlide(slideAtual);
    }

    // Mostra o primeiro slide
    mostrarSlide(slideAtual);

    // Troca automaticamente a cada 6 segundos
    setInterval(proximoSlide, 6000);

});


// LISTA DE FUNDOS
const fundos = [
    "videos/fundo.mp4",
    "videos/anime.mp4",
    "videos/homemsentado.mp4"
];

function mudarFundo(index){

    const video = document.querySelector(".bg-video");
    const overlay = document.querySelector(".overlay");

    // começa a desaparecer
    video.style.opacity = 0;

    setTimeout(() => {

        video.src = fundos[index];
        video.load();

        video.oncanplay = () => {
            // aparece de novo
            video.style.opacity = 1;
        };

    }, 250);


    if(index === 1){
        overlay.style.zIndex = 0;
    } 
    else{
        overlay.style.zIndex = 1;
    }

    const botoes = document.querySelectorAll(".botao");

    botoes.forEach(botao => botao.classList.remove("ativo"));

    botoes[index].classList.add("ativo");
}
// seleciona todos os slides
const slides = document.querySelectorAll(".slide");

// variável que guarda o slide atual
let slideAtual = 0;


// função que mostra o slide
function mostrarSlide(index){

    // remove active de todos
    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    // adiciona active no atual
    slides[index].classList.add("active");
}


// função para ir para slide clicando no botão
function irParaSlide(index){
    slideAtual = index;
    mostrarSlide(slideAtual);
}


// próximo slide automático
function proximoSlide(){

    slideAtual++;

    if(slideAtual >= slides.length){
        slideAtual = 0;
    }

    mostrarSlide(slideAtual);
}


// inicia mostrando o primeiro slide
mostrarSlide(slideAtual);


// muda slide a cada 4 segundos
setInterval(proximoSlide, 4000);
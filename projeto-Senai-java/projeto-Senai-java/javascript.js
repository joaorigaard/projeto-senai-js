// Espera todo o HTML carregar antes de executar o JavaScript
document.addEventListener("DOMContentLoaded", function () {

    // ================================
    // SLIDER AUTOMÁTICO
    // ================================

    // Seleciona todos os elementos com classe "slide"
    const slides = document.querySelectorAll(".slide");

    // Guarda qual slide está ativo
    let slideAtual = 0;

    // Função que mostra um slide específico
    function mostrarSlide(index) {

        // remove a classe active de todos os slides
        slides.forEach(s => s.classList.remove("active"));

        // adiciona a classe active no slide selecionado
        slides[index].classList.add("active");
    }

    // Permite trocar slide manualmente pelo HTML
    window.irParaSlide = function (index) {
        slideAtual = index;
        mostrarSlide(slideAtual);
    };

    // Vai para o próximo slide
    function proximoSlide() {

        // aumenta o índice e volta ao início quando chegar no final
        slideAtual = (slideAtual + 1) % slides.length;

        mostrarSlide(slideAtual);
    }

    // mostra o primeiro slide
    mostrarSlide(slideAtual);

    // troca de slide automaticamente a cada 6 segundos
    setInterval(proximoSlide, 6000);


    // ================================
    // EFEITO DOCK (animação nos personagens)
    // ================================

    // pega todos os labels dos personagens
    const labels = Array.from(document.querySelectorAll(".imagens label"));

    // pega todas as imagens dentro dos labels
    const imgs = labels.map(l => l.querySelector("img"));

    // define escala das imagens dependendo da distância do mouse
    const SCALE_MAP = [1.50, 1.18, 1.0];

    function getScale(dist) {
        return SCALE_MAP[Math.min(dist, SCALE_MAP.length - 1)];
    }

    // guarda animações atuais
    let dockAnimations = [];

    // anima quando o mouse passa sobre um personagem
    function animateDock(hoveredIndex) {

        // pausa animações antigas
        dockAnimations.forEach(a => a.pause());
        dockAnimations = [];

        imgs.forEach((img, j) => {

            // cria animação com anime.js
            const anim = anime({
                targets: img,
                scale: getScale(Math.abs(hoveredIndex - j)), // aumenta imagem próxima
                duration: 420,
                easing: "cubicBezier(0.34, 1.40, 0.64, 1)"
            });

            dockAnimations.push(anim);
        });
    }

    // volta as imagens ao tamanho normal
    function resetDock() {

        dockAnimations.forEach(a => a.pause());
        dockAnimations = [];

        dockAnimations.push(anime({
            targets: imgs,
            scale: 1,
            duration: 480,
            easing: "cubicBezier(0.25, 0.46, 0.45, 0.94)"
        }));
    }

    // adiciona eventos de mouse nos personagens
    labels.forEach((label, i) => {
        label.addEventListener("mouseenter", () => animateDock(i));
        label.addEventListener("mouseleave", resetDock);
    });


    // ================================
    // ANIMAÇÃO DO SLIDER AO ENTRAR NA TELA
    // ================================

    // seleciona o slider
    const sliderEl = document.querySelector(".slider");

    if (!sliderEl) return;

    // estado inicial do slider (pequeno e desfocado)
    anime.set(sliderEl, { scale: 0.55 });
    sliderEl.style.opacity = "0.35";
    sliderEl.style.filter = "blur(6px) brightness(0.5)";
    sliderEl.style.boxShadow = "none";

    let jaAnimou = false;

    let animEntrada = null;
    let animSaida = null;

    // observa quando o slider entra na tela
    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                // quando o slider aparece na tela
                if (entry.isIntersecting && !jaAnimou) {

                    jaAnimou = true;

                    if (animSaida) animSaida.pause();

                    // animação de entrada
                    animEntrada = anime({
                        targets: sliderEl,
                        scale: [0.55, 1.12, 1.40],
                        opacity: [0.35, 1],
                        duration: 1400,
                        easing: "easeOutElastic(1, 0.5)"
                    });

                    // anima blur e brilho
                    anime({
                        targets: sliderEl,
                        duration: 750,
                        easing: "easeOutQuart",

                        update: function(anim) {

                            const p = anim.progress / 100;

                            const blur = (1 - p) * 6;
                            const brightness = 0.5 + p * 0.5;

                            sliderEl.style.filter =
                                `blur(${blur.toFixed(1)}px) brightness(${brightness.toFixed(2)})`;
                        }
                    });

                }

                // quando o slider sai da tela
                else if (!entry.isIntersecting && jaAnimou) {

                    jaAnimou = false;

                    if (animEntrada) animEntrada.pause();

                    // animação voltando ao estado inicial
                    animSaida = anime({
                        targets: sliderEl,
                        scale: 0.55,
                        opacity: 0.35,
                        duration: 600,
                        easing: "easeInQuart"
                    });
                }
            });

        },
        { threshold: 0.35 } // porcentagem que precisa aparecer na tela
    );

    observer.observe(sliderEl);

});


// ================================
// TROCA DE VÍDEO DE FUNDO
// ================================

// lista de vídeos disponíveis
const fundos = [
    "videos/fundo.mp4",
    "videos/anime.mp4",
    "videos/homemsentado.mp4"
];

// função para trocar o vídeo do fundo
function mudarFundo(index) {

    const video = document.querySelector(".bg-video");
    const overlay = document.querySelector(".overlay");

    // diminui opacidade para fazer transição
    video.style.opacity = 0;

    setTimeout(() => {

        // troca o vídeo
        video.src = fundos[index];

        video.load();

        // quando o vídeo estiver pronto ele aparece novamente
        video.oncanplay = () => {
            video.style.opacity = 1;
        };

    }, 250);

    // controla o overlay dependendo do vídeo
    overlay.style.zIndex = index === 1 ? 0 : 1;

    // atualiza botão ativo
    const botoes = document.querySelectorAll(".botao");

    botoes.forEach(b => b.classList.remove("ativo"));

    botoes[index].classList.add("ativo");
}
// Aqui futuramente entrarão as lógicas de interatividade (menu mobile, animações de scroll, etc)
document.addEventListener("DOMContentLoaded", () => {
    console.log("CoreTec - Scripts carregados.");

    // ==========================================
    // INTERCEPTAÇÃO E ENVIO DO FORMULÁRIO (AJAX)
    // ==========================================
    const contactForm = document.querySelector("#contato .contact-form");
    
    if (contactForm) {
        contactForm.addEventListener("submit", async function(e) {
            e.preventDefault(); // Impede o redirecionamento padrão da página
            
            const btnSubmit = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = btnSubmit.innerHTML;
            const originalBtnBg = btnSubmit.style.background;
            
            // Feedback visual: estado de "carregando"
            btnSubmit.innerHTML = "Enviando...";
            btnSubmit.style.pointerEvents = "none"; // Evita duplo clique
            
            const formData = new FormData(contactForm);
            
            try {
                // Envia os dados para a URL especificada no 'action' do form
                const response = await fetch(contactForm.action, {
                    method: contactForm.method,
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Sucesso: Limpa o formulário e altera a cor do botão
                    contactForm.reset();
                    btnSubmit.innerHTML = "Enviado com Sucesso! ✔️";
                    btnSubmit.style.background = "#10B981"; // Verde neon sutil
                } else {
                    // Falha relatada pelo servidor
                    btnSubmit.innerHTML = "Erro ao enviar";
                    btnSubmit.style.background = "#EF4444"; // Vermelho erro
                }
            } catch (error) {
                // Erro de conexão/rede
                console.error("Erro na requisição Fetch:", error);
                btnSubmit.innerHTML = "Erro ao enviar";
                btnSubmit.style.background = "#EF4444";
            }
            
            // Após 3 segundos, retorna o botão ao estado original
            setTimeout(() => {
                btnSubmit.innerHTML = originalBtnText;
                btnSubmit.style.background = originalBtnBg; // Restaura o background original (via CSS)
                btnSubmit.style.pointerEvents = "auto";
            }, 3000);
        });
    }

    // ==========================================
    // SCROLL REVEAL (INTERSECTION OBSERVER)
    // ==========================================
    const observerOptions = {
        root: null,
        // O valor negativo no bottom (-20%) cria uma "margem morta" no fundo da tela.
        // Isso força o elemento a perder a classe (sumir) antes de encostar no final da tela ao rolar para cima.
        rootMargin: "0px 0px -20% 0px", 
        threshold: 0.15 // Dispara quando 15% do elemento estiver dentro da área útil
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Adiciona a classe quando o elemento entra na tela
                entry.target.classList.add('show-scroll');
            } else {
                // Remove a classe quando o elemento sai da tela (animação repetível)
                entry.target.classList.remove('show-scroll');
            }
        });
    }, observerOptions);

    // Seleciona todos os elementos que devem ser animados e pede para o observer monitorar
    const hiddenElements = document.querySelectorAll('.hidden-scroll, .hidden-left, .hidden-right');
    hiddenElements.forEach((el) => scrollObserver.observe(el));
});

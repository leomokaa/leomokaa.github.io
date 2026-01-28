// menu no celular
const botaoMenu = document.querySelector('.botao-menu');
const menuNav = document.querySelector('.menu-navegacao');
if (botaoMenu && menuNav) {
  botaoMenu.addEventListener('click', () => {
    menuNav.classList.toggle('menu-ativo');
  });
}

// botão voltar ao topo
const botaoTopo = document.querySelector('.botao-topo');
if (botaoTopo) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      botaoTopo.style.display = 'block';
    } else {
      botaoTopo.style.display = 'none';
    }
  });
  botaoTopo.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// carregar posts do blog
const listaPosts = document.querySelector('#container-posts');
const conteudoCompleto = document.querySelector('#post-completo');
const imagemPost = document.querySelector('#imagem-post-completo');
const textoPost = document.querySelector('#conteudo-post-completo');
const botoesLeiaMais = document.querySelectorAll('.leia-mais');
const botaoVoltar = document.querySelector('.voltar-posts');

if (botoesLeiaMais) {
  botoesLeiaMais.forEach(botao => {
    botao.addEventListener('click', () => {
      const cartao = botao.closest('.cartao-post');
      const arquivo = cartao.getAttribute('data-post-file');
      const imagemSrc = cartao.querySelector('.imagem-post').src;
      const imagemAlt = cartao.querySelector('.imagem-post').alt;
      const titulo = cartao.querySelector('h3').textContent;
      const data = cartao.querySelector('.data-post').textContent;

      fetch(arquivo)
        .then(resposta => {
          if (!resposta.ok) {
            throw new Error('erro ao carregar o post');
          }
          return resposta.text();
        })
        .then(texto => {
          const conteudo = marked.parse(texto);
          textoPost.innerHTML = `<h3>${titulo}</h3><p class="data-post">${data}</p>${conteudo}`;
          imagemPost.src = imagemSrc;
          imagemPost.alt = imagemAlt;
          imagemPost.style.display = 'block';
          listaPosts.style.display = 'none';
          conteudoCompleto.style.display = 'block';
        })
        .catch(erro => {
          textoPost.innerHTML = '<p>ops, algo deu errado ao carregar o post!</p>';
          console.log(erro);
        });
    });
  });
}

if (botaoVoltar) {
  botaoVoltar.addEventListener('click', () => {
    conteudoCompleto.style.display = 'none';
    listaPosts.style.display = 'block';
    imagemPost.style.display = 'none';
    textoPost.innerHTML = '';
  });
}

// bloquear botao direito e inspeção 

document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

document.addEventListener('keydown', function(e) {
    if (e.keyCode == 122 || e.keyCode == 116) {
        e.preventDefault();
        e.stopPropagation();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && (e.shiftKey && e.key === 'I' || e.key === 'C')) {
        e.preventDefault();
    }
});
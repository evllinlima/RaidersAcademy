const disciplines = [
    {
      title: "Introdução à Programação",
      description: "Fundamentos de lógica de programação e algoritmos. Este curso oferece uma base sólida para iniciantes na área de desenvolvimento de software.",
      syllabus: [
        "Variáveis e tipos de dados",
        "Estruturas de controle",
        "Funções e procedimentos",
        "Estruturas de dados básicas",
        "Introdução à orientação a objetos"
      ]
    },
    {
      title: "Banco de Dados",
      description: "Conceitos e práticas de gerenciamento de dados. Aprenda a modelar, criar e manipular bancos de dados eficientemente.",
      syllabus: [
        "Modelagem de dados",
        "SQL básico e avançado",
        "Normalização",
        "Sistemas de Gerenciamento de Banco de Dados",
        "Otimização de consultas"
      ]
    },
    {
      title: "Desenvolvimento Web Front-end",
      description: "Aprenda a criar interfaces web interativas e responsivas utilizando as tecnologias mais recentes.",
      syllabus: [
        "HTML5 e semântica",
        "CSS3 e layouts responsivos",
        "JavaScript e manipulação do DOM",
        "Frameworks modernos (React, Vue ou Angular)",
        "Otimização de performance"
      ]
    },
    {
      title: "Inteligência Artificial e Machine Learning",
      description: "Explore os fundamentos e aplicações práticas de IA e aprendizado de máquina.",
      syllabus: [
        "Fundamentos de IA",
        "Algoritmos de Machine Learning",
        "Redes Neurais e Deep Learning",
        "Processamento de Linguagem Natural",
        "Visão Computacional"
      ]
    },
    {
      title: "Segurança da Informação",
      description: "Aprenda a proteger sistemas e dados contra ameaças cibernéticas modernas.",
      syllabus: [
        "Princípios de criptografia",
        "Segurança de redes",
        "Ética hacker e testes de penetração",
        "Gestão de riscos cibernéticos",
        "Conformidade e regulamentações"
      ]
    }
  ];

  function createDisciplineBlocks() {
    const container = document.querySelector('.discipline-container');
    disciplines.forEach(discipline => {
      const block = document.createElement('div');
      block.className = 'discipline-block';
      block.innerHTML = `
        <a href="/forumPerguntas?disciplina=${encodeURIComponent(discipline.title)}" class="discipline-title-link">
          <h2 class="discipline-title">${discipline.title}</h2>
        </a>
        <div class="discipline-content">
          <p class="discipline-description">${discipline.description}</p>
          <div class="syllabus">
            ${discipline.syllabus.map(item => `<div class="syllabus-item">${item}</div>`).join('')}
          </div>
        </div>
      `;
      const content = block.querySelector('.discipline-content');
      content.addEventListener('click', () => {
        block.querySelector('.syllabus').classList.toggle('show-syllabus');
      });
      container.appendChild(block);
    });
  }
  



  window.addEventListener('load', createDisciplineBlocks);
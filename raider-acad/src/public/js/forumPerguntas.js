const topics = [
    {
        title: "Como declarar variáveis em Python?",
        author: "João Silva",
        date: "2023-06-10",
        content: "Olá pessoal! Sou novo em programação e estou com dúvidas sobre como declarar variáveis em Python. Alguém pode me ajudar?",
        tags: ["python", "variáveis", "iniciante"],
        replies: 5
    },
    {
        title: "Diferença entre while e for loops",
        author: "Maria Santos",
        date: "2023-06-09",
        content: "Qual é a principal diferença entre while e for loops? Em que situações devo usar cada um?",
        tags: ["loops", "estruturas de controle"],
        replies: 3
    },
    {
        title: "Melhores práticas para nomear funções",
        author: "Pedro Oliveira",
        date: "2023-06-08",
        content: "Estou trabalhando em um projeto e queria saber quais são as melhores práticas para nomear funções. Alguma dica?",
        tags: ["funções", "boas práticas", "clean code"],
        replies: 7
    }
];

function createTopicBlocks() {
    const container = document.querySelector('.topic-list');
    topics.forEach(topic => {
        const block = document.createElement('div');
        block.className = 'topic-block';
        block.innerHTML = `
            <div class="topic-header">
                <h2 class="topic-title">
                    <a href="https://websim.creation.engine/forum/${encodeURIComponent(topic.title)}" class="topic-link">${topic.title}</a>
                </h2>
                <div class="topic-meta">
                    <span>${topic.author}</span> • 
                    <span>${topic.date}</span>
                </div>
            </div>
            <div class="topic-content">${topic.content}</div>
            <div class="topic-footer">
                <div class="topic-tags">
                    ${topic.tags.map(tag => `<span class="topic-tag">${tag}</span>`).join('')}
                </div>
                <div class="topic-replies">${topic.replies} respostas</div>
            </div>
        `;
        container.appendChild(block);
    });
}
window.addEventListener('load', createTopicBlocks);
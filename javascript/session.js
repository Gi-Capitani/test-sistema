// Função para iniciar o contador de inatividade
function iniciarContadorInatividade() {
    let tempo;

    // Função que redireciona para o login após inatividade
    function logoutPorInatividade() {
        alert("Sessão expirada por inatividade. Você será redirecionado para a página de login.");
        localStorage.removeItem('usuarioLogado');
        window.location.href = '../index.html';
    }

    // Função que reseta o temporizador
    function resetarTemporizador() {
        clearTimeout(tempo);
        tempo = setTimeout(logoutPorInatividade, 300000); // 5 minutos
    }

    // Eventos que resetam o temporizador
    window.onload = resetarTemporizador;
    document.onmousemove = resetarTemporizador;
    document.onkeypress = resetarTemporizador;
    document.ontouchstart = resetarTemporizador;
    document.onclick = resetarTemporizador;
    document.onscroll = resetarTemporizador;
}

// Função para verificar se o usuário está logado
function verificarLogin() {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    if (!usuarioLogado) {
        alert("Você não está logado. Redirecionando para a página de login.");
        window.location.href = 'index.html';
    }
}

// Executa a verificação de login e inicia o contador de inatividade
verificarLogin();
iniciarContadorInatividade();

document.getElementById('logout_btn').addEventListener('click', logout);

function logout() {
    localStorage.removeItem('usuarioLogado');
    window.location.href = "../index.html"; // Redireciona para o login
}


document.addEventListener('DOMContentLoaded', function() {
    // Event listener para abrir e fechar a sidebar
    document.getElementById('open_btn').addEventListener('click', function () {
        document.getElementById('sidebar').classList.toggle('open-sidebar');
    });

    // Event listener para abrir e fechar o menu móvel
    document.getElementById('mobile_btn').addEventListener('click', function () {
        const mobileMenu = document.getElementById('mobile_menu');
        mobileMenu.classList.toggle('open');
        
        // Aqui você pode também adicionar a lógica para garantir que o texto da descrição
        // do menu seja exibido corretamente
        //const descriptions = mobileMenu.querySelectorAll('.item-description');
       // descriptions.forEach(description => {
           // description.style.display = mobileMenu.classList.contains('open') ? 'inline-block' : 'none';
       // });
    });
});

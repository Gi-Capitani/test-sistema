async function login() {
    const usuario = document.getElementById('username').value;
    const senha = document.getElementById('password').value;

    // Validação de campos obrigatórios
    if (!usuario || !senha) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    try {
        // Realiza a requisição para o endpoint
        const response = await fetch('http://179.154.0.89:8000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ usuario, senha })
        });

       // console.log('Resposta da API:', response);


        //const responseData = await response.json(); // Lê o corpo da resposta uma vez

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('usuarioLogado', usuario);
            window.location.href = 'menu/menu.html';
            //alert(data.message);  // Mensagem de sucesso

        } else {
            const error = await response.json();
            alert(error.detail);  // Mensagem de erro amigável da API
        }
    } catch (error) {
        alert(`Erro de rede: ${error.message}`);
    }

}
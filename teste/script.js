document.addEventListener('DOMContentLoaded', () => {
    let isEditing = false;
    const formFields = document.querySelectorAll('input');
    const btnNovo = document.getElementById('btnNovo');
    const btnSalvar = document.getElementById('btnSalvar');
    const btnCancelar = document.getElementById('btnCancelar');

    // Função para desabilitar campos
    const disableFields = () => {
        formFields.forEach(field => field.disabled = true);
        document.getElementById('razaosocial').disabled = false;
        document.getElementById('codpessoa').disabled = false;
    };

    // Função para habilitar campos
    const enableFields = () => {
        formFields.forEach(field => field.disabled = false);
        document.getElementById('codpessoa').disabled = true;
    };

    // Função para limpar os campos
    const clearFields = () => {
        formFields.forEach(field => field.value = '');
    };

    // Função Novo
    window.novo = () => {
        clearFields();
        enableFields();
        btnNovo.disabled = true;
        btnSalvar.disabled = false;
        btnCancelar.disabled = false;
        isEditing = true;
    };

    // Função Cancelar
    window.cancelar = () => {
        if (confirm('Tem certeza que deseja cancelar?')) {
            clearFields();
            disableFields();
            btnNovo.disabled = false;
            btnSalvar.disabled = true;
            btnCancelar.disabled = true;
        }
    };

    // Função Salvar
    window.salvar = async () => {
        if (confirm('Deseja salvar as informações?')) {
            const formData = new FormData(document.getElementById('form'));
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            const response = await fetch('/api/pessoa', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert('Informações salvas com sucesso!');
                clearFields();
                disableFields();
                btnNovo.disabled = false;
                btnSalvar.disabled = true;
                btnCancelar.disabled = true;
            } else {
                alert('Erro ao salvar as informações.');
            }
        }
    };

    // Função para buscar pessoa por código
    document.getElementById('codpessoa').addEventListener('blur', async (event) => {
        const codpessoa = event.target.value;
        if (codpessoa) {
            const response = await fetch(`/api/pessoa/${codpessoa}`);
            if (response.ok) {
                const pessoa = await response.json();
                preencherCampos(pessoa);
            } else {
                alert('Código não encontrado.');
            }
        }
    });

    // Função para preencher campos com dados da API
    const preencherCampos = (pessoa) => {
        for (let field in pessoa) {
            const input = document.querySelector(`[name="${field}"]`);
            if (input) {
                input.value = pessoa[field];
            }
        }
        btnNovo.disabled = false;
        btnSalvar.disabled = true;
        btnCancelar.disabled = false;
    };

    // Função de busca por Razão Social
    document.getElementById('razaosocial').addEventListener('input', async (event) => {
        const razaoSocial = event.target.value;
        if (razaoSocial.length >= 3) {
            const response = await fetch(`/api/pessoa/search?razaosocial=${razaoSocial}`);
            const pessoas = await response.json();
            mostrarResultadosBusca(pessoas);
        } else {
            document.getElementById('searchResults').innerHTML = '';
        }
    });

    // Exibe os resultados da busca
    const mostrarResultadosBusca = (pessoas) => {
        const searchResults = document.getElementById('searchResults');
        searchResults.innerHTML = '';
        pessoas.forEach(pessoa => {
            const div = document.createElement('div');
            div.textContent = pessoa.razaosocial;
            div.onclick = () => preencherCampos(pessoa);
            searchResults.appendChild(div);
        });
    };

    // Inicializa os campos
    disableFields();
});

// Função para buscar pessoas por nome (mínimo de 3 caracteres)
document.getElementById('detail-razaosocial').addEventListener('input', buscarPessoas);

function buscarPessoas() {
    const nome = document.getElementById('detail-razaosocial').value;

    if (nome.length >= 3) {
        fetch(`http://179.154.0.89:8000/pessoas/buscar/${nome}`)
            .then(response => response.json())
            .then(pessoas => {
                console.log('Pessoas encontradas:', pessoas);
                displaySearchResults(pessoas);
            })
            .catch(error => console.error('Erro ao buscar pessoas:', error));
    } else {
        document.getElementById('search-results').innerHTML = '';
    }
}

function displaySearchResults(pessoas) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '';

    if (pessoas.length === 0) {
        resultsContainer.innerHTML = '<li>Nenhuma pessoa encontrada</li>';
        resultsContainer.style.display = 'none';  // Oculta a lista se não houver resultados
        return;
    }
    resultsContainer.style.display = 'block';
    pessoas.forEach(pessoa => {
        const listItem = document.createElement('li');
        listItem.textContent = `Codigo: ${pessoa.codpessoa} | CNPJ/CPF:${pessoa.cnpjcpf} | Razão Social: ${pessoa.razaosocial} | Nome Fantasia: ${pessoa.nomefantasia} | Cidade: ${pessoa.cidade};`;
        listItem.style.cursor = 'pointer'; // Adiciona o cursor de ponteiro

        // ✅ Adicionando evento de clique no item da lista
        listItem.addEventListener('click', () => selecionarPessoa(pessoa));

        resultsContainer.appendChild(listItem);
    });

    // ✅ Adicionando um estilo temporário para visualizar melhor a lista
    resultsContainer.style.border = '0px solid #ccc';
    resultsContainer.style.backgroundColor = '#f9f9f9';
    resultsContainer.style.padding = '1px';
}

function selecionarPessoa(pessoa) {
    // Preenche os campos do formulário com os dados da pessoa selecionada
    document.getElementById('detail-codpessoa').value = pessoa.codpessoa;
    
    fetchPessoaByCodpessoa();


    /*document.getElementById('detail-razaosocial').value = pessoa.razaosocial;
    document.getElementById('detail-nomefantasia').value = pessoa.nomefantasia;
    document.getElementById('detail-cnpjcpf').value = pessoa.cnpjcpf;
    document.getElementById('detail-inscricaoestadual').value = pessoa.inscricaoestadual;
    document.getElementById('detail-logradouro').value = pessoa.logradouro;
    document.getElementById('detail-bairro').value = pessoa.bairro;
    document.getElementById('detail-complemento').value = pessoa.complemento;
    document.getElementById('detail-numero').value = pessoa.numero;
    document.getElementById('detail-cep').value = pessoa.cep;
    document.getElementById('detail-cidade').value = pessoa.codcidade;
    document.getElementById('detail-uf').value = pessoa.uf;
    document.getElementById('detail-pais').value = pessoa.pais;
    document.getElementById('detail-telefone').value = pessoa.telefone;
    document.getElementById('detail-appmensagem').value = pessoa.appmensagem;
    document.getElementById('detail-email').value = pessoa.email;
    document.getElementById('detail-categoria').value = pessoa.codigocat; */

     //Limpa os resultados da busca
    document.getElementById('search-results').innerHTML = '';
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
        const descriptions = mobileMenu.querySelectorAll('.item-description');
        descriptions.forEach(description => {
            description.style.display = mobileMenu.classList.contains('open') ? 'inline-block' : 'none';
        });
    });
});

async function fetchPessoas() {
    const response = await fetch('http://179.154.0.89:8000/pessoas');
    const data = await response.json();
    const table = document.querySelector("#pessoas-table tbody");
    table.innerHTML = "";
    data.pessoas.forEach(pessoa => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${pessoa[0]}</td>
            <td>${pessoa[1]}</td>
            <td>${pessoa[2]}</td>
            <td>${pessoa[3]}</td>
            <td>${pessoa[4]}</td>
            <td>${pessoa[5]}</td>
            <td>${pessoa[6]}</td>
            <td>${pessoa[7]}</td>
            <td>${pessoa[8]}</td>
            <td>${pessoa[9]}</td>
            <td>${pessoa[10]}</td>
            <td>${pessoa[11]}</td>
            <td>${pessoa[12]}</td>
        `;
        table.appendChild(row);
    });
}

async function fetchPessoaByCodpessoa() {
    const codpessoa = document.getElementById('detail-codpessoa').value;
    const response = await fetch(`http://179.154.0.89:8000/pessoas/${codpessoa}`);
    const data = await response.json();
    if (data.pessoa) {
        displayPessoaDetail(data.pessoa);
    } else {
        alert('Pessoa não encontrada!');
    }
}

function displayPessoaDetail(pessoa) {
    document.getElementById('detail-codpessoa').value = pessoa[0];
    document.getElementById('detail-razaosocial').value = pessoa[1];
    document.getElementById('detail-nomefantasia').value = pessoa[2];
    document.getElementById('detail-cnpjcpf').value = pessoa[3];
    document.getElementById('detail-inscricaoestadual').value = pessoa[4];
    document.getElementById('detail-logradouro').value = pessoa[5];
    document.getElementById('detail-bairro').value = pessoa[6];
    document.getElementById('detail-complemento').value = pessoa[7];
    document.getElementById('detail-numero').value = pessoa[8];
    document.getElementById('detail-cep').value = pessoa[9];
    document.getElementById('detail-cidade').value = pessoa[10];
    document.getElementById('detail-uf').value = pessoa[11];
    document.getElementById('detail-pais').value = pessoa[12];
    document.getElementById('detail-telefone').value = pessoa[13];
    document.getElementById('detail-appmensagem').value = pessoa[14];
    document.getElementById('detail-email').value = pessoa[15];
    document.getElementById('detail-categoria').value = pessoa[16];
}

async function updatePessoa() {
    const codpessoa = document.getElementById('detail-codpessoa').value;
    const pessoa = {
        razaosocial: document.getElementById('detail-razaosocial').value,
        nomefantasia: document.getElementById('detail-nomefantasia').value,
        cnpjcpf: document.getElementById('detail-cnpjcpf').value,
        inscricaoestadual: document.getElementById('detail-inscricaoestadual').value,
        logradouro: document.getElementById('detail-logradouro').value,
        bairro: document.getElementById('detail-bairro').value,
        complemento: document.getElementById('detail-complemento').value,
        numero: document.getElementById('detail-numero').value,
        cep: document.getElementById('detail-cep').value,
        codcidade: document.getElementById('detail-cidade').value,
        uf: document.getElementById('detail-uf').value,
        pais: document.getElementById('detail-pais').value,
        telefone: document.getElementById('detail-telefone').value,
        appmensagem: document.getElementById('detail-appmensagem').value,
        email: document.getElementById('detail-email').value,
        codigocat: document.getElementById('detail-categoria').value
    };

    const response = await fetch(`http://179.154.0.89:8000/pessoas/${codpessoa}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pessoa)
    });
    const data = await response.json();
    alert(data.message);
}

async function insertPessoa() {
    const pessoa = {
        razaosocial: document.getElementById('detail-razaosocial').value,
        nomefantasia: document.getElementById('detail-nomefantasia').value,
        cnpjcpf: document.getElementById('detail-cnpjcpf').value,
        inscricaoestadual: document.getElementById('detail-inscricaoestadual').value,
        logradouro: document.getElementById('detail-logradouro').value,
        bairro: document.getElementById('detail-bairro').value,
        complemento: document.getElementById('detail-complemento').value,
        numero: document.getElementById('detail-numero').value,
        cep: document.getElementById('detail-cep').value,
        codcidade: document.getElementById('detail-cidade').value,
        uf: document.getElementById('detail-uf').value,
        pais: document.getElementById('detail-pais').value,
        telefone: document.getElementById('detail-telefone').value,
        appmensagem: document.getElementById('detail-appmensagem').value,
        email: document.getElementById('detail-email').value,
        codigocat: document.getElementById('detail-categoria').value
    };

    const response = await fetch(`http://179.154.0.89:8000/pessoas`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pessoa)
    });
    const data = await response.json();
    alert(data.message);
}

async function deletePessoa() {
    const codpessoa = document.getElementById('detail-codpessoa').value;

    const response = await fetch(`http://179.154.0.89:8000/pessoas/${codpessoa}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (response.ok) {
        const data = await response.json();
        alert(data.message);
    } else {
        alert("Erro ao excluir pessoa");
    }
}


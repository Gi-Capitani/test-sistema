// Função para buscar produto por nome (mínimo de 3 caracteres)
document.getElementById('detail-produto').addEventListener('input', buscarProdutos);

function buscarProdutos() {
    const produto = document.getElementById('detail-produto').value;

    if (produto.length >= 3) {
        fetch(`http://179.154.0.89:8000/produtos/buscar/${produto}`)
            .then(response => response.json())
            .then(produtos => {
                console.log('Produtos encontrados:', produtos);
                displaySearchResults(produtos);
            })
            .catch(error => console.error('Erro ao buscar produtos:', error));
    } else {
        document.getElementById('search-results').innerHTML = '';
    }
}

function displaySearchResults(produtos) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '';

    if (produtos.length === 0) {
        resultsContainer.innerHTML = '<li>Nenhum produto encontrado</li>';
        resultsContainer.style.display = 'none';  // Oculta a lista se não houver resultados
        return;
    }
    resultsContainer.style.display = 'block';
    produtos.forEach(produto => {
        const listItem = document.createElement('li');
        listItem.textContent = `Codigo: ${produto.codproduto} | Produto:${produto.produto};`;
        listItem.style.cursor = 'pointer'; // Adiciona o cursor de ponteiro

        // ✅ Adicionando evento de clique no item da lista
        listItem.addEventListener('click', () => selecionarProduto(produto));

        resultsContainer.appendChild(listItem);
    });

    // ✅ Adicionando um estilo temporário para visualizar melhor a lista
    resultsContainer.style.border = '0px solid #ccc';
    resultsContainer.style.backgroundColor = '#f9f9f9';
    resultsContainer.style.padding = '1px';
}

function selecionarProduto(produto) {
    // Preenche os campos do formulário com os dados da pessoa selecionada
    document.getElementById('detail-codproduto').value = produto.codproduto;
    
    fetchProdutoByCodProduto();


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

async function fetchProdutoByCodProduto() {
    const codproduto = document.getElementById('detail-codproduto').value;
    const response = await fetch(`http://179.154.0.89:8000/produtos/${codproduto}`);
    const data = await response.json();
    if (data.produto) {
        displayProdutoDetail(data.produto);
    } else {
        alert('Produto não encontrado!');
    }
}

function displayProdutoDetail(produto) {
    document.getElementById('detail-codproduto').value = produto[0];
    document.getElementById('detail-produto').value = produto[1];
    document.getElementById('detail-categoria').value = produto[2];
    document.getElementById('detail-unidademedida').value = produto[3];
    document.getElementById('detail-similar').value = produto[4];
    var similar = document.getElementById('detail-similar');
    if (produto[4] == "SIM" || produto[4] == "sim") {
        similar.value = "sim";
    } else {
        similar.value = "nao";
    }

    document.getElementById('detail-ativo').value = produto[5];
    var ativo = document.getElementById('detail-ativo');
    if (produto[5] == "SIM" || produto[5] == "sim") {
        ativo.value = "sim";
    } else {
        ativo.value = "nao";
    }
    
}

async function updateProduto() {
    const codpessoa = document.getElementById('detail-codproduto').value;
    const pessoa = {
        razaosocial: document.getElementById('detail-produto').value,
        nomefantasia: document.getElementById('detail-categoria').value,
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


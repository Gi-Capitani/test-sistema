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

async function fetchembunids() {
    const response = await fetch('http://192.168.0.9:8000/embunids');
    const data = await response.json();
    const table = document.querySelector("#embunids-table tbody");
    table.innerHTML = "";
    data.embunids.forEach(embunid => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${embunid[0]}</td>
            <td>${embunid[1]}</td>
            <td>${embunid[2]}</td>
            <td>${embunid[3]}</td>
            <td>${embunid[4]}</td>
            <td>${embunid[5]}</td>
            <td>${embunid[6]}</td>
            <td>${embunid[7]}</td>
            <td>${embunid[8]}</td>
            <td>${embunid[9]}</td>
            <td>${embunid[10]}</td>
            <td>${embunid[11]}</td>
            <td>${embunid[12]}</td>
        `;
        table.appendChild(row);
    });
}

async function fetchembunidByCodembunid() {
    const codembunid = document.getElementById('codembunid').value;
    const response = await fetch(`http://192.168.0.9:8000/embunids/${codembunid}`);
    const data = await response.json();
    if (data.embunid) {
        displayembunidDetail(data.embunid);
    } else {
        alert('embunid não encontrado!');
    }
}

function displayembunidDetail(embunid) {
    document.getElementById('detail-codembunid').value = embunid[0];
    document.getElementById('detail-embunid').value = embunid[1];
    document.getElementById('detail-descricao').value = embunid[2];
    document.getElementById('detail-ativo').value = embunid[3];
   }

async function updateEmbunid() {
    const codembunid = document.getElementById('detail-codembunid').value;
    ativo = document.getElementById('detail-ativo').value;
     if (ativo == "SIM") {ativo = 1} else {ativo = 0};
    

    const embunid1 = {
        embunid: document.getElementById('detail-embunid').value,
        descricao: document.getElementById('detail-descricao').value,
         ativo,
               
    };

    

    const response = await fetch(`http://192.168.0.9:8000/embunids/${codembunid}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(embunid1)
    });
    const data = await response.json();
    alert(data.message);
}

async function insertEmbunid() {

    ativo = document.getElementById('detail-ativo').value;
     if (ativo == "SIM") {ativo = 1} else {ativo = 0};
    const embunid = {
        embunid: document.getElementById('detail-embunid').value,
        descricao: document.getElementById('detail-descricao').value,
        ativo,
        };

    const response = await fetch(`http://192.168.0.9:8000/embunids`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(embunid)
    });
    const data = await response.json();
    alert(data.message);
}

async function deleteEmbunid() {
    const codembunid = document.getElementById('detail-codembunid').value;

    const response = await fetch(`http://192.168.0.9:8000/embunids/${codembunid}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (response.ok) {
        const data = await response.json();
        alert(data.message);
    } else {
        alert("Erro ao excluir embunid");
    }
}


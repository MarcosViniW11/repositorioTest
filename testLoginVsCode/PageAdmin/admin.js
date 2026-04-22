const API="http://localhost:8080/admin";


function authfetch(url,options={}){
    const token = localStorage.getItem("token")

    if(token === ""){alert("Token não Encontrado!"); return;}

    return fetch(url,{
        ...options,
        headers:{"Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
}

async function listar(){
    const res = await authfetch(`${API}/usuarios`)

    if(!res.ok){alert("Ocorreu um erro!")}

    const lista = await res.json();

    let table="<table><tr><th>ID</th><th>Email</th><th>Ação</th></tr>";
    
    lista.forEach(user => {
        if(user.email==="admin@admin.com") {
            table+=`
        <tr>
            <td>${user.id}</td>
            <td>${user.email}</td>
            <td></td>
        </tr>
        `
        }else{
            table+=`
        <tr>
            <td>${user.id}</td>
            <td>${user.email}</td>
            <td>
                <button type="button" onclick="deletarUser(${user.id})">Deletar</button>
            </td>
        </tr>
        `
        }
    })

    table+="</table>"

    document.getElementById("users").innerHTML=table;
}

async function deletarUser(id) {

    if(!confirm("Deseja Realmende Deletar O Usuario Selecionado??")){alert("Nenhuma usuario foi deletado!"); return;}

    const res = await authfetch(`${API}/remover/${id}`,{method:"DELETE"});

    if(!res.ok){alert("Ocorreu um erro ao Deletar O usuario Selecionado!"); return;}

    alert("Usuario Deletado Com Sucesso!");
    listar();
    
}

const API="http://localhost:8080/users"

function authfetch(url,options={}){

    const token = window.localStorage.getItem("token");

    if(token===""){alert("Token não Encontrado!"); return;}

    return fetch(url,{
        ...options,
        headers:{"Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
}


async function informacoes() {
    const res= await authfetch(`${API}/me`)

    if(!res.ok) { alert("Ocorreu um erro ao Buscar Pelas suas informações") }

    let user = await res.json()

    let table = `<table><tr><th>ID</th><th>Email</th><th>ações</th></tr>
        <tr>
            <td>${user.id}</td>
            <td>${user.email}</td>
            <td>
                <button type="button" onclick="AtulizarSenha()">Atualizar Senha</button>
                <button type="button" onclick="DeletarConta()">Deletar Conta</button>
            </td>
        </tr>
    </table>`

    document.getElementById("infUser").innerHTML=table;
}

function AtulizarSenha(){
    let form = `
        <div class="update-password-form">
            <h3>Atualizar Senha</h3>
            
            <label>Senha Atual:</label>
            <div class="password-container">
                <input type="password" id="senhaAtual">
                <button type="button" class="toggleBtn" onclick="togglePass('senhaAtual', 'eye1')">
                    <span id="eye1">👁️</span>
                </button>
            </div>

            <label>Nova Senha:</label>
            <div class="password-container">
                <input type="password" id="novaSenha">
                <button type="button" class="toggleBtn" onclick="togglePass('novaSenha', 'eye2')">
                    <span id="eye2">👁️</span>
                </button>
            </div>

            <button type="button" class="btn-update" onclick="atualizar()">Confirmar Atualização</button>
            <button type="button" class="btn-cancel" onclick="informacoes()">Cancelar</button>
        </div>`;
    
    document.getElementById("infUser").innerHTML = form;             
}

async function atualizar() {
    
    const atualizarSenha={
        senhaAtual:document.getElementById("senhaAtual").value,
        novaSenha:document.getElementById("novaSenha").value
    }

    const res = await authfetch(`${API}/atualizar-senha`,{body:JSON.stringify(atualizarSenha),method:"PUT"});

    if(res.status==400){
        js=await res.json();

        mensagem=js.message;
        alert("MENSAGEM DE ERROR: "+ mensagem);
        return
    }

    if(!res.ok){alert("Ocorreu um erro ao Atualizar a senha de Usuario!"); return;}

    alert("SENHA ATUALIZADA COM SUCESSO, Retornando para pagina de Login!")
    document.getElementById("infUser").innerHTML="";
    window.location.href="../Login/login.html"   
}

async function DeletarConta(){
    if(!confirm("Deseja Deletar Sua Conta??")){alert("Conta NÃO deletada!"); return;}

    const res = await authfetch(`${API}/me`,{method:"DELETE"});

    if(!res.status==204){alert("Ocorreu um erro ao Deletar Sua conta!"); return;}

    alert("Conta Deletada Com Sucesso, Redimencionando Para Pagina De Cadastro")
    window.location.href="../Cadastro/cadastro.html";
}

function togglePass(inputId, eyeId) {
    const input = document.getElementById(inputId);
    const eye = document.getElementById(eyeId);

    if (input.type === "password") {
        input.type = "text";
        eye.textContent = "🙈";
    } else {
        input.type = "password";
        eye.textContent = "👁️";
    }
}

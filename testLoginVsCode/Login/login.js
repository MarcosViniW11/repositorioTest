const API="http://localhost:8080/users/logar"


document.getElementById("loginId").addEventListener("submit", async (pagina) => {
    pagina.preventDefault();

    const login={
        email:document.getElementById("emailId").value,
        senha:document.getElementById("senhaId").value
    }

    if(login.email === "" || login.senha === ""){alert("Campo(s) em Branco!"); return;};

    const res = await fetch(API,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(login)
    });

    if(res.status===400){
        js=await res.json();

        mensagem = js.message;
        alert("MENSAGEM DE ERROR: "+mensagem);
        return;
    }

    if(res.status==404){
        js=await res.json();

        mensagem = js.message;
        alert("MENSAGEM DE ERROR: "+mensagem);
        return;
    }

    if(!res.ok){alert("OCORREU UM ERRO Ao Logar, credenciais Invalidas!"); return;}

    m = await res.json();
    token = m.token
    role = m.role


    window.localStorage.setItem("token",token);

    if(role==="ADMIN"){
        alert("LOGADO COMO ADMIN, redimencionando para pagina de Admin");
        window.location.href="../PageAdmin/adminPage.html";
    }else{
        alert("Usuario Logado Com Sucesso, Redimencionando para pagina de Usuarios")
        window.location.href="../PageUser/userPage.html";
    }    
    
})

function togglePassword() {
    const passwordInput = document.getElementById("senhaId");
    const eyeIcon = document.getElementById("eyeIcon");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeIcon.textContent = "🙈"; // Ícone de "esconder"
    } else {
        passwordInput.type = "password";
        eyeIcon.textContent = "👁️"; // Ícone de "mostrar"
    }
}

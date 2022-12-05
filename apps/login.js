const formu = document.querySelector('#formu');
let botaoDeEmail = document.querySelector('#inputEmail');
let botaoDeSenha = document.querySelector('#inputSenha');
const nomeNaHome = document.querySelector('#nomeLogado');
const modalCadastro = document.querySelector('#cadastroModal')


const regNada = "";
const regEmail = /^\S+@\S+\.\S+$/;
const regSenha = /.{6,}/;
const regRG = /[0-9]{7}/;
const regCEP = /[0-9]{8}/;

function generatePattern(param) {
    if(param === "nome") return /[A-Za-z]{3}/;
    if(param === "email") return /^\S+@\S+\.\S+$/;
    if (param === "senha") return /.{6,}/;
    if (param === "confirmaSenha") return new RegExp (senhaCadastro.value);
    if (param === "rg") return /[0-9]{7}/;
    if (param === "cep") return /[0-9]{8}/;
    if(param === "numero") return /[0-9]/;
    if(param === "complemento") return /[A-Za-z]{3}/;
}
function cadastraConta(){
    const nomeCadastro = document.querySelector('#nomeCadastro');
    const emailCadastro = document.querySelector('#emailCadastro');
    const senhaCadastro = document.querySelector('#senhaCadastro');
    const confirmaSenhacadastro = document.querySelector('#confirmaSenhacadastro');
    const rgCadastro = document.querySelector('#rgCadastro');
    const cepCadastro = document.querySelector('#cepCadastro');
    const numcadastro = document.querySelector('#numcadastro');
    const complementoCadastro = document.querySelector('#complementoCadastro');
    const formCadastro = document.querySelector('#formCadastro');
    formCadastro.addEventListener('submit', function(e) {
        e.preventDefault();
    });
    const inputs = [
        {nome: 'nome', botao: nomeCadastro},
        {nome: 'email', botao: emailCadastro},
        {nome: 'senha', botao: senhaCadastro},
        {nome: 'confirmaSenha', botao: confirmaSenhacadastro},
        {nome: 'rg', botao: rgCadastro},
        {nome: 'cep', botao: cepCadastro},
        {nome: 'numero', botao: numcadastro},
        {nome: 'complemento', botao: complementoCadastro}
    ]

    let submitOK = true;
    for (let i = 0; i < inputs.length; i++) {
        if(!generatePattern(inputs[i].nome).test(inputs[i].botao.value)){
            inputs[i].botao.style.border = "2px solid red";
            submitOK = false;
        
            break
        }else{
            inputs[i].botao.style.border = "none";
            submitOK = true;
        }
    }
    console.log(submitOK)
    if(submitOK){
        modalCadastro.style.display = "flex";
        document.querySelector('body').style.opacity = '80%';
        modalCadastro.style.opacity = "100%";
    }

}
function fechaModal(){
    document.querySelector('.modalzin').style.display = 'none';
    document.querySelector('body').style.opacity = '100%';
}
const regSepara = /^[^@]*/;
function validaForm() {
    formu.addEventListener('submit', function(e) {
        e.preventDefault();
    });
    let nomeLogado = botaoDeEmail.value;
    let submitOK = false;
    if(!regEmail.test(botaoDeEmail.value)){
        botaoDeEmail.style.border = "1px solid red";
        submitOK = false;
    }else {
        botaoDeEmail.style.border = "none";
        submitOK = true;
    }
    if(!regSenha.test(botaoDeSenha.value)){
        botaoDeSenha.style.border = "1px solid red";
        submitOK = false;
    }else {
        botaoDeSenha.style.border = "none";
        submitOK = true;
    }
    submitOK ? requestAuthorization() : console.log('falhou');

    localStorage.setItem("nomeLogado", nomeLogado); 
}
nomeNaHome.innerHTML = localStorage.getItem("nomeLogado").match(regSepara);

function recuperaSenha() {
    const emailRecSenha = document.querySelector('#emailRecSenha');
    const formRecSenha = document.querySelector('#formRecSenha');
    formRecSenha.addEventListener('submit', function(e) {
        e.preventDefault();
    });
    let submitOK = false;
    if(!regEmail.test(emailRecSenha.value)){
        emailRecSenha.style.border = "1px solid red";
        submitOK = false;
    }else {
        emailRecSenha.style.border = "none";
        submitOK = true;
    }
    if(submitOK){
        modalCadastro.style.display = "flex";
        document.querySelector('body').style.opacity = '80%';
        modalCadastro.style.opacity = "100%";
    }
}
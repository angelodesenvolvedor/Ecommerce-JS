const form = document.forms.cadastro;
const mensagemErro = document.querySelector("#mensagemErro");
const mensagemStatus = document.querySelector("#mensagemStatus"); 
const {nome, celular, cpf, email, senha, confirmaSenha, numCartao, codigoSeg, dataValidade} = form;

form.addEventListener('submit', (e) => {
    e.preventDefault(); 
    validaFormulario();
});

function validaNome(){
    const regex = /^[A-ZÀ-ÿ][a-zà-ÿ]+(\s[A-ZÀ-ÿ][a-zà-ÿ]+)+$/;
    if(!regex.test(nome.value.trim())) throw new Error("Nome e Sobrenome inválidos (Ex: João da Silva)");
}

function validaCelular(){
    const regex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
    if(!regex.test(celular.value.trim())) throw new Error("Celular inválido (Ex: (11) 91234-5678)");
}

function validaCPF(){
    const regex = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/;
    if(!regex.test(cpf.value.trim())) throw new Error("CPF inválido (Ex: 123.456.789-00)");
}

function validaEmail(){
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if(!regex.test(email.value.trim())) throw new Error("Email inválido");
}

function validaSenha(){
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if(!regex.test(senha.value)) throw new Error("Senha fraca. Use 8+ caracteres, com maiúsculas, minúsculas, número e símbolo.");
}

function validaConfirmaSenha(){
    if(confirmaSenha.value !== senha.value) throw new Error("As senhas não são semelhantes");
}

function validaCartao(){
    const regex = /^\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}$/;
    if(!regex.test(numCartao.value.trim())) throw new Error("Número de cartão inválido");
}

function validaData(){
    const regex = /^(0[1-9]|1[0-2])\/?([0-9]{2}|[0-9]{4})$/;
    if(!regex.test(dataValidade.value.trim())) throw new Error("Data de validade do cartão inválida (Ex: 12/25)");
}

function validaCodigo(){
    const regex = /^\d{3,4}$/;
    if(!regex.test(codigoSeg.value.trim())) throw new Error("Código de segurança inválido");
}

function validaFormulario(){
    try {
        mensagemErro.innerHTML = "";
        mensagemStatus.innerHTML = "";

        validaNome();
        validaCelular();
        validaCPF();
        validaEmail();
        validaSenha();
        validaConfirmaSenha();
        validaCartao();
        validaCodigo();
        validaData();

        mensagemStatus.innerHTML = "<span style='color:green;'>Dados cadastrados com sucesso!</span>";

        setTimeout(() => {
            mensagemStatus.innerHTML = ""; // Limpa a mensagem de sucesso depois de 5 segundos
        }, 5000);

    } catch (erro) {
        mensagemErro.innerHTML = `<span style='color:red;'>${erro.message}</span>`;
    }
}

function aplicarMascara(input, tipo) {
    input.addEventListener("input", () => {
        let valor = input.value.replace(/\D/g, "");

        switch(tipo) {
            case "cpf":
                valor = valor.replace(/(\d{3})(\d)/, "$1.$2")
                             .replace(/(\d{3})(\d)/, "$1.$2")
                             .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
                break;
            case "celular":
                valor = valor.replace(/^(\d{2})(\d)/, "($1) $2")
                             .replace(/(\d{5})(\d{1,4})$/, "$1-$2");
                break;
            case "cartao":
                valor = valor.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
                break;
            case "validade":
                valor = valor.replace(/(\d{2})(\d)/, "$1/$2").slice(0, 5);
                break;
        }

        input.value = valor;
    });
}

const inputCPF = document.querySelector('input[name="cpf"]');
const inputCelular = document.querySelector('input[name="celular"]');
const inputCartao = document.querySelector('input[name="numCartao"]');
const inputValidade = document.querySelector('input[name="dataValidade"]');

aplicarMascara(inputCPF, "cpf");
aplicarMascara(inputCelular, "celular");
aplicarMascara(inputCartao, "cartao");
aplicarMascara(inputValidade, "validade");

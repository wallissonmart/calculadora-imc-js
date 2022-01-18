let formulario = document.querySelector('form')

let cxNome = document.querySelector('#nome')
let cxIdade = document.querySelector('#idade')
let cxPeso = document.querySelector('#peso')
let cxAltura = document.querySelector('#altura')
let cxImc = document.querySelector('#resultadoImc')

let aviso = document.querySelector('#aviso')

let btnEnviar = document.querySelector('#btnEnviar')
let btnLimpar = document.querySelector('#btnLimpar')

var inputs = $('input').on('keyup', verificarInputs);

function verificarInputs() {
    const preenchidos = inputs.get().every(({ value }) => value)
    $('button').prop('disabled', !preenchidos);
}

function Limpar() {
    aviso.textContent = "";
}

btnLimpar.addEventListener('click', function() {
        verificarInputs()
        Limpar()

}
)

btnEnviar.addEventListener('click', function (e) {
    // pegar os values de cada input
    let nome = cxNome.value
    let idade = cxIdade.value
    let peso = cxPeso.value
    let altura = cxAltura.value
    let imc = (peso / (altura * altura)).toFixed(1)

    cxImc.value = imc
    let sit = situacaoDoPeso(imc)
    aviso.textContent = sit

    // previnir o comportamento padrão
    e.preventDefault()
})

function situacaoDoPeso(imc) {
    let situacao = ''
    let nome = cxNome.value
    if (imc < 18.5) {
        situacao = `Cuidado ${nome}, você está abaixo do peso! 😕`
    } else if (imc >= 18.5 && imc <= 24.9) {
        situacao = `Parabéns ${nome}, seu peso está normal! 😎`
    } else if (imc >= 25 && imc <= 29.9) {
        situacao = `Atenção ${nome}, você está com sobrepeso! 😔`
    } else if (imc >= 30 && imc <= 34.9) {
        situacao = 'Obesidade I 😦'
    } else if (imc >= 35 && imc <= 39.9) {
        situacao = 'Obesidade II 😧'
    } else if (imc >= 40) {
        situacao = 'Obesidade III 😨'
    } else {
        situacao = 'Informe seu peso corretamente!'
    }
    return situacao
}

//jQuery

//Essa função é para verificar se o valor passado pelo input é String. Se for String não é aceito (é apagado)
function MascaraInteiro(num) {
    var er = /[^0-9/ ().-]/;
    er.lastIndex = 0;
    var campo = num;
    if (er.test(campo.value)) { ///verifica se é string, caso seja então apaga
        var texto = $(campo).val();
        $(campo).val(texto.substring(0, texto.length - 1));
        return false;
    } else {
        return true;
    }
}

//Formata de forma generica os campos (Essa é a função que realmente formata os campos, com a exceção do campo de MOEDA)
function formataCampo(campo, Mascara) {
    var boleanoMascara;

    var exp = /\-|\.|\/|\(|\)| /g
    var campoSoNumeros = campo.value.toString().replace(exp, "");
    var posicaoCampo = 0;
    var NovoValorCampo = "";
    var TamanhoMascara = campoSoNumeros.length;
    for (var i = 0; i <= TamanhoMascara; i++) {
        boleanoMascara = ((Mascara.charAt(i) == "-") || (Mascara.charAt(i) == ".") ||
            (Mascara.charAt(i) == "/"))
        boleanoMascara = boleanoMascara || ((Mascara.charAt(i) == "(") ||
            (Mascara.charAt(i) == ")") || (Mascara.charAt(i) == " "))
        if (boleanoMascara) {
            NovoValorCampo += Mascara.charAt(i);
            TamanhoMascara++;
        } else {
            NovoValorCampo += campoSoNumeros.charAt(posicaoCampo);
            posicaoCampo++;
        }
    }
    campo.value = NovoValorCampo;
    ////LIMITAR TAMANHO DE CARACTERES NO CAMPO DE ACORDO COM A MASCARA//
    if (campo.value.length > Mascara.length) {
        var texto = $(campo).val();
        $(campo).val(texto.substring(0, texto.length - 1));
    }
    //////////////
    return true;
}

//Essa função é para o caso da formatação ser em MOEDA. Entao você deverá chamá-la no INPUT.
function MascaraMoeda(i) {
    var v = i.value.replace(/\D/g, '');
    v = (v / 100).toFixed(2) + '';
    v = v.replace(".", ",");
    v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
    v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
    i.value = v;

}

//O segundo parâmetro desta função, é o nome que você coloca lá na chamada dela no INPUT. Isso determina em qual condicional (if, else if, else) a função entrará e qual formatação ela executará.
function MascaraGenerica(seletor, tipoMascara) {
    setTimeout(function () {
        if (MascaraInteiro(seletor)) {
            if (tipoMascara == 'CPFCNPJ') {
                if (seletor.value.length <= 14) { //cpf
                    formataCampo(seletor, '000.000.000-00');
                } else { //cnpj
                    formataCampo(seletor, '00.000.000/0000-00');
                }
            } else if (tipoMascara == 'DATA') {
                formataCampo(seletor, '00/00/0000');
            } else if (tipoMascara == 'CEP') {
                formataCampo(seletor, '00.000-000');
            } else if (tipoMascara == 'TELEFONE') {
                formataCampo(seletor, '(00) 0000-0000');
            } else if (tipoMascara == 'CELULAR') {
                formataCampo(seletor, '(00) 00000-0000');
            } else if (tipoMascara == 'INTEIRO') {
                formataCampo(seletor, '00000000000');
            } else if (tipoMascara == 'CPF') {
                formataCampo(seletor, '000.000.000-00');
            } else if (tipoMascara == 'CNPJ') {
                formataCampo(seletor, '00.000.000/0000-00');
            } else if (tipoMascara == 'INSCRICAOESTADUAL') {
                formataCampo(seletor, '00.000.00-0');
            } else if (tipoMascara == 'ALTURA') {
                formataCampo(seletor, '0.00');
            } else if (tipoMascara == 'IDADE') {
                formataCampo(seletor, '000');
            } else if (tipoMascara == 'PESO') {
                formataCampo(seletor, '000');
            }
        }
    });
}
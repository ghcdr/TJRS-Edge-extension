
const preencherButton = document.getElementById("preencher-button");
const irParaPagina = document.getElementById("navegar");

if (irParaPagina) {
    irParaPagina.onclick = function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.update(tabs[0].id, { url: 'https://wls.tjrs.jus.br/webcalcpro/f/n/calculovalores' });
        });
    };
}

if (preencherButton) {
    preencherButton.onclick = function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            const numParcelasInput = document.getElementById("num-parcelas");
            const dataInicialInput = document.getElementById("data-inicial");
            const dataJurosInput = document.getElementById("data-juros");
            const valorInput = document.getElementById("valor");

            chrome.tabs.sendMessage(
                tabs[0].id,
                {
                    'numParcelas': numParcelasInput.value, 
                    'dataInicial': dataInicialInput.value,
                    'valor': valorInput.value,
                    'dataJuros': dataJurosInput.value,
                    'type': 'preencher'
                },
                function(response) {
                    window.close();
                }
            );
        });
    }
}

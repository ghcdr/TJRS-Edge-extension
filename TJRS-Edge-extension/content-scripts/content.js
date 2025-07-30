

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  
  const parseDate = (str) => {
    const[ano, mes, dia] = str.split("-");
    return { dia: parseInt(dia, 10), mes: parseInt(mes, 10), ano: parseInt(ano, 10) };
  };

  const numParcelas = request.numParcelas;
  const dataInicial = parseDate(request.dataInicial)
  const dataJuro = parseDate(request.dataJuros)
  const valor = request.valor;
  
  // Helper function to wait for table changes
  const waitForTableChange = () => {
    const table = document.getElementById("corpo_geral");
    return new Promise((resolve) => {
      const observer = new MutationObserver(() => {
        observer.disconnect();
        resolve();
      });
      observer.observe(table, 
        { childList: true, subtree: true });
    });
  };

  const formatar = (val) => {
    if(val < 10) {
      return '0' + val;
    }

    return val.toString();
  }

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Loop through the number of parcelas
  const processParcelas = async () => {
    for (let i = 0; i < numParcelas; i++) {

      const valorInput = document.getElementById("corpo:formulario:valor");
      const dataInput = document.getElementById("corpo:formulario:data");
      const juroInput = document.getElementById("corpo:formulario:jurosPartir");
      const submit = document.getElementById("corpo:formulario:botaoAcaoCalcular");

      console.log(i + ' ');

      // Set the input values
      valorInput.value = valor;
      dataInput.value = formatar(dataInicial.dia) + '/' + formatar(dataInicial.mes) + '/' + formatar(dataInicial.ano);
      juroInput.value = formatar(dataJuro.dia) + '/' + formatar(dataJuro.mes) + '/' + formatar(dataJuro.ano);

      // Click the submit button
      submit.click();

      //await sleep(2000);

      if(i > 0) {
        // Wait for the table to change
        await waitForTableChange();
      }

      dataInicial.mes = dataInicial.mes + 1;
      if(dataInicial.mes > 12) {
        dataInicial.mes = 1;
        dataInicial.ano = dataInicial.ano + 1;
      }
    }
  };

  processParcelas();

  // setTimeout(() => {
  //   sendResponse({ success: true });
  // }, 1000);

  return true;
});

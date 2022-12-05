
	$(document).ready(function() {
	    $('#cepCadastro').keyup(function(e){
		search_cep($("#cepCadastro").val())
	    });

	    $("#cepCadastro").change(function() {
		search_cep($("#cepCadastro").val())
	    });

	});

	function search_cep(cep){
	    var requestOptions = {
		method: 'GET'
	    };
	    
	    const url = `https://viacep.com.br/ws/${cep}/json/`;

	    fetch(url, requestOptions)
	    .then(response => response.json())
	    .then(result => {
		if(!('erro' in result)){
		    $("#ruaCadastro").val(result['logradouro']);
		    $("#bairroCadastro").val(result['bairro']);
		    $("#cidadeCadastro").val(result['localidade']);
		    $("#estadoCadastro").val(result['uf']);
		}
	    })
	    .catch(error => console.log('error', error));
	}
	
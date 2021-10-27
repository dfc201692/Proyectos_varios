function selectFila(){
	
	// Si aparece la tabla de remesas...
	if (($$$('lista') != null) && ($$$('lista') != undefined)) {
		var arrChks=document.getElementsByName('chkRemesa');
		var iNumSel=0;
		var seleccionado ;
		for(var i=0;i<arrChks.length;i++){
			if(arrChks[i].checked){
				iNumSel=iNumSel+1;
				seleccionado = arrChks[i].value;
			}
		}	
		
		if (iNumSel == 0) {			
			$$$('botoneraVariasRemesas').className = 'oculto';
			$$$('botoneraUnaRemesa').className = 'divBtn';
			$$$('btnAceptar').disabled = true;
			$$$('btnAceptar').className = "btnDisabled";
		}
		
		else if (iNumSel == 1) {
			$$$('botoneraVariasRemesas').className = 'oculto';
			$$$('botoneraUnaRemesa').className = 'divBtn';
			$$$('btnAceptar').disabled = false;
			$$$('btnAceptar').className = "btn";
			$$$('txtSelFila').value=seleccionado;
		}
		
		else {
			$$$('botoneraVariasRemesas').className = 'divBtn';
			$$$('botoneraUnaRemesa').className = 'oculto';
		}
	}
}


function selectFilaMan(){
	
	// Si aparece la tabla de remesas por manifiesto...
	if (($$$('listaMan') != null) && ($$$('listaMan') != undefined)) {
		var arrChks=document.getElementsByName('chkRemesaMan');
		var iNumSel=0;
		var seleccionado;
		var totalChecks = arrChks.length;
		for(var i=0;i<arrChks.length;i++){
			if(arrChks[i].checked){
				iNumSel=iNumSel+1;
				seleccionado = arrChks[i].value;
			}
		}
		
				
		if (iNumSel == 0) {			
			$$$('botoneraVariasRemesasMan').className = 'oculto';
			$$$('botoneraUnaRemesaMan').className = 'divBtn';
			$$$('btnAceptarMan').disabled = true;
			$$$('btnAceptarMan').className = "btnDisabled";
			$$$('btnRechazarMan').disabled = true;
			$$$('btnRechazarMan').className = "btnDisabled";
			$$$('btnPosponerMan').disabled = "disabled";
			$$$('btnPosponerMan').className = "btnDisabled";
		}
		
		else if (iNumSel == 1) {
			$$$('botoneraVariasRemesasMan').className = 'oculto';
			$$$('botoneraUnaRemesaMan').className = 'divBtn';
			$$$('btnAceptarMan').disabled = false;
			$$$('btnAceptarMan').className = "btn";
			$$$('btnRechazarMan').disabled = false;
			$$$('btnRechazarMan').className = "btn";
			$$$('btnPosponerMan').disabled = "";
			$$$('btnPosponerMan').className = "btn";
			$$$('txtSelFilaMan').value=seleccionado;
			
			var estadoId = $$$("estado_" + seleccionado);

			if ((estadoId == null) || (estadoId == undefined)) {
				$$$('btnAceptarMan').disabled = false;
				$$$('btnAceptarMan').className = "btn";
				$$$('btnRechazarMan').disabled = false;
				$$$('btnRechazarMan').className = "btn";
				$$$('btnPosponerMan').disabled = "";
				$$$('btnPosponerMan').className = "btn";
			}
			else {
				var estado = estadoId.innerHTML;

				// Hablitiamos/Deshabilitamos las acciones especificas que se pueden o no realizar para cada fichero en funcion de su estado
				if ((estado == null) || (estado == undefined) || (estado == "") || (estado == "P")) {
					$$$('btnAceptarMan').disabled = false;
					$$$('btnAceptarMan').className = "btn";
					$$$('btnRechazarMan').disabled = false;
					$$$('btnRechazarMan').className = "btn";
					$$$('btnPosponerMan').disabled = "";
					$$$('btnPosponerMan').className = "btn";
				}
				
				else if (estado == "X") {
					$$$('btnAceptarMan').disabled = false;
					$$$('btnAceptarMan').className = "btn";
					$$$('btnRechazarMan').disabled = false;
					$$$('btnRechazarMan').className = "btn";
					$$$('btnPosponerMan').disabled = "disabled";
					$$$('btnPosponerMan').className = "btnDisabled";
				}
				
				else if (estado == "A") {
					$$$('btnAceptarMan').disabled = true;
					$$$('btnAceptarMan').className = "btnDisabled";
					$$$('btnRechazarMan').disabled = false;
					$$$('btnRechazarMan').className = "btn";
					$$$('btnPosponerMan').disabled = "disabled";
					$$$('btnPosponerMan').className = "btnDisabled";
				}
				
				else if ((estado == "R") || (estado == "F")) {
					$$$('btnAceptarMan').disabled = true;
					$$$('btnAceptarMan').className = "btnDisabled";
					$$$('btnRechazarMan').disabled = true;
					$$$('btnRechazarMan').className = "btnDisabled";
					$$$('btnPosponerMan').disabled = "disabled";
					$$$('btnPosponerMan').className = "btnDisabled";
				}
			}
		}
		
		else if (totalChecks == iNumSel) {
			$$$('botoneraVariasRemesasMan').className = 'divBtn';
			$$$('botoneraUnaRemesaMan').className = 'oculto';
		}
		
		else {
			$$$('botoneraVariasRemesasMan').className = 'oculto';
			$$$('botoneraUnaRemesaMan').className = 'divBtn';
			$$$('btnAceptarMan').disabled = true;
			$$$('btnAceptarMan').className = "btnDisabled";
			$$$('btnRechazarMan').disabled = true;
			$$$('btnRechazarMan').className = "btnDisabled";
			$$$('btnPosponerMan').disabled = "disabled";
			$$$('btnPosponerMan').className = "btnDisabled";
		}							
	}
}


function cargarComboClienteAjax(codProducto, campoCombo2){
	var codigoProducto = dwr.util.getValue(codProducto);
	var ambito = $$$('ambito').value;
	var oficina = $$$('oficina').value;
	
	limpiaCombo(campoCombo2);
	
	addLoadingIco("comboClientes", "codProducto");
	
	ProductoClienteDWR.getListaClientesPorProductoAmbito(codigoProducto, ambito, oficina, function(data){	
		
		dwr.util.addOptions(campoCombo2, data,'SCodCliente','codigoDescripcion');	
		
		removeLoadingIco("comboClientes", "codProducto");
	});	
}


function forwardSubmit() {
	
	var acciones = document.getElementsByName('filtro');
	var accion = "";
	dojo.byId("AceptarRemesa").action = "ListarAceptarRemesaPorProductoCliente.action";	
	if(acciones.length != undefined){		
		for(var i = 0; i<acciones.length; i++){			
			if(acciones[i].checked){
				accion = acciones[i].value;
			}
		}		
		
		if(accion=='envio'){
			dojo.byId("AceptarRemesa").action = "ListarAceptarRemesaPorEnvio.action";
		}		
		
		else if(accion=='remesa'){
			dojo.byId("AceptarRemesa").action = "ListarAceptarRemesaPorRemesa.action";
		}
		
		else if(accion=='manifiesto'){
			dojo.byId("AceptarRemesa").action = "ListarAceptarRemesaPorManifiesto.action";
		}
	}				
	dojo.byId("AceptarRemesa").submit();
}

function validacionInicial(){
	var tipoBusqueda = $$$('tipoBusqueda').value;	
	var check = document.getElementsByName('filtro');	
	
	if(tipoBusqueda=='P'){
		//MostrarProducto
		muestraCapa('divProducto','divEnvio','divRemesa','divManifiesto');
				
		for(var i=0; i<check.length ; i++){	
			if(check[i].value=='producto'){
				check[i].checked=true;
			}				
		}
		
		$$$('botoneraBuscar').className = "divBtn";
	}
		
	else if(tipoBusqueda=='R'){
		//MostrarRemesa
		muestraCapa('divRemesa','divEnvio','divProducto','divManifiesto');		
		
		for(var j=0; j<check.length; j++){
			if(check[j].value=='remesa'){
				check[j].checked=true;
			}				
		}
		$$$('botoneraBuscar').className = "oculto";
	}	
	
	else if(tipoBusqueda=='E'){
		//MostrarRemesa
		muestraCapa('divEnvio','divRemesa','divProducto','divManifiesto');		
		
		for(var k=0; k<check.length; k++){
			if(check[k].value=='envio'){
				check[k].checked=true;
			}				
		}
		$$$('botoneraBuscar').className = "oculto";
	}
	
	else if(tipoBusqueda=='M'){
		//MostrarRemesa
		muestraCapa('divManifiesto','divEnvio','divRemesa','divProducto');		
		
		for(var k=0; k<check.length; k++){
			if(check[k].value=='manifiesto'){
				check[k].checked=true;
			}				
		}
		$$$('botoneraBuscar').className = "oculto";
	}
}


function quitaBotonera() {
	$$$('botoneraBuscar').className = "oculto";	
}

function muestraBotonera() {
	$$$('botoneraBuscar').className = "divBtn";
}


/**
 * La Funcion que nos permite dar un tamaño al campo de codigo Remesa dependiendo del producto Metido.
 * @return
 */
function setTamanoCampoCodigo() {
	var codigoProducto = $$$("frmCodigoR").value.substring(0,2);
	if ($$$("frmCodigoR").value.length >= 2){
		ProductoClienteZonasProvinciasDWR.getCodFamiliaDelProducto(codigoProducto.toUpperCase(), function(data){
			if ((data != null) && (data != "")){
				var codFamilia = new String(data);		
				if (codFamilia == 'SI'){
					$$$("frmCodigoR").setAttribute('maxlength','14');					
				} 
				else if (codFamilia == 'AT'){
					$$$("frmCodigoR").setAttribute('maxlength','21');
				}	
			}
		});	
	}
}


/**
 * Ocultar la lista cuando cambia de filtro
 * @return
 */
function quitaTabla() {
	var tabla = $$$('lista');
	
	if ((tabla != null) && (tabla != undefined))
		tabla.style.visibility = 'hidden';
	
	tabla = $$$('listaMan');
	
	if ((tabla != null) && (tabla != undefined))
		tabla.style.visibility = 'hidden';
}

/**
 * La funcion JS que nos hace el submit cuando se pincha el Intro al rellenar el codigo.
 * @return
 */
function hacerSubmit(){
	var keyCode = window.event.keyCode;	
	if (keyCode==13){
		forwardSubmit();
	}
}

/**
 * funcion JS que manda el Focus y selecciona el contenido del campo.
 * @return
 */
function mandarFocusYSeleccionarCampo(selectComboManifiesto){
	var acciones = document.getElementsByName('filtro');
	if (acciones.length!=undefined){
		if (acciones[0].checked){
			mandarFocus('frmCodigoE');
			seleccionarCampo('frmCodigoE');
		}
		else if (acciones[1].checked){
			mandarFocus('frmCodigoR');
			seleccionarCampo('frmCodigoR');
		}
		else if (acciones[2].checked) {
			var tabla = $$$('listaMan');
			
			if ((tabla != null) && (tabla != undefined))
				tabla.style.display = 'none';
		}
		else if (acciones[3].checked) {
			if (($$$('divCodManifiesto') != null) && ($$$('divCodManifiesto') != undefined) && ($$$('divCodManifiesto').className != 'oculto') && 
					(($$$('divSelManifiesto') == null) || ($$$('divSelManifiesto') == undefined) || ($$$('divSelManifiesto').className == 'oculto'))) {
				mandarFocus('frmCodigoM');
				seleccionarCampo('frmCodigoM');
			}
			
			getManifiestosControlOblRec(selectComboManifiesto);
			
			var tabla = $$$('lista');
			
			if ((tabla != null) && (tabla != undefined))
				tabla.style.display = 'none';
		}
	}
}

	

function fSelectAllMan() {
	var checks = document.getElementsByName('chkRemesaMan');
	var state;		
	
	if ($$$('selectallMan').checked) {
		state = true;	
		$$$('botoneraVariasRemesasMan').className = 'divBtn';
		$$$('botoneraUnaRemesaMan').className = 'oculto';			
		
		$$$('selectAllHiddenMan').value = "todos";
	}
	
	else {
		state = false;
		$$$('botoneraVariasRemesasMan').className = 'oculto';
		$$$('botoneraUnaRemesaMan').className = 'divBtn';
		$$$('btnAceptarMan').disabled = true;
		$$$('btnAceptarMan').className = "btnDisabled";
		$$$('btnRechazarMan').disabled = true;
		$$$('btnRechazarMan').className = "btnDisabled";
		$$$('btnPosponerMan').disabled = "disabled";
		$$$('btnPosponerMan').className = "btnDisabled";
		
		$$$('selectAllHiddenMan').value = "";
	}
	
	for( var i = 0; i < checks.length; i++ ){
		checks[i].checked = state;
	}
}



function ponerHoraActual(){
	var hora;
	var fecha;
			
	hora  = $$$('horaDepositoBloque').value;
	fecha = $$$('fechaDepositoBloque').childNodes.item(1).value;
	
	if ((hora=='') && (fecha != "") && (fecha != null)){
		var fechaActual = new Date();
		var horaActual = fechaActual.getHours() ;
		var minActual  = fechaActual.getMinutes() ;

		if (horaActual<=9){
			horaActual = "0"+horaActual;
		}
		if (minActual<=9){
			minActual="0"+minActual;
		}
		
		$$$('horaDepositoBloque').value = horaActual+":"+minActual;
	}
}



function ponerHoraActualMan(){
	var hora;
	var fecha;
			
	hora  = $$$('horaDepositoBloqueMan').value;
	fecha = $$$('fechaDepositoBloqueMan').childNodes.item(1).value;
	
	if ((hora=='') && (fecha != "") && (fecha != null)){
		var fechaActual = new Date();
		var horaActual = fechaActual.getHours() ;
		var minActual  = fechaActual.getMinutes() ;

		if (horaActual<=9){
			horaActual = "0"+horaActual;
		}
		if (minActual<=9){
			minActual="0"+minActual;
		}
		
		$$$('horaDepositoBloqueMan').value = horaActual+":"+minActual;
	}
}




function llamarAlActionMan(){
	var fechaDeposito = $$$('fechaDepositoBloqueMan');
	var horaDeposito  = $$$('horaDepositoBloqueMan');
	
	if ((fechaDeposito!= undefined && fechaDeposito!=null && 
	     fechaDeposito.value!=null && fechaDeposito.value!=undefined && fechaDeposito.value.length>0) ||  
		(horaDeposito != undefined && horaDeposito !=null && 
		 horaDeposito.value !=null && horaDeposito.value !=undefined && horaDeposito.value.length >0)) 			
		fActualizarFechaDeposito('btnActualizar', 'AceptarRemesa', 'AceptarManifiesto.action');
	
	else{
		dojo.byId('AceptarRemesa').action = 'AceptarManifiesto.action';
		dojo.byId('AceptarRemesa').submit();	
	}
}



function cargaInicialEspecifica() {
	validacionInicial();
	setTamanoCampoCodigo();
	mandarFocusYSeleccionarCampo(true);
	selectFila();
	selectFilaMan();
	
	var datepicker = dojo.widget.byId("fechaDepositoBloqueMan");
	dojo.event.connect(datepicker, "onValueChanged", ponerHoraActualMan);	
	
	avisoLecturaRemesasDesbloqueadas();
}

function deshabilitarcombocaja() {	
let comboManifest = document.getElementById("comboManifiestos");
let writeBox = document.getElementById("frmCodigoM");

comboManifest.addEventListener("change", function() {
	writeBox.value = ""
})

writeBox.addEventListener("keypress", function() {
	comboManifest.value = ""
})
}

function getManifiestosControlOblRec(selectComboManifiesto) {
	$$$('divCodManifiesto').className = 'oculto';
	$$$('divSelManifiesto').className = 'oculto';
	$$$('divBotonBuscarMan').className = 'oculto';		
	
	limpiaCombo('comboManifiestos');
	
	// Mostramos/ocultamos los div a la vez tras terminar las peticiones ajax para que se muestren/oculten todos en conjunto, y no vayan apareciendo
	// primero unos campos y luego otros en funcion del retardo de las peticiones ajax
	ControlManifiestoDWR.getManifiestosControlObligatorio(function(data) {
		if ((data != null) && (data.length > 0)) {
			// Solo mostramos el aviso cuando la pantalla no tiene resultados, es decir no se ha hecho una busqueda. Si se ha hecho una busqueda el aviso ya
			// se mostro antes
			if (($$$('listaMan') == null) || ($$$('listaMan') == undefined) || ($$$('listaMan').style.visibility == 'hidden') || 
				($$$('listaMan').style.display == 'none') || ($$$('listaMan').className == 'oculto'))
				fAviso("Hay manifiestos que deben pasar el control obligatoriamente. Debe seleccionar un manifiesto de los que aparecen en el combo.");	
			
			dwr.util.addOptions('comboManifiestos', data, 'codManifiesto', 'codManifiesto');
			$$$('divCodManifiesto').className = 'conMicroayuda';
			$$$('divSelManifiesto').className = 'conMicroayuda';
			$$$('divBotonBuscarMan').className = 'vaBottom';
			
			// Si el campo de texto esta vacio
			if ((selectComboManifiesto == true) && (($$$("frmCodigoM") == null) || ($$$("frmCodigoM") == undefined) || ($$$("frmCodigoM").value == ""))) {
				// Como el combo se genera por ajax despues de que se cargue la pagina, struts no puede asociar el valor elegido en el combo.
				// De modo que lo seleccionamos manualmente cuando el combo termine de cargarse			
				$$$('comboManifiestos').selectedIndex = 0;
				for (var i=0; i < $$$('comboManifiestos').options.length; i++) {
					if ($$$('comboManifiestos').options[i].value == $$$('codigoManifiesto').value) {
						$$$('comboManifiestos').selectedIndex = i;
						
						// salimos del bucle
						i = $$$('comboManifiestos').options.length;
					}
				}
			}
		}
		
		else {
						
			ControlManifiestoDWR.getManifiestosControlRecomendado(function(data2) {
				if ((data2 != null) && (data2.length > 0)) {
					// Solo mostramos el aviso cuando la pantalla no tiene resultados, es decir no se ha hecho una busqueda. Si se ha hecho una busqueda el aviso ya
					// se mostro antes
					if (($$$('listaMan') == null) || ($$$('listaMan') == undefined) || ($$$('listaMan').style.visibility == 'hidden') || 
						($$$('listaMan').style.display == 'none') || ($$$('listaMan').className == 'oculto'))
						fAviso("Hay manifiestos que deberían pasar el control. Puede seleccionar un manifiesto de los sugeridos o introducir uno distinto.");					
					
					dwr.util.addOptions('comboManifiestos', data2, 'codManifiesto', 'codManifiesto');	
					$$$('divCodManifiesto').className = 'conMicroayuda';
					$$$('divSelManifiesto').className = 'conMicroayuda';
					$$$('divBotonBuscarMan').className = 'vaBottom';
					
					// Si el campo de texto esta vacio
					if ((selectComboManifiesto == true) && (($$$("frmCodigoM") == null) || ($$$("frmCodigoM") == undefined) || ($$$("frmCodigoM").value == ""))) {
						// Como el combo se genera por ajax despues de que se cargue la pagina, struts no puede asociar el valor elegido en el combo.
						// De modo que lo seleccionamos manualmente cuando el combo termine de cargarse
						$$$('comboManifiestos').selectedIndex = 0;
						for (var i=0; i < $$$('comboManifiestos').options.length; i++) {
							if ($$$('comboManifiestos').options[i].value == $$$('codigoManifiesto').value) {
								$$$('comboManifiestos').selectedIndex = i;
								
								// salimos del bucle
								i = $$$('comboManifiestos').options.length;
							}
						}
					}
				}
				
				else {					
					$$$('divCodManifiesto').className = 'conMicroayuda';
					$$$('divSelManifiesto').className = 'oculto';
					$$$('divBotonBuscarMan').className = 'vaBottom';
				}
			});
		}
	});
}

function avisoLecturaRemesasDesbloqueadas() {
	
	if ((($$$('lista') == null) || ($$$('lista') == undefined)) && (($$$('listaMan') == null) || ($$$('listaMan') == undefined))) {
		var oficina = $$$("oficina").value;		
		
		AdmisionOperativaDWR.getJoinedRemesasBloqueadasConEnviosSobrantes(oficina, function (data){
			if (data != null)
				fAviso("ATENCIÓN: Se han le�do envíos en Control de Admisión de las siguiente(s) remesa(s) de su ámbito que está(n) bloqueada(s): " + data + ".");
		});
	}
}


function comprobarRemesasControladas() {
	var arrChks = document.getElementsByName('chkRemesa');
	var hayControladas = false;
	var controlada;
	var length = arrChks.length;
	
	
	// Comprobamos si se ha seleccionado alguna remesa marcada para control
	for(var i = 0; ((i < length) && (!hayControladas)); i++){
		if(arrChks[i].checked){					
			
			controlada = fulltrim($$$("planificada_" + arrChks[i].value).innerHTML);
			
			// Comprobamos si la remesa esta planificada para control
			if (controlada == 'true') 
				hayControladas = true;
		}
	}
	
	if (hayControladas)
		fAvisoControlPlanificadoRemesas();
	
	else {
		
		// Comprobamos si con la fecha de deposito introducida las remesas deberan ser controladas
		var codigoProducto = $$$("codProducto").value;
		var codigoCliente = $$$("comboClientes").value;
		var fecha = dojo.widget.byId("fechaDepositoBloque").getValue().substring(0,10);
		
		ProductoClienteDWR.marcarRemesaControl(codigoProducto, codigoCliente, fecha, function(data){
			if (data) {		
				fAvisoControlPlanificadoRemesas();
			}
			
			else {
				// Si no hay remesas controladas
				submitAction('AceptarRemesa', 'AceptarBloqueRemesas.action');
			}
		});
	}
}

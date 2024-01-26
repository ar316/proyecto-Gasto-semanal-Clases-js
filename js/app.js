//variables 
const formulario = document.querySelector('#agregar-gasto')
const gastoListado = document.querySelector('#gastos ul')

const presupuestohtml = document.querySelector('#total');
const restohtml = document.querySelector('#restante');
const restohtmkl = document.querySelector('#resto');
console.log(restohtmkl);

//clases 

class Presupuesto  {
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
        this.id = 1;
    }

    agregarGasto(nombre, cantidad){
        
        const Gasto ={
            id: this.id,
            nombre: nombre,
            cantidad: Number(cantidad)
        }
        
        this.gastos = [...this.gastos,Gasto];
        this.id++;
        this.calcularRestante();
    }
    
    calcularRestante(){
        const gastado = this.gastos.reduce( (total, gasto) => total + gasto.cantidad,0);
        console.log(gastado);
        
        this.restante = this.presupuesto-gastado;
        console.log(this.restante);
    }

    setGastos(gastos) {
        this.gastos = gastos;
    }
    setRestante(cantidad) {
        this.restante += cantidad;
    }
    getRestante() {
        return this.restante;
    }

    eliminarGasto(id){
        this.gastos = this.gastos.filter(gasto => gasto.id !== id);
        this.calcularRestante();
    }
 
}
 
class UI extends Presupuesto{

    MostrarPresupuesto(cantidad) {
        presupuestohtml.textContent = cantidad;
        restohtml.textContent = cantidad;
    }

    listarGasto(gastos){
        gastoListado.innerHTML = "";
        gastos.forEach(gasto => {
            const gasthtml = document.createElement('div');
            gasthtml.classList.add('contenido', 'principal');
            const btnEliminar = document.createElement('button');
            btnEliminar.style.borderRadius = '10px';
            btnEliminar.style.backgroundColor = "red";
            btnEliminar.style.cursor = "pointer";
            btnEliminar.style.color = "white";
            btnEliminar.textContent = "Borrar x";
            btnEliminar.addEventListener("click", ()=>{
                Eliminar(gasto.id);
            });
            gasthtml.innerHTML =` ${gasto.nombre} $${gasto.cantidad} `;
            gasthtml.appendChild(btnEliminar);
            gastoListado.appendChild(gasthtml);
        });
    }

    actualizarResto(cantidad){
       
       
        restohtml.textContent = cantidad;
        
    }


    comprobarPresuopuesto(presupuestoObj){
        const {presupuesto, restante} = presupuestoObj;
        console.log(presupuesto)
        console.log(restante);
       
        //ya he gastado mas del 75%
        if((presupuesto/2)> restante) {
            console.log("ya gaste mas del 75%")
            restohtmkl.classList.remove("alert-success");
            restohtmkl.classList.add("alert-warning");  
          
        }100

        if((presupuesto/4) > restante){
            console.log("ya gaste mas del 75%")
            restohtmkl.classList.remove("alert-warning");
            restohtmkl.classList.add("alert-danger");
           
        }
        if(restante <=0 ){
            formulario.querySelector("button").disabled = true;
            
        }

       
       


    }


    


}

const ui = new UI();
let objPresupuesto;


//eventos
eventos();
function eventos() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
    formulario.addEventListener('submit', capturarGasto);
}

function Eliminar(id){
 
    objPresupuesto.eliminarGasto(id);
    const { gastos, restante, presupuesto }= objPresupuesto;
    ui.listarGasto(gastos);
    ui.actualizarResto(restante);
     ui.comprobarPresuopuesto(objPresupuesto);

}

function preguntarPresupuesto() {
    const presupuesto = prompt('presupuesto');
    if(presupuesto === "" || presupuesto === null || isNaN(presupuesto) || presupuesto <= 0) {
        window.location.reload();
    }
    objPresupuesto = new Presupuesto(presupuesto);
    ui.MostrarPresupuesto(objPresupuesto.presupuesto);

}

function capturarGasto(e){
    e.preventDefault();
    const Gasto = formulario.querySelector('#gasto').value;
    const Cantidad = formulario.querySelector('#cantidad').value;
    console.log(Gasto);
    console.log(Cantidad);
    objPresupuesto.agregarGasto(Gasto, Cantidad);
    
    const {restante, gastos} = objPresupuesto;
    
    ui.listarGasto(gastos);
    ui.actualizarResto(restante);
     ui.comprobarPresuopuesto(objPresupuesto);
    
    formulario.reset();

}
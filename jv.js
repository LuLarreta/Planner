Vue.component("formulario", {
  data: function () {
    return {
      nuevaTarea: "",
      tareas: [],
      error: false,
    };
  },
  methods: {
    agregarTarea: function () {
      if (this.nuevaTarea.trim() !== "") {
        this.tareas.push({
          tarea: this.nuevaTarea,
          marcada: false,
        });
        this.nuevaTarea = "";
        this.error = false;
      } else {
        this.error = true;
      }
    },
  },

  template: `
  <div>
  <form @submit.prevent="agregarTarea">
    <input type="text" v-model="nuevaTarea" />
    <button type="submit" class="bg-marronO rounded m-1 ">
      Agregar Pendiente
    </button>
    <p v-if="error" style="color: red;">Por favor, ingresar un pendiente</p>
  </form>
  <div>
    <div v-for="tarea in tareas">
      <input type="checkbox" v-model="tarea.marcada" class="m-1 p-2" >
      <img v-if="tarea.marcada" src="img/completada.png" alt="Imagen de Tarea Completada" />  
          <label v-else>{{ tarea.tarea }}</label> 
    </div>
  </div>
  <div class="container">
  <p v-if="tareas.length ===0">Yujuu! Tenes el dia libre </p>
</div></div>

`,
});

Vue.component("mensual", {
  data() {
    return {
      titulo: "Planner Mensual",
      mes: "",
      cantidadDias: 0,
      diaInicio: "",
      tabla: [],
      pendientes: [],
      nuevoPendiente: "",
      error: false,
      domingo: {
largo: "Domingo",
      corto: "D",
      },
      lunes: {
        largo: "Lunes",
      corto: "L",
      },
      martes: {
         largo: "Martes",
      corto: "M",
      },
      miercoles: {
       largo: "Miércoles",
      corto: "X",},
      jueves: 
     
     {
      largo: "Jueves",
      corto: "J",},
      viernes: {
         largo: "Viernes",
      corto: "V",
      },
      sabado: {
        largo: "Sábado",
      corto: "S",
      },
    
      
      esCelular: window.innerWidth < 500,
    };
  },
  methods: {
    agregarPendiente: function (celda) {
      if (celda.nuevoPendiente.trim() !== "") {
        celda.pendientes.push({
          descripcion: celda.nuevoPendiente,
          marcado: false,
        });
        celda.nuevoPendiente = "";
        celda.error = false;
      } else {
        celda.error = true;
      }
    },

    generarTabla() {
      // Lógica para generar la tabla basada en los datos ingresados por el usuario
      // Reiniciar la tabla
      this.tabla = [];

      // Validar los datos ingresados
      if (this.mes === "" || this.cantidadDias === 0 || this.diaInicio === "") {
        alert("Por favor, ingrese todos los datos.");
        return;
      }

      // Generar la tabla
      let dia = 1;
      for (let i = 0; i < 6; i++) {
        let fila = [];
        for (let j = 0; j < 7; j++) {
          if (i === 0 && j < this.diaInicio) {
            fila.push({
              dia: "",
              pendientes: [],
              nuevoPendiente: "", // Agregamos una propiedad para cada celda
              error: false, // Agregamos una propiedad para cada celda
            });
          } else if (dia <= this.cantidadDias) {
            fila.push({
              dia: dia,
              pendientes: [],
              nuevoPendiente: "", // Agregamos una propiedad para cada celda
              error: false, // Agregamos una propiedad para cada celda
            });
            dia++;
          } else {
            fila.push({
              dia: "",
              pendientes: [],
              nuevoPendiente: "", // Agregamos una propiedad para cada celda
              error: false, // Agregamos una propiedad para cada celda
            });
          }
        }
        this.tabla.push(fila);
      }
    },
  },
  template: `
    <div>
      
      <div class="m-1 p-2 ">
        <label for="mes">Mes:</label>
        <select id="mes" v-model="mes">
          <option value="enero">Enero</option>
          <option value="febrero">Febrero</option>
          <option value="marzo">Marzo</option>
          <option value="abril">Abril</option>
          <option value="mayo">Mayo</option>
          <option value="junio">Junio</option>
          <option value="julio">Julio</option>
          <option value="agosto">Agosto</option>
          <option value="septiembre">Septiembre</option>
          <option value="octubre">Octubre</option>
          <option value="noviembre">Noviembre</option>
          <option value="diciembre">Diciembre</option>
        
        </select>

        <label for="cantidad-dias">Cantidad de días:</label>
        <select id="cantidad-dias" v-model="cantidadDias">
          <option value="28">28</option>
          <option value="30">30</option>
          <option value="31">31</option>
        </select>

        <label for="dia-inicio">Día de inicio:</label>
        <select id="dia-inicio" v-model="diaInicio">
          <option value="0">Domingo</option>
          <option value="1">Lunes</option>
          <option value="2">Martes</option>
          <option value="3">Miercoles</option>
          <option value="4">Jueves</option>
          <option value="5">Viernes</option>
          <option value="6">Sabado</option>
         
        </select>

        <button @click="generarTabla" class="bg-marronO rounded m-1 ">Enviar</button>
      </div>
<div class="table-responsive">
      <table class="table table-bordered bg-marron border-tabla">
      <thead>
          <th >{{ esCelular ? domingo.corto : domingo.largo}}</th>
          <th>{{ esCelular ? lunes.corto : lunes.largo}}</th>
          <th>{{ esCelular ? martes.corto : martes.largo}}</th>
          <th>{{ esCelular ? miercoles.corto : miercoles.largo}}</th>
          <th>{{ esCelular ? jueves.corto : jueves.largo}}</th>
          <th>{{ esCelular ? viernes.corto : viernes.largo}}</th>
          <th>{{ esCelular ? sabado.corto : sabado.largo}}</th>
        </thead>
        <tr v-for="fila in tabla">
        <td v-for="celda in fila">
        <span v-if="celda.dia">
          {{ celda.dia }} 
           <form @submit.prevent="agregarPendiente(celda)" >
    <input type="text" v-model="celda.nuevoPendiente"/>
    <button type="submit" class="bg-marronO rounded m-1 ">Agregar Pendiente</button>
    <p v-if="celda.error" style="color: red;">Por favor, ingresar un pendiente</p>
  </form></span>
  <div>
    <div v-for="pendiente in celda.pendientes">
      <input type="checkbox" v-model="pendiente.marcado">
      <img v-if="pendiente.marcado" src="img/completada.png" alt="Imagen de Tarea Completada" />  
     <label v-else> {{ pendiente.descripcion }}</label> 
    </div>
  </div>
  <div class="container">
  <p v-if="celda.pendientes.length ===0">Yujuu! Tenes el dia libre </p>
</div>
          
          
       
       
      </td>
      
        </tr>
      </table></div>
    </div>
  `,
});

Vue.component("alumnos-footer", {
  template: `
<footer>
 <div class="text-center" >
                 <p>Lucia Muñoz Larreta - Carlos Daniel Gette</p>
                 <p>Aplicaciones para Dispositivos Moviles - Sergio Medina</p>
                
          
             </div>
         
</footer>


`,
});

Vue.component("navegador",{
  template: `
  <div>
  <nav>
  
  <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
  <li><a href="index.html" class="nav-link px-2 link-dark border-lila text-dark">Planner Semanal</a></li>
  <li><a href="mensual.html" class="nav-link px-2 link-dark border-lila text-dark">Planner Mensual</a></li>
</ul>
  </nav>
  </div>
  
  `

})

var app = new Vue({
  el: "#app",
  data: {
    titulo: "Planner Semanal",
  },
});


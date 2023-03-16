const url = 'https://mindhub-xj03.onrender.com/api/amazing'

const {createApp} = Vue
const app = createApp({
        data(){
            return{
                eventosStats: undefined,
                fechaActual: undefined,
                eventosEstadisticas: [],
                arregloObjetosPasado: [],
                arregloObjetosFuturo: [] 
            }
        },
        created(){
            fetch(url)
            .then(response => response.json())
            .then((evento) => {
            console.log(evento)
            this.eventosStats = Array.from(evento.events)
            this.fechaActual = evento.currentDate

            const cardsPasado = this.filtrarEventosPasado(this.eventosStats, this.fechaActual)
            const cardsFuturo = this.filtrarEventosFuturo(this.eventosStats, this.fechaActual)
            
            this.eventosEstadisticas[0] = this.eventoPorcentajeMasAtendido(cardsPasado)
            this.eventosEstadisticas[1] = this.eventoPorcentajeMenosAtendido(cardsPasado)
            this.eventosEstadisticas[2] = this.eventoConMasCapacidad(cardsPasado)

            const UpcomingEstadisticas = this.filtroCategoriaEvento(cardsFuturo)
            const PastEstadisticas = this.filtroCategoriaEvento(cardsPasado)

            for(let categoria of PastEstadisticas){
                this.arregloObjetosPasado.push(this.construirArregloDeObjetos(cardsPasado,categoria))   
            }

            for(let categoria of UpcomingEstadisticas ){
               this.arregloObjetosFuturo.push(this.construirArregloDeObjetosFuturo(cardsFuturo, categoria))

            }

            })

        },
    
    methods: {

        filtrarEventosPasado(lista, currentDate){
            let arregloFiltrado = []
            for( let elemento of lista ){
                if(elemento.date < currentDate){
                    arregloFiltrado.push(elemento)
                }
            }
            return arregloFiltrado
        },
        
        filtrarEventosFuturo(lista, currentDate){
            let arregloFiltrado = []
            for( let elemento of lista ){
                if(elemento.date > currentDate){
                    arregloFiltrado.push(elemento)
                }
            }
            return arregloFiltrado
        },

        eventoPorcentajeMasAtendido(cardsPasado){
    
            const arrayArreglado = cardsPasado.sort((x,y) => (y.assistance/y.capacity) - (x.assistance/x.capacity))
        
            let eventoMasAtendido = arrayArreglado[0].name
            return eventoMasAtendido;
        },
        
        eventoPorcentajeMenosAtendido(cardsPasado){
            
            const arrayArreglado = cardsPasado.sort((x,y) =>  (x.assistance/x.capacity) - (y.assistance/y.capacity))
        
            let eventoMenosAtendido = arrayArreglado[0].name
            return eventoMenosAtendido;
        },
        
        eventoConMasCapacidad(cardsPasado){
            const arrayArreglado = cardsPasado.sort((x,y) =>  y.capacity - x.capacity)
        
            let eventoMenosAtendido = arrayArreglado[0].name
            return eventoMenosAtendido;
        },

        filtroCategoriaEvento(lista){
            const listaFiltrada = lista.map(elemento => elemento.category)
            const listaFiltradaFinal = Array.from(new Set(listaFiltrada))
            return listaFiltradaFinal
        },

        construirArregloDeObjetos(lista, categoria){
            const nuevaLista = lista.filter( elemento => elemento.category.includes(categoria))
            const listaObjetos = []
            const sumaResultados = []
            let suma1 =0
            let suma2 =0
            let suma3 =0
            
            for(let elemento of nuevaLista){
                listaObjetos.push({
                    Category: elemento.category,
                    Revenues: elemento.assistance * elemento.price,
                    Attendance: elemento.assistance/elemento.capacity,
                })
            }
        
        
            for(let elemento of listaObjetos){
                suma1 = elemento.Category
                suma2 += elemento.Revenues
                suma3 += elemento.Attendance
            }
        
            sumaResultados.push({
                Category: suma1,
                Revenues: suma2,
                Attendance: (Math.round((suma3/listaObjetos.length)*100)/100)*100,
            })

            return sumaResultados[0]
        },
        
        construirArregloDeObjetosFuturo(lista, categoria){
            const nuevaLista = lista.filter( elemento => elemento.category.includes(categoria))
            const listaObjetos = []
            const sumaResultados = []
            let suma1 =0
            let suma2 =0
            let suma3 =0
            
            for(let elemento of nuevaLista){
                listaObjetos.push({
                    Category: elemento.category,
                    Revenues: elemento.estimate * elemento.price,
                    Attendance: elemento.estimate/elemento.capacity,
                })
            }
        
            for(let elemento of listaObjetos){
                suma1 = elemento.Category
                suma2 += elemento.Revenues
                suma3 += elemento.Attendance
            }
        
            sumaResultados.push({
                Category: suma1,
                Revenues: suma2,
                Attendance: (Math.round((suma3/listaObjetos.length)*100)/100)*100,
            })
            

            return sumaResultados[0]
        },

    },

}).mount('#app4');

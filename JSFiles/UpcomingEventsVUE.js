const url = 'https://mindhub-xj03.onrender.com/api/amazing'

const {createApp} = Vue
const app = createApp({
        data(){
            return{
                eventos: undefined,
                eventosCards: undefined,
                eventosFiltrados: undefined,
                valorCheck: [],
                valorTexto: '',
                cargando: true
            }
        },
        created(){
            fetch(url)
            .then(response => response.json())
            .then((evento) => {
            console.log(evento)
            this.eventos = Array.from(evento.events)
            this.eventosCards = Array.from(evento.events)
            this.currentDateCards = evento.currentDate
            
            this.eventosFiltrados = this.fitroArray(this.eventos)
            console.log(this.eventosFiltrados)
            
            this.cargando = false
            })

        },
    
    methods: {

    fitroArray(lista){
    return arrayTemporal =  Array.from(new Set(lista.map(elemento => elemento.category)))
    },

    filtroCheck(){
        if(this.valorCheck.length === 0){
            this.eventosCards = this.eventos
            } 
        else {
            this.eventosCards = this.eventos.filter( event =>
            this.valorCheck.includes(event.category))
            }
        },

    filtroCruzadoCards(){
        let variableValor
        {
            if(this.valorTexto === " "){
                variableValor = this.eventos
            } else{
                variableValor = this.eventos.filter(evento => evento.name.toLowerCase()
                                .includes(this.valorTexto.toLowerCase()))
            }
        }                   
        {
            if(this.valorCheck.length === 0){
                this.eventosCards = variableValor
            } 
            else {
                this.eventosCards = variableValor.filter( event =>
                this.valorCheck.includes(event.category))
            }
        }
    },
},

}).mount('#app1');

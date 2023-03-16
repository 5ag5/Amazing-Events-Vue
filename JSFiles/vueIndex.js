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
            }
        },
        created(){
            fetch(url)
                    .then(response => response.json())
                    .then(({events}) => {
                    this.eventos = events
                    this.eventosCards = events

                    this.eventosFiltrados =  Array.from(new Set(events.map(elemento => elemento.category)))
                    })

        },

    methods: {
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
                console.log(this.eventosCards)
            }
        }
    },
},

            // filtroBarraTexto(){
            //     console.log(this.valorTexto)
            //     if(this.valorTexto === " "){
            //         return  this.eventosCards = this.eventos
            //         } else{
            //             return this.eventosCards = this.eventos.filter(evento => evento.name.toLowerCase()
            //             .includes(this.valorTexto))
            //         }
            // },

}).mount('#app1');
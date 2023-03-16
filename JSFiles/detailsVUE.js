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
                carta: undefined,
                params: undefined,
                id: undefined,
                capacity: undefined
            }
        },
        created(){
            fetch(url)
            .then(response => response.json())
            .then((evento) => {
            console.log(evento)
            this.eventosCards = Array.from(evento.events)
            
            this.params = new URLSearchParams(location.search)
            this.id = this.params.get("id")
            
            this.carta = this.eventosCards.find(elemento => elemento._id == this.id)

            console.log(this.carta)

            this.capacity = this.carta.assistance ? "Assistance: " + this.carta.assistance: "Estimate: " + this.carta.estimate
            
            console.log(this.capacity)
            })

        },
    
    methods: {

    },

}).mount('#app');

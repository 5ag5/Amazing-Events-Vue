const url = 'https://mindhub-xj03.onrender.com/api/amazing'

const {createApp} = Vue
const app = createApp({
        data(){
            return{
                eventosCards: undefined,
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

            this.eventosCards = Array.from(evento.events)
            
            this.params = new URLSearchParams(location.search)
            this.id = this.params.get("id")
            
            this.carta = this.findElemento(this.eventosCards)

            this.capacity = this.asistenciaOEstimado()
            
            })

        },
    
    methods: {
        findElemento(lista){
            return lista.find(elemento => elemento._id == this.id)
        },

        asistenciaOEstimado(){
            return this.carta.assistance ? "Assistance: " + this.carta.assistance: "Estimate: " + this.carta.estimate
        }

    },

}).mount('#app');

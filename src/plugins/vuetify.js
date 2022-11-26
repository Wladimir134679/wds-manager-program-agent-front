// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import {createVuetify} from 'vuetify'

export default createVuetify({
        theme: {
            defaultTheme: "light"
        },
        defaults: {
            VCard: {
                elevation: 3
            }
        }
    }
    // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
)

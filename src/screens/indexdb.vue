<template>
    <navbar/>
    <header>
    <img alt="Vue logo" class="logo" src="../assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
    <h1>IndexDB</h1>
    </div>
  </header>
  <div class="indexeddb-container">
    <h2>Guardar en IndexedDB</h2>
    <input v-model="nombre" placeholder="Ingresa tu nombre" />
    <button @click="guardarNombre">Guardar Nombre</button>
    <button @click="mostrarNombre">Mostrar Nombre Guardado</button>
    <p v-if="nombreGuardado">Nombre guardado: {{ nombreGuardado }}</p>
  </div>
</template>
<script>
import { openDB } from 'idb';
import navbar from '@/components/navbar.vue';

export default {
  components: {
    navbar
  },
  data() {
    return {
      nombre: '',
      nombreGuardado: ''
    };
  },
  methods: {
    async initDB() {
      this.db = await openDB('MiBaseDeDatos', 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains('usuarios')) {
            db.createObjectStore('usuarios', { keyPath: 'id', autoIncrement: true });
          }
        }
      });
    },
    async guardarNombre() {
      await this.initDB();
      await this.db.add('usuarios', { nombre: this.nombre }); 
      this.nombre = ''; 
    },
    async mostrarNombre() {
      await this.initDB();
      const tx = this.db.transaction('usuarios', 'readonly');
      const store = tx.objectStore('usuarios');
      const registros = await store.getAll(); 
      if (registros.length > 0) {
        this.nombreGuardado = registros[registros.length - 1].nombre; 
      } else {
        this.nombreGuardado = 'No hay nombres guardados';
      }
    }
  },
  async mounted() {
    await this.initDB();
  }
};
</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}
h1{
  text-align: center;
}
.indexeddb-container {
  padding: 1rem;
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
}

input {
  padding: 0.5rem;
  margin-bottom: 1rem;
}

button {
  margin: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #6a0dad;
  color: #ffffff;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #32cd32;
}
</style>
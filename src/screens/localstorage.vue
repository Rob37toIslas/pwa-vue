
<template>
  <navbar/>
  <header>
    <img alt="Vue logo" class="logo" src="../assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
    <h1>Local storage</h1>
    </div>
  </header>
  <div class="local-storage-container">
    <h2>Guardar en Local Storage</h2>
    <input v-model="nombre" placeholder="Ingresa tu nombre" />
    <button @click="guardarNombre">Guardar Nombre</button>
    <button @click="mostrarNombre">Mostrar Nombre Guardado</button>
    <p v-if="nombreGuardado">Nombre guardado: {{ nombreGuardado }}</p>
  </div>
</template>

<script>
import navbar from '@/components/navbar.vue';
export default{
    data() {
        return {
          nombre: '',
          nombreGuardado: ''
        };
      },
      components:{
      navbar
    },
      methods: {
        guardarNombre() {
          localStorage.setItem('nombreUsuario', this.nombre); // Guardar en localStorage
          this.nombre = ''; // Limpiar el campo de entrada
        },
        mostrarNombre() {
          this.nombreGuardado = localStorage.getItem('nombreUsuario'); // Recuperar de localStorage
        }
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
.local-storage-container {
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

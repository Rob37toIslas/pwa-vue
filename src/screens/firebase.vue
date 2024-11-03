<template>
    <navbar />
    <header>
      <img alt="Vue logo" class="logo" src="../assets/logo.svg" width="125" height="125" />
      <div class="wrapper">
        <h1>Firebase</h1>
      </div>
    </header>
    <div class="firebase-container">
      <h2>Guardar en Firebase Firestore</h2>
      <input v-model="nombre" placeholder="Ingresa tu nombre" />
      <button @click="guardarNombre">Guardar Nombre</button>
      <button @click="mostrarNombres">Mostrar Todos los Nombres</button>
      <ul v-if="nombresGuardados.length">
        <li v-for="(nombre, index) in nombresGuardados" :key="index">{{ nombre }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  import { collection, addDoc, getDocs } from "firebase/firestore";
  import db from "@/controllers/firebaseConfig";
  import navbar from "@/components/navbar.vue";
  
  export default {
    components: {
      navbar
    },
    data() {
      return {
        nombre: "",
        nombresGuardados: []
      };
    },
    methods: {
      async guardarNombre() {
        try {
          await addDoc(collection(db, "usuarios"), { nombre: this.nombre });
          this.nombre = ""; // Limpiar el campo de entrada
        } catch (error) {
          console.error("Error al guardar el nombre: ", error);
        }
      },
      async mostrarNombres() {
        try {
          const querySnapshot = await getDocs(collection(db, "usuarios"));
          this.nombresGuardados = querySnapshot.docs.map(doc => doc.data().nombre); // Mostrar todos los nombres
        } catch (error) {
          console.error("Error al recuperar los nombres: ", error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .firebase-container {
    padding: 1rem;
    max-width: 400px;
    margin: 0 auto;
    text-align: center;
  }
  
  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
  }
  header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}
  
 header{
    flex: 1;
    justify-content: center;
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
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    margin: 0.5rem 0;
    padding: 0.5rem;
    background-color: #f0f0f0;
    border-radius: 5px;
  }
  </style>
  
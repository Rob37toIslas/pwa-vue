<template>
    <div>
      <nav2 />
      <div class="firebase-container">
        <div style="display: flex;justify-content: center;flex-direction: row">
        <img src="../assets/logo-vertical.png" class="logo"  width="125" height="125"/>
        <h1 style="font-size: 50px;">+</h1>
        <img alt="Vue logo" class="logo" src="../assets/logo.svg" width="125" height="125" />
      </div>
        <h2>Guardar en Firebase y Offline con IndexedDB</h2>
        <p :class="onlineStatus ? 'online' : 'offline'">
          {{ onlineStatus ? 'Online' : 'Offline' }}
        </p>
        <input v-model="nombre" placeholder="Ingresa tu nombre" />
        <button @click="guardarNombre">Guardar Nombre</button>
        <ul v-if="nombresGuardados.length">
          <li v-for="(nombre, index) in nombresGuardados" :key="index">{{ nombre }}</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import { collection, addDoc,getDocs} from "firebase/firestore";
  import db from "@/controllers/firebaseConfig";
  import navbar from "@/components/navbar.vue";
  import { guardarEnIndexedDB, obtenerPendientes, borrarPendiente } from "@/controllers/localDb";
  import Nav2 from "../../pw2/nav2.vue";
  
  export default {
    components: {
      Nav2
    },
    data() {
      return {
        nombre: "",
        nombresGuardados: [],
        onlineStatus: navigator.onLine
      };
    },
    created() {
      window.addEventListener("online", this.updateOnlineStatus);
      window.addEventListener("offline", this.updateOnlineStatus);
      this.cargarDatos();
    },
    beforeDestroy() {
      window.removeEventListener("online", this.updateOnlineStatus);
      window.removeEventListener("offline", this.updateOnlineStatus);
    },
    methods: {
      updateOnlineStatus() {
        this.onlineStatus = navigator.onLine;
        if (this.onlineStatus) {
          this.sincronizarDatos(); // Intentar sincronizar al reconectarse
        }
      },
      async guardarNombre() {
        const data = { nombre: this.nombre };
        this.nombresGuardados.push(this.nombre);
        this.nombre = "";
  
        if (this.onlineStatus) {
          try {
            await addDoc(collection(db, "usuarios"), data);
          } catch (error) {
            console.error("Error al guardar en Firebase: ", error);
          }
        } else {
          try {
            await guardarEnIndexedDB(data);
            console.log("Datos guardados en IndexedDB.");
          } catch (error) {
            console.error("Error al guardar en IndexedDB: ", error);
          }
        }
      },
      async sincronizarDatos() {
        if (this.onlineStatus) {
          const pendientes = await obtenerPendientes();
  
          for (const dato of pendientes) {
            try {
              await addDoc(collection(db, "usuarios"), dato);
              await borrarPendiente(dato.id);
            } catch (error) {
              console.error("Error al sincronizar con Firebase: ", error);
            }
          }
        }
      },
      async cargarDatos() {
        const querySnapshot = await getDocs(collection(db, "usuarios"));
        this.nombresGuardados = querySnapshot.docs.map(doc => doc.data().nombre);
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
  .logo {
  display: block;
  margin: 0 auto 2rem;
}
  
  .online {
    color: green;
    font-weight: bold;
  }
  
  .offline {
    color: red;
    font-weight: bold;
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
  
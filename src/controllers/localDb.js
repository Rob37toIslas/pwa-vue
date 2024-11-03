// controllers/localDatabase.js
import { openDB } from "idb";

// Crear o abrir la base de datos en IndexedDB
const dbPromise = openDB("mi-app", 1, {
  upgrade(db) {
    db.createObjectStore("pendientes", { keyPath: "id", autoIncrement: true });
  }
});

// Guardar datos en IndexedDB
export async function guardarEnIndexedDB(data) {
  const db = await dbPromise;
  await db.add("pendientes", data);
}

// Obtener todos los datos pendientes de IndexedDB
export async function obtenerPendientes() {
  const db = await dbPromise;
  return await db.getAll("pendientes");
}

// Borrar un dato de IndexedDB tras sincronización
export async function borrarPendiente(id) {
  const db = await dbPromise;
  await db.delete("pendientes", id);
}

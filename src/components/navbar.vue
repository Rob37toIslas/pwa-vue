<template>
    <nav class="navbar">
      <div class="navbar-logo">
        <h1>Mi App</h1>
      </div>
      <ul class="navbar-links">
        <li><RouterLink to="/">Session Storage</RouterLink></li>
        <li><RouterLink to="/localstorage">Local Storage</RouterLink></li>
        <li><RouterLink to="/indexdb">IndexedDB</RouterLink></li>
      </ul>
    </nav>
  </template>
  
  <style scoped>
  .navbar {
    background-color: #6a0dad; /* Morado */
    color: #fff;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .navbar-logo h1 {
    color: #32cd32; /* Verde */
    margin: 0;
    font-size: 1.5rem;
  }
  
  .navbar-links {
    list-style-type: none;
    display: flex;
    gap: 1rem;
  }
  
  .navbar-links li a {
    color: #ffffff;
    text-decoration: none;
    font-weight: bold;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }
  
  .navbar-links li a:hover {
    background-color: #32cd32; /* Verde */
    color: #6a0dad; /* Morado */
  }
  </style>
  
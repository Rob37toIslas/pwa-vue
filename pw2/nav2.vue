<template>
    <nav class="navbar">
      <div class="navbar-logo">
        <h1>Mi App 2</h1>
      </div>
      <ul class="navbar-links">
        <li><RouterLink to="/">Zincronizar Data local y remonta</RouterLink></li>
      </ul>
    </nav>
  </template>
  
  <style scoped>
  .navbar {
    background-color: #d60000; /* Morado */
    color: #fff;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .navbar-logo h1 {
    color: #ffffff; /* Verde */
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
    background-color: #cd3232; /* Verde */
    color: #fff; /* Morado */
  }
  </style>
  
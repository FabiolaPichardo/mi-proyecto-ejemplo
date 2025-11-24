/**1. En una ruta dinámica [userId], Next.js pasa un objeto params con los valores de la URL 
    Ejemplo: url.../users/123
    produce: params = { userId: "123" }*/
interface detalleUsuario {
  params: {userId: string;};
}

/**2. Este "metodo" recibe el objeto params con el valor que obtuvo de la URL 
 * y asigna ese valor a la variable userId */
export default function UserDetai({ params }: detalleUsuario) {
  const userId = params.userId;

/** 3. Despues ya solo se muestra un mensaje y se "imprime" el userId */
  return (
    <div>
      <h3>Detalles del Usuario (servidor)</h3>
      <p>ID del usuario: {userId}</p>
    </div>
  );
}
  /*"use client";   //porque lo del cliente se ejecuta en el navegador //sin el use client
import React from 'react'
import { useParams } from 'next/navigation';  //useParams es de cliente, y es para leer la ruta dinámica

export default function UserDetail() {
  const {userId} = useParams();   //userId es la ruta dinamica, y el useParams guarda el numerito

  return (
    <div>
     <h1>Detalles del Usuario</h1>
    <p>ID del usuario: {userId}</p> 
    </div>
  );
}*/


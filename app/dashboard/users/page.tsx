import React from 'react'
import Link from 'next/link'

export default function Users() {
  return (
    <div>
        <h1>LISTA DE USUARIOS</h1>
        <ul>
            <li><Link href={"/dashboard/users/1"}>Peter D</Link></li>
            <li><Link href={"/dashboard/users/2"}>Kenzo t</Link></li>
            <li><Link href={"/dashboard/users/3"}>John D</Link></li>
        </ul>
    </div>
  )
}

/**Rutas, Rutas anidadas, rutas dinamicas[] */

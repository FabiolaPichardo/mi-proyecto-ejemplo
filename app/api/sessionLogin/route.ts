/*Una cookie es un archivo de texto que se guarda en el navegador */

import { adminAuth } from "@/lib/firebase-admin";
import { NextResponse } from "next/server";

/* ?? significa que si no hay valor a la izquierda, toma el de la derecha */
const COOKIE = process.env.SESSION_COOKIE_NAME ?? '__session';
const MAX_AGE = Number(process.env.SESSION_COOKIE_MAX_AGE ?? 60 * 60 * 8);

/*var estudiante = {
    id: 1,
    nombre: "F. Axel",
    curso: "Programación Web",
    email: "sweetieboy@gmail.com"
}*/

/*get(recive), post(envia y recive), put, patch, delete, header */
/**asincrono = se ejecuta independientemente, permite que el proceso (POST) se pueda pausar */
export async function POST(req: Request){
/**TAREA:
 * - Cómo consumir(mandar llamar un método de la API) el post desde el login? 
 * - imprimirlo en consola
 * - saber ejecutar/hacer que devuelva error 400, 401, ok y qué muestra?*/    
    try{
        
        const{ idToken, remember } = await req.json();

        /*status: 400 --> la solicitud no puede ser procesada */
        if(!idToken) return NextResponse.json(
            { error:"Falta idToken" }, 
            { status: 400 }
        );
       
        /* - duración de la sesion 
           - (si_dato ? entoces_valor1 : si_no valor 2)
           - * 100 es por milisegundos */
        const expiresIn = (remember ? MAX_AGE : 2 * 60 * 60) * 1000;
        /**await =  proceso en espera de que otro termine*/
        const sessionCookie = await adminAuth.createSessionCookie(idToken, {expiresIn});

        const res = NextResponse.json ({ ok: "true"});
        res.cookies.set(COOKIE, sessionCookie, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",      /**dato booleano, === compara valor y tipo de dato, == compara valor */
            sameSite: "lax",         /**la cookie se envia solo en esta pagina web */
            path: "/",               /**todo el sitio web */
            maxAge: remember ? MAX_AGE : undefined,
        });
        return res; 

        /*const idAlumno = estudiante.id;
        const nombreAlumno = estudiante.nombre;
        **Hacen lo mismo
        const { idAlumno, nombreAlumno } = estudiante;*/

    }catch{
        return NextResponse.json(
            { error: "No se pudo crear la cookie de sesión" },
            { status: 401 }     /* error 401: "No sé quién eres, tus credenciales no sirven", algo falló en createSessionCookie */
        );
    }
}
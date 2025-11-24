"use client";
import Link from "next/link";
// Los componentes cliente se ejecutan en el navegador:
import { useState } from "react";   // 1. importar useState
import Header from "@/components/Header";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase-client";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { signInWithCredential } from "firebase/auth/web-extension";


/** CREACIÓN DE FORMULARIOS 
    1. Importar useState y Crear estados para cada campo
    2. Crear una función onSubmit
    3. Validar datos y manejar errores
    4. Hacer inputs con value y onChange  **/

// app/sign-up/page.tsx
//1.1. Cada formulario se define dentro de un COMPONENTE DE FUNCIÓN:
export default function SignUpPage() {
/*1.2. ESTADOS para guardar lo que el usuario escribe: [estadoActual, funcionActualizadora]*/
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Función para obtener mensajes de error de Firebase en español
  function getFirebaseErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'Este email ya está registrado. Intenta con otro email o inicia sesión.';
      case 'auth/invalid-email':
        return 'El formato del email no es válido.';
      case 'auth/operation-not-allowed':
        return 'El registro con email/contraseña no está habilitado.';
      case 'auth/weak-password':
        return 'La contraseña es muy débil. Debe tener al menos 8 caracteres.';
      case 'auth/network-request-failed':
        return 'Error de conexión. Verifica tu internet e intenta de nuevo.';
      case 'auth/too-many-requests':
        return 'Demasiados intentos fallidos. Intenta de nuevo más tarde.';
      default:
        return 'Ocurrió un error inesperado. Intenta de nuevo.';
    }
  }


  // 2. FUNCIÓN que se ejecuta cuando se ENVÍA el formulario
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();   // evita que la página se recargue

    // Limpiar errores y mensajes previos
    setError(null);
    setSuccess(null);

    // 3. VALIDACIONES básicas
    // Verificar que las contraseñas coincidan: Está en el indicador de contraseñas
    // Verificar que el usuario acepte los terminos y condiciones: Está en el checkbox

    // Verificar que todos los campos estén llenos
    if (!name.trim()) {
      setError('El nombre es requerido.');
      return;
    }
    if (!email.trim()) {
      setError('El email es requerido.');
      return;
    }

    //Verificar formato del email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Verificar si contiene @
    if (!email.includes('@')) {
      setError('El email debe incluir el símbolo @ (ejemplo: usuario@dominio.com).');
      return;
    }
    // Verificar si @ está en posición correcta
    const atIndex = email.indexOf('@');
    if (atIndex === 0) {
      setError('El email debe tener texto antes del símbolo @ (ejemplo: usuario@dominio.com).');
      return;
    }
    if (atIndex === email.length - 1) {
      setError('El email debe tener texto después del símbolo @ (ejemplo: usuario@dominio.com).');
      return;
    }
    // Verificar formato completo
    if (!emailRegex.test(email)) {
      setError('Por favor ingresa un email válido (ejemplo: usuario@dominio.com).');
      return;
    }

    //Verificar que el campo contraseña esté lleno
    if (!password.trim()) {
      setError('La contraseña es requerida.');
      return;
    }

    //Verificar longitud mínima de contraseña
    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    // Iniciar estado de carga
    setLoading(true);

    try {
      // Crear usuario con Firebase
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Usuario creado exitosamente: ", cred.user);    /* Para poder ver en consola qué valores recibe */
      setSuccess(`Cuenta creada. Ya puedes iniciar sesión.`);
      // Limpiar formulario
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setTermsAccepted(false);


    } catch (error: unknown) {
      console.error("Error al crear el usuario: ", error);

      // Primero se comprueba que el error tiene una propiedad "code" (Firebase)
      if (typeof error === "object" && error !== null && "code" in error) {
        const firebaseError = error as { code: string };
        const errorMessage = getFirebaseErrorMessage(firebaseError.code);
        setError(errorMessage);
      } else {
        setError("Ocurrió un error inesperado.");
      }

    } finally {
      // Terminar estado de carga
      setLoading(false);
    }
  }

  /* Metodo para hacer cuenta con google */
  const signupWithGoogle = () => {
    /*console.log("Continuar con Google")*/
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    const user = result.user;

    // IF: Si la credencial es nula mostrar mensaje, si no, continuar 
      if (!credential) {
        setError('No se pudieron obtener las credenciales de Google. Intenta de nuevo.');
        return;
      }
      else{
        console.log("Usuario Google:", user);
        console.log("Token de acceso:", token);
        setSuccess(`Cuenta registrada.`);
      }
    })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error en inicio de sesión Google:", errorCode, errorMessage);
      });
  };

  return (
    <>
      <Header showLoginButton={true} showSignUpButton={false} />
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-#fa2e90">
        {/* Contenedor principal */}
        <div className="relative w-full h-full px-4 sm:px-6 lg:px-8 xl:px-12 py-16 sm:py-20">
          {/* Grid con gap */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center h-full max-w-none">
            {/* Sección informativa */}
            <div className="text-center lg:text-left px-4 lg:px-8 xl:px-12">

              {/* Título principal */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight text-white mb-6">
                Crea tu cuenta y comienza a construir
              </h1>

              {/* Descripción */}
              <p className="text-white text-lg sm:text-xl lg:text-2xl leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
                Regístrate para acceder a todas las funcionalidades y llevar tus proyectos al siguiente nivel.
              </p>

              {/* Botones */}
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-8">
                <Link
                  href="/#features"
                  className="inline-flex items-center justify-center rounded-xl bg-black hover:bg-pink-500 text-withe font-semibold px-6 py-4 text-lg transition-colors"
                >
                  Ver características
                </Link>
                <Link
                  href="/#pricing"
                  className="inline-flex items-center justify-center rounded-xl bg-pink-600 hover:bg-black text-white font-semibold px-6 py-4 text-lg transition-colors"
                >
                  Planes
                </Link>
              </div>

              {/* Texto informativo */}
              <div className="text-sm sm:text-base text-withe font-medium">
                Regístrate gratis. No se requiere tarjeta de crédito.
              </div>
            </div>

            {/* Formulario de registro */}
            <div className="w-full max-w-lg mx-auto lg:mx-0 lg:max-w-none px-4 lg:px-8 xl:px-12">
              <div className="bg-black border border-pink-600 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-sm">
                {/* Header del formulario */}
                <header className="mb-8 text-center">
                  {/* Icono */}
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-xl bg-pink-900 mb-4">

                    <svg
                      viewBox="0 0 24 24"
                      className="w-8 h-8 text-pink-700"
                      fill="pink"
                      aria-hidden="true"
                    >
                      <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-5.33 0-8 2.67-8 6v1h16v-1c0-3.33-2.67-6-8-6Z" />
                    </svg>
                  </div>
                  {/* Crear cuenta */}
                  <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">Crear cuenta</h2>
                  <p className="text-base lg:text-lg text-white">
                    Completa los campos para registrarte.
                  </p>
                </header>

                {/* Mostrar mensaje de error si existe */}
                {error && (
                  <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium">{error}</span>
                    </div>
                  </div>
                )}

                {/* Mostrar mensaje de éxito si existe */}
                {success && (
                  <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium">{success}</span>
                    </div>
                  </div>
                )}

                {/* 4. FORMULARIO 
                  4.1. onSubmit: Se ejecuta cuando el usuario hace clic en “Enviar” */}                              
                <form onSubmit={onSubmit} className="space-y-4">

                  {/* Campo de nombre */}
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-base font-medium text-white"
                    >
                      Nombre
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={name}    // 4.2. El campo muestra lo que hay en el estado
                      onChange={(e) => { setName(e.target.value);    // 4.3. Cuando el usuario escribe se actualiza el estado
                        // Limpiar error si el usuario empieza a escribir
                        if (error && error.includes('nombre')) {
                          setError(null);
                        }
                      }}
                      placeholder="Tu nombre"
                      className="w-full rounded-xl border border-slate-800 bg-slate-900/40 px-4 py-3 text-slate-100 outline-none focus:ring-2 focus:ring-pink-500 text-base"
                    />

                  </div>

                  {/* Campo de email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-base font-medium text-white"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="text"
                      placeholder="tucorreo@dominio.com"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value);
                        // Limpiar error si el usuario empieza a escribir
                        if (error && error.includes('email')) {
                          setError(null);
                        }
                      }}
                      className="w-full rounded-xl border border-slate-800 bg-slate-900/40 px-4 py-3 text-slate-100 outline-none focus:ring-2 focus:ring-pink-500 text-base"
                    />
                  </div>

                  {/* Campo de contraseña */}
                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block text-base font-medium text-white"
                    >
                      Contraseña
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="********"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => { setPassword(e.target.value);
                        // Limpiar error si el usuario empieza a escribir
                        if (error && (error.includes('contraseña') || error.includes('coinciden'))) {
                          setError(null);
                        }
                      }}
                      className="w-full rounded-xl border border-slate-800 bg-slate-900/40 px-4 py-3 text-slate-100 outline-none focus:ring-2 focus:ring-pink-500 text-base"
                    />
                  </div>

                  {/* Campo de confirmación de contraseña */}
                  <div>
                    <label
                      htmlFor="confirm"
                      className="mb-2 block text-base font-medium text-white"
                    >
                      Confirmar contraseña
                    </label>
                    <input
                      id="confirm"
                      name="confirm"
                      type="password"
                      placeholder="********"
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={(e) => { setConfirmPassword(e.target.value);
                        // Limpiar error si el usuario empieza a escribir
                        if (error && error.includes('coinciden')) {
                          setError(null);
                        }
                      }}
                      className={`w-full rounded-xl border px-4 py-3 text-slate-100 outline-none text-base transition-colors ${confirmPassword && password
                        ? password === confirmPassword
                          ? 'border-emerald-500 bg-slate-900/40 focus:ring-2 focus:ring-pink-500'
                          : 'border-red-500 bg-red-500/5 focus:ring-2 focus:ring-red-500'
                        : 'border-slate-800 bg-slate-900/40 focus:ring-2 focus:ring-pink-500'
                        }`}
                    />
                    {/* Indicador de coincidencia de contraseñas */}
                    {confirmPassword && password && (
                      <div className={`mt-2 text-sm flex items-center gap-2 ${password === confirmPassword ? 'text-emerald-400' : 'text-red-400'}`}>
                        {password === confirmPassword ? (
                          <>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Las contraseñas coinciden
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            Las contraseñas no coinciden
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Terminos y condiciones */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-base">
                    <label className={`inline-flex items-center gap-3 cursor-pointer transition-colors ${termsAccepted ? 'text-slate-300' : 'text-slate-400'
                      }`}>
                      <input
                        type="checkbox"
                        className={`rounded border-2 transition-colors ${termsAccepted
                          ? 'border-emerald-500 bg-emerald-500 text-white'
                          : 'border-slate-600 bg-slate-900 hover:border-slate-500'
                          }`}
                        checked={termsAccepted}
                        onChange={(e) => {
                          setTermsAccepted(e.target.checked);
                          // Limpiar error si el usuario acepta los términos
                          if (e.target.checked && error === 'Debes aceptar los términos y condiciones para continuar.') {
                            setError(null);
                          }
                        }}
                      />
                      <span className="select-none">
                        Acepto los{' '}
                        <a href="/terms" className="text-pink-400 hover:text-pink-300 underline">
                          términos y condiciones
                        </a>{' '}
                        y la{' '}
                        <a href="/privacy" className="text-pink-400 hover:text-pink-300 underline">
                          política de privacidad
                        </a>
                      </span>
                    </label>
                    <a href="/login" className="text-slate-300 hover:text-white font-medium">
                      ¿Ya tienes cuenta?
                    </a>
                  </div>

                  {/* Botón Crear Cuenta */}
                  <button
                    type="submit"
                    disabled={loading}    /* 5.1. Se desactiva mientras la cuenta se está creando */
                    className={`w-full inline-flex items-center justify-center rounded-xl font-bold px-6 py-4 text-lg transition-colors ${loading
                      ? 'bg-slate-600 cursor-not-allowed text-slate-300'
                      : 'bg-pink-700 hover:bg-pink-400 text-white'
                      }`}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creando cuenta...   
                      </>     /*Se muestra mensaje mientras se crea la cuenta */
                    ) : (
                      'Crear cuenta'
                    )}
                  </button>
                </form>


                {/* Division */}
                <div className="my-8 flex items-center gap-4">
                  <div className="h-px flex-1 bg-slate-800" />
                  <span className="text-sm text-slate-400 font-medium">o</span>
                  <div className="h-px flex-1 bg-slate-800" />
                </div>

                {/* Botón de Google */}
                <button
                  className="w-full rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-pink-400 px-6 py-4 font-semibold text-slate-100 inline-flex items-center justify-center gap-3 text-lg transition-colors"
                  aria-label="Continuar con Google"
                  type="button"
                  onClick={() => signupWithGoogle()}
                >

                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M21.35 11.1h-9.18v2.98h5.27a4.52 4.52 0 0 1-1.95 2.96 6.06 6.06 0 0 1-3.32.96 6.06 6.06 0 0 1-4.28-1.78 6.26 6.26 0 0 1-1.76-4.4 6.25 6.25 0 0 1 1.76-4.4 6.06 6.06 0 0 1 4.28-1.78c1.46 0 2.78.5 3.82 1.33l2.1-2.1A9.3 9.3 0 0 0 12.17 2 9.1 9.1 0 0 0 5.7 4.7 9.25 9.25 0 0 0 3 11.82a9.25 9.25 0 0 0 2.7 7.12A9.1 9.1 0 0 0 12.17 22c2.49 0 4.57-.82 6.08-2.37 1.56-1.56 2.41-3.77 2.41-6.42 0-.68-.05-1.28-.31-2.11Z" />
                  </svg>
                  Continuar con Google
                </button>

                {/* Enlace de ayuda */}
                <p className="mt-8 text-center text-base text-slate-400">
                  ¿Necesitas ayuda?{" "}
                  <Link
                    href="/#faq"
                    className="text-pink-400 hover:text-white font-semibold"
                  >
                    FAQ
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 text-center text-base text-slate-400 bg-slate-950/50">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          Hecho con Tailwind · © 2025
        </div>
      </footer>
    </>
  );
}
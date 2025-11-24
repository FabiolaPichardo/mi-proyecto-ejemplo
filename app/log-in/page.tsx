"use client";
import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase-client";


export default function LogInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Limpiar mensajes previos
    setError(null);
    setSuccess(null);

    // Validaciones básicas
    if (!email.trim()) {
      setError('El email es requerido.');
      return;
    }
    if (!password.trim()) {
      setError('La contraseña es requerida.');
      return;
    }

    setLoading(true);

    try {
      // 1. Primero hacer login con Firebase para obtener el token
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      console.log("Token obtenido:", idToken);

      // 2. Enviar el token a la API
      const res = await fetch("/api/sessionLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          idToken,    //OK: Token válido obtenido de Firebase
          //idToken: "TOKEN_INVALIDO",        //Error 401: Token inválido
          //idToken: undefined,               //Error 400: Sin idToken
          remember: false
        })
      });

      const data = await res.json();

      if (res.ok) {
        console.log("✅ Login exitoso");
        setSuccess("Sesión iniciada correctamente");
      } else {
        console.error("Error:", data.error);
        setError(data.error || "Error al iniciar sesión");
      }

    } catch (error: unknown) {
      console.error("Error:", error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("No se pudo conectar con el servidor");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header showLoginButton={false} />
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-#fa2e90">
        {/* Contenedor principal */}
        <div className="relative w-full h-full px-4 sm:px-6 lg:px-8 xl:px-12 py-16 sm:py-20">
          {/* Formulario de login centrado */}
          <div className="flex items-center justify-center h-full">
            <div className="w-full max-w-lg mx-auto">
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
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                    </svg>
                  </div>
                  {/* Iniciar sesión */}
                  <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">Iniciar sesión</h2>
                  <p className="text-base lg:text-lg text-white">
                    Ingresa tus credenciales para continuar.
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

                {/* Formulario */}
                <form onSubmit={onSubmit} className="space-y-4">
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
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error && error.includes('email')) {
                          setError(null);
                        }
                      }}
                      placeholder="tucorreo@dominio.com"
                      autoComplete="email"
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
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (error && error.includes('contraseña')) {
                          setError(null);
                        }
                      }}
                      placeholder="********"
                      autoComplete="current-password"
                      className="w-full rounded-xl border border-slate-800 bg-slate-900/40 px-4 py-3 text-slate-100 outline-none focus:ring-2 focus:ring-pink-500 text-base"
                    />
                  </div>

                  {/* Recordar sesión y recuperar contraseña */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-base">
                    <label className="inline-flex items-center gap-3 cursor-pointer text-slate-300">
                      <input
                        type="checkbox"
                        className="rounded border-2 border-slate-600 bg-slate-900 hover:border-slate-500"
                      />
                      <span className="select-none">Recordar sesión</span>
                    </label>
                    <a href="/forgot-password" className="text-pink-400 hover:text-pink-300 font-medium">
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>

                  {/* Botón Iniciar Sesión */}
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full inline-flex items-center justify-center rounded-xl font-bold px-6 py-4 text-lg transition-colors ${
                      loading
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
                        Iniciando sesión...
                      </>
                    ) : (
                      'Iniciar sesión'
                    )}
                  </button>
                </form>

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
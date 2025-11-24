"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
//? significa que una variable es opcional, tenemos que asignar un default
type Props = {
  showLoginButton: boolean;
  showSignUpButton?: boolean;
};

//aqui asignamos el default para showSignUpButton que es true
export default function Header({
  showLoginButton = true,
  showSignUpButton = true
}:
  Props) {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-[#13000c7e] border-b border-pink-800">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-6">
        <div className="font-bold text-lg tracking-tight">
          PrograWeb<span className="text-pink-400">.tec</span>
        </div>
        <nav className="ml-auto hidden md:flex gap-6 text-sm text-pink-200">
          <a href="#features" className="hover:text-white">
            Características
          </a>
          <a href="#pricing" className="hover:text-white">
            Precios
          </a>
          <a href="#faq" className="hover:text-white">
            FAQ
          </a>
        </nav>
        <div className="ml-6">
          {showLoginButton && (
            <Link
              href="/log-in"
              className="inline-flex items-center rounded-xl hover:bg-pink-400 hover:text-black text-white font-semibold px-4 py-2 text-sm"
            >
              Iniciar sesión
            </Link>
          )}

          <Link
            href="/sign-up"
            className="ml-1 inline-flex items-center rounded-xl bg-black text-white hover:bg-pink-400 hover:text-black font-semibold px-4 py-2 text-sm"
          >
            Registrate
          </Link>
        </div>
      </div>
    </header>
  );
}
module.exports = [
"[project]/OneDrive - Instituto Tecnológico de Toluca/Proyectos Programación Web/mi-proyecto-ejemplo/.next-internal/server/app/api/sessionLogin/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/firebase-admin/app [external] (firebase-admin/app, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("firebase-admin/app");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[externals]/firebase-admin/auth [external] (firebase-admin/auth, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("firebase-admin/auth");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/OneDrive - Instituto Tecnológico de Toluca/Proyectos Programación Web/mi-proyecto-ejemplo/lib/firebase-admin.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "adminApp",
    ()=>adminApp,
    "adminAuth",
    ()=>adminAuth
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/firebase-admin/app [external] (firebase-admin/app, esm_import)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$auth__$5b$external$5d$__$28$firebase$2d$admin$2f$auth$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/firebase-admin/auth [external] (firebase-admin/auth, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$auth__$5b$external$5d$__$28$firebase$2d$admin$2f$auth$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$auth__$5b$external$5d$__$28$firebase$2d$admin$2f$auth$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
const adminApp = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$29$__["getApps"])().length ? (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$29$__["getApps"])()[0] : (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$29$__["initializeApp"])({
    credential: privateKey && clientEmail ? (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$29$__["cert"])({
        projectId,
        clientEmail,
        privateKey
    }) : (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$29$__["applicationDefault"])()
});
const adminAuth = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$auth__$5b$external$5d$__$28$firebase$2d$admin$2f$auth$2c$__esm_import$29$__["getAuth"])(adminApp);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[project]/OneDrive - Instituto Tecnológico de Toluca/Proyectos Programación Web/mi-proyecto-ejemplo/app/api/sessionLogin/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

/*Una cookie es un archivo de texto que se guarda en el navegador */ __turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive__$2d$__Instituto__Tecnol$f3$gico__de__Toluca$2f$Proyectos__Programaci$f3$n__Web$2f$mi$2d$proyecto$2d$ejemplo$2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive - Instituto Tecnológico de Toluca/Proyectos Programación Web/mi-proyecto-ejemplo/lib/firebase-admin.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive__$2d$__Instituto__Tecnol$f3$gico__de__Toluca$2f$Proyectos__Programaci$f3$n__Web$2f$mi$2d$proyecto$2d$ejemplo$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive - Instituto Tecnológico de Toluca/Proyectos Programación Web/mi-proyecto-ejemplo/node_modules/next/server.js [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive__$2d$__Instituto__Tecnol$f3$gico__de__Toluca$2f$Proyectos__Programaci$f3$n__Web$2f$mi$2d$proyecto$2d$ejemplo$2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive__$2d$__Instituto__Tecnol$f3$gico__de__Toluca$2f$Proyectos__Programaci$f3$n__Web$2f$mi$2d$proyecto$2d$ejemplo$2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
/* ?? significa que si no hay valor a la izquierda, toma el de la derecha */ const COOKIE = process.env.SESSION_COOKIE_NAME ?? '__session';
const MAX_AGE = Number(process.env.SESSION_COOKIE_MAX_AGE ?? 60 * 60 * 8);
async function POST(req) {
    /**TAREA:
 * - Cómo consumir(mandar llamar un método de la API) el post desde el login? 
 * - imprimirlo en consola
 * - saber ejecutar/hacer que devuelva error 400, 401, ok y qué muestra?*/ try {
        const { idToken, remember } = await req.json();
        /*status: 400 --> la solicitud no puede ser procesada */ if (!idToken) return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive__$2d$__Instituto__Tecnol$f3$gico__de__Toluca$2f$Proyectos__Programaci$f3$n__Web$2f$mi$2d$proyecto$2d$ejemplo$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Falta idToken"
        }, {
            status: 400
        });
        /* - duración de la sesion 
           - (si_dato ? entoces_valor1 : si_no valor 2)
           - * 100 es por milisegundos */ const expiresIn = (remember ? MAX_AGE : 2 * 60 * 60) * 1000;
        /**await =  proceso en espera de que otro termine*/ const sessionCookie = await __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive__$2d$__Instituto__Tecnol$f3$gico__de__Toluca$2f$Proyectos__Programaci$f3$n__Web$2f$mi$2d$proyecto$2d$ejemplo$2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminAuth"].createSessionCookie(idToken, {
            expiresIn
        });
        const res = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive__$2d$__Instituto__Tecnol$f3$gico__de__Toluca$2f$Proyectos__Programaci$f3$n__Web$2f$mi$2d$proyecto$2d$ejemplo$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: "true"
        });
        res.cookies.set(COOKIE, sessionCookie, {
            httpOnly: true,
            secure: ("TURBOPACK compile-time value", "development") === "production",
            /**dato booleano, === compara valor y tipo de dato, == compara valor */ sameSite: "lax",
            /**la cookie se envia solo en esta pagina web */ path: "/",
            /**todo el sitio web */ maxAge: remember ? MAX_AGE : undefined
        });
        return res;
    /*const idAlumno = estudiante.id;
        const nombreAlumno = estudiante.nombre;
        **Hacen lo mismo
        const { idAlumno, nombreAlumno } = estudiante;*/ } catch  {
        return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive__$2d$__Instituto__Tecnol$f3$gico__de__Toluca$2f$Proyectos__Programaci$f3$n__Web$2f$mi$2d$proyecto$2d$ejemplo$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "No se pudo crear la cookie de sesión"
        }, {
            status: 401
        } /* error 401: "No sé quién eres, tus credenciales no sirven", algo falló en createSessionCookie */ );
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f3d1aa50._.js.map
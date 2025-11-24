import styles from "./Hero.module.css";

export default function Hero() {
    return(
        <section className={styles.hero} aria-labelledby="hero-component-title"> 
            <div className={styles.inner}>
                <h2 id="hero-component-title">Aprendiendo componentes</h2>
                <p>Primero aprendemos plano y luego construimos con componentes</p>
                <a href="/sign-up" className={styles.cta}>¡Vamos!</a>
            </div>
        </section>
    );
}
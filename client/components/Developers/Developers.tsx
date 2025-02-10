import styles from './Developers.module.scss'

const developers = [
  { src: "/Salavat.jpg", name: "Салават Сафин", desc: "Главный по кофе и багам. Может исправить всё, если успеет допить эспрессо." },
  { src: "/Den.jpg", name: "Денис Стариков", desc: "Дизайнер, который заставляет код выглядеть красиво. Плачет, когда видит `!important`." },
  { src: "/Sanek.jpg", name: "Александр Дегтярев", desc: "Backend-маг, разговаривает с базами данных, как с домашними питомцами." },
  { src: "/Danil.jpg", name: "Данил Южаков", desc: "Фронтенд-разработчик. Делает кнопки красивыми и жизнь пользователей удобнее." },
  { src: "/Max.jpeg", name: "Максим Тямаков", desc: "Главный Хокагэ деревни Листа, держит в тонусе булки у всего племени!" },
]

const Developers = () => {
  return (
    <div className={styles.developersContainer}>
      <h1>Разработчики</h1>
      <p>Эти люди сделали "Костерчик" возможным! 🔥</p>

      <div className={styles.gallery}>
        {developers.map((dev, index) => (
          <div key={index} className={styles.devCard}>
            <img src={dev.src} alt={dev.name} />
            <p className={styles.devDescription}><strong>{dev.name}</strong></p>
            <p className={styles.devDescription}>{dev.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Developers
import { motion } from 'framer-motion'

const hobbies = [
  { title: 'Nationally Ranked Judoka' },
  { title: 'Motorsports Enthusiast' },
  { title: 'Game Developer' },
  { title: 'Volleyball' },
]

export default function Hobbies() {
  return (
    <section id="hobbies" className="section-padding bg-black">
      <div className="max-w-5xl mx-auto text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white uppercase tracking-wider">
            Hobbies
          </h2>
          <div className="h-0.5 w-12 bg-white mx-auto opacity-20" />
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6">
          {hobbies.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass border border-white/10 px-10 py-8 hover:border-white/40 transition-all duration-300 group"
            >
              <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] whitespace-nowrap">
                {item.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

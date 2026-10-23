import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, MapPin } from "lucide-react";

const testimonials = [
  { id: 2, stat: "Ideas transformed into impact", author: "INFISQ Innovations", role: "Inspire · Ignite · Innovate", address: "Salem, TN, India", image: "/assets/OurClients/Infisq.jpeg", website: "https://infisq-landing-page.vercel.app/" },
  { id: 3, stat: "A smoother journey for every customer", author: "Dream Country Visas", role: "Visa & Immigration Services", address: "New Delhi, India", image: "/assets/OurClients/DC.jpeg", website: "https://dreamcountryvisas.com/" },
  { id: 4, stat: "Tradition presented beautifully online", author: "Arulmathi Pattu Selaigal", role: "Silks & Traditional Fashion", address: "Salem, TN, India", image: "/assets/OurClients/ArulmathiSilks.jpeg", website: "https://arulmathisilks.com/" },
  { id: 5, stat: "Gold shopping, reimagined online", author: "Athirai", role: "Gold Jewellery E-Commerce", address: "Salem, TN, India", image: "/assets/OurClients/Athirai-logo.png", website: "https://www.infisq.com/" },
  { id: 1, stat: "Smarter customer conversations", author: "WhatsApp AI Agent", role: "Automation Solutions", address: "Salem, TN, India", image: "/assets/OurClients/WhatsappAutomation.jpeg", website: "https://whatsappaiagent.in/" },
  { id: 6, stat: "Technology empowering future engineers", author: "Excel Engineering College", role: "Technical Collaborator", address: "Komarapalayam, Namakkal, India", image: "/assets/OurClients/ExcelCollege.png", website: "https://excelinstitutions.com/excel_engg/" },
  { id: 7, stat: "Innovation through academic collaboration", author: "Gnanamani College of Technology", role: "Technical Collaborator", address: "Pachal, Namakkal, India", image: "/assets/OurClients/GnanamaniCollege.png", website: "https://www.gct.org.in/" },
];

const wrapIndex = (value, length) => ((value % length) + length) % length;

export default function Testimonials() {
  const [page, setPage] = useState(0);
  const isPointerInside = useRef(false);
  const total = testimonials.length;

  const move = useCallback((direction) => {
    setPage((current) => current + direction);
  }, []);

  useEffect(() => {
    const autoScroll = window.setInterval(() => {
      if (!isPointerInside.current) {
        setPage((current) => current + 1);
      }
    }, 4500);
    return () => window.clearInterval(autoScroll);
  }, []);

  return (
    <section
      id="testimonials"
      className="testimonials"
      aria-labelledby="testimonials-title"
      onMouseEnter={() => { isPointerInside.current = true; }}
      onMouseLeave={() => { isPointerInside.current = false; }}
    >
      <div className="testimonials-heading">
        <div>
          <div className="eyebrow reveal">Testimonials</div>
          <h2 id="testimonials-title">What Our Clients Say</h2>
          <p>Real feedback from businesses we've had the privilege to work with.</p>
        </div>
      </div>

      <div className="testimonial-stage" role="region" aria-roledescription="carousel" aria-label="Customer stories"
        onKeyDown={(event) => { if (event.key === "ArrowLeft") move(-1); if (event.key === "ArrowRight") move(1); }} tabIndex="0">
        <AnimatePresence initial={false} mode="popLayout">
        {[-2, -1, 0, 1, 2].map((offset) => {
          const item = testimonials[wrapIndex(page + offset, total)];
          const isActive = offset === 0;
          return (
            <motion.article key={item.id} layout="position"
              className={`testimonial-card offset-${offset < 0 ? `m${Math.abs(offset)}` : offset}${isActive ? " active" : ""}`}
              initial={{ opacity: 0, x: offset < 0 ? -90 : 90, scale: .92 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: offset < 0 ? -90 : 90, scale: .92 }}
              transition={{ layout: { type: "spring", stiffness: 115, damping: 22, mass: .9 }, opacity: { duration: .45 }, x: { duration: .65, ease: [0.16, 1, 0.3, 1] }, scale: { duration: .55, ease: [0.16, 1, 0.3, 1] } }}
              onClick={() => !isActive && move(offset)} aria-hidden={!isActive}>
              {isActive ? (
                <>
                  <div className="testimonial-copy">
                    <h3>{item.stat}</h3>
                    <div className="testimonial-person">
                      <strong>{item.author}</strong>
                      <span>{item.role}</span>
                      <div className="testimonial-address">
                        <MapPin aria-hidden="true" />
                        <span>{item.address}</span>
                      </div>
                      {item.website && (
                        <a className="testimonial-website" href={item.website} target="_blank" rel="noreferrer">
                          Visit website
                          <ExternalLink aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </div>
                  <motion.div className="testimonial-logo-wrap"
                    initial={{ opacity: 0, scale: 0.82, rotateY: -12 }}
                    animate={{ opacity: 1, scale: [1, 1.025, 1], y: [0, -8, 0], rotateY: 0 }}
                    transition={{ opacity: { duration: .5 }, rotateY: { duration: .65 }, scale: { duration: 4.2, repeat: Infinity, ease: "easeInOut" }, y: { duration: 4.2, repeat: Infinity, ease: "easeInOut" } }}>
                    <img src={item.image} alt={`${item.author} logo`} draggable="false" /><span aria-hidden="true" />
                  </motion.div>
                </>
              ) : <div className="testimonial-logo-wrap compact"><img src={item.image} alt="" draggable="false" /></div>}
            </motion.article>
          );
        })}
        </AnimatePresence>
      </div>

    </section>
  );
}

import { testimonials } from '../constants'

export default function Testimonials() {
  return (
    <section id="testimonials" className="section wrap center">
      <div className="eyebrow reveal">Client Love</div>
      <h2 className="sec-title reveal reveal-delay-1">
        What Our <span className="c">Clients Say</span>
      </h2>
      <div className="tgrid">
        {testimonials.map(([avatar, name, role, text], index) => (
          <div className={`tcard reveal reveal-delay-${index + 1}`} key={name}>
            <div className="stars">★★★★★</div>
            <p className="ttext">{text}</p>
            <div className="tauthor">
              <div className="tavatar">{avatar}</div>
              <div>
                <div className="tname">{name}</div>
                <div className="trole">{role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

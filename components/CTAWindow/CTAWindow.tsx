"use client";
import "./CTAWindow.css";

import Image from "next/image";
import Copy from "../Copy/Copy";

interface CTAWindowProps {
  img: string;
  header: string;
  callout: string;
  description: string;
}

const CTAWindow: React.FC<CTAWindowProps> = ({
  img,
  header,
  callout,
  description,
}) => {
  return (
    <section className="cta-window">
      <div className="container">
        <div className="cta-window-img-wrapper">
          {/* ✅ Remplacement du <img> par le composant <Image /> */}
          <Image
            src={img}
            alt={header}
            fill
            priority
            sizes="100vw"
            className="cta-window-img"
          />
        </div>

        {/* Overlay inchangé */}
        <div className="cta-window-img-overlay"></div>

        <div className="cta-window-header">
          <Copy delay={0.1}>
            <h1>{header}</h1>
          </Copy>
        </div>

        <div className="cta-window-footer">
          <div className="cta-window-callout">
            <Copy delay={0.1}>
              <h3>{callout}</h3>
            </Copy>
          </div>

          <div className="cta-window-description">
            <Copy delay={0.1}>
              <p>{description}</p>
            </Copy>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTAWindow;

import Copy from "@/components/Copy/Copy";
import "./price.css";
import Nav from "@/components/Nav/Nav";

export default function PricePage() {
  const siteOffers = [
    {
      title: "Site Web Vitrine",
      pages: "1 page",
      price: "1000€",
      priceAssociation: "800€",
      description:
        "Offrez à votre entreprise une présence en ligne avec un site web One Page au design unique et personnalisé. Entièrement responsive, adapté à tous les écrans (ordinateur, tablette, smartphone).",
    },
    {
      title: "Site Web Vitrine",
      pages: "4 pages",
      price: "2000€",
      priceAssociation: "1500€",
      description:
        "Créez un impact fort avec un site vitrine de 4 pages conçu sur mesure pour refléter votre image de marque. Magnifique, fonctionnel et responsive sur tous les types d’appareils.",
    },
    {
      title: "Page Web Supplémentaire",
      pages: "1 page",
      price: "300€",
      priceAssociation: "200€",
      description:
        "Ajoutez une page supplémentaire à votre site web vitrine à un tarif préférentiel. Chaque page bénéficie du même soin et de la même cohérence visuelle.",
    },
  ];

  const appOffers = [
    {
      title: "Site Web E-commerce",
      range: "3000€ - 7000€",
      description:
        "Le coût varie en fonction de la complexité du site. N'hésitez pas à demander un devis personnalisé.",
    },
    {
      title: "Applications Web Simples",
      range: "3000€ - 10 000€",
      description:
        "Ces applications ont généralement des fonctionnalités limitées (tableau de bord simple, gestion basique des utilisateurs) et des interfaces épurées.",
    },
    {
      title: "Applications Web de Complexité Moyenne",
      range: "10 000€ - 30 000€",
      description:
        "Fonctionnalités supplémentaires : intégrations API, systèmes de gestion de contenu, e-commerce, tableaux de bord interactifs, etc.",
    },
    {
      title: "Applications Web Complexes ou sur Mesure",
      range: "30 000€ - 50 000€ +",
      description:
        "Applications sur mesure avec des fonctionnalités avancées (plateformes collaboratives, systèmes métiers, intégrations multiples avec services tiers).",
    },
  ];

  return (
    <>
        <Nav />
        <main className="price-page">
        {/* --- Section 1 : Sites Web --- */}
        <section className="price-section">
            <div className="price-header">
            <Copy delay={0.15}>
                <h1>Tarifs sites web</h1>
            </Copy>
            <Copy delay={0.3}>
                <p>Découvrez notre grille tarifaire</p>
            </Copy>
            </div>


            <div className="price-list">
            {siteOffers.map((offer, index) => (
                <div key={index} className="price-item">
                <div className="price-info">
                    <Copy delay={0.3}>
                        <div className="price-title">{offer.title}</div>
                    </Copy>
                    <Copy delay={0.3}>
                        <div className="price-pages">{offer.pages}</div>
                    </Copy>
                    <Copy delay={0.3}>
                        <div className="price-prices">
                        <span>{offer.price}</span>
                        <span className="association">
                            ({offer.priceAssociation} association)
                        </span>
                        </div>
                    </Copy>
                </div>
                <Copy delay={0.55}>        
                    <p className="price-description">{offer.description}</p>
                </Copy>
                {index < siteOffers.length - 1 && <hr className="divider" />}
                </div>
            ))}
            </div>
        </section>


        {/* --- Section 2 : Applications Web --- */}
        <section className="app-section">
            <div className="app-header">
            <Copy delay={0.15}>
                <h2>Tarifs applications web</h2>
            </Copy>
            <Copy delay={0.3}>
                <p>Découvrez notre grille tarifaire</p>
            </Copy>
            </div>

            <div className="app-list">
            {appOffers.map((app, index) => (
                <div key={index} className="app-item">
                <div className="app-info">
                    <Copy delay={0.15}>
                        <div className="app-title">{app.title}</div>
                    </Copy>
                    <Copy delay={0.15}>
                        <div className="app-range">{app.range}</div>
                    </Copy>
                
                </div>
                <Copy delay={0.3}>
                    <p className="app-description">{app.description}</p>
                </Copy>
                {index < appOffers.length - 1 && <hr className="divider" />}
                </div>
            ))}
            </div>
        </section>


        {/* --- Section 3 : Facilité de Paiement --- */}
        <section className="payment-section">
            <Copy delay={0.15}>
                <h3>Facilité de Paiement</h3>
            </Copy>
            <Copy delay={0.3}>
                <p>
                Si vos moyens sont limités, nous pouvons trouver des solutions pour
                échelonner vos paiements et vous offrir une plus grande flexibilité.
                </p>
            </Copy>
            <Copy delay={0.45}>
                <p>
                Notre priorité est votre satisfaction et votre tranquillité d&apos;esprit.
                N&apos;hésitez pas à nous contacter pour discuter des options disponibles.
                Nous sommes à votre écoute pour trouver la solution la plus adaptée à
                votre situation.
                </p>
            </Copy>
            <Copy delay={0.55}>
                <p>
                Vous pouvez nous joindre par téléphone au{" "}
                <strong>06.23.05.36.10</strong> ou par e-mail via{" "}
                <a href="/contact" className="contact-link">
                    le formulaire de contact
                </a>
                .
                </p>
            </Copy>
        </section>
        </main>
    </>

  );
}


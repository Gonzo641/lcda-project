"use client";
import React from "react";
import "./contact.css";
import { Mail, Phone, MapPin } from "lucide-react";
import Nav from "@/components/Nav/Nav";
import Copy from "@/components/Copy/Copy";

export default function ContactPage() {
  return (
    <> 
        <Nav />
        <section className="contact-section">
            <div className="contact-container">
                {/* Partie gauche : infos de contact */}
                <div className="contact-info">
                    <Copy delay={0.15}>
                        <h2>Contactez-nous</h2>
                    </Copy>
                    <Copy delay={0.25}>
                        <p>
                            Si vous avez une idée, un projet ou une question, nous serions ravis
                            de vous aider à le concrétiser.
                        </p>
                    </Copy>

                    <div className="info-cards">
                        <div className="info-card">
                            <Mail className="icon" />
                            <Copy delay={0.15}>
                                <h4>Email</h4>
                            </Copy>
                            <Copy delay={0.25}>
                                <p>contact@lacimeapps.fr</p>
                            </Copy>
                        </div>

                        <div className="info-card">
                        <Phone className="icon" />
                        <Copy delay={0.15}>
                            <h4>Téléphone</h4>
                        </Copy>
                        <Copy delay={0.25}>
                            <p>
                                +33 6 50 51 64 52
                                <br />
                                +33 6 23 05 36 10
                            </p>
                        </Copy>
                        </div>

                        <div className="info-card full-width">
                        <MapPin className="icon" />
                        <Copy delay={0.15}>
                            <h4>Adresse</h4>
                        </Copy>
                        <Copy delay={0.25}>                            
                            <p>Savoie, 73520 — France</p>
                        </Copy>
                        </div>
                    </div>
                </div>

                {/* Partie droite : formulaire */}
                <form className="contact-form">
                <div className="form-group">
                    <Copy delay={0.15}>
                        <label>Nom et prénom</label>
                    </Copy>
                    <input type="text" placeholder="Entrez votre nom et prénom" />
                </div>

                <div className="form-group">
                    <Copy delay={0.25}>
                        <label>Adresse email</label>
                    </Copy>
                    <input type="email" placeholder="Entrez votre email" />
                </div>

                <div className="form-group">
                    <Copy delay={0.35}>
                        <label>Votre message</label>
                    </Copy>
                    <textarea placeholder="Entrez votre message"></textarea>
                </div>

                <button type="submit" className="btn-submit">
                    Envoyer
                </button>
                </form>
            </div>
        </section>
    </>

  );
}



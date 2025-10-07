"use client";

import Nav from "@/components/Nav/Nav";
import Gallery from "@/components/Gallery/Gallery";

export default function BlueprintsPage() {
  return (
    <>
      <Nav />
      <div className="page blueprints">
        <Gallery />
      </div>
    </>
  );
}
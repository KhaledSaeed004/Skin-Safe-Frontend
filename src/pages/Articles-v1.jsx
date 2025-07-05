import React from "react";
import Card from "../components/Articles/Card";
import Container from "../components/ui/Container";

function Articles() {
  return (
    <>
      <div className="bg-primary relative w-full rounded-4xl py-4">
        <Container>
          <div className="flex flex-row items-center justify-between"></div>
        </Container>

        <div className="bg-primary absolute top-1/2 -left-20 flex aspect-square h-full w-lg -translate-y-1/2 items-center justify-center rounded-full pl-12 text-white shadow-lg">
          <span className="text-3xl font-bold"> Home \ Articles</span>
        </div>
      </div>

      <Container>
        <div className="py-8">
          <Card />
          <Card />
        </div>
      </Container>
    </>
  );
}

export default Articles;

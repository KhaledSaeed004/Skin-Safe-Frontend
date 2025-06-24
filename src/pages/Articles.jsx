import React from "react";
import Card from "./Card";
import Container from "../components/ui/Container";

function Articles() {
  return (
    <>
      <div className="w-full bg-primary py-4 relative rounded-4xl">
        <Container>
          
          <div className="flex flex-row justify-between items-center">
          </div>
        </Container>
        
        <div className="bg-primary absolute top-1/2 -left-20 flex aspect-square h-full w-lg -translate-y-1/2 items-center justify-center rounded-full pl-12 text-white shadow-lg">
          <span className="text-3xl font-bold">  Home \ Articles</span>
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
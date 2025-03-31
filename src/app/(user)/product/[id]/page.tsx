import React from "react";
import CarouselImage from "@/components/ProductDetail/CarouselImage/CarouselImage";
import ProductDetail from "@/components/ProductDetail/ProductDetail";


export type ParamProps = {
  params: Promise<{ id: string }>;
};

export default async function page({ params }: ParamProps) {
  const resolvedParams = await params;
  const productUUID = resolvedParams.id;
  return (
    <section>
      {/* image section */}
      <CarouselImage uuid={productUUID} />
      {/* product detail */}
      <ProductDetail uuid={productUUID} />
    </section>
  );
}

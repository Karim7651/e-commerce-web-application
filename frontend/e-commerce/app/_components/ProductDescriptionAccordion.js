import React from "react";

function ProductDescriptionAccordion({ description }) {
  return (
    <div className="flex justify-center mb-10 mt-5">
      <div className="join join-vertical 2xl: w-[80%] lg:w-[90%]  xs:w-[60%]">
        <div className="collapse collapse-arrow join-item border-base-300 border">
          {/* Change radio to checkbox for collapsibility */}
          <input type="checkbox" name="product-description-accordion" />
          <div className="collapse-title text-xl font-semibold">Product Description</div>
          <div className="collapse-content">
            <ul className="list-disc list-inside">
              {description.map((item, index) => (
                <li key={index} className="mb-2">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDescriptionAccordion;

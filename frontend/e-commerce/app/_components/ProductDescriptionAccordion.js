function ProductDescriptionAccordion({ description }) {
  return (
    <div className="flex justify-center  mt-5 ">
      <div className="join join-vertical xs:w-[100%] ">
        <div className="collapse collapse-arrow join-item border-[0.05rem] border-neutral-600 rounded-md !px-0">
          <input type="checkbox" name="product-description-accordion !px-0" />
          <div className="collapse-title text-xl font-semibold ">Product Description</div>
          <div className="collapse-content ">
            <ul className="list-disc list-inside ">
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

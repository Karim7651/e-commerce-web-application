import Accordion from "../_components/Accordion";

function page() {
  return (
    <div className="mt-32">
      <h1 className="text-7xl text-center ">Frequently asked questions</h1>
      <p className="text-lg text-center mt-4 mb-12">
        Here you'll find answers to the most common questions about our
        services. If you can't find what you're looking for, feel free to
        contact us directly.
      </p>
      <div className="flex justify-center items-start  mb-32 ">
        <Accordion />
      </div>
    </div>
  );
}

export default page;

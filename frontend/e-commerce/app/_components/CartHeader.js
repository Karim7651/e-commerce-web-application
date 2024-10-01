function CartHeader() {
  return (
    <header className="w-[80%] mx-auto py-4 my-5 border-b-[0.15rem] border-neutral-600 ">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold px-2" aria-label="Shopping Cart">
          Shopping Cart
        </h1>

        <div className="relative">
          <span className="text-sm px-2 font-light relative top-3" aria-hidden="true">
            Price
          </span>
        </div>
      </div>
    </header>
  );
}

export default CartHeader;

import { useSelector } from "react-redux";

function PriceCard() {
  const selectedCurrency = useSelector(
    (state) => state.crypto.selectedCurrency,
  );

  const currentPrice = useSelector(
    (state) => state.crypto.currentPrice,
  );

  const currencies = useSelector(
    (state) => state.crypto.currencies,
  );

  const selectedCrypto = currencies.find(
    (currency) => currency.id === selectedCurrency,
  );

  return (
    <div className="w-full text-left md:w-auto">
      <p className="mb-2 text-sm font-medium text-gray-400">
        Current Price
      </p>

      <h2 className="text-lg font-semibold text-white">
        {selectedCrypto
          ? selectedCrypto.name
          : "Loading..."}
      </h2>

      <p className="mt-1 text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {currentPrice !== null
          ? `$${currentPrice.toLocaleString()}`
          : "Loading..."}
      </p>
    </div>
  );
}

export default PriceCard;
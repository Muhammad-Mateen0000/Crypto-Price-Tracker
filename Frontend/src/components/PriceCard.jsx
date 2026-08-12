import { useSelector } from "react-redux";

function PriceCard() {
  const selectedCurrency = useSelector(
    (state) => state.crypto.selectedCurrency
  );

  const currentPrice = useSelector(
    (state) => state.crypto.currentPrice
  );

  const currencyName = {
    bitcoin: "Bitcoin",
    ethereum: "Ethereum",
    solana: "Solana",
    binancecoin: "BNB",
    ripple: "XRP",
  };

  return (
    <div className="w-full text-left md:w-auto">
      <p className="mb-2 text-sm font-medium text-gray-400">
        Current Price
      </p>

      <h2 className="text-lg font-semibold text-white">
        {currencyName[selectedCurrency]}
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
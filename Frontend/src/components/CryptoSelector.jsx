import { useDispatch, useSelector } from "react-redux";
import { setSelectedCurrency } from "../redux/cryptoSlice";

function CryptoSelector() {
  const dispatch = useDispatch();

  const selectedCurrency = useSelector(
    (state) => state.crypto.selectedCurrency
  );

  const handleChange = (event) => {
    dispatch(setSelectedCurrency(event.target.value));
  };

  return (
    <div className="w-full md:max-w-xs">
      <label
        htmlFor="crypto-select"
        className="mb-4 block text-sm font-medium text-gray-400"
      >
        Select Currency
      </label>

      <div className="relative">
        <select
          id="crypto-select"
          value={selectedCurrency}
          onChange={handleChange}
          className="w-full appearance-none cursor-pointer rounded-xl border border-gray-700 bg-[#0b0f19] px-4 py-3 pr-12 text-sm font-medium text-white outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-700"
        >
          <option value="bitcoin">Bitcoin (BTC)</option>
          <option value="ethereum">Ethereum (ETH)</option>
          <option value="solana">Solana (SOL)</option>
          <option value="binancecoin">BNB</option>
          <option value="ripple">XRP</option>
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default CryptoSelector;
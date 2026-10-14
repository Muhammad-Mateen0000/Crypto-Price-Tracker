import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCurrency } from "../redux/cryptoSlice";

function CryptoSelector() {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  const selectedCurrency = useSelector(
    (state) => state.crypto.selectedCurrency,
  );

  const currencies = useSelector(
    (state) => state.crypto.currencies,
  );

  const selectedCrypto = currencies.find(
    (currency) => currency.id === selectedCurrency,
  );

  const handleSelect = (currencyId) => {
    dispatch(setSelectedCurrency(currencyId));
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
    };
  }, []);

  return (
    <div className="w-full md:max-w-xs">
      <label className="mb-4 block text-sm font-medium text-gray-400">
        Select Currency
      </label>

      <div
        ref={dropdownRef}
        className="relative"
      >
        {/* Selected Currency Button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex w-full items-center justify-between rounded-xl border border-gray-700 bg-[#0b0f19] px-4 py-3 text-sm font-medium text-white outline-none transition hover:border-gray-600"
        >
          <span className="truncate">
            {selectedCrypto
              ? `${selectedCrypto.name} (${selectedCrypto.symbol.toUpperCase()})`
              : "Select Currency"}
          </span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`ml-3 h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m6 9 6 6 6-6"
            />
          </svg>
        </button>

        {/* Dropdown Options */}
        {isOpen && (
          <div className="absolute left-0 right-0 z-50 mt-2 overflow-hidden rounded-xl border border-gray-700 bg-[#111827] shadow-2xl">
            <div className="max-h-60 overflow-y-auto p-1.5 crypto-scrollbar">
              {currencies.map((currency) => {
                const isSelected =
                  currency.id === selectedCurrency;

                return (
                  <button
                    key={currency.id}
                    type="button"
                    onClick={() => handleSelect(currency.id)}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition ${
                      isSelected
                        ? "bg-gray-800 text-white"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    <span className="truncate">
                      {currency.name}
                    </span>

                    <span className="ml-3 shrink-0 text-xs uppercase text-gray-500">
                      {currency.symbol}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Custom Scrollbar */}
      <style>{`
        .crypto-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .crypto-scrollbar::-webkit-scrollbar-track {
          background: #0b0f19;
          border-radius: 10px;
        }

        .crypto-scrollbar::-webkit-scrollbar-thumb {
          background: #374151;
          border-radius: 10px;
        }

        .crypto-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #4b5563;
        }

        .crypto-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #374151 #0b0f19;
        }
      `}</style>
    </div>
  );
}

export default CryptoSelector;
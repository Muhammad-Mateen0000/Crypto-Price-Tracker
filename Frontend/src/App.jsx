import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCryptoPrices } from "./services/cryptoApi";
import { addPriceHistory, setCurrentPrice } from "./redux/cryptoSlice";
import CryptoSelector from "./components/CryptoSelector";
import PriceCard from "./components/PriceCard";
import PriceChart from "./components/PriceChart";

function App() {
  const dispatch = useDispatch();

  const selectedCurrency = useSelector(
    (state) => state.crypto.selectedCurrency,
  );

  useEffect(() => {
    const getCryptoPrices = async () => {
      try {
        const data = await fetchCryptoPrices();

        const selectedCrypto = data.find(
          (crypto) => crypto.id === selectedCurrency,
        );

        if (selectedCrypto) {
          const currentPrice = selectedCrypto.current_price;
          const currentTime = new Date().toLocaleTimeString();

          dispatch(setCurrentPrice(currentPrice));

          dispatch(
            addPriceHistory({
              time: currentTime,
              price: currentPrice,
            }),
          );
        }
      } catch (error) {
        console.error("Failed to fetch crypto prices:", error);
      }
    };

    getCryptoPrices();

    const interval = setInterval(() => {
      getCryptoPrices();
    }, 10000);

    return () => clearInterval(interval);
  }, [dispatch, selectedCurrency]);

  return (
    <main className="min-h-screen bg-[#0b0f19] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-4xl">
        <h1 className="mb-8 text-center text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Crypto Price Tracker
        </h1>

        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-800 bg-[#111827] p-5 shadow-xl sm:p-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-end">
              {/* Left Side */}
              <CryptoSelector />

              {/* Right Side */}
              <div className="md:ml-auto">
                <PriceCard />
              </div>
            </div>
          </div>

          <PriceChart />
        </div>
      </div>
    </main>
  );
}

export default App;

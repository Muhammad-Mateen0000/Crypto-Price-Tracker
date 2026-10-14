import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCryptoPrices,
  fetchCryptoHistory,
} from "./services/cryptoApi";
import {
  addPriceHistory,
  setCurrentPrice,
  setCurrencies,
  setLoading,
  setPriceHistory,
} from "./redux/cryptoSlice";
import CryptoSelector from "./components/CryptoSelector";
import PriceCard from "./components/PriceCard";
import PriceChart from "./components/PriceChart";

function App() {
  const dispatch = useDispatch();

  const selectedCurrency = useSelector(
    (state) => state.crypto.selectedCurrency,
  );

  const selectedInterval = useSelector(
    (state) => state.crypto.selectedInterval,
  );

  useEffect(() => {
    if (selectedInterval === "seconds") {
      return;
    }

    const getHistoricalData = async () => {
      try {
        dispatch(setLoading(true));

        const data = await fetchCryptoHistory(
          selectedCurrency,
          1,
        );

        if (!data?.prices?.length) {
          dispatch(setLoading(false));
          return;
        }

        const now = Date.now();

        let history = [];

        if (selectedInterval === "hours") {
          const fiveHoursAgo =
            now - 5 * 60 * 60 * 1000;

          const lastFiveHours = data.prices.filter(
            ([timestamp]) => timestamp >= fiveHoursAgo,
          );

          for (let hour = 4; hour >= 0; hour--) {
            const targetTime =
              now - hour * 60 * 60 * 1000;

            let closestPoint = null;
            let smallestDifference = Infinity;

            lastFiveHours.forEach(
              ([timestamp, price]) => {
                const difference = Math.abs(
                  timestamp - targetTime,
                );

                if (difference < smallestDifference) {
                  smallestDifference = difference;

                  closestPoint = {
                    time: new Date(
                      timestamp,
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    }),
                    price,
                  };
                }
              },
            );

            if (closestPoint) {
              history.push(closestPoint);
            }
          }
        }

        if (selectedInterval === "minutes") {
          const oneHourAgo =
            now - 60 * 60 * 1000;

          const lastHour = data.prices.filter(
            ([timestamp]) => timestamp >= oneHourAgo,
          );

          const minutePoints = [];

          for (let minute = 59; minute >= 0; minute--) {
            const targetTime =
              now - minute * 60 * 1000;

            let closestPoint = null;
            let smallestDifference = Infinity;

            lastHour.forEach(
              ([timestamp, price]) => {
                const difference = Math.abs(
                  timestamp - targetTime,
                );

                if (difference < smallestDifference) {
                  smallestDifference = difference;

                  closestPoint = {
                    time: new Date(
                      timestamp,
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    }),
                    price,
                  };
                }
              },
            );

            if (closestPoint) {
              minutePoints.push(closestPoint);
            }
          }

          history = minutePoints;
        }

        dispatch(setPriceHistory(history));

        if (history.length > 0) {
          dispatch(
            setCurrentPrice(
              history[history.length - 1].price,
            ),
          );
        }

        dispatch(setLoading(false));
      } catch (error) {
        console.error(
          "Failed to fetch historical crypto data:",
          error,
        );

        dispatch(setLoading(false));
      }
    };

    getHistoricalData();
  }, [
    dispatch,
    selectedCurrency,
    selectedInterval,
  ]);


  useEffect(() => {
    const getCryptoPrices = async () => {
      try {
        const data = await fetchCryptoPrices();

        dispatch(setCurrencies(data));

        const selectedCrypto = data.find(
          (crypto) => crypto.id === selectedCurrency,
        );

        if (selectedCrypto) {
          const currentPrice =
            selectedCrypto.current_price;

          const currentTime = new Date();

          dispatch(setCurrentPrice(currentPrice));

          
          if (selectedInterval === "seconds") {
            dispatch(
              addPriceHistory({
                time: currentTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                }),
                price: currentPrice,
              }),
            );
          }
        }

        dispatch(setLoading(false));
      } catch (error) {
        console.error(
          "Failed to fetch crypto prices:",
          error,
        );

        dispatch(setLoading(false));
      }
    };

    getCryptoPrices();

    const interval = setInterval(() => {
      getCryptoPrices();
    }, 2000);

    return () => clearInterval(interval);
  }, [
    dispatch,
    selectedCurrency,
    selectedInterval,
  ]);

  return (
    <main className="min-h-screen bg-[#0b0f19] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-4xl">
        <h1 className="mb-8 text-center text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Crypto Price Tracker
        </h1>

        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-800 bg-[#111827] p-5 shadow-xl sm:p-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-end">
              <CryptoSelector />

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
import { useEffect, useState } from "react";
import Modal from "bootstrap/js/dist/modal";
import { Constants } from "../utils/constants";
import ModalBox from "../lowComponent/modelbox";

export default function About() {
  const countryApi = "https://dummy-json.mock.beeceptor.com/countries";
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countryName, setCountryName] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCountries = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(countryApi);
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      const rawResponse = await response.text();
      // Remove BOM and whitespace
      const cleanedResponse = rawResponse.replace(/^\uFEFF/, "").trim();
      let data;
      try {
        // Try to parse as JSON
        data = JSON.parse(cleanedResponse);
      } catch (parseErr) {
        // If JSON parsing fails, log it and use fallback
        setCountries(Constants.COUNTRIES);
        setLoading(false);
        return;
      }
      // Extract array from response
      if (Array.isArray(data)) {
        setCountries(data);
      } else if (Array.isArray(data?.countries)) {
        setCountries(data.countries);
      } else if (Array.isArray(data?.data)) {
        setCountries(data.data);
      } else {
        setCountries(Constants.COUNTRIES);
      }
    } catch (err) {
      setError("Failed to fetch countries. Using fallback data.");
      setCountries(Constants.COUNTRIES);
    } finally {
      setLoading(false);
    }
  };

  const handleCountryChange = (e) => {
    const selectedCode = e.target.value;
    setSelectedCountry(selectedCode);
    const selectedCountryObj = countries.find((c) => c.code === selectedCode);
    const countryNameValue = selectedCountryObj
      ? selectedCountryObj.name
      : selectedCode;
    setCountryName(countryNameValue);
    setShowModal(true);
    console.log("Selected Country:", {
      code: selectedCode,
      name: countryNameValue,
    });
  };

  useEffect(() => {
    // Fetch countries on component mount
    fetchCountries();
  }, []);

  useEffect(() => {}, [countries]);

  useEffect(() => {}, [selectedCountry, countryName]);

  useEffect(() => {
    if (!showModal) return;

    const modalEl = document.getElementById("exampleModal");
    if (!modalEl) return;

    const modalRef = new Modal(modalEl);
    modalRef.show();

    const hideHandler = () => setShowModal(false);
    modalEl.addEventListener("hidden.bs.modal", hideHandler, { once: true });

    return () => {
      modalEl.removeEventListener("hidden.bs.modal", hideHandler);
      modalRef.hide();
    };
  }, [showModal]);

  return (
    <>
      <div className="container mt-4">
        <div className="row align-items-start">
          <h1>Countries</h1>
          <div className="col-md-6">
            <label htmlFor="countrySelect" className="form-label">
              Choose a country
            </label>
            {loading && <div className="form-text">Loading countries...</div>}
            {error && <div className="alert alert-warning">{error}</div>}
            <select
              id="countrySelect"
              className="form-select"
              value={selectedCountry}
              onChange={handleCountryChange}
              disabled={loading}
            >
              <option value="">Select country</option>
              {countries.map((country, idx) => {
                const name = country.name || `Country ${idx + 1}`;
                const value = country.code || country.name;
                return (
                  <option key={idx} value={value}>
                    {name}
                  </option>
                );
              })}
            </select>
            {countryName && (
              <div className="mt-3">
                This is Selected from list <strong>{countryName}</strong>
              </div>
            )}

            {/* Show modal trigger and content */}
            <div className="mt-3">
              <ModalBox
                detailsData={Constants.messageDetails}
                message={countryName}
                selectedCntrMesg={Constants.selectedCountryMsg}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

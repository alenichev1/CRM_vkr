import React, { useState, useEffect } from "react";

const AddressInput = ({ setCoordinates, setBalloonContent }) => {
  const [addressInput, setAddressInput] = useState("");
  const [addressError, setAddressError] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [addressesList, setAddressesList] = useState([]);

  const handleAddressChange = (event) => {
    const input = event.target.value;
    setAddressInput(input);
    setAddressError("");
  };

  const handleAddAddress = async () => {
    try {
      if (addressInput.trim() !== "") {
        const response = await fetch(
          `https://geocode-maps.yandex.ru/1.x/?apikey=f8534690-add3-40fe-b4c7-b071258ee1f8&format=json&geocode=${addressInput}`
        );
        const data = await response.json();

        const geoObject =
          data.response.GeoObjectCollection.featureMember[0].GeoObject;
        const foundAddress = geoObject.metaDataProperty.GeocoderMetaData.text;
        const coordinates = geoObject.Point.pos.split(" ").reverse();

        setAddressesList((prevAddressesList) => [
          ...prevAddressesList,
          { address: foundAddress, coordinates },
        ]);

        setAddressInput("");
        setAddressError("");
        setSuggestions([]);
        setCoordinates(coordinates); // Обновление текущих координат
        setBalloonContent(foundAddress); // Обновление содержимого балуна
      }
    } catch (error) {
      setAddressError("Ошибка при определении адреса");
    }
  };

  const handleSuggestionSelect = (suggestion) => {
    setAddressInput(suggestion);
    setSuggestions([]);
  };

  useEffect(() => {
    const validateAddress = async () => {
      try {
        if (addressInput.trim() !== "") {
          const response = await fetch(
            `https://geocode-maps.yandex.ru/1.x/?apikey=f8534690-add3-40fe-b4c7-b071258ee1f8&format=json&geocode=${addressInput}`
          );
          await response.json();
          setAddressError("");
        }
      } catch (error) {
        setAddressError("Ошибка при определении адреса");
      }
    };

    validateAddress();
  }, [addressInput]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <label htmlFor="addressInput">Введите адрес:</label>
      <input
        type="text"
        id="addressInput"
        value={addressInput}
        onChange={handleAddressChange}
        placeholder="Введите ваш адрес"
      />
      {addressError && <p style={{ color: "red" }}>{addressError}</p>}
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index} onClick={() => handleSuggestionSelect(suggestion)}>
            {suggestion}
          </li>
        ))}
      </ul>
      <button onClick={handleAddAddress}>Добавить</button>

      {/* Отображение адреса с координатами */}
      {addressesList.length > 0 && (
        <div>
          <p>Добавленные адреса:</p>
          <ul>
            {addressesList.map((addedAddress, index) => (
              <li key={index}>
                {addedAddress.address} (Координаты:{" "}
                {addedAddress.coordinates.join(", ")})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AddressInput;

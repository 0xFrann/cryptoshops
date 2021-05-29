import axios from "axios";
import React, { useContext, useState } from "react";
import { TShop } from "../../types";
import { SubmitHandler, useForm } from "react-hook-form";
import PlacesAutocomplete from "../../components/PlacesAutocomplete";
import Header from "../../components/Header";
import AppContext from "../../context/AppContext";
import Message, { TMessageState } from "../../components/Message";

const BackgroundSyle = "bg-gray-200 min-h-screen flex flex-col items-center";
const ContentStyle = "max-w-lg w-full px-6 py-10 flex flex-col flex-grow items-center flex-grow";
const HeaderStyle = "p-6 mb-4";
const TitleSyle = "text-4xl";
const SubTitleSyle = "mt-4 text-xl";
const FormStyle = "flex flex-col text-center w-full";
const InputStyle = "m-2 py-2 px-4 h-12 rounded-3xl outline-none focus:shadow-md";
const SelectStyle = "m-2 py-2 px-4 h-12 rounded-full outline-none focus:shadow-md bg-white";
const ButtonStyle = "m-2 h-12 rounded-full focus:outline-none bg-yellow-500 text-white";
const ErrorStyle = "ring-red-500 ring-2";

type IFormValues = {
  name: string;
  address: string;
  category: string;
};

const CreateShop = (): React.ReactElement => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    createShop({
      name: data.name,
      category: data.category,
      ...location,
    });
  };

  const context = useContext(AppContext);
  const { categories } = context;
  const [location, selectLocation] = useState<Pick<TShop, "location">>();
  const [showMessage, setShowMessage] = useState(false);
  const [messageState, setMessageState] = useState<TMessageState>("success");
  const [messageText, setMessageText] = useState("");

  const createShop = (newShop: Omit<TShop, "id">): void => {
    axios
      .post("/api/shop", newShop)
      .then(() => {
        setMessageState("success");
        setMessageText("¡El negocio fue agregado!");
      })
      .catch(() => {
        setMessageState("error");
        setMessageText("¡Ups! Ocurrió un problema");
      })
      .finally(() => {
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
        reset();
      });
  };

  if (showMessage) {
    return (
      <div className={BackgroundSyle}>
        <Header />
        <div className={`${ContentStyle} justify-center`}>
          <Message state={messageState} text={messageText} />
        </div>
      </div>
    );
  }

  return (
    <div className={BackgroundSyle}>
      <Header />
      <div className={ContentStyle}>
        <div className={HeaderStyle}>
          <h1 className={TitleSyle}>Agregar negocio</h1>
          <h2 className={SubTitleSyle}>
            Únicamente negocios que acepten criptomonedas como forma de pago
          </h2>
        </div>
        <form className={FormStyle} onSubmit={handleSubmit(onSubmit)}>
          <input
            className={`${InputStyle} ${errors.name ? ErrorStyle : ""}`}
            placeholder="Nombre del negocio"
            {...register("name", { required: true })}
          />
          <PlacesAutocomplete
            onSelect={selectLocation}
            className={errors.address ? ErrorStyle : ""}
            {...register("address", { required: true })}
          />
          <select
            className={`${SelectStyle} ${errors.category ? ErrorStyle : ""}`}
            placeholder="Categoría"
            {...register("category", { required: true })}
          >
            {categories &&
              categories.list?.length &&
              categories.list?.map((category, i) => (
                <option value={category} className="capitalize" key={i}>
                  {category}
                </option>
              ))}
          </select>
          <button className={ButtonStyle} type="submit">
            Agregar negocio
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateShop;

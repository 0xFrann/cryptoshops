import Link from "next/link";
import getConfig from "next/config";
import axios from "axios";
import React, { useContext, useState } from "react";
import { TLocation, TShop } from "../../types";
import { SubmitHandler, useForm } from "react-hook-form";
import PlacesAutocomplete from "../../components/PlacesAutocomplete";
import Header from "../../components/Header";
import HeaderMenu from "../../components/HeaderMenu";
import AppContext from "../../context/AppContext";
import Message, { TMessageState } from "../../components/Message";

const { publicRuntimeConfig } = getConfig();
const SUPPORT_MAIL = publicRuntimeConfig.SUPPORT_MAIL;

const BackgroundSyle = "bg-gray-200 min-h-screen flex flex-col items-center";
const ContentStyle = "max-w-lg w-full px-6 py-10 flex flex-col flex-grow items-center flex-grow";
const HeaderStyle = "p-6 mb-4";
const TitleSyle = "text-4xl";
const SubTitleSyle = "mt-4 text-xl";
const FormStyle = "flex flex-col text-center w-full";
const InputStyle = "m-2 py-2 px-4 h-12 rounded-3xl outline-none focus:shadow-md";
const SelectStyle = "m-2 py-2 px-4 h-12 rounded-full outline-none focus:shadow-md bg-white";
const ButtonStyle = "m-2 h-12 px-6 rounded-full focus:outline-none bg-yellow-500 text-white";
const ErrorStyle = "ring-red-500 ring-2";
const LinkStyle = "focus:outline-none text-gray-600 my-4";
const BottomMessageStyle = "text-sm text-gray-600 my-4 mt-6 select-none";
const MailStyle = "underline select-text";

type IFormValues = {
  name: string;
  address: string;
  category: string;
  whatsapp: string;
  link: string;
};

const CreateShop = (): React.ReactElement => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const context = useContext(AppContext);
  const { categories } = context;
  const [location, selectLocation] = useState<TLocation>();
  const [showMessage, setShowMessage] = useState(false);
  const [messageState, setMessageState] = useState<TMessageState>(null);
  const [messageText, setMessageText] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    const whatsappNumber = String(data.whatsapp || "").replace(/\D+/g, "");
    createShop({
      name: data.name,
      category: data.category,
      location: { ...location },
      contact: {
        whatsapp: Number(whatsappNumber) || null,
        link: data.link,
      },
    });
  };

  const createShop = (newShop: Omit<TShop, "id">): void => {
    axios
      .post("/api/shop", newShop)
      .then(() => {
        setMessageState("success");
        setMessageText("¡El negocio fue agregado!");
      })
      .catch((error) => {
        setMessageState("error");
        if (error.response.status === 409) {
          setMessageText("El negocio ya está registrado");
        } else {
          setMessageText("¡Ups! Ocurrió un problema");
        }
      })
      .finally(() => {
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
          reset();
        }, 5000);
      });
  };

  if (showMessage) {
    return (
      <div className={BackgroundSyle}>
        <div className={`${ContentStyle} justify-center`}>
          <Message state={messageState} text={messageText} />
          {messageState == "success" && (
            <Link href={`/map?lat=${location.latLng.lat}&lng=${location.latLng.lng}`}>
              <button className={ButtonStyle}>Ver en el mapa</button>
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={BackgroundSyle}>
      <Header
        menuVisible={isMenuVisible}
        toggleMenuVisible={() => setMenuVisible((prev) => !prev)}
      />
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
            autoComplete="off"
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
          <input
            className={`${InputStyle} ${errors.whatsapp ? ErrorStyle : ""}`}
            placeholder="WhatsApp: 351 123 123"
            type="number"
            autoComplete="off"
            {...register("whatsapp", {
              required: false,
              pattern: /^\d{10}$/,
            })}
          />
          <input
            className={`${InputStyle} ${errors.link ? ErrorStyle : ""}`}
            placeholder="Link de web o red social"
            autoComplete="off"
            {...register("link", {
              required: false,
            })}
          />
          <button className={ButtonStyle} type="submit">
            Agregar negocio
          </button>
          <Link href="/map">
            <button className={LinkStyle}>Ir al mapa</button>
          </Link>
          <span className={BottomMessageStyle}>
            ¿Deseas modificar un negocio o eliminarlo? Comunícate al siguiente mail: {` `}
            <a
              href={`mailto:${SUPPORT_MAIL}`}
              className={MailStyle}
              target="_blank"
              rel="noreferrer"
            >
              {SUPPORT_MAIL}
            </a>
            .
          </span>
        </form>
      </div>
      <HeaderMenu visible={isMenuVisible} toggleVisible={() => setMenuVisible((prev) => !prev)} />
    </div>
  );
};

export default CreateShop;

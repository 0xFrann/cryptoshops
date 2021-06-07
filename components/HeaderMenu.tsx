import { useRouter } from "next/router";
import useFullScreen from "../utils/hooks/useFullScreen";
import FullscreenIcon from "../assets/fullscreen-icon.svg";

const HeaderMenuStyle =
  "absolute top-12 transition-all flex flex-col justify-between duration-300 z-50 bg-yellow-600 p-6 pb-16 w-full h-full text-white";
const MenuListStyle = "py-5 px-2 space-y-4";
const MenuLinkStyle =
  "text-lg text-gray-100 hover:text-yellow-700 focus:text-yellow-900 active:text-yellow-900 transition-colors cursor-pointer focus:outline-none";
const FullScreenButtonStyle = "text-yellow-800 flex items-center cursor-pointer focus:outline-none";
const FullScreenIconStyle = "fill-current text-yellow-800 mr-1";

interface IHeaderMenuProps {
  visible?: boolean;
  toggleVisible?: () => void;
}

const HeaderMenu = ({
  visible = false,
  toggleVisible = () => {},
}: IHeaderMenuProps): React.ReactElement => {
  const router = useRouter();
  const goTo = (url: string): void => {
    router.push(url);
    toggleVisible();
  };
  const { toggleFullScreen } = useFullScreen();

  return (
    <div
      className={`${HeaderMenuStyle} ${visible ? "opacity-100 left-0" : "opacity-0 -left-full"}`}
    >
      <ul className={MenuListStyle}>
        <li>
          <button onClick={() => goTo("/")} className={MenuLinkStyle}>
            ▸ Inicio
          </button>
        </li>
        <li>
          <button onClick={() => goTo("/map")} className={MenuLinkStyle}>
            ▸ Ver el Mapa
          </button>
        </li>
        {/* <li>
          <button onClick={() => goTo("/shops")} className={MenuLinkStyle}>
            ▸ Listado de Negocios
          </button>
        </li> */}
        <li>
          <button onClick={() => goTo("/shops/new")} className={MenuLinkStyle}>
            ▸ Agregar negocio
          </button>
        </li>
        {/* <li>
          <button onClick={() => goTo("/shops/edit")} className={MenuLinkStyle}>
            ▸ Modificar negocio
          </button>
        </li> */}
        {/* <li>
          <button onClick={() => goTo("/support")} className={MenuLinkStyle}>
            ▸ Dejar sugerencia
          </button>
        </li> */}
      </ul>
      <button onClick={() => toggleFullScreen()} className={FullScreenButtonStyle}>
        <FullscreenIcon width={20} height={20} className={FullScreenIconStyle} />
        Pantalla completa
      </button>
    </div>
  );
};

export default HeaderMenu;

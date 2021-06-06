import { PropsWithChildren, useState } from "react";
import Header from "./Header";
import HeaderMenu from "./HeaderMenu";

const LayoutStyle = "relative h-screen w-screen flex flex-col";
const ContentStyle = "flex-grow overflow-y-auto";

type ILayoutProps = PropsWithChildren<unknown>;

const Layout = (props: ILayoutProps): React.ReactElement => {
  const [isMenuVisible, setMenuVisible] = useState(false);

  return (
    <div className={LayoutStyle}>
      <Header
        menuVisible={isMenuVisible}
        toggleMenuVisible={() => setMenuVisible((prev) => !prev)}
      />
      <div className={ContentStyle}>{props.children}</div>
      <HeaderMenu visible={isMenuVisible} toggleVisible={() => setMenuVisible((prev) => !prev)} />
    </div>
  );
};

export default Layout;

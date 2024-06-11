import { Button } from "./styles/MenuButton.styles.jsx";

const HomeMenuButton = ({ children, onClick }) => {
  return <Button onClick={onClick}>{children}</Button>;
};
export default HomeMenuButton;

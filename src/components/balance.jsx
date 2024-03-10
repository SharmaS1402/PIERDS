import { useParams } from "react-router-dom";

const balance = () => {
  const { hoverColor } = useParams();
  return (
    <div
      style={{
        backgroundColor: hoverColor,
        transition: "background-color 0.5s",
      }}
    >
      Balance
    </div>
  );
};

export default balance;

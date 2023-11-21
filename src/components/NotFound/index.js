import "./index.css";

const NotFound = (props) => {
  const onClickHome = () => {
    const { history } = props;
    history.replace("/");
  };
  return (
    <>
      <img
        src="https://res.cloudinary.com/dvnzycytg/image/upload/v1697782182/Group_7484_vqvaql.png"
        alt="failure view"
        className="failure-Image"
      />
      <h1 className="failure-Heading ">PAGE NOT FOUND</h1>
      <p className="failure-paragraph">
        We are sorry, the page you requested for could not found please go back
        to the home page{" "}
      </p>
      <button className="failure-button" onClick={onClickHome}>
        Home
      </button>
    </>
  );
};

export default NotFound;

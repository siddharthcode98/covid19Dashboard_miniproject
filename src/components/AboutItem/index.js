import "./index.css";

const AboutItem = (props) => {
  const { Qns } = props;
  const { question, answer } = Qns;

  return (
    <li>
      <p className="qns">{question}</p>
      <p className="ans">{answer}</p>
    </li>
  );
};

export default AboutItem;

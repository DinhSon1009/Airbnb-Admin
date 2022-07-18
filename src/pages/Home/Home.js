import Widget from "../../components/Widget/Widget";
import "./Home.scss";
export default function Home() {
  return (
    <>
      <Widget type="user" />
      <Widget type="location" />
      <Widget type="ticket" />
      <Widget type="room" />
    </>
  );
}

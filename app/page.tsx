/* / 루트 page 컴포넌트 */
// import
import Form from "../_components/Form";

// component
const Home = () => {
  return (
    <div>
      <h1>Hello, Next.js this is app!</h1>
      {/* 외부 컴포넌트 적용 */}
      <Form />
    </div>
  );
};

// export
export default Home;

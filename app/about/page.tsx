/* /about 경로 페이지 컴포넌트 */
// import
import CountComponent from "../../_components/Count"; // Count 컴포넌트 import

// component 생성
const About = () => {
  return (
    <div>
      <h1>this is about page</h1>
      {/* 외부 컴포넌트 사용 */}
      <CountComponent />
    </div>
  );
};

// export
export default About;

/* /about 경로 페이지 컴포넌트 */
import Count from "@/components/Count"; // Count 컴포넌트 import

import styles from "./page.module.css";

const About = () => {
  return (
    <div>
      {/* style 적용 방법 */}
      <h1 className={styles.title}>this is about page</h1>
      {/* 외부 컴포넌트 사용 */}
      <Count />
    </div>
  );
};

export default About;

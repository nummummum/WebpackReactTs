import { testType } from "../types/type";

export default function ExamCard(props: testType) {
  return (
    <div>
      <h5>
        {props.testString} {props.testString2}
      </h5>
    </div>
  );
}

import React, { FC } from "react"; // Import FC for function component
import AddCircleIcon from "@mui/icons-material/AddCircle";

type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({
  benefits,
  setBenefits,
  prerequisites,
  setPrerequisites,
  active,
  setActive,
}) => {
  const handleAddBenefit = () => {
    setBenefits([...benefits, { title: "" }]);
  };

  const handleBenefitChange = (index: number, value: string) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index].title = value;
    setBenefits(updatedBenefits);
  };

  return (
    <div className="w-[80%] m-auto mt-24 block">
      <div>
        <label className="text-[20px]" htmlFor="benefits">
          Học viên sẽ nhận được những lợi ích gì khi tham gia khóc học?
        </label>
        <br />
        {benefits.map((benefit, index) => (
          <input
            type="text"
            key={index}
            name={`Benefit-${index}`}
            placeholder="Học viên sẽ hiểu rõ và vận dụng được cách dể xây dựng được hệ thống quản lý!"
            required
            className="my-2 input"
            value={benefit.title}
            onChange={(e) => handleBenefitChange(index, e.target.value)}
          />
        ))}
        <AddCircleIcon
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          onClick={handleAddBenefit}
        />
      </div>
    </div>
  );
};

export default CourseData;

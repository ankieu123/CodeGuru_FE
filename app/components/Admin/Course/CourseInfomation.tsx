import React, { useState, FC } from "react";

type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseInformation: FC<Props> = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}) => {
  const [dragging, setDragging] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActive(active + 1);
  };

  return (
    <div className="w-[80%] m-auto mt-24">
      <form onSubmit={handleSubmit} className="form-container">
        <div>
          <label htmlFor="name" className="text-black dark:text-white">
            Tên khóa học
          </label>
          <input
            type="text"
            required
            value={courseInfo.name}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            id="name"
            placeholder="React Pro Max với Next.js - Làm Chủ Toàn Diện React.JS Hiện Đại"
            className="input text-black dark:text-white"
          />
        </div>
        <br />
        <div className="mb-5">
          <label htmlFor="description" className="text-black dark:text-white">
            Mô tả khóa học
          </label>
          <textarea
            name="description"
            id="description"
            cols={30}
            rows={8}
            value={courseInfo.description}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
            className="textarea !h-min !py-2  text-black dark:text-white"
          ></textarea>
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className="label text-black dark:text-white">
              Giá khóa học
            </label>
            <input
              type="number"
              required
              value={courseInfo.price}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
              id="price"
              placeholder="1.499.000 VNĐ"
              className="input  text-black dark:text-white"
            />
          </div>
        </div>
        <div className="w-[50%]">
          <label className="label text-black dark:text-white">
            Giá khi bán khóa học(optional)
          </label>
          <input
            type="number"
            value={courseInfo.estimatedPrice}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
            }
            id="estimatedprice"
            placeholder="2.499.000 VNĐ"
            className="input  text-black dark:text-white"
          />
        </div>
        <br />
        <div>
          <label className="label text-black dark:text-white" htmlFor="tags">
            Tags
          </label>
          <input
            type="text"
            required
            value={courseInfo.tags}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, tags: e.target.value })
            }
            id="tags"
            placeholder="MERN, Next 13, Tailwind CSS, LMS, Redux"
            className="input text-black dark:text-white"
          />
        </div>
        <div className="w-[50%]">
          <label className="label text-black dark:text-white">Demo Url</label>
          <input
            type="text"
            required
            value={courseInfo.demoUrl}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
            }
            id="demoUrl"
            placeholder="eer74fd"
            className="input text-black dark:text-white"
          />
        </div>
      </form>
    </div>
  );
};

export default CourseInformation;

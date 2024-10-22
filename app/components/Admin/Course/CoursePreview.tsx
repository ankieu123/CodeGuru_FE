import React, { FC } from 'react'
import CoursePlayer from "../../../utils/CoursePlayer"
import { style } from "../../../../app/styles/style"
import Rating from "../../../../app/utils/Rating"
import { IoCheckmarkDoneCircleOutline } from 'react-icons/io5'

type Props = {
    active: number,
    setActive: (active: number) => void;
    courseData: any,
    handleCourseCreate: any,
}

const CoursePreview: FC<Props> = ({
    courseData,
    handleCourseCreate,
    setActive,
    active
}) => {
    const discountPercent = ((courseData?.estimatedPrice - courseData?.price) / courseData?.estimatedPrice) * 100;
    const discountPercentPrice = discountPercent.toFixed(0);

    const prevButton = () => {
        setActive(active - 1);
    };

    const createCourse = () => {
        handleCourseCreate()
    }
    return (
        <div className='w-[90%] m-auto py-5 mb-5'>
            <div className='w-full relative'>
                <div className='w-full mt-10'>
                    <CoursePlayer
                        videoUrl={courseData?.demoUrl}
                        title={courseData?.title}
                    />
                </div>
                <div className='flex items-center dark:text-white text-black ml-14'>
                    <h1 className='pt-5 text-[25px]'>
                        {courseData?.price === 0 ? "Miễn phí" : courseData?.price + " VNĐ"}
                    </h1>

                    <h5 className='pl-3 text-[20px] mt-2 line-through opacity-80'>
                        {courseData?.estimatedPrice} VNĐ
                    </h5>

                    <h4 className='pl-5 pt-4 text-[22px] dark:text-[#e05353] text-yellow-400'>
                        Giảm {discountPercentPrice}%
                    </h4>
                </div>
                <div className='flex items-center ml-14'>
                    <div className={`${style.button} !w-[180px] my-3 font-Poppins !bg-[crimson] cursor-not-allowed`}>
                        Mua ngay
                    </div>
                </div>
                <div className='flex items-center ml-14'>
                    <input
                        type='text'
                        name=""
                        id=""
                        placeholder='Mã giảm giá...'
                        className={`${style.input} 1500px:!w-[50%] 110px:w-[60%]ml-3 !mt-0`}
                    />
                    <div className={`${style.button} !w-[120px] my-3 ml-4 font-Poppins cursor-pointer`}>
                        Áp dụng
                    </div>
                </div>
                <p className='pb-1 text-white ml-14'>.</p>
                <p className='pb-1 text-white ml-14'>.</p>
                <p className='pb-1 text-white ml-14'>.</p>
                <p className='pb-3 800px:pb-1 text-white ml-14'>. Premium Support</p>
            </div>
            <div className='w-full ml-14'>
                <div className='w-full 800px:pr-5'>
                    <h1 className='text-[25px] font-Poppins font-[600] text-white'>
                        {courseData?.name}
                    </h1>
                    <div className='flex items-center justify-between pt-3'>
                        <div className='flex items-center'>
                            <Rating rating={0} />
                            <h5 className=' text-white'>0 đánh giá</h5>
                        </div>
                        <h5 className=' text-white'>0 học viên</h5>
                    </div>
                    <br />
                    <h1 className='text-[25px] font-Poppins font-[600]  text-white'>
                        Bạn sẽ học được gì từ khóa học này?
                    </h1>
                </div>
                {courseData?.benefits?.map((item: any, index: number) => (
                    <div className='w-full flex 800px:items-center py-2 dark:text-white text-black' key={index}>
                        <div className='w-[15px] mr-1'>
                            <IoCheckmarkDoneCircleOutline size={20} />
                        </div>
                        <p className='pl-2'>{item.title}</p>
                    </div>
                ))}
                <br />

                {/* course description */}
                <div className='w-full'>
                    <h1 className='text-[25px] font-Poppins font-[600]  dark:text-white text-black'>
                        Chi tiết khóa học
                    </h1>
                    <p className='text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden  dark:text-white text-black'>
                        {courseData?.description}
                    </p>
                </div>
                <br />
                <div className='w-full flex items-center justify-between'>
                    <div className='w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] round mt-8 cursor-pointer' onClick={() => prevButton()}>
                        Quay lại
                    </div>
                    <div className='w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] round mt-8 cursor-pointer' onClick={() => createCourse()}>
                        Tạo khóa học
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoursePreview
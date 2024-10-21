import React, { FC, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { style } from '@/app/styles/style';
import { BsPencil } from 'react-icons/bs';

type Props = {
    active: number;
    setActive: (active: number) => void;
    courseContentData: any;
    setCourseContentData: (courseContentData: any) => void;
    handleSubmit: any;
}

const CourseContent: FC<Props> = ({
    courseContentData,
    setCourseContentData,
    active,
    setActive,
    handleSubmit: handleCourseSubmit
}) => {
    const [isCollapsed, setIsCollapsed] = useState(Array(courseContentData.length).fill(false));

    const [activeSection, setActiveSection] = useState(1);

    const handleSubmit = (e: any) => {
        e.preventDefaul();
    }

    const handleCollapseToggle = (index: number) => {
        const updateCollapsed = [...isCollapsed];
        updateCollapsed[index] = !updateCollapsed[index];
        setIsCollapsed(updateCollapsed);
    }
    return (
        <div className='w-[80%] m-auto mt-24 p-3'>
            <form onSubmit={handleSubmit}>
                {courseContentData?.map((item: any, index: number) => {
                    const showSectionInput = index === 0 || item.videoSection !== courseContentData[index - 1].videoSection;

                    return (
                        <>
                            <div className={`w-full bg-[#cdc8c817] p-4 ${showSectionInput ? "mt-10" : "mb-0"}`}>
                                {showSectionInput && (
                                    <>
                                        <div className='flex w-full items-center'>
                                            <input
                                                type='text'
                                                className={`text-[20px] ${item.videoSection === "Phần chưa đặt tên"
                                                    ? "w-[250px]"
                                                    : "w-min"
                                                    } font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none`}
                                                value={item.videoSection}
                                                onChange={(e) => {
                                                    const updateData = [...courseContentData];
                                                    updateData[index].videoSection = e.target.value;
                                                    setCourseContentData(updateData);
                                                }}
                                            />
                                            <BsPencil className='cursor-pointer dark:text-white text-black ml-10' />
                                        </div>
                                    </>
                                )}
                                <div className='flex w-full items-center justify-between my-0'>
                                    {isCollapsed[index] ? (
                                        <>
                                            {item.title ? (
                                                <p className='font-Poppins dark:text-white text-black'>
                                                    {index + 1}.{item.title}
                                                </p>
                                            )
                                                :
                                                (
                                                    <>

                                                    </>
                                                )}
                                        </>
                                    )
                                        :
                                        (
                                            <div>

                                            </div>
                                        )}
                                    {/* arrow button for collapsed video content */}
                                    <div className='flex items-center'>
                                        <AiOutlineDelete
                                            className={`dark:text-white text-[20px] mr-2 text-black 
                                                ${index > 0 ? "cursor-pointer" : "cursor-no-drop"}`}
                                            onClick={() => {
                                                if (index > 0) {
                                                    const updateData = [...courseContentData];
                                                    updateData.splice(index, 1);
                                                    setCourseContentData(updateData);
                                                }
                                            }}
                                        />
                                        <MdOutlineKeyboardArrowDown
                                            fontSize="large"
                                            className='dark:text-white text-black'
                                            style={{
                                                transform: isCollapsed[index]
                                                    ? "rotate(180deg)"
                                                    : "rotate(0deg)",
                                            }}
                                            onClick={() => { handleCollapseToggle(index) }}
                                        />
                                    </div>
                                </div>
                                {!isCollapsed[index] && (
                                    <>
                                        <div className='my-3'>
                                            <label className={style.label}>Tiêu đề video</label>
                                            <input
                                                type='text'
                                                placeholder='Cách sử dụng Docker'
                                                className={style.input}
                                                value={item.title}
                                                onChange={(e) => {
                                                    const updateData = [...courseContentData];
                                                    updateData[index].title = e.target.value;
                                                    setCourseContentData(updateData);
                                                }}
                                            />
                                        </div>
                                        <div className='my-3'>
                                            <label className={style.label}>URL Video</label>
                                            <input
                                                type='text'
                                                placeholder='https://cmccloud.vn/'
                                                className={style.input}
                                                value={item.videoUrl}
                                                onChange={(e) => {
                                                    const updateData = [...courseContentData];
                                                    updateData[index].videoUrl = e.target.value;
                                                    setCourseContentData(updateData);
                                                }}
                                            />
                                        </div>
                                        <div className='my-3'>
                                            <label className={style.label}>Mô tả</label>
                                            <textarea
                                                rows={8}
                                                cols={30}
                                                placeholder='Docker là một dự án mã nguồn mở giúp tự động triển khai các ứng dụng Linux và Windows...'
                                                className={`${style.input} !h-min py-2`}
                                                value={item.description}
                                                onChange={(e) => {
                                                    const updateData = [...courseContentData];
                                                    updateData[index].description = e.target.value;
                                                    setCourseContentData(updateData);
                                                }}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </>
                    )
                })}
            </form>
        </div>
    )
}

export default CourseContent
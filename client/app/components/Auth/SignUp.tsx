"use client";
import React, { FC, useState } from 'react'
import { useFormik } from "formik"
import * as Yup from "yup"
import { AiOutlineEye, AiOutlineEyeInvisible, AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { style } from '../../../app/styles/style';
import { Erica_One } from 'next/font/google'
type Props = {
    setRoute: (route: string) => void;
};
const schema = Yup.object().shape({
    name: Yup.string().required("Nhập tên của bạn!"),
    email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email"),
    password: Yup.string().required("Please enter your password!").min(6),
});

const SignUp: FC<Props> = ({ setRoute }) => {
    const [show, setShow] = useState(false);
    const formik = useFormik({
        initialValues: { name:"",email: "", password: "" },
        validationSchema: schema,
        onSubmit: async ({ email, password }) => {
            setRoute("Verification")
        }
    });
    const { errors, touched, values, handleChange, handleSubmit } = formik;
    return (
        <div className='w-full mb-6'>
            <h1 className={`${style.title}`}>
                Đăng ký vào CodeGuru
            </h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                <label
                    className={`text-[16px] font-Poppins text-black dark:text-white`}
                    htmlFor="email"
                >
                    Nhập tên của bạn
                </label>
                <br/>
                <input
                    type="name"
                    name=""
                    value={values.name}
                    onChange={handleChange}
                    id="name"
                    placeholder="yourname"
                    className={`${errors.name && touched.name && "border-red-500"} 
                                w-full text-black dark:text-white bg-transparent border 
                                rounded-h-[40px] px-2 outline-none mt-[10px] font-Poppins`}
                />
                {errors.name && touched.name && (
                    <span className="text-red-500 pt-2-block">{errors.email}</span>
                )}
                </div>


                <label
                    className={`text-[16px] font-Poppins text-black dark:text-white`}
                    htmlFor="email"
                >
                    Nhập email
                </label>
                <br/>
                <input
                    type="email"
                    name=""
                    value={values.email}
                    onChange={handleChange}
                    id="email"
                    placeholder="example@gmail.com"
                    className={`${errors.email && touched.email && "border-red-500"} 
                                w-full text-black dark:text-white bg-transparent border 
                                rounded-h-[40px] px-2 outline-none mt-[10px] font-Poppins`}

                />
                {errors.email && touched.email && (
                    <span className="text-red-500 pt-2-block">{errors.email}</span>
                )}
                
                
                <div className="w-full mt-5 relative mb-1">
                    <label className={`text-[16px] font-Poppins text-black dark:text-white`} htmlFor="email">
                        Nhập mật khẩu
                    </label>
                    <br/>
                    <input
                        type={!show ? "password" : "text"}
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        id="password"
                        placeholder="password"
                        className={`${errors.password && touched.password && "border-red-500"} 
                                w-full text-black dark:text-white bg-transparent border 
                                rounded-h-[40px] px-2 outline-none mt-[10px] font-Poppins`}
                    />
                    {!show ? (
                        <AiOutlineEyeInvisible
                            className="absolute bottom-3 right-2 z-1 cursor-pointer"
                            size={20}
                            onClick={() => setShow(true)}
                        />
                    ) : (
                        <AiOutlineEye
                            className="absolute bottom-3 right-2 z-1 cursor-pointer"
                            size={20}
                            onClick={() => setShow(false)}
                        />
                    )}
                    
                </div>
                {errors.password && touched.password && (
                        <span className="text-red-500 pt-2 block">{errors.password}</span>
                    )}
                <div className="w-full mt-5">
                    <input
                        type="submit"
                        value="Đăng ký"
                        className={`flex flex-row justify-center items-center py-3 px-6 rounded-full cursor-pointer bg-[#2190ff] min-h-[45px] w-full text-[16px] font-Poppins font-semibold text-white`}
                    />
                </div>
                <br/>
                <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
                    Or join with

                </h5>
                <div className="flex items-center justify-center my-3">
                    <FcGoogle size={30} className="cursor-pointer mr-2" />
                    <AiFillGithub size={30} className="cursor-pointer ml-2 " />
                </div>
                <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
                    Bạn đã có tài khoản?{" "}
                    <span
                        className="text-[#2190ff] pl-1 cursor-pointer"
                        onClick={() => setRoute("Login")}
                    >
                        Đăng nhập

                    </span>
                </h5>
            </form>
            <br/>
        </div>
    )
}

export default SignUp;
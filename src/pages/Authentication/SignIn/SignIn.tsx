import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../../../api/auth.api";
import { LockIcon, MessageIcon } from '../../../components/index';
import LogoDark from '../../../images/logo/logo-dark.svg';
import Logo from '../../../images/logo/logo.svg';
import MobileImg from "./MobileImg";
import useValidator from "../../../hooks/validator";

const SignIn = () => {
  const navigation = useNavigate();
  const { validator } = useValidator()
  const [isError, setIsError] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<ILogin>();
  const onSubmit: SubmitHandler<ILogin> = async (data) => {
    try {
      await login(data)
      navigation(`/`);
    } catch (error: any) {
      setIsError(true)
      const statusCode = error?.response?.data?.statusCode 
      
      if (statusCode === 401) {
        toast.error('Tên đăng nhập hoặc mật khẩu không chính xác!')
      }
    }
  }

  return (
    <>

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-17.5 px-26 text-center">
              <Link className="mb-5.5 inline-block" to="/">
                <img className="hidden dark:block" src={Logo} alt="Logo" />
                <img className="dark:hidden" src={LogoDark} alt="Logo" />
              </Link>

              <p className="2xl:px-20">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
                suspendisse.
              </p>

              <MobileImg />
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Đăng nhập TailAdmin
              </h2>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Nickname
                  </label>
                  <div className="relative">
                    <input
                      {...register("nickname", { required: true, maxLength: 20, minLength: 2 })}
                      type="text"
                      placeholder="Nhập nickname"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    <MessageIcon />
                  </div>
                  {errors.nickname ? validator(errors) : ''}
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Mật khẩu
                  </label>
                  <div className="relative">
                    <input
                      {...register("password", { required: true, maxLength: 20, minLength: 4 })}
                      type="password"
                      placeholder="Nhập mật khẩu"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    <LockIcon />
                  </div>
                  {errors.password ? validator(errors) : ''}
                </div>
                

                <div className="mb-5">
                  <input
                    type="submit"
                    value="Đăng nhập"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;

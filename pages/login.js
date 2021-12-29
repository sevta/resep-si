import classNames from "classnames";
import Router from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import useUser from "../hooks/useUser";
import { login } from "../services";

export default function Loginpage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const { mutate } = useUser();

  async function onSubmit({ identifier, password }) {
    setLoading(true);
    try {
      const resp = await login({ identifier, password });
      mutate();
      Router.replace("/");
    } catch (error) {
      console.log(error.response);
      toast(error.response.data?.error?.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <div className="card">
        <div className="card-body p-10">
          <div className="card-title">Loginpage</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label>
                <span className="label-text-alt">Username</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                {...register("identifier", { required: true })}
              />
            </div>
            <div className="form-control">
              <label>
                <span className="label-text-alt">Password</span>
              </label>
              <input
                type="password"
                className="input input-bordered"
                {...register("password", {
                  required: true,
                })}
              />
            </div>
            <div className="card-actions">
              <button
                className={classNames(
                  "btn btn-secondary",
                  loading && "loading"
                )}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

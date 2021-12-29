import { useForm } from "react-hook-form";

export default function Step1() {
  const { register, handleSubmit } = useForm();

  function onSubmit() {}

  return (
    <form className="mt-3 " onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-3">
        <div className="form-control">
          <label>
            <span className="label-text-alt">Judul</span>
          </label>
          <input type="text" className="input input-bordered" name="" id="" />
        </div>
        <div className="form-control">
          <label>
            <span className="label-text-alt">Tanggal pernikahan</span>
          </label>
          <input type="date" className="input input-bordered" name="" id="" />
        </div>
      </div>
    </form>
  );
}

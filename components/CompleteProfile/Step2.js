import { useForm } from "react-hook-form";

export default function Step2() {
  const { register, handleSubmit } = useForm();

  function onSubmit() {}

  return (
    <form className="mt-3 " onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-3">
        <div className="form-control">
          <label>
            <span className="label-text-alt">Calon pengantin pria</span>
          </label>
          <input type="text" className="input input-bordered" name="" id="" />
        </div>
        <div className="form-control">
          <label>
            <span className="label-text-alt">Calon pengantin wanita</span>
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

import classNames from "classnames";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useState } from "react/cjs/react.development";
import Step1 from "./Step1";
import Step2 from "./Step2";

export default function CompleteProfile() {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  /**
   * mulai, pasangan, acara
   */
  const _step = ["mulai", "pasangan", "acara", "tema"];
  const [steps, setSteps] = useState(["mulai"]);
  const [currentStep, setCurrentStep] = useState("mulai");

  async function onSubmit(data) {
    console.log("data", data);
  }

  function handleNextStep() {
    if (steps.length === _step.length) return;
    setCurrentStep(_step[steps.length - 1 + 1]);
    setSteps((prev) => [...prev, _step[steps.length - 1 + 1]]);
  }

  function handlePrevStep() {
    // if (steps.length <= 0) return;
    let _currentStep = _step[steps.length];

    console.log("current step", _currentStep);

    setCurrentStep(_step[steps.length - 1]);
    const updateStep = [...steps];
    updateStep.filter((data) => data !== _step[steps.length - 1]);
    setSteps(updateStep);
  }

  useEffect(() => {
    console.log("the steps", steps);
  }, [steps]);

  return (
    <>
      <ul className="w-full steps mb-10 text-sm">
        {_step.map((step, index) => (
          <li
            className={classNames(
              "step capitalize",
              steps[index] === step && "step-neutral"
            )}
            key={index}
          >
            {step}
          </li>
        ))}
      </ul>
      <div className="card max-w-2xl mx-auto rounded-lg">
        <div className="card-body">
          <div className="card-title text-center">
            <div className="text-3xl font-bold mb-2">Selamat Datang</div>
            <div className="text-sm font-normal text-base-content/60">
              Ceritakan pernikahanmu untuk membuat undangan yang unik dan
              berkesan.
            </div>
          </div>

          {currentStep === "mulai" && <Step1 />}
          {currentStep === "pasangan" && <Step2 />}

          <div className="card-actions mt-6">
            <button className="btn btn-block" onClick={handleNextStep}>
              next step
            </button>
            <div
              className="flex items-center justify-center w-full"
              onClick={handlePrevStep}
            >
              <div className="link">back</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

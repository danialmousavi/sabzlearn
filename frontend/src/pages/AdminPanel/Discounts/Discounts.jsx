import React from "react";
import Input from "../../../components/Form/Input";
import {
  maxValidator,
  minValidator,
  requierdValidator,
} from "../../../validators/rules";
import { useForm } from "../../../hooks/useForm";
import Swal from "sweetalert2";

export default function Discounts() {
  const [formState, onInputHandler] = useForm(
    {
      discountNumber: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const createNewCampain = (e) => {
    e.preventDefault();
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    const newDiscount = {
      discount: formState.inputs.discountNumber.value,
    };
    console.log(newDiscount);
    
    fetch("http://localhost:3000/v1/offs/all", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorageData}`,
      },
      body:JSON.stringify(newDiscount)
    }).then(res=>{
      if(res.ok){
        Swal.fire({
          title:"کمپین با موفقیت ایجاد شد",
          icon:"success"
        })
      }
    }
    );
  };
  return (
    <>
      <div class="container">
        <div class="home-title">
          <span>افزودن دسته‌بندی جدید</span>
        </div>
        <form class="form">
          <div class="col-6">
            <div class="name input">
              <label class="input-title"> تخفیف برای کمپین</label>
              <Input
                type="number"
                className="login-form__password-input"
                element="input"
                onInputHandler={onInputHandler}
                id="discountNumber"
                placeholder="لطفا درصد تخفیف را وارد کنید..."
                validations={[requierdValidator()]}
              />
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-12">
            <div class="bottom-form">
              <div class="submit-btn">
                <input
                  type="submit"
                  value="افزودن"
                  onClick={createNewCampain}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

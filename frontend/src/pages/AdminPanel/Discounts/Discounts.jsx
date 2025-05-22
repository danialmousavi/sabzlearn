import React from 'react'
import Input from '../../../components/Form/Input'
import { maxValidator, minValidator, requierdValidator } from '../../../validators/rules'
import { useForm } from '../../../hooks/useForm';

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
      const createNewCampain=(e)=>{
        e.preventDefault();
      }
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
  )
}

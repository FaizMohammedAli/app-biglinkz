import React from "react";
import { LoginForm } from "./Login";
import { SignUpForm } from "./Signup";

interface IToggleUserForm {
  showLogin: boolean;
  setShowLogin: (value: boolean) => any;
}
export const ToggleUserForm = (props: IToggleUserForm) => {
  return (
    <>
      {props.showLogin ? (
        <LoginForm onShowLogin={props.setShowLogin} />
      ) : (
        <SignUpForm onShowLogin={props.setShowLogin} />
      )}
    </>
  );
};

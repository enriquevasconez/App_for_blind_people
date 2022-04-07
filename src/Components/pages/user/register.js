import React from "react";
import PageWHalfImage from "../pageWHalfImage"
import LoadingModal from "../../general/loadingModal"
import UserForm from "./userForm/UserForm";
import Breadcrumb from '../../general/breadcrumb';

class Register extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (localStorage.getItem('user-info')) {
      window.location.href = "/";
    }
  }

  render() {
    return (
      <PageWHalfImage>
        <main className="col-10 col-md-8 col-lg-4 col-xl-4">

          <div class="card" role="Inicio de sesion" >
            
            <div className="card-body ">
            <Breadcrumb
              routes={{
                Inicio: "/",
                Registro: "/register"
              }} />
              <UserForm />
            </div>
          </div>
        </main>
        {/* <LoadingModal/> */}
      </PageWHalfImage>
    )
  }
}

export default Register;

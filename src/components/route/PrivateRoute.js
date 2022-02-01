import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import session from "../../utils/session";
import AppLayout from "../../containers/Layout/AppLayout";
import db from "../../utils/db";

export const PrivateRoute = ({component: Component, ...rest }) => {

  if(session.isAuth(localStorage.getItem('token')) === false | session.check(24, localStorage.getItem('timesession')) === true){
      db.delete()
      return <Redirect to="/" />;
  } else {
      return(

      <Route
        {...rest}
        render={(props) => {
        return(
            <AppLayout>
              <Component {...props} />
            </AppLayout>
          )
        }}
      />
    )
  }

};

import React from 'react';
import { BrowserRouter, Routes as DOMRoutes, Route } from "react-router-dom";
import routes from './routes.js'

export default function Routes() {
  return (
    <BrowserRouter>
      <DOMRoutes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            element={<route.component routes={route.routes} />}
          />
        ))}
      </DOMRoutes>
    </BrowserRouter>
  )
}
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Game } from "./pages/Game";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/">
            <Game />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

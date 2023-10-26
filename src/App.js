import React, { Component } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import NotFound from "./components/NotFound";
import NoAudioPage from "./components/NoAudioPage";
import WithAudio from "./components/WithAudio";
import Home from "./components/Home";
import WithAudioScript from "./components/WithAudioScript";
import NoAudioPageScript from "./components/NoAudioPageScript";

class App extends Component {
  render() {
    return (
      <HashRouter basename="/">
        <div className="container">
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            <Route path="/home" render={() => <Home />} />
            <Route path="/withaudio" render={() => <WithAudio />} />
            <Route path="/withoutaudio" render={() => <NoAudioPage />} />
            <Route
              path="/withaudioandscript"
              render={() => <WithAudioScript />}
            />
            <Route path="/withoutaudio" render={() => <NoAudioPageScript />} />
            <Route
              path="/withoutaudioandscript"
              render={() => <NoAudioPage />}
            />

            <Route component={NotFound} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default App;

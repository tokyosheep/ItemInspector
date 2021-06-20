import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import configStore from "./redux/store/store";
import Layout from "./pages/layout";

const store = configStore();

ReactDOM.render(
    <Provider store={store}>
        <Layout />
    </Provider>,
    document.getElementById("root")
);
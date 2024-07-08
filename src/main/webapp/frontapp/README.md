## 설치 플러그인

```text
Auto Import - ES6, TS, JSX, TSX
ESLint
JetBrains IDE Keymap
Prettier
Reactjs code snippets
```

## 설치 라이브러리

```sh
npm i react-router-dom
npm i styled-components
npm i react-redux
npm install @reduxjs/toolkit react-redux
npm i jwt-decode
npm i react-bootstrap bootstrap
npm i react-bootstrap-icons
npm i axios
```

### index.js 세팅 (with bootstrap)

```js
import { configureStore } from "@reduxjs/toolkit";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import reducer from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));

const store = configureStore({
  reducer: reducer,
});

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
```

### Router 세팅 변경

```js
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/info/:id" element={<Info />} />
  <Route path="/list" element={<List />} />
  <Route path="/login" element={<Login />} />
  <Route path="/loginComplete" element={<LoginComplete />} />
</Routes>
```
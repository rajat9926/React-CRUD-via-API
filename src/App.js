import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/pages/home";
import Edit from "./components/pages/Edit";
import View from "./components/pages/View";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" Component={Home} />
					<Route path="view/:id" Component={View} />
					<Route path="edit/:id" Component={Edit} />
					<Route path="delete/:id" Component={Home} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
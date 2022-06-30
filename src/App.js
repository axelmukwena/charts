import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import PageCharts from "./views/PageCharts";
import Layout from "./components/Layout";
import productCharts from "./api/productCharts";


const pages = [
	{ name: "Products", path: "/products" },
	{ name: "Pricing", path: "/pricing" },
	{ name: "Blog", path: "/blog" },
	{ name: "Food", path: "/food" },
	{ name: "Cars", path: "/cars" },
];
const tmpItems = productCharts();

function App() {
	return (
		<div className='App'>
			<Layout pages={pages}>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route
						path='/:pageChartPath'
						element={<PageCharts tmpItems={tmpItems} />}
						key='painter'
					/>
				</Routes>
			</Layout>
		</div>
	);
}

export default App;

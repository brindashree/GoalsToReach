import { Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
const { Content } = Layout;
//  <Layout>
// 		<Sider>Sider</Sider>
// 		<Layout>
// 			<Header>Header</Header>
// 			<Content>Content</Content>
// 			<Footer>Footer</Footer>
// 		</Layout>
//  </Layout>;
function App() {
	return (
		<Layout>
			<Layout>
				<Header />
				<Content>
					<Routes>
						<Route path="/" element={<Dashboard />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
					</Routes>
				</Content>
			</Layout>
		</Layout>
	);
}

export default App;

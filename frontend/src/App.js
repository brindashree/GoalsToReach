import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Layout } from "antd";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import styled from "styled-components";
import colors from "./themes/colors";
const { Content } = Layout;
const StyledContent = styled(Content)`
	&& {
		background-color: ${colors.basicWhite};
	}
`;
function App() {
	return (
		<Layout>
			<Layout>
				<Header />
				<StyledContent>
					<Routes>
						<Route path="/" element={<Dashboard />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
					</Routes>
					<ToastContainer />
				</StyledContent>
			</Layout>
		</Layout>
	);
}

export default App;

import FeatherIcon from "feather-icons-react";
import { Link, useNavigate } from "react-router-dom";
import { Layout, Button } from "antd";
import styled from "styled-components";
import colors from "../themes/colors";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

const { Header } = Layout;
const StyledHeader = styled(Header)`
	height: 4rem;
	background-color: ${colors.logoDarkBlue};
	display: flex;
	justify-content: space-between;
`;
const Logo = styled.div`
	display: flex;
	align-items: center;
	margin: 0 1rem;
	justify-content: center;
	font-family: "Secular One", sans-serif;
	color: white;
	a {
		text-decoration: none;
		color: white;
		font-size: 1.5rem;
		font-weight: 500;
	}
`;
const NavLinks = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	a {
		text-decoration: none;
		padding: 1rem;
		color: ${colors.white};
		font-weight: 700;
	}
`;
const CustomButton = styled(Button)`
	padding: 0.8rem;
	color: ${colors.white};
	margin: 0 1rem;
	background-color: ${colors.logoLightBlue};
	border: none;
	font-size: 0.9rem;
	font-weight: 700;
	border-radius: 5px;
	cursor: pointer;
`;

function MainHeader() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const handleLogout = () => {
		dispatch(logout());
		dispatch(reset());
		navigate("/");
	};
	return (
		<StyledHeader>
			<Logo>
				<FeatherIcon icon="crosshair" />
				<Link to="/">GoalsToReach</Link>
			</Logo>
			<NavLinks>
				{user ? (
					<CustomButton onClick={handleLogout}>Logout</CustomButton>
				) : (
					<>
						<Link to="/login">Login</Link>
						<Link to="/register">Register</Link>
					</>
				)}
			</NavLinks>
		</StyledHeader>
	);
}

export default MainHeader;

import FeatherIcon from "feather-icons-react";
import { Link } from "react-router-dom";
import { Layout } from "antd";
import styled from "styled-components";
import colors from "../themes/colors";

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

function MainHeader() {
	return (
		<StyledHeader>
			<Logo>
				<FeatherIcon icon="crosshair" />
				<Link to="/">GoalsToReach</Link>
			</Logo>
			<NavLinks>
				<Link to="/login">Login</Link>
				<Link to="/register">Register</Link>
			</NavLinks>
		</StyledHeader>
	);
}

export default MainHeader;

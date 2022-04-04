import styled from "styled-components";
import { Form, Input, Button } from "antd";
import goalImage from "../assets/goal.jpg";
import colors from "../themes/colors";

const ImageContainer = styled.div`
	width: 50%;
	img {
		width: 100%;
		height: 100%;
	}
`;
const MainContainer = styled.div`
	display: flex;
	width: 900px;
	margin: 3rem auto;
	box-shadow: 0 0 7px #ced3e0;
	border-radius: 5px;
`;
const FormContainer = styled.div`
	width: 50%;

	.ant-form {
		padding: 2rem;
	}
`;
const FormItem = styled(Form.Item)`
	&& {
		margin: 1rem 0;
		.ant-form-item-label {
			margin-bottom: 1rem;
			font-weight: 700;
		}
	}
`;
const StyledHeader = styled.p`
	font-size: 1.5rem;
	text-align: center;
	font-weight: 700;
	margin-bottom: 1rem;
	color: ${colors.logoDarkBlue};
	span {
		color: ${colors.logoLightBlue};
	}
`;
const StyledInput = styled(Input)`
	&& {
		width: 21rem;
		padding: 1rem;
		border: 2px solid #ced3e0;
		border-radius: 5px;
		outline: none;
		transition: all 0.2s;
		&:focus {
			border: 2px solid ${colors.darkBlue};
		}
	}
`;
const CustomButton = styled(Button)`
	padding: 1rem;
	margin-top: 1rem;
	color: ${colors.white};
	background-color: ${colors.logoDarkBlue};
	border: none;
	width: 23rem;
	font-size: 1rem;
	font-weight: 700;
	border-radius: 5px;
	cursor: pointer;
`;
const Register = () => {
	return (
		<MainContainer>
			<FormContainer>
				<StyledHeader>
					Welcome to <span>GoalsToReach</span>
				</StyledHeader>
				<Form layout="vertical">
					<FormItem
						label="Username"
						name="name"
						rules={[{ required: true, message: "Please input your username!" }]}
					>
						<StyledInput />
					</FormItem>
					<FormItem
						label="Email"
						name="email"
						rules={[{ required: true, message: "Please input your username!" }]}
					>
						<StyledInput />
					</FormItem>
					<FormItem
						label="Password"
						name="password"
						rules={[{ required: true, message: "Please input your password!" }]}
					>
						<StyledInput />
					</FormItem>
					<CustomButton>Register</CustomButton>
				</Form>
			</FormContainer>
			<ImageContainer>
				<img src={goalImage} alt="" />
			</ImageContainer>
		</MainContainer>
	);
};

export default Register;

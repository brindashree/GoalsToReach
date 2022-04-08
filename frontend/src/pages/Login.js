import styled from "styled-components";
import { Form, Button, Spin } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import goalImage from "../assets/goal.jpg";
import { login, reset } from "../features/auth/authSlice";
import colors from "../themes/colors";

const ImageContainer = styled.div`
	width: 50%;
	img {
		width: 100%;
		height: 100%;
	}
	@media only screen and (max-width: 600px) {
		display: none;
	}
`;
const MainContainer = styled.div`
	display: flex;
	width: 900px;
	margin: 4rem auto;
	box-shadow: 0 0 7px #ced3e0;
	height: 540px;
	border-radius: 5px;
	@media only screen and (max-width: 600px) {
		flex-direction: column;
		width: 100%;
		margin: 3rem 0;
	}
`;
const FormContainer = styled.div`
	width: 50%;
	.ant-form {
		padding: 2rem;
		margin: 4rem 0;
	}

	.ant-form-item-explain-error {
		color: ${colors.alertRed};
	}
	@media only screen and (max-width: 600px) {
		width: 100%;
		.ant-form {
			padding: 1rem;
		}
	}
`;
const FormItem = styled(Form.Item)`
	&& {
		margin: 1rem 0;
		.ant-form-item-label {
			margin-bottom: 1rem;
			font-weight: 700;
			color: ${colors.logoDarkBlue};
		}
	}
`;
const StyledHeader = styled.p`
	font-size: 1.5rem;
	text-align: center;
	font-weight: 700;
	margin: 1rem;
	color: ${colors.logoDarkBlue};
	span {
		color: ${colors.logoLightBlue};
	}
`;
const StyledInput = styled.input`
	padding-left: 1rem;
	border: 2px solid #ced3e0;
	border-radius: 5px;
	outline: none;
	height: 3rem;
	font-size: 1.1rem;
	transition: all 0.2s;
	width: -webkit-fill-available;
	&:focus {
		border: 2px solid ${colors.darkBlue};
	}
`;
const CustomButton = styled(Button)`
	margin-top: 1rem;
	color: ${colors.white};
	background-color: ${colors.logoDarkBlue};
	border: none;
	height: 3rem;
	min-width: 12rem;
	font-size: 1rem;
	font-weight: 700;
	border-radius: 5px;
	align-self: center;
	cursor: pointer;
	&:hover,
	&:focus {
		color: ${colors.white};
		background-color: ${colors.logoDarkBlue};
	}
`;
const StyledSpin = styled(Spin)`
	&& {
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;
function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	);
	const [loginForm] = Form.useForm();

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}
		if (isSuccess || user) {
			navigate("/");
		}
		dispatch(reset());
	}, [user, isError, isSuccess, message, navigate, dispatch]);

	const handleLogin = async () => {
		await loginForm.validateFields();
		await loginForm.getFieldsValue();
		const { email, password } = loginForm.getFieldsValue();
		const userData = {
			email,
			password,
		};
		dispatch(login(userData));
	};

	if (isLoading) {
		return <StyledSpin size="large" />;
	}
	return (
		<MainContainer>
			<FormContainer>
				<StyledHeader>
					Welcome to <span>GoalsToReach</span>
				</StyledHeader>
				<Form layout="vertical" form={loginForm}>
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
						<StyledInput type="password" />
					</FormItem>
					<CustomButton size="large" onClick={handleLogin}>
						Login
					</CustomButton>
				</Form>
			</FormContainer>
			<ImageContainer>
				<img src={goalImage} alt="" />
			</ImageContainer>
		</MainContainer>
	);
}

export default Login;

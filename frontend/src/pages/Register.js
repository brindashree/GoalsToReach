import styled from "styled-components";
import { Form, Button, Spin } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import goalImage from "../assets/goal.jpg";
import colors from "../themes/colors";
import { register, reset } from "../features/auth/authSlice";
import { useEffect } from "react";

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
	margin: 4rem auto 0 auto;
	box-shadow: 0 0 7px #ced3e0;
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
		padding: 1rem 2rem 2rem 2rem;
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
		margin-top: 1rem;
		.ant-form-item-label {
			font-weight: 700;
			color: ${colors.logoDarkBlue};
		}
	}
`;
const StyledHeader = styled.p`
	font-size: 1.5rem;
	text-align: center;
	font-weight: 700;
	margin: 0.5rem;
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
	height: 2.5rem;
	font-size: 1.1rem;
	transition: all 0.2s;
	width: -webkit-fill-available;
	&:focus {
		border: 2px solid ${colors.darkBlue};
	}
`;
const CustomButton = styled(Button)`
	&& {
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
const Register = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	);
	const [registerForm] = Form.useForm();

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}
		if (isSuccess || user) {
			navigate("/");
		}
		dispatch(reset());
	}, [user, isError, isSuccess, message, navigate, dispatch]);

	const handleRegister = async () => {
		await registerForm.validateFields();
		await registerForm.getFieldsValue();
		const { name, email, password, confirmPassword } =
			registerForm.getFieldsValue();
		if (password !== confirmPassword) {
			toast.error("Passwords do not match");
		} else {
			const userData = {
				name,
				email,
				password,
			};
			console.log({ userData });
			dispatch(register(userData));
		}
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
				<Form layout="vertical" form={registerForm}>
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
						type="email"
						rules={[{ required: true, message: "Please input your email!" }]}
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
					<FormItem
						label="Confirm Password"
						name="confirmPassword"
						rules={[
							{ required: true, message: "Please confirm your password!" },
						]}
					>
						<StyledInput type="password" />
					</FormItem>
					<CustomButton size="large" onClick={handleRegister}>
						Register
					</CustomButton>
				</Form>
			</FormContainer>
			<ImageContainer>
				<img src={goalImage} alt="" />
			</ImageContainer>
		</MainContainer>
	);
};

export default Register;

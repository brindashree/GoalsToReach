import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import GoalForm from "../components/GoalForm";
import { Spin } from "antd";
import { getGoals, reset } from "../features/goals/goalSlice";
import GoalItem from "../components/GoalItem";
import styled from "styled-components";
import colors from "../themes/colors";

const Greeting = styled.div`
	text-align: center;
	font-size: 1.25rem;
	font-weight: 900;
	padding: 1rem 0;
	color: ${colors.logoLightBlue};
`;
const MainContainer = styled.div`
	max-width: 900px;
	margin: 0 auto;
	min-height: 90vh;
`;
const GoalsContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;

	@media only screen and (max-width: 600px) {
		grid-template-columns: 1fr;
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
const StyledEmptyMessage = styled.div`
	text-align: center;
	font-size: 1.25rem;
	padding: 1rem 0;
	font-weight: 500;
	color: ${colors.darkBlue};
`;
function Dashboard() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user } = useSelector((state) => state.auth);
	const { goals, isLoading, isError, message } = useSelector(
		(state) => state.goals
	);

	useEffect(() => {
		if (isError) {
			console.log(message);
		}
		if (!user) {
			navigate("/login");
		}
		dispatch(getGoals());
		return () => {
			dispatch(reset());
		};
	}, [user, navigate, isError, message, dispatch]);

	if (isLoading) {
		return <StyledSpin size="large" />;
	}

	return (
		<MainContainer>
			<Greeting>Welcome {user && user.name}</Greeting>

			<GoalForm />

			{goals && goals.length > 0 ? (
				<GoalsContainer>
					{goals.map((goal) => (
						<GoalItem key={goal._id} goal={goal} />
					))}
				</GoalsContainer>
			) : (
				<StyledEmptyMessage>You have not set any goals</StyledEmptyMessage>
			)}
		</MainContainer>
	);
}

export default Dashboard;

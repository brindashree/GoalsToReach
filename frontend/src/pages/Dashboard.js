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
	font-size: 1.2rem;
	font-weight: 600;
	padding: 1rem 0;
	color: ${colors.darkBlue};
	background-color: ${colors.lightBlue};
`;
const MainContainer = styled.div`
	max-width: 900px;
	margin: 0 auto;
`;
const GoalsContainer = styled.div`
	display: grid;
	grid-template-columns: auto auto auto;
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
		return <Spin size="large" />;
	}

	return (
		<>
			<Greeting>Welcome {user && user.name}</Greeting>
			<MainContainer>
				<GoalForm />
				<GoalsContainer>
					{goals && goals.length > 0 ? (
						<div>
							{goals.map((goal) => (
								<GoalItem key={goal._id} goal={goal} />
							))}
						</div>
					) : (
						<h3>You have not set any goals</h3>
					)}
				</GoalsContainer>
			</MainContainer>
		</>
	);
}

export default Dashboard;

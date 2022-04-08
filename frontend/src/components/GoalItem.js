import { Form, Input, Modal } from "antd";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { deleteGoal, updateGoal } from "../features/goals/goalSlice";
import colors from "../themes/colors";

const Card = styled.div`
	box-shadow: 0 0 10px #ced3e0;
	height: 8rem;
	border-radius: 5px;
	padding: 1rem;
	margin: 1rem;
	display: flex;
	background-color: ${colors.basicWhite};
`;
const Text = styled.div`
	width: 80%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;
const ButtonContainer = styled.div`
	width: 20%;
	display: flex;
	justify-content: space-between;
	button {
		background: none;
		border: none;
		font-size: 1.25rem;
	}
`;
const StyledTitle = styled.p`
	margin: 0 0 0.5rem 0;
	color: ${colors.logoDarkBlue};
	font-weight: 700;
	font-size: 1.1rem;
`;
const StyledDate = styled.p`
	margin: auto 0 0 0;
	color: ${colors.primaryGray};
`;
const FormItem = styled(Form.Item)`
	&& {
		margin: 1rem;
	}
`;
const GoalItem = ({ goal }) => {
	const [updateGoalForm] = Form.useForm();
	const [visible, setVisible] = useState(false);
	const dispatch = useDispatch();
	const handleUpdate = async () => {
		await updateGoalForm.getFieldsValue();
		const { text } = updateGoalForm.getFieldsValue();
		dispatch(updateGoal({ id: goal._id, text: text }));
	};
	const handleCancel = () => {
		setVisible(false);
	};
	return (
		<Card>
			<Text>
				<StyledTitle>{goal.text}</StyledTitle>
				<StyledDate>
					{new Date(goal.createdAt).toLocaleString("en-US")}
				</StyledDate>
			</Text>
			<ButtonContainer>
				<button onClick={() => dispatch(deleteGoal(goal._id))}>
					<MdDelete />
				</button>

				<button onClick={() => setVisible(true)}>
					<FaEdit />
				</button>
			</ButtonContainer>
			<Modal
				title="Edit Goal"
				visible={visible}
				onOk={handleUpdate}
				onCancel={handleCancel}
			>
				<Form form={updateGoalForm}>
					<FormItem name="text">
						<Input type="text" defaultValue={goal.text} />
					</FormItem>
				</Form>
			</Modal>
		</Card>
	);
};

export default GoalItem;

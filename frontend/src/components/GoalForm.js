import { useDispatch } from "react-redux";
import { Form, Button } from "antd";
import styled from "styled-components";
import colors from "../themes/colors";
import { createGoal } from "../features/goals/goalSlice";

const FormItem = styled(Form.Item)`
	&& {
		margin: 1rem;
	}
`;
const StyledInput = styled.input`
	padding-left: 1rem;
	border: 2px solid #ced3e0;
	border-radius: 5px;
	outline: none;
	height: 2.5rem;
	font-size: 1rem;
	transition: all 0.2s;
	width: -webkit-fill-available;
	@media only screen and (max-width: 600px) {
		width: -webkit-fill-available;
	}
	&:focus {
		border: 2px solid ${colors.darkBlue};
	}
`;
const CustomButton = styled(Button)`
	&& {
		width: 10rem;
		color: ${colors.white};
		margin: 0 1rem;
		background-color: ${colors.logoDarkBlue};
		border: none;
		font-size: 0.9rem;
		font-weight: 700;
		border-radius: 5px;
		cursor: pointer;
	}
`;
const GoalForm = () => {
	const [addGoalForm] = Form.useForm();
	const dispatch = useDispatch();

	const handleAddGoal = async () => {
		await addGoalForm.validateFields();
		await addGoalForm.getFieldsValue();
		const { text } = addGoalForm.getFieldsValue();
		dispatch(createGoal({ text }));
		addGoalForm.resetFields();
	};
	return (
		<>
			<Form layout="vertical" form={addGoalForm}>
				<FormItem
					name="text"
					rules={[{ required: true, message: "Please add your goal" }]}
				>
					<StyledInput type="text" placeholder="Enter your goal" />
				</FormItem>
				<CustomButton onClick={handleAddGoal}>Add Goal</CustomButton>
			</Form>
		</>
	);
};

export default GoalForm;

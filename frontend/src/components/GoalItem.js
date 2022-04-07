import { Form } from "antd";
import { useDispatch } from "react-redux";
import { deleteGoal, updateGoal } from "../features/goals/goalSlice";
const GoalItem = ({ goal }) => {
	const [updateGoalForm] = Form.useForm();
	const dispatch = useDispatch();
	const handleUpdate = async () => {
		await updateGoalForm.getFieldsValue();
		const { text } = updateGoalForm.getFieldsValue();
		dispatch(updateGoal({ id: goal._id, text: text }));
	};
	return (
		<div>
			<div>{new Date(goal.createdAt).toLocaleString("en-US")}</div>
			<h5>{goal.text}</h5>
			<button onClick={() => dispatch(deleteGoal(goal._id))}>X</button>
			<Form form={updateGoalForm}>
				<Form.Item name="text">
					<input type="text" />
				</Form.Item>
			</Form>
			<button onClick={handleUpdate}>update</button>
		</div>
	);
};

export default GoalItem;

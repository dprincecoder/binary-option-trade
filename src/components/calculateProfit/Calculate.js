import React, { useState } from "react";
import "./calculate.css";
const plans = [
	{
		title: "Level 1 Plan",
		level: 1,
		percent: 3,
		min: 150,
		max: 599,
		profit: 10,
	},
	{
		title: "Level 2 Plan",
		level: 2,
		percent: 10,
		min: 600,
		max: 5999,
		profit: 10,
	},
	{
		title: "Level 3 Plan",
		level: 3,
		percent: 15,
		min: 6000,
		max: 100000,
		profit: 10,
	},
	{
		title: "Trading fixed deposit",
		level: 4,
		percent: 20,
		min: 1500,
		max: 10000,
		profit: 10,
	},
	{
		title: "Bronze Plan",
		level: 5,
		percent: 10,
		min: 200,
		max: 900,
		profit: 10,
	},
	{
		title: "Silver Plan",
		level: 6,
		percent: 20,
		min: 1000,
		max: 5900,
		profit: 10,
	},
	{
		title: "Gold Plan",
		level: 7,
		percent: 33,
		min: 6000,
		max: 500000,
		profit: 10,
	},
	{
		title: "Minig fixed deposit",
		level: 8,
		percent: 45,
		min: 1500,
		max: 10000,
		profit: 10,
	},
];

const Calculate = () => {
	const [selectedPlan, setSelectedPlan] = useState(150);
	const [amount, setAmount] = useState(150);
	const [profitReturn, setProfitReturn] = useState(0);
	const [inputMin, setInputMin] = useState(amount);

	const getValue = (e) => {
		setAmount(e.target.value);
		setProfitReturn(((amount * 10) / 8) * 10);
		setInputMin(e.target.value);
	};

	return (
		<div className="calculate">
			<div className="plans-tl">
				<h1 className="calculate-tx">Calculate Profit</h1>
				<div className="plans-tl-btm"></div>
			</div>
			<div className="calculate-grid">
				<div className="calculate-left">
					<div className="calculate-select">
						<p>Select Plan</p>
						<div className="calculate-select-options calculate-ml">
							<select
								className="browser-default"
								value={selectedPlan}
								onChange={(e) => {
									setSelectedPlan(e.target.value);
									setAmount(e.target.value);
									setInputMin(e.target.value);
								}}>
								{plans.map((e) => (
									<option key={e.level} value={e.min}>
										{e.title}
									</option>
								))}
							</select>
						</div>
					</div>
					<div className="calculate-input-body">
						<p>Amount($)</p>
						<div className="calculate-input">
							<input
								type="number"
								min={amount}
								value={amount}
								className="calculate-ml calculate-input-field"
								onChange={getValue}
								id=""
							/>
							{inputMin < selectedPlan && (
								<small>
									Amount must be the minimum of the selected package*
								</small>
							)}
						</div>
					</div>
				</div>
				<div className="calculate-right">
					<div className="calculate-right-info">
						<p>10x Your investing amount</p>
						<p>Up-to $150 / Daily Profit</p>
						<p>Welcome Bonus</p>
					</div>
					<div className="calculate-right-gain">
						<div className="calculate-right-gain-profit">
							Profit: ${amount * 10}
						</div>
						<div className="calculate-right-gain-profit">
							Total Return: ${((amount * 10) / 8) * 10}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Calculate;
